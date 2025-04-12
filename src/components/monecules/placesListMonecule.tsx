import type { Place, Places } from '@/types/place.type'

export interface IPlacesListTableMoneculeProps {
  places: Places
  onClickPlace: (place: Place) => void
}

export default function PlacesListTableMonecule({
  places,
  onClickPlace,
}: Readonly<IPlacesListTableMoneculeProps>) {
  return (
    <table className="w-full h-full table-auto">
      <thead>
        <tr>
          <th>Adı</th>
          <td>Tipi</td>
          <td>Adresi</td>
          <td>Telefon</td>
        </tr>
      </thead>
      <tbody className="overflow-y-scroll h-full">
        {places
          ? places.map((place) => {
              //console.log(place)

              if (place.businessStatus) {
                return (
                  <tr
                    key={place.id}
                    onClick={() => onClickPlace(place)}
                    className="cursor-pointer hover:bg-gray-700 transition-all"
                  >
                    <th>
                      <a
                        href={place.googleMapsUri}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {place.displayName.text}
                      </a>
                    </th>
                    <td>
                      <a
                        href={place.websiteUri}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {place.primaryTypeDisplayName?.text}
                      </a>
                    </td>
                    <td>{place.formattedAddress}</td>
                    <td>
                      <a href={`tel:${place.internationalPhoneNumber}`}>
                        {place.internationalPhoneNumber}
                      </a>
                    </td>
                  </tr>
                )
              }
              return null
            })
          : null}
      </tbody>
    </table>
  )
}
