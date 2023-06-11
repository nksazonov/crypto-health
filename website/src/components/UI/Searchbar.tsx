import React from "react";

interface Props {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  className?: string;
}

function Searchbar({ value, onChange, placeholder, className }: Props) {
  return (
    <input
      type="text"
      placeholder={placeholder || "Search..."}
      value={value}
      onChange={onChange}
      className={`h-16 w-96 border-blue border-4 p-4 text-xl text-blue outline-0 hover:bg-blue-light focus:bg-blue focus:text-white placeholder:text-blue focus:placeholder:text-white ${className || ''}`}
    />
  )
}

export default Searchbar;
