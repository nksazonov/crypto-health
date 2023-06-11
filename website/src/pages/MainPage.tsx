import React from 'react';
import HighlightedText from '../components/UI/HighlightedText';
import Button from '../components/UI/Button';

function MainPage() {
  return (
    <div className='flex flex-col w-full items-center justify-center h-5/6 bg-blue-light'>
      <HighlightedText text="Connect Wallet" className='bg-blue mb-6 py-6' />
      <span className='text-3xl font-medium text-blue mb-32'>to continue as a Patient, Doctor or Admin</span>
      <Button text="Connect Wallet" />
    </div>
  );
}

export default MainPage;
