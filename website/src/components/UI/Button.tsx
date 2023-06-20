interface Props {
  text: string;
  negative?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

function Button({ text, negative, disabled, className, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || false}
      className={`border-4 rounded-2xl enabled:hover:text-white ${negative ? 'border-red enabled:hover:bg-red enabled:active:bg-red-dark enabled:active:border-red-dark text-red' : 'border-blue enabled:hover:bg-blue enabled:active:bg-blue-dark enabled:active:border-blue-dark text-blue'} disabled:opacity-50 disabled:cursor-not-allowed w-fit px-8 py-3 text-xl font-mono ${className || ''}`}
    >
      {text}
    </button>);
}

export default Button;
