import React from 'react';

interface Props {
  text: string;
  address?: string;
  addressHref?: string;
}


function Header({ text, address, addressHref }: Props) {
  return (
    <div className="flex flex-row w-100 items-center justify-between px-36 py-12 bg-blue">
      <span className="text-4xl font-semibold font-['PT_Mono'] text-white">CryptoHealth</span>
      <div className='text-xl text-white'>
        <span>{text}</span>
        {address && addressHref && <span> (<a href={addressHref} target='blank' className='underline hover:text-blue-light'>{address}</a>)</span>}
      </div>
    </div>
  );
}

export default Header;
