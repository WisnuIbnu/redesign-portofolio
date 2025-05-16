import { assets, Tools, Skills } from '@/assets/assets'
import Image from 'next/image'
import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

const Skill = () => {

  const { theme } = useContext(ThemeContext)

  return (
    <div id='skill' className='w-full px-[12%] py-12 scroll-m-20'>
      <h4 className='text-center mb-2 text-lg font-Ovo'>Tools & Tech stack</h4>
      <h2 className='text-center text-5xl font-Ovo'>My Skills</h2>

      <p className='text-center max-x-2xl mx-auto text-lg mt-5 mb-12 font-Ovo'>
        I am a passionate web developer with a strong foundation in HTML, CSS, and JavaScript. I have experience working with various frameworks and libraries, including React, Next.js, and Tailwind CSS.
      </p>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="block">
          <h2 className="text-2xl font-bold uppercase italic text-primary text-start mb-3">tools 🛠️</h2>
          <div className="border border-red-200 rounded-lg p-5 md:p-7 flex flex-col gap-8 items-center shadow-lg">
            <div className="flex gap-1">
              <h3 className="text-2xl font-semibold ">Tools</h3>
            </div>
            <div className="flex items-center justify-center flex-wrap gap-3">

              {Tools.map(({ icon, name }, index) => {
              
              const cardHover = theme === 'dark' ? 'box-shadow-white hover:bg-slate-800' : 'box-shadow-black lightHover-background'
                return (
               <div
                key={index}
                className={`flex gap-0.5 border-[0.5px] border-gray-400 rounded-xl px-2 py-2 cursor-pointer  hover:-translate-y-2 duration-500 hover:shadow-lg ${cardHover}`}
              >
                <img src={icon} alt={name} className="w-8" />
                <span className="text-sm lg:text-lg font-semibold py-1 lg:py-0">{name}</span>
              </div>
            )})}


            </div>
          </div>
          <p className='text-justify sm:text-start max-x-2xl mx-auto text-lg mt-5 mb-12 font-Ovo px-5 sm:px-0'>
            Tools are devices or software used by developers to facilitate the process of developing, testing, deploying, or maintaining applications. Tools are not always part of the tech stack, but they support the application development workflow.
          </p>
        </div>

        <div className="block mt-0 lg:mt-10">
          <h2 className="text-2xl font-bold uppercase italic text-primary text-start mb-3">Tech stack ⚙️</h2>
          <div className="border border-red-200 rounded-lg p-5 md:p-7 flex flex-col gap-8 items-center shadow-lg">
            <div className="flex gap-1">
              <h3 className="text-2xl font-semibold ">Tech Stack</h3>
            </div>
            <div className="flex items-center justify-center flex-wrap gap-3">
            {Skills.map(({ icon, name }, index) => {
             
             const cardHover = theme === 'dark' ? 'box-shadow-white hover:bg-slate-800' : 'box-shadow-black lightHover-background'
             return (
              <div
                key={index}
                className={`flex gap-0.5 border-[0.5px] border-gray-400 rounded-xl px-2 py-2 cursor-pointer  hover:-translate-y-2 duration-500 hover:shadow-lg ${cardHover}`}
              >
                <img src={icon} alt={name} className="w-8" />
                <span className="text-sm lg:text-lg font-semibold py-1 lg:py-0">{name}</span>
              </div>
            )})}

            </div>
          </div>
          <p className='text-justify sm:text-start max-x-2xl mx-auto text-lg mt-5 mb-12 font-Ovo px-5 sm:px-0'>
              A tech stack is a collection of technologies, frameworks, programming languages, and libraries used to develop an application or system. It includes all layers of technology required to build and run an application.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Skill
