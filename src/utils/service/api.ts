import { CustomError } from '@/types/errorType'
import type { Places } from '@/types/place.type'
import type { Regions } from '@/types/region.type'
import axios, { AxiosError } from 'axios'

export async function getRegionData(key: string,
  province: string, district: string
): Promise<Regions | CustomError> {
  const baseUrl = window.location.origin

  const client = axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  try {
    const response = await client.get('/api/maps/location', {
      params: {
        address: [province, district].join(" "),
        key, // Google Maps API key
      },
    })
    if (response.status === 200 && response.data.length > 0) {
      return response.data as Regions
    }
    return new CustomError(response.status, "İstenilen Bölge Bulunamadı.")
  } catch (error) {
    if (error instanceof Error) {
      return new CustomError(500, error.message)
    }
    if (error instanceof AxiosError) {
      return new CustomError(error.status ?? 500, error.message)
    }
    return new CustomError(500, "Beklenmeyen Hata.")
  }
}



export async function getNearbySearchData(
  apiKey: string,
  location: { lat: number, lng: number },
  maxResult: number,
  includes: Array<string>,
  radius: number
): Promise<Places | CustomError> {

  const baseUrl = window.location.origin

  const client = axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  })


  if (includes.length < 1) {
    return new CustomError(500, 'İstenilen Bölge Aranacak Yer Adı Girilmemiştir.')
  }
  if (maxResult <= 0) {
    return new CustomError(500, 'İstenilen Mağaza Sayısı Sıfır ya da Sıfırdan Küçük Olamaz.')
  }

  try {
    const response = await client.get('/api/maps/nearby', {
      params: {
        lat: location.lat,
        lng: location.lng,
        types: includes.join(","),
        maxResults: maxResult,
        radius: radius,
        key: apiKey,
      },
    })

    if (response.status === 200) {
      return response.data as Places
    }
    return new CustomError(500, 'Beklenmeyen Hata.')
  } catch (error) {
    if (error instanceof Error) {
      return new CustomError(500, error.message)

    }
    if (error instanceof AxiosError) {
      return new CustomError(error.status ?? 500, error.message)
    }
    return new CustomError(500, 'Beklenmeyen Hata.')
  }
}