interface Props {
  selectedOptionId: number;
  keys: number[]
  options: string[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  className?: string;
}

function Select({ selectedOptionId, keys, options, onChange, className }: Props) {
  return (
    <select name="" id="" className={`border-blue border-4 p-4 text-xl text-blue outline-0 hover:bg-blue-light focus:bg-blue focus:text-white placeholder:text-blue focus:placeholder:text-white  ${className || ''}`} onChange={onChange}>
      {options.map((option, index) => (
        <option key={keys[index]} value={keys[index]} selected={selectedOptionId === keys[index]}>
          {option}
        </option>
      ))}
    </select>
  )
}

export default Select;
