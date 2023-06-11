interface Props {
  text: string;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

function Button({ text, disabled, className, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || false}
      className={`border-blue border-4 rounded-2xl enabled:hover:bg-blue enabled:hover:text-white enabled:active:bg-blue-dark enabled:active:border-blue-dark disabled:opacity-50 disabled:cursor-not-allowed w-fit text-blue px-8 py-3 text-xl font-mono ${className || ''}`}
    >
      {text}
    </button>);
}

export default Button;
