interface Props {
  selectedId: number;
  values: string[];
  keys: number[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

function RadioGroup({ selectedId, values, keys, onChange, className }: Props) {
  return (
    <div className={`flex flex-col gap-20 ${className || ''}`}>
      {values.map((value, index) => (
        <div key={index}>
          <input
            type="radio"
            id={keys[index].toString()}
            name="radio-group"
            value={keys[index]}
            checked={selectedId === keys[index]}
            onChange={onChange}
            className="hidden peer"
          />
          <label
            htmlFor={keys[index].toString()}
            className="border-4 border-blue rounded-xl px-16 py-3 cursor-pointer text-blue hover:bg-blue-medium peer-checked:bg-blue peer-checked:text-white text-3xl"
          >
            {value}
          </label>
        </div>
      ))}
    </div>
  )
}

export default RadioGroup;
