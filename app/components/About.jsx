import { assets, infoList, toolsData } from '@/assets/assets'
import Image from 'next/image'
import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'


const About = () => {

  const { theme } = useContext(ThemeContext)

  return (
    <div id='about' className='w-full px-[12%] py-12 scroll-m-20 '>
      <h4 className='text-center mb-2 text-lg font-Ovo'>Introduction</h4>
      <h2 className='text-center text-5xl font-Ovo'>About Me</h2>

      <div className='flex w-full flex-col lg:flex-row items-center content-center justify-between gap-10 mt-10'>
        <div class="mb-10">
          <div class="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-primary/30 rounded-3xl">
            <div class="h-96 w-72">
              <Image class="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125" src={assets.user_image} alt="" />
            </div>
            <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary group-hover:from-primary/70 group-hover:via-primary/60 group-hover:to-primary/70">
            </div>
            <div class="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0 group-active:translate-y-0">
              <h1 class="font-dm text-3xl font-bold text-white">Wisnu Ibnu Muttaqiem</h1>
              <p class="mb-3 text-2xl italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100">Student At University Brawijaya | Front - End Developer.</p>
              <button class="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60">See More</button>
            </div>
          </div>
        </div>
 
        <div className='flex-1'>
          <p className='text-justify text-lg font-Ovo mb-10 max-w-2xl'>
            Bachelor of Computer Science Education student at the Faculty of Computer Science, Brawijaya University, with a keen interest in programming, web development, and related disciplines. My academic journey has provided me with a solid foundation in both education and computer science.
          </p>

          <ul className='grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl'>
            {infoList.map(({ icon, iconDark, title, description }, index) => {
              const logoSrc = theme === 'dark' ? iconDark : icon
              const textH3 = theme === 'dark' ? '' : 'text-gray-700'
              const textP = theme === 'dark' ? '' : 'text-gray-600'
              const cardHover = theme === 'dark' ? 'box-shadow-white hover:bg-slate-800' : 'box-shadow-black lightHover-background'
              return (
                <li
                  key={index}
                  className={`border-[0.5px] border-gray-400 rounded-xl p-6 cursor-pointer hover:-translate-y-2 duration-500 hover:shadow-lg ${cardHover}`}
                >
                  <Image src={logoSrc} alt={title} className='w-7 mt-3' width={28} height={28} />
                  <h3 className={`my-4 font-semibold ${textH3}`}>{title}</h3>
                  <p className={`text-sm ${textP}`}>{description}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default About
