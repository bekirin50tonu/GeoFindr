export type Places = Place[]

export interface Place {
  name: string
  id: string
  types: string[]
  nationalPhoneNumber?: string
  internationalPhoneNumber?: string
  formattedAddress: string
  addressComponents: AddressComponent[]
  plusCode: PlusCode
  location: Location
  viewport: Viewport
  rating: number
  googleMapsUri: string
  websiteUri?: string
  regularOpeningHours: RegularOpeningHours
  utcOffsetMinutes: number
  adrFormatAddress: string
  businessStatus: string
  userRatingCount: number
  iconMaskBaseUri: string
  iconBackgroundColor: string
  displayName: DisplayName
  primaryTypeDisplayName?: PrimaryTypeDisplayName
  currentOpeningHours: CurrentOpeningHours
  primaryType?: string
  shortFormattedAddress: string
  editorialSummary?: EditorialSummary
  reviews: Review[]
  photos: Photo[]
  goodForChildren?: boolean
  paymentOptions?: PaymentOptions
  accessibilityOptions?: AccessibilityOptions
  addressDescriptor: AddressDescriptor
  googleMapsLinks: GoogleMapsLinks
  timeZone: TimeZone
  postalAddress: PostalAddress
  takeout?: boolean
  delivery?: boolean
  dineIn?: boolean
  servesLunch?: boolean
  servesDinner?: boolean
  servesBeer?: boolean
  servesWine?: boolean
  outdoorSeating?: boolean
  liveMusic?: boolean
  servesCocktails?: boolean
  servesDessert?: boolean
  servesCoffee?: boolean
  restroom?: boolean
  goodForGroups?: boolean
  goodForWatchingSports?: boolean
  parkingOptions?: ParkingOptions
  priceRange?: PriceRange
  priceLevel?: string
  curbsidePickup?: boolean
  servesBreakfast?: boolean
  servesVegetarianFood?: boolean
  menuForChildren?: boolean
  reservable?: boolean
  servesBrunch?: boolean
  currentSecondaryOpeningHours?: CurrentSecondaryOpeningHour[]
  regularSecondaryOpeningHours?: RegularSecondaryOpeningHour[]
  containingPlaces?: ContainingPlace[]
}

export interface AddressComponent {
  longText: string
  shortText: string
  types: string[]
  languageCode: string
}

export interface PlusCode {
  globalCode: string
  compoundCode: string
}

export interface Location {
  latitude: number
  longitude: number
}

export interface Viewport {
  low: Low
  high: High
}

export interface Low {
  latitude: number
  longitude: number
}

export interface High {
  latitude: number
  longitude: number
}

export interface RegularOpeningHours {
  openNow: boolean
  periods: Period[]
  weekdayDescriptions: string[]
  nextOpenTime?: string
}

export interface Period {
  open: Open
  close?: Close
}

export interface Open {
  day: number
  hour: number
  minute: number
}

export interface Close {
  day: number
  hour: number
  minute: number
}

export interface DisplayName {
  text: string
  languageCode: string
}

export interface PrimaryTypeDisplayName {
  text: string
  languageCode: string
}

export interface CurrentOpeningHours {
  openNow: boolean
  periods: Period2[]
  weekdayDescriptions: string[]
  nextOpenTime?: string
}

export interface Period2 {
  open: Open2
  close: Close2
}

export interface Open2 {
  day: number
  hour: number
  minute: number
  truncated?: boolean
  date: Date
}

export interface Date {
  year: number
  month: number
  day: number
}

export interface Close2 {
  day: number
  hour: number
  minute: number
  truncated?: boolean
  date: Date2
}

export interface Date2 {
  year: number
  month: number
  day: number
}

export interface EditorialSummary {
  text: string
  languageCode: string
}

export interface Review {
  name: string
  relativePublishTimeDescription: string
  rating: number
  text: Text
  originalText: OriginalText
  authorAttribution: AuthorAttribution
  publishTime: string
  flagContentUri: string
  googleMapsUri: string
}

export interface Text {
  text: string
  languageCode: string
}

export interface OriginalText {
  text: string
  languageCode: string
}

export interface AuthorAttribution {
  displayName: string
  uri: string
  photoUri: string
}

export interface Photo {
  name: string
  widthPx: number
  heightPx: number
  authorAttributions: AuthorAttribution2[]
  flagContentUri: string
  googleMapsUri: string
}

export interface AuthorAttribution2 {
  displayName: string
  uri: string
  photoUri: string
}

export interface PaymentOptions {
  acceptsCreditCards?: boolean
  acceptsCashOnly?: boolean
  acceptsDebitCards?: boolean
  acceptsNfc?: boolean
}

export interface AccessibilityOptions {
  wheelchairAccessibleParking?: boolean
  wheelchairAccessibleEntrance?: boolean
  wheelchairAccessibleRestroom?: boolean
  wheelchairAccessibleSeating?: boolean
}

export interface AddressDescriptor {
  landmarks: Landmark[]
  areas?: Area[]
}

export interface Landmark {
  name: string
  placeId: string
  displayName: DisplayName2
  types: string[]
  spatialRelationship?: string
  straightLineDistanceMeters: number
  travelDistanceMeters: number
}

export interface DisplayName2 {
  text: string
  languageCode: string
}

export interface Area {
  name: string
  placeId: string
  displayName: DisplayName3
  containment: string
}

export interface DisplayName3 {
  text: string
  languageCode: string
}

export interface GoogleMapsLinks {
  directionsUri: string
  placeUri: string
  writeAReviewUri: string
  reviewsUri: string
  photosUri: string
}

export interface TimeZone {
  id: string
}

export interface PostalAddress {
  regionCode: string
  languageCode: string
  postalCode: string
  locality: string
  addressLines: string[]
  administrativeArea?: string
}

export interface ParkingOptions {
  freeParkingLot?: boolean
  freeStreetParking: boolean
  paidParkingLot?: boolean
  paidStreetParking?: boolean
  valetParking?: boolean
  freeGarageParking?: boolean
  paidGarageParking?: boolean
}

export interface PriceRange {
  startPrice: StartPrice
  endPrice: EndPrice
}

export interface StartPrice {
  currencyCode: string
  units: string
}

export interface EndPrice {
  currencyCode: string
  units: string
}

export interface CurrentSecondaryOpeningHour {
  openNow: boolean
  periods: Period3[]
  weekdayDescriptions: string[]
  secondaryHoursType: string
  nextOpenTime?: string
  nextCloseTime?: string
}

export interface Period3 {
  open: Open3
  close: Close3
}

export interface Open3 {
  day: number
  hour: number
  minute: number
  date: Date3
  truncated?: boolean
}

export interface Date3 {
  year: number
  month: number
  day: number
}

export interface Close3 {
  day: number
  hour: number
  minute: number
  date: Date4
  truncated?: boolean
}

export interface Date4 {
  year: number
  month: number
  day: number
}

export interface RegularSecondaryOpeningHour {
  openNow: boolean
  periods: Period4[]
  weekdayDescriptions: string[]
  secondaryHoursType: string
  nextOpenTime?: string
  nextCloseTime?: string
}

export interface Period4 {
  open: Open4
  close: Close4
}

export interface Open4 {
  day: number
  hour: number
  minute: number
}

export interface Close4 {
  day: number
  hour: number
  minute: number
}

export interface ContainingPlace {
  name: string
  id: string
}
