import { useEffect, useState, type HTMLInputAutoCompleteAttribute } from 'react'

export interface IInputAtomProps {
  title: string
  type: HTMLInputAutoCompleteAttribute
  onChange: (text: string) => void
  value: string
}

export default function InputAtom({
  onChange,
  title,
  type,
  value,
}: Readonly<IInputAtomProps>) {
  const [Input, setInput] = useState(value)

  useEffect(() => {
    onChange(Input)
  }, [Input])

  return (
    <label htmlFor="maxResults" className="grid grid-cols-4 gap-2">
      <h4 className="col-span-1">{title}</h4>
      <input
        min={1}
        max={50}
        className="col-span-3"
        type={type}
        name={title}
        id={title}
        value={Input}
        onChange={(e) => {
          setInput(e.target.value)
        }}
      />
    </label>
  )
}
