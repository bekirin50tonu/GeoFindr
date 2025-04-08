'use client'
import type { MapCenter } from '@/types/mapCenter.type'
import type { MapMarkerPoint } from '@/types/mapMarkerPoinr..type'
import type { Places } from '@/types/place.type'
import type { Regions } from '@/types/region.type'
import { showErrorToast, showSuccessToast } from '@/utils/helpers/toastify'
import { Circle, GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import axios, { AxiosError } from 'axios'
import React, { useEffect, useState, MouseEvent, type FormEvent } from 'react'

const HomePage: React.FC = () => {
  // regions
  const [regionText, setRegionText] = useState('Aydın')
  const [regions, setRegions] = useState<Regions>([])
  const [selectedRegion, setSelectedRegion] = useState('')

  // filter properties
  const [radius, setRadius] = useState(1000)
  const [maxResults, setMaxResults] = useState(10)
  const [searchText, setSearchText] = useState('Restaurant')

  // filter results
  const [places, setPlaces] = useState<Places>([])

  // Map configs
  const [mapCenter, setMapCenter] = useState<MapCenter>({
    position: {
      location: { lat: 39.925533, lng: 32.866287 },
      title: 'Buradasınız.',
    },
    center: { lat: 39.925533, lng: 32.866287 },
  })

  const [mapMarkerPoint, setMapMarkerPoint] = useState<MapMarkerPoint>()
  useEffect(() => {
    async function GetLocation() {
      if (!navigator.geolocation) {
        return showErrorToast(
          'Lokasyon Bilgisi Alınamadı. Desteklenmiyor olabilir.'
        )
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setMapCenter({
            position: {
              location,
              title: 'Buradasınız.',
            },
            center: location,
          })
          showSuccessToast('Koordinat Başarıyla Alındı.')
        },
        () => {
          showErrorToast('Lokasyon Bilgisi Alınamadı.')
        }
      )
    }

    GetLocation()
  }, [])

  function SetSelectedRegionHandler(event: MouseEvent, id: string) {
    event.preventDefault()

    setSelectedRegion(id)
    const selected = regions.find((region) => region.place_id == id)
    if (!selected) {
      return showErrorToast(
        'Beklenmedik bir hata oluştu. Lütfen Tekrar Bölge Seçiniz.'
      )
    }
    const location = selected.geometry.location

    setMapMarkerPoint({
      location,
      title: selected.formatted_address,
    })
    setMapCenter((value) => {
      return {
        position: value.position,
        center: location,
      }
    })
  }

  const [apiKey, setApiKey] = useState('')

  useEffect(() => {
    // Get key from URL query parameters
    const urlParams = new URLSearchParams(window.location.search)
    const urlKey = urlParams.get('key')
    if (!urlKey) {
      showErrorToast(
        'Google Maps API anahtarı eksik. Lütfen ?key=YOUR_API_KEY şeklinde anahtarınızı giriniz.'
      )
    }
    setApiKey(urlKey || '')
  }, [])
  async function regionSearchHandler(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault()

    const baseUrl = window.location.origin

    const client = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!regionText) {
      return showErrorToast('Bölge İsmi İçermeli.')
    }

    const existRegion = regions.find((region) =>
      region.formatted_address.includes(regionText)
    )

    if (existRegion) {
      return showSuccessToast('İstenilen Bölge Bulundu.')
    }

    try {
      const response = await client.get('/api/maps/location', {
        params: {
          address: regionText,
          key: apiKey, // Google Maps API key
        },
      })
      if (response.status === 200 && response.data.length > 0) {
        showSuccessToast('İstenilen Bölge Bulundu.')
        const responseRegions = response.data
        return setRegions([...responseRegions, ...regions])
      }
      return showErrorToast('İstenen Bölge Bulunamadı.')
    } catch (error) {
      if (error instanceof Error) {
        return showErrorToast(error.message)
      }
      if (error instanceof AxiosError) {
        return showErrorToast(error.message)
      }
      return showErrorToast('Beklenmeyen Hata.')
    }
  }

  async function onPlaceSearchHandler(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault()

    const baseUrl = window.location.origin

    const client = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const selected = regions.find(
      (region) => region.place_id === selectedRegion
    )
    if (!selected) {
      return showErrorToast('Bölge Seçili Değil.')
    }
    if (radius <= 0) {
      return showErrorToast(
        'İstenilen Bölge Çevresi Sıfır ya da Sıfırdan Küçük Olamaz.'
      )
    }
    if (!searchText) {
      return showErrorToast('İstenilen Bölge Aranacak Yer Adı Girilmemiştir.')
    }
    if (maxResults <= 0) {
      return showErrorToast(
        'İstenilen Mağaza Sayısı Sıfır ya da Sıfırdan Küçük Olamaz.'
      )
    }

    try {
      const response = await client.get('/api/maps/nearby', {
        params: {
          lat: selected.geometry.location.lat,
          lng: selected.geometry.location.lng,
          type: searchText,
          maxResults: maxResults,
          radius: radius,
          key: apiKey,
        },
      })

      if (response.status === 200) {
        setPlaces(response.data)
        //console.log(response.data)

        return showSuccessToast('İstenilen Mağaza Bilgileri Getirildi.')
      }
      return showErrorToast('Beklenmeyen Hata.')
    } catch (error) {
      if (error instanceof Error) {
        return showErrorToast(error.message)
      }
      if (error instanceof AxiosError) {
        return showErrorToast(error.message)
      }
      return showErrorToast('Beklenmeyen Hata.')
    }
  }

  return (
    <div className="grid grid-rows-2 grid-cols-3 h-screen gap-4 p-2">
      <div className="row-span-1 col-span-2 ring-1 ring-gray-400 rounded-2xl p-2">
        <LoadScript googleMapsApiKey={apiKey ?? ''}>
          <GoogleMap
            mapContainerStyle={{
              height: '100%',
              width: '100%',
            }}
            center={mapCenter.center}
            zoom={10}
          >
            <Marker
              label={mapCenter.position.title}
              position={mapCenter.position.location}
            />

            {mapMarkerPoint ? (
              <Circle center={mapMarkerPoint.location} radius={radius} />
            ) : null}

            {/* Additional components can be added here */}
          </GoogleMap>
        </LoadScript>
      </div>
      <div className="row-span-1 col-span-1 ring-1 ring-gray-400 rounded-2xl p-2 flex flex-col gap-4">
        <form onSubmit={regionSearchHandler}>
          <label htmlFor="region" className="grid grid-cols-4 gap-2">
            <h4 className="col-span-1">Bölge</h4>
            <input
              className="col-span-3"
              type="text"
              name="region"
              id="region"
              value={regionText}
              onChange={(e) => setRegionText(e.target.value)}
            />
          </label>

          <button
            type="submit"
            className="px-4 py-2 bg-green-500 hover:bg-green-600 transition-all rounded-2xl cursor-pointer"
          >
            Ara
          </button>
        </form>
        {regions.length > 0 ? (
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th>Bölge Adı</th>
                <th>Özellikler</th>
              </tr>
            </thead>
            <tbody>
              {regions.map((region) => {
                //console.log(region)

                return (
                  <tr key={region.place_id} id={region.place_id}>
                    <td>{region.formatted_address}</td>
                    <td>
                      <button
                        disabled={selectedRegion === region.place_id}
                        onClick={(e) =>
                          SetSelectedRegionHandler(e, region.place_id)
                        }
                        type="button"
                        className="py-2 px-4 rounded-2xl bg-green-600 hover:bg-green-700 transition-all cursor-pointer disabled:bg-gray-700"
                      >
                        Seç
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : null}
        <form onSubmit={onPlaceSearchHandler}>
          <label htmlFor="radius" className="grid grid-cols-4 gap-2">
            <h4 className="col-span-1">Bölge Uzunluğu</h4>
            <input
              className="col-span-3"
              type="text"
              name="radius"
              id="radius"
              value={radius}
              onChange={(e) => setRadius(Number.parseInt(e.target.value ?? 0))}
            />
          </label>
          <label htmlFor="maxResults" className="grid grid-cols-4 gap-2">
            <h4 className="col-span-1">Toplam Sonuç</h4>
            <input
              className="col-span-3"
              type="text"
              name="maxResults"
              id="maxResults"
              value={maxResults}
              onChange={(e) =>
                setMaxResults(Number.parseInt(e.target.value ?? 0))
              }
            />
          </label>
          <label htmlFor="maxResults" className="grid grid-cols-4 gap-2">
            <h4 className="col-span-1">Aranacak Kelime</h4>
            <input
              className="col-span-3"
              type="text"
              name="maxResults"
              id="maxResults"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </label>

          <button
            type="submit"
            className="px-4 py-2 bg-green-500 hover:bg-green-600 transition-all rounded-2xl cursor-pointer"
          >
            Listele
          </button>
        </form>
      </div>
      <div className="row-span-2 col-span-3 ring-1 ring-gray-400 rounded-2xl p-2 w-full h-full overflow-y-auto">
        <table className="w-full h-full table-auto">
          <thead>
            <tr>
              <th>ID</th>
              <td>Adı</td>
              <td>Adresi</td>
              <td>Puanı</td>
            </tr>
          </thead>
          <tbody className="overflow-y-scroll h-[450px]">
            {places
              ? places.map((place) => {
                  //console.log(place)

                  if (place.business_status) {
                    return (
                      <tr key={place.place_id}>
                        <th>{place.place_id}</th>
                        <td>{place.name}</td>
                        <td>{place.vicinity}</td>
                        <td>{place.rating}</td>
                      </tr>
                    )
                  }
                  return null
                })
              : null}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default HomePage
