import { assets, serviceData } from '@/assets/assets'
import Image from 'next/image'
import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

const Services = () => {

  

  return (
    <div id='servise' className='w-full px-[12%] py-12 scroll-m-20 '>
      <h4 className='text-center mb-2 text-lg font-Ovo'>What I Offer</h4>
      <h2 className='text-center text-5xl font-Ovo'>My Services</h2>

      <p className='text-center max-x-2xl mx-auto text-lg mt-5 mb-12 font-Ovo'>
        I am a Front-end developer with a passion for creating beautiful and functional web applications. I specialize in building responsive and user-friendly interfaces using the latest technologies.
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-4 gap-5 my-10'>
          {serviceData.map(({icon,title,description,link}, index) => {
           const { theme } = useContext(ThemeContext)
           
           const cardHover = theme === 'dark' ? 'box-shadow-white hover:bg-slate-800' : 'box-shadow-black lightHover-background'
           const textColor = theme === 'dark' ? 'text-white' : 'text-gray-700'
           const desColor = theme === 'dark' ? 'text-white' : 'text-gray-600'
           const iconRight = theme === 'dark' ? assets.right_arrow_white : assets.right_arrow
            return (
            <div
             className={`border border-gray-400 rounded-lg px-8 py-12 cursor-pointer hover:-translate-y-2 duration-500 hover:shadow-lg ${cardHover}`} 
             key={index}>
               <Image src={icon}  alt='title' className='w-10'/>
                <h3 className={`my-4 text-lg  ${textColor}`}>{title}</h3>
                <p className={`text-sm leading-5 ${desColor}`}>
                  {description}
                </p>
                <a href={link} className='flex items-center gap-2 mt-5 text-sm font-Ovo'>
                  Read More <Image src={iconRight} className='w-10' alt=''/>
                </a>
             </div>
          )})}
      </div>
    </div>
  )
}

export default Services