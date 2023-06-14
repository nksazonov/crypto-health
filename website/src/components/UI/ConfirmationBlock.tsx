import Button from "./Button";

interface Props {
  heading: string,
  onConfirmClick: () => void,
  onCancelClick: () => void,
  confirmButtonText?: string,
  cancelButtonText?: string,
  className?: string,
}

function ConfirmationBlock({ heading, onConfirmClick, onCancelClick, confirmButtonText, cancelButtonText, className }: Props) {
  return (
    <div className={`bg-blue-light px-14 py-10 max-w-[25vw] ${className || ''}`}>
      <h2 className="mb-16 text-4xl text-center leading-relaxed">{heading}</h2>


      <div className="flex w-full justify-between">
        <Button text={confirmButtonText || 'Confirm'} onClick={() => onConfirmClick()} />
        <Button text={cancelButtonText || 'Cancel'} onClick={onCancelClick} negative />
      </div>

    </div>
  )
}

export default ConfirmationBlock;
