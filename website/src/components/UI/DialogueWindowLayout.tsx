interface Props {
  children?: React.ReactNode;
}

function DialogueWindowLayout({ children }: Props) {
  return (
    <div className="w-screen h-screen absolute top-0 left-0 bg-slate-500/50 flex items-center justify-center">
      {children}
    </div>
  )
}

export default DialogueWindowLayout;
