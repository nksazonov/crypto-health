interface Props {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
}

function DateTimeInput({ value, onChange, className }: Props) {
  return (
    <input
      type="datetime-local"
      min="1970-01-01T00:00"
      value={value}
      onChange={onChange}
      className={`border-blue border-4 p-4 text-xl text-blue outline-0 hover:bg-blue-light focus:bg-blue focus:text-white placeholder:text-blue focus:placeholder:text-white  ${className || ''}`}
    />
  )
}

export default DateTimeInput;
