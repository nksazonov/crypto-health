interface Props {
  text: string;
  className?: string;
  onClick?: () => void;
}

function Button({ text, className, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`border-blue border-4 rounded-2xl hover:bg-blue hover:text-white active:bg-blue-dark active:border-blue-dark w-fit text-blue px-8 py-3 text-xl font-mono ${className || ''}`}
    >
      {text}
    </button>);
}

export default Button;
