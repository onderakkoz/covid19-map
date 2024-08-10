import React from 'react'
import { FaVirusCovid } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import Form from './Form'
import { TbVaccine } from 'react-icons/tb'

const Header = () => {
  return (
    <header className='flex bg-zinc-900 text-white p-5 md:px-20 justify-between items-center'>
        <Link className='flex items-center gap-2' to="/">
        <FaVirusCovid className='text-red-500 text-xl'/>
        <h1>COVID-19 Haritası</h1>
        </Link>

        <Form/>

        <div className='flex items-center max-md:hidden'>
            <p>
                <span className='flex flex-col text-sm'>Bugün Aşılanan Kişi Sayısı</span>
                <span className='text-gray-400 text-sm'>({Math.floor(Math.random() * (60000 - 10000 + 1)) + 10000})</span>
            </p>
            <TbVaccine className='text-green-500 text-xl'/>
        </div>
    </header>     
    
  )
}

export default Header