export type Places = Place[]

export interface Place {
  geometry: Geometry
  icon: string
  icon_background_color: string
  icon_mask_base_uri: string
  name: string
  photos?: Photo[]
  place_id: string
  reference: string
  scope: string
  types: string[]
  vicinity: string
  business_status?: string
  opening_hours?: OpeningHours
  plus_code?: PlusCode
  rating?: number
  user_ratings_total?: number
  price_level?: number
}

export interface Geometry {
  location: Location
  viewport: Viewport
}

export interface Location {
  lat: number
  lng: number
}

export interface Viewport {
  northeast: Northeast
  southwest: Southwest
}

export interface Northeast {
  lat: number
  lng: number
}

export interface Southwest {
  lat: number
  lng: number
}

export interface Photo {
  height: number
  html_attributions: string[]
  photo_reference: string
  width: number
}

export interface OpeningHours {
  open_now: boolean
}

export interface PlusCode {
  compound_code: string
  global_code: string
}
