import React from 'react'

const InfoCard = ({item}) => {
  return (
    <div className='bg-gray-200 p-4 rounded-lg text-gray-600 shadow-md'>
      <p className='mb-2 capitalize font-semibold text-sm'>{item[0].split("_").join(" ")}</p>
      <h1 className='text-lg font-bold text-gray-700'>{item[1]}</h1>
    </div>
  )
}

export default InfoCard