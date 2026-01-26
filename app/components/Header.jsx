import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { motion } from 'framer-motion'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 1, ease: 'easeOut' }
  })
}

const Header = () => {
  const { theme } = useContext(ThemeContext)
  const downloadIcon = theme === 'dark' ? assets.download_icon_dark : assets.download_icon

  return (
    <motion.div
      id='home'
      className='w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4'
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      custom={0}
    >
      <motion.div variants={fadeInUp} custom={1}>
        <Image src={assets.profile_img} alt='' className='rounded-full w-32' />
      </motion.div>
      <motion.h3 className='flex items-end gap-2 text-xl md:text-2xl font-Ovo' variants={fadeInUp} custom={2}>
        Hi! I'm Wisnu Ibnu <Image src={assets.hand_icon} alt='' className='w-6' />
      </motion.h3>
      <motion.h1 className='text-3xl md:text-6xl lg:text-[66px] font-Ovo' variants={fadeInUp} custom={3}>
        A Full Stack Developer Based in Indonesia
      </motion.h1>
      <motion.p className='max-w-2xl mx-auto font-Ovo' variants={fadeInUp} custom={4}>
        I am a Full Stack developer with a passion for creating beautiful and functional web applications.
      </motion.p>
      <motion.div className='flex flex-col sm:flex-row items-center gap-4 mt-4' variants={fadeInUp} custom={5}>
        <a
          href="#contact"
          className='px-10 py-3 border rounded-full bg-black  text-white flex items-center gap-2'
        >
          Contact me <Image src={assets.right_arrow_white} alt='' className='w-4' />
        </a>
        <a
          href="/cv-wisnu.pdf"
          download
          className='px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2'
        >
          My Resume <Image src={downloadIcon} alt='' className='w-4' />
        </a>
      </motion.div>
    </motion.div>
  )
}

export default Header
