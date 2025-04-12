import { showErrorToast } from '@/utils/helpers/toastify'
import { useEffect, useRef, useState } from 'react'

interface TagInputProps {
  title: string
  options: Array<{ key: string; value: string }> // Liste olarak gelecek string array
  onSelectedTags: (values: Array<{ key: string; value: string }>) => void
}

export const MultiSelectDropdownAtom: React.FC<TagInputProps> = ({
  options,
  onSelectedTags,
  title,
}) => {
  const dropdownRef = useRef<HTMLUListElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [selectedTags, setSelectedTags] = useState<
    { key: string; value: string }[]
  >([])
  const [query, setQuery] = useState('') // Input içinde yazılan
  const [filteredOptions, setFilteredOptions] =
    useState<Array<{ key: string; value: string }>>(options)
  const [isFocused, setIsFocused] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    setFilteredOptions(
      options.filter((opt) => {
        const isAlreadySelected = selectedTags.some(
          (tag) => tag.key === opt.key
        )
        if (value) {
          return (
            opt.value.toLowerCase().includes(value.toLowerCase()) &&
            !isAlreadySelected
          )
        }
        return !isAlreadySelected
      })
    )
  }

  const addTag = (tag: { key: string; value: string }) => {
    if (selectedTags.length > 49) {
      return showErrorToast("İçeren Tip Sayısı 50'den Fazla Olamaz.")
    }
    if (!selectedTags.some((t) => t.key === tag.key)) {
      setSelectedTags([...selectedTags, tag])
      setFilteredOptions((prev) => prev.filter((opt) => opt.key !== tag.key))
    }
    setQuery('')
  }

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t.key !== tag))
    setFilteredOptions(
      options.filter(
        (opt) => !selectedTags.some((t) => t.key === opt.key) || opt.key === tag
      )
    )
  }

  useEffect(() => {
    onSelectedTags(selectedTags)
  }, [selectedTags])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        !(target instanceof HTMLInputElement) &&
        !dropdownRef.current?.contains(target)
      ) {
        setIsFocused(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <label htmlFor={`${title}`} className="grid grid-cols-4 gap-2">
      <h4 className="col-span-1">{title}</h4>
      <div
        className="relative w-full max-w-md col-span-3"
        onFocus={() => setIsFocused(true)}
        ref={containerRef}
      >
        {/* Seçilen Etiketler */}
        <div className="flex flex-wrap gap-2 p-2 border rounded-lg flex-row w-full">
          {selectedTags.map((tag) => (
            <span
              key={tag.key}
              className="flex items-center bg-blue-500 text-white px-2 py-1 rounded-full text-sm"
            >
              {tag.value}
              <button
                onClick={() => removeTag(tag.key)}
                className="ml-2 text-white hover:text-gray-200 focus:outline-none"
              >
                ✕
              </button>
            </span>
          ))}

          {/* Input Alanı */}
          <input
            name={`${title}`}
            id={`${title}`}
            type="text"
            value={query}
            onChange={handleInputChange}
            className="flex-1 p-1 outline-none"
            placeholder="Etiket ekleyin..."
          />
        </div>

        {/* Dropdown Menü */}
        {(isFocused || query) && filteredOptions.length > 0 && (
          <ul
            ref={dropdownRef}
            className="absolute left-0 w-full mt-1 bg-gray-700 text-white border rounded-lg shadow-md max-h-40 overflow-y-auto "
          >
            {filteredOptions.map((opt) => (
              <li
                key={opt.key}
                onClick={() => addTag(opt)}
                className="p-2 cursor-pointer hover:bg-gray-900"
              >
                {opt.value}
              </li>
            ))}
          </ul>
        )}
      </div>
    </label>
  )
}
