export interface IButtonAtomProps {
  title: string
  type: 'submit' | 'reset' | 'button' | undefined
  disabled?: boolean | undefined
}

export default function PrimaryButtonAtom({
  title,
  type,
  disabled,
}: Readonly<IButtonAtomProps>) {
  return (
    <button
      disabled={disabled ?? false}
      type={type}
      className="px-4 py-2 bg-green-500 hover:bg-green-600 transition-all rounded-2xl cursor-pointer"
    >
      {title}
    </button>
  )
}
