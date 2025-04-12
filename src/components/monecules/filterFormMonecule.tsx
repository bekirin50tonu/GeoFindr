import { useCallback, useState, type FormEvent } from 'react'
import DrownDownAtom from '../atoms/dropdown'
import provincesJson from '@/global/provinces.json'
import PrimaryButtonAtom from '../atoms/button'
import { showErrorToast } from '@/utils/helpers/toastify'
import { getNearbySearchData, getRegionData } from '@/utils/service/api'
import { CustomError } from '@/types/errorType'
import type { Places } from '@/types/place.type'
import { MultiSelectDropdownAtom } from '../atoms/multiselectDropdown'
import placeTypes from '@/global/placeTypes'
import InputAtom from '../atoms/input'
export interface IFilterFormMoneculeProps {
  ApiKey: string
  onMapCenterChange: (location: { lat: number; lng: number }) => void
  onPlacesChange: (places: Places) => void
  onMarkerChange: (markers: {
    location: {
      lat: number
      lng: number
    }
    radius: number
  }) => void
}

export default function FilterFormMonecule({
  onMapCenterChange,
  onPlacesChange,
  ApiKey,
  onMarkerChange,
}: Readonly<IFilterFormMoneculeProps>) {
  const [ProvinceID, setProvinceID] = useState(-1)
  const [SelectedCountryID, setSelectedCountryID] = useState(-1)
  const [maxResults, setMaxResults] = useState(10)
  const [IncludeTypes, setIncludeTypes] = useState<Array<string>>([])
  const [Radius] = useState(5000)

  async function filterSubmitHandler(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault()

    //todo:eklenecek

    const selectedProvince = provincesJson.data.find(
      (province) => province.id === ProvinceID
    )
    if (!selectedProvince) {
      return showErrorToast('İl Seçili Değil.')
    }
    const selectedDistrict = selectedProvince.districts.find(
      (district) => district.id === SelectedCountryID
    )
    if (!selectedDistrict) {
      return showErrorToast('İlçe Seçili Değil.')
    }
    if (maxResults < 0) {
      return showErrorToast('İstenilen Sonuç Sayısı Sıfırdan Küçük Olamaz.')
    }

    const regionResponse = await getRegionData(
      ApiKey,
      selectedProvince.name,
      selectedDistrict.name
    )
    if (regionResponse instanceof CustomError) {
      return showErrorToast(regionResponse.message)
    }

    const selectedRegion = regionResponse[0]
    onMapCenterChange(selectedRegion.geometry.location)
    onMarkerChange({
      location: selectedRegion.geometry.location,
      radius: Radius,
    })

    if (!selectedRegion) {
      return showErrorToast('İstenilen Bölge Bulunamadı.')
    }

    const responsePlaces = await getNearbySearchData(
      ApiKey,
      selectedRegion.geometry.location,
      maxResults,
      IncludeTypes,
      Radius
    )

    if (responsePlaces instanceof CustomError) {
      return showErrorToast(responsePlaces.message)
    }
    return onPlacesChange(responsePlaces)
  }

  const districtsCallback = useCallback(() => {
    if (ProvinceID < 0) return []

    const selectedProvince = provincesJson.data.find(
      (province) => province.id === ProvinceID
    )

    if (!selectedProvince) return []

    return selectedProvince.districts.map((district) => ({
      id: district.id,
      name: district.name,
    }))
  }, [ProvinceID])

  return (
    <form
      onSubmit={filterSubmitHandler}
      className="w-full h-full flex flex-col gap-4"
    >
      <DrownDownAtom
        isReady
        title="İl"
        data={provincesJson.data}
        onChange={(e) => setProvinceID(Number.parseInt(e.target.value))}
      />

      <DrownDownAtom
        data={districtsCallback()}
        title="İlçe"
        isReady={ProvinceID > 0}
        onChange={(e) => setSelectedCountryID(Number.parseInt(e.target.value))}
      />
      <InputAtom
        title="Toplam Sonuç"
        type="number"
        value={maxResults.toString()}
        onChange={(value) => setMaxResults(Number.parseInt(value))}
      />
      <MultiSelectDropdownAtom
        title="Aranacak Kelime"
        options={placeTypes}
        onSelectedTags={(values) => {
          setIncludeTypes(values.map((value) => value.key))
        }}
      />

      <PrimaryButtonAtom title="Listele" type="submit" />
    </form>
  )
}
