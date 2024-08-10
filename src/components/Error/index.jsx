import React from 'react'
import { IoWarning } from 'react-icons/io5'

const Error = ({info , retry}) => {
  return (
    <div className='col-span-3 w-full flex flex-col gap-6 md:min-w-[500px]'>
     <div className='bg-red-500 p-5 rounded-md text-white flex items-center gap-4'> 
        <IoWarning className=' text-4xl'/>
        <div>
          <h2>Üzgünüm, bir şeyler yanlış gitti... :( </h2>
          <p>{info}</p>
        </div>
     </div>

        <button className='border border-gray-400 shadow-md rounded-md p-2 transition text-gray-600  hover:bg-gray-200' onClick={retry}>Tekrar Deneyin</button>
    </div>
  )
}

export default Error