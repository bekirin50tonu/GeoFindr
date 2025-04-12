'use client'
import type { MapCenter } from '@/types/mapCenter.type'
import type { Place, Places } from '@/types/place.type'
import { showErrorToast, showSuccessToast } from '@/utils/helpers/toastify'
import { Circle, GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import React, { useEffect, useState } from 'react'
import FilterFormMonecule from '@/components/monecules/filterFormMonecule'
import PlacesListTableMonecule from '@/components/monecules/placesListMonecule'
import { GetLocation } from '@/utils/navigator/geolocation'
import PlaceDetailedMoneculeModal from '@/components/monecules/placeDetailedMonecule'

const HomePage: React.FC = () => {
  const [place, setPlace] = useState<Place>()
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

  // map markers
  const [mapMarkerPoint, setMapMarkerPoint] = useState<{
    location: { lat: number; lng: number }
    radius: number
  }>()

  // api key state
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

    GetLocation()
      .then((location) => {
        setMapCenter({
          center: location,
          position: {
            location,
            title: 'Buradasınız.',
          },
        })
        showSuccessToast('Konum Alma Başarılı.')
      })
      .catch((err) => {
        showErrorToast(err.message)
      })
  }, [])

  return (
    <LoadScript googleMapsApiKey={apiKey ?? ''}>
      {place && (
        <PlaceDetailedMoneculeModal
          place={place}
          onClose={() => setPlace(undefined)}
        />
      )}
      <div className="grid grid-rows-2 grid-cols-3 h-screen gap-4 p-2 relative">
        <div className="row-span-1 col-span-2 ring-1 ring-gray-400 rounded-2xl p-2">
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
              <Circle
                center={mapMarkerPoint.location}
                radius={mapMarkerPoint.radius}
              />
            ) : null}

            {/* Additional components can be added here */}
          </GoogleMap>
        </div>
        <div className="row-span-1 col-span-1 ring-1 ring-gray-400 rounded-2xl p-2 flex flex-col gap-4 w-full">
          <FilterFormMonecule
            onMarkerChange={(marker) =>
              setMapMarkerPoint({
                location: marker.location,
                radius: marker.radius,
              })
            }
            ApiKey={apiKey}
            onPlacesChange={(places) => setPlaces(places)}
            onMapCenterChange={(location) =>
              setMapCenter((value) => ({
                position: value.position,
                center: location,
              }))
            }
          />
        </div>
        <div className="row-span-2 col-span-3 ring-1 ring-gray-400 rounded-2xl p-2 w-full h-full overflow-y-auto">
          <PlacesListTableMonecule
            places={places}
            onClickPlace={(place) => setPlace(place)}
          />
        </div>
      </div>
    </LoadScript>
  )
}

export default HomePage
