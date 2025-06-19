import { assets, infoList, toolsData } from '@/assets/assets'
import Image from 'next/image'
import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { motion } from 'framer-motion'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } }
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
}

const About = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <div id='about' className='w-full px-[12%] py-12 scroll-m-20 '>
      <motion.h4
        className='text-center mb-2 text-lg font-Ovo'
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        Introduction
      </motion.h4>
      <motion.h2
        className='text-center text-5xl font-Ovo'
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        About Me
      </motion.h2>

      <div className='flex w-full flex-col lg:flex-row items-center content-center justify-between gap-10 mt-10'>
        <motion.div
          className="mb-10"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-primary/30 rounded-3xl">
            <div className="h-96 w-72">
              <Image className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125" src={assets.user_image} alt="" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary group-hover:from-primary/70 group-hover:via-primary/60 group-hover:to-primary/70">
            </div>
            <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0 group-active:translate-y-0">
              <h1 className="font-dm text-3xl font-bold text-white">Wisnu Ibnu Muttaqiem</h1>
              <p className="mb-3 text-2xl italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100">Student At University Brawijaya | Front - End Developer.</p>
              <button className="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60">See More</button>
            </div>
          </div>
        </motion.div>

        <motion.div
          className='flex-1'
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className='text-justify text-lg font-Ovo mb-10 max-w-2xl'>
            Student at the Faculty of Computer Science, Brawijaya University, with a keen interest in programming, web development, and related disciplines. My academic journey has provided me with a solid foundation in both education and computer science.
          </p>

          <motion.ul
            className='grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl'
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {infoList.map(({ icon, iconDark, title, description }, index) => {
              const logoSrc = theme === 'dark' ? iconDark : icon
              const textH3 = theme === 'dark' ? '' : 'text-gray-700'
              const textP = theme === 'dark' ? '' : 'text-gray-600'
              const cardHover = theme === 'dark' ? 'box-shadow-white hover:bg-slate-800' : 'box-shadow-black lightHover-background'
              return (
                <motion.li
                  key={index}
                  className={`border-[0.5px] border-gray-400 rounded-xl p-6 cursor-pointer hover:-translate-y-2 duration-500 hover:shadow-lg ${cardHover}`}
                  variants={fadeInUp}
                >
                  <Image src={logoSrc} alt={title} className='w-7 mt-3' width={28} height={28} />
                  <h3 className={`my-4 font-semibold ${textH3}`}>{title}</h3>
                  <p className={`text-sm ${textP}`}>{description}</p>
                </motion.li>
              )
            })}
          </motion.ul>
        </motion.div>
      </div>
    </div>
  )
}

export default About
