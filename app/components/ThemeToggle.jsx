// ThemeToggle.js
'use client'

import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

const ThemeToggle = () => {
  const { toggle, theme } = useContext(ThemeContext)

  return (
    <button onClick={toggle}>
      {theme === 'light' ? (
        <Image src={assets.moon_icon} alt='dark' className='w-6' />
      ) : (
        <Image src={assets.sun_icon} alt='light' className='w-6' />
      )}
    </button>
  )
}

export default ThemeToggle
