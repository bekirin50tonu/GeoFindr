export type Regions = Region[]

export interface Region {
  address_components: AddressComponent[]
  formatted_address: string
  geometry: Geometry
  place_id: string
  types: string[]
}

export interface AddressComponent {
  long_name: string
  short_name: string
  types: string[]
}

export interface Geometry {
  bounds: Bounds
  location: Location
  location_type: string
  viewport: Viewport
}

export interface Bounds {
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

export interface Location {
  lat: number
  lng: number
}

export interface Viewport {
  northeast: Northeast2
  southwest: Southwest2
}

export interface Northeast2 {
  lat: number
  lng: number
}

export interface Southwest2 {
  lat: number
  lng: number
}
