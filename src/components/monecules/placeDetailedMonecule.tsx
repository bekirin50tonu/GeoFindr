import placeTypes from '@/global/placeTypes'
import type { Place } from '@/types/place.type'
import { GoogleMap } from '@react-google-maps/api'
import { useRef } from 'react'

export interface IPlaceDetailedMoneculeModalProps {
  place: Place
  onClose: () => void
}

export default function PlaceDetailedMoneculeModal({
  onClose,
  place,
}: Readonly<IPlaceDetailedMoneculeModalProps>) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      onClick={(e) => {
        if (!ref.current?.contains(e.target as Node)) {
          onClose()
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
    >
      <div
        className="w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-xl text-black"
        ref={ref}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex justify-between items-center">
          {place.displayName.text}
          <button
            onClick={() => onClose()}
            className="cursor-pointer px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition-colors font-light text-sm"
          >
            x
          </button>
        </h2>
        <div className="text-gray-600 mb-6 flex flex-col gap-4">
          <GoogleMap
            mapContainerStyle={{
              height: 450,
              width: '100%',
            }}
            center={{
              lat: place.location.latitude,
              lng: place.location.longitude,
            }}
            zoom={18}
          ></GoogleMap>
          {place.formattedAddress && <span>{place.formattedAddress}</span>}
          <div className="flex flex-row gap-4 justify-around items-center">
            {place.internationalPhoneNumber && (
              <span>
                <a
                  href={`tel:${place.internationalPhoneNumber}`}
                  className="bg-green-600 hover:bg-green-700 transition-all px-4 py-2 rounded-2xl text-white"
                >
                  {place.internationalPhoneNumber}
                </a>
              </span>
            )}
            {place.websiteUri && (
              <span>
                <a
                  className="bg-green-600 hover:bg-green-700 transition-all px-4 py-2 rounded-2xl text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={place.websiteUri}
                >
                  Website
                </a>
              </span>
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 text-sm w-3/4">
            <h4>İşletme Tipleri:</h4>
            {placeTypes
              .filter((placeType) => {
                return place.types.includes(placeType.key)
              })
              .map((value) => value.value)
              .join(', ')}
          </span>
          <span>
            <a
              href={place.googleMapsUri}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-2xl bg-green-800 hover:bg-green-900 text-white transition-colors cursor-pointer"
            >
              Harita
            </a>
          </span>
        </div>
      </div>
    </div>
  )
}
