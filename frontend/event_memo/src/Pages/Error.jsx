import React from 'react'
import { useRouteError } from 'react-router-dom';

const Error = () => {
  const geterror = useRouteError();
    console.log(geterror);
  return (
    <main className='grid place-items-center px-6 '>
      <h4 className='text-center font-bold text-4xl'>there was an error... </h4>
    </main>
  )
}

export default Error