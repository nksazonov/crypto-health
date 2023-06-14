import React from "react";

interface Props {
  value: string | number;
  type? : string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  className?: string;
}

function Input({ value, type, onChange, placeholder, className }: Props) {
  return (
    <input
      type={type || "text"}
      placeholder={placeholder || "Search..."}
      value={value}
      onChange={onChange}
      className={`h-16 w-96 border-blue border-4 p-4 text-xl text-blue outline-0 hover:bg-blue-light focus:bg-blue focus:text-white placeholder:text-blue-medium focus:placeholder:text-blue-medium ${className || ''}`}
    />
  )
}

export default Input;
