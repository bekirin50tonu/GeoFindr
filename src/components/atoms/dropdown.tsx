import type { ChangeEvent } from 'react'

export interface IDropDownProps {
  title: string
  onChange: (value: ChangeEvent<HTMLSelectElement>) => void

  isReady: boolean

  data: Array<{ id: number; name: string }>
}

export default function DrownDownAtom({
  title,
  onChange,
  isReady,
  data,
}: Readonly<IDropDownProps>) {
  return (
    <label htmlFor={title} className="grid grid-cols-4 gap-2">
      <h4 className="col-span-1">{title}</h4>
      <select
        name={title}
        id={title}
        onChange={onChange}
        className="w-full col-span-3 bg-gray-700 text-white"
      >
        {isReady && data.length > 0 ? (
          data.map((key, index) => {
            return (
              <option key={`title-${index}`} value={key.id}>
                {key.name}
              </option>
            )
          })
        ) : (
          <option disabled value={-1}>
            Seçiniz...
          </option>
        )}
      </select>
    </label>
  )
}
