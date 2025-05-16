'use client'
import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

const Footer = () => {

  const { theme } = useContext(ThemeContext)

  const iconMail = theme === 'dark' ? assets.mail_icon_dark : assets.mail_icon 
  const logoSrc = theme === 'dark' ? assets.logo_dark : assets.logo
  
  return (
    <div className=''>
      <div className='text-center'>
        <Image
          src={logoSrc}
          alt='logo'
          className='w-36 mx-auto mb-2'/>

          <div className='w-max flex items-center mx-auto gap-2'>
            <Image src={iconMail} alt='logo' className='w-6'/>
            wisnuiben21@gmail.com
          </div> 
      </div>

      <div className='text-center sm:flex items-center justify-between border-t border-gray-400 mx-[10%] mt-10 py-6'>
        <p>@ 2025 Wisnu Ibnu. All right reserved.</p>
        <ul className='flex gap-10 mt-4 items-center justify-center sm:mt-0'>
          <li><a target='_blank' href="www.google.com"></a>Github</li>
          <li><a target='_blank' href="www.google.com"></a>LinkedIn</li>
          <li><a target='_blank' href="www.google.com"></a>X</li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
