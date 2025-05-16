'use client'
import { assets } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect, useRef, useContext } from 'react'
import ThemeToggle from './ThemeToggle'
import { ThemeContext } from '../context/ThemeContext'

const Navbar = () => {
  const sideMenuRef = useRef()
  const [isScroll, setIsScroll] = useState(false)
  const { theme } = useContext(ThemeContext) // 👈 ambil theme

  const openMenu = () => {
    sideMenuRef.current.style.transform = 'translateX(-16rem)'
  }

  const closeMenu = () => {
    sideMenuRef.current.style.transform = 'translateX(16rem)'
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 👇 pilih logo sesuai theme
  const logoSrc = theme === 'dark' ? assets.logo_dark : assets.logo
  const menuSrc = theme === 'dark' ? assets.menu_white : assets.menu_black
  const closeSrc = theme === 'dark' ? assets.close_white : assets.close_black
  const menuBgClass = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-rose-50 text-black'
  const arrowIcon = theme === 'dark' ? assets.arrow_icon_dark :assets.arrow_icon
  

  return (
    
    <nav className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 ${isScroll ? "bg-d/20 backdrop-blur-lg shadow-sm" : ''} `}>

      <Link href="/">
        <Image src={logoSrc} className='w-28 cursor-pointer mr-14' alt='Logo'/>
      </Link>

      <ul className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 p-4 ${isScroll ? "" : 'menuBgClass shadow-xl  '}`}>
          <li><a className='font-Ovo ' href="#home">Home</a></li>
          <li><a className='font-Ovo' href="#about">About Me</a></li>
          <li><a className='font-Ovo' href="#experiences">Experiences</a></li>
          <li><a className='font-Ovo' href="#skill">Skill</a></li>
          <li><a className='font-Ovo' href="#servise">Services</a></li>
          <li><a className='font-Ovo' href="#portofolio">Portofolio</a></li>
      </ul>

      <div className='flex items-center gap-4'>
        <ThemeToggle />
        <a href="#contact" className='hidden lg:flex items-center gap-3 px-10 py-2.5 border border-gray-500 rounded-full ml-4'>Contact <Image src={arrowIcon} className='w-3' alt='Contant' /></a>
        <button className='block md:hidden ml-3' onClick={openMenu}>
          <Image src={menuSrc} alt='' className='w-6'/>
        </button>
      </div>

      {/* Mobile Menu */}
      <ul ref={sideMenuRef} className={`flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen transition duration-500 ${menuBgClass}`}>

        <div className='absolute right-6 top-6' onClick={closeMenu}>
          <Image src={closeSrc} alt='' className='w-5 cursor-pointer' />
        </div>
        <li><a className='font-Ovo' onClick={closeMenu} href="#home">Home</a></li>
        <li><a className='font-Ovo' onClick={closeMenu} href="#about">About Me</a></li>
        <li><a className='font-Ovo' onClick={closeMenu} href="#experiences">Experiences</a></li>
        <li><a className='font-Ovo' onClick={closeMenu} href="#skill">Skill</a></li>
        <li><a className='font-Ovo' onClick={closeMenu} href="#servise">Services</a></li>
        <li><a className='font-Ovo' onClick={closeMenu} href="#portofolio">Portofolio</a></li>
        <li><a className='font-Ovo' onClick={closeMenu} href="#contact">Contact Me</a></li>
      </ul>
    </nav>
  )
}

export default Navbar