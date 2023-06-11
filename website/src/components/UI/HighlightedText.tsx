import React from 'react';

interface Props {
  text: string;
  className?: string;
}


function HighlightedText({ text, className }: Props) {
  return (
    <div className={`bg-blue w-fit text-white px-8 py-3 text-3xl font-mono ${className || ''}`}>
      {text}
    </div>
  );
}

export default HighlightedText;
