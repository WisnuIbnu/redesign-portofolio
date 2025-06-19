'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp, faLine } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { motion } from 'framer-motion'

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 1, type: 'spring' }
  })
}

const Contact = () => {

  const socialMedia = [
    { name: 'WhatsApp', icon: faWhatsapp, account: 'Wisnu Ibnu', color: '#0ebe31', link: 'https://api.whatsapp.com/send/?phone=6285893953426&text=Halo%2C%20saya%20tertarik%20untuk%20berbicara%20lebih%20lanjut%21', massage: 'Send Me A Massage' },
    { name: 'Email', icon: faEnvelope, account: 'wisnuiben21@gmail.com', color: '#a7061e', link: 'https://mail.google.com/mail/u/0/?fs=1&to=wisnuiben21@gmail.com&su=Your%20Subject&body=Your%20Messages&tf=cm', massage: 'Send Me A Massage' },
    { name: 'Line', icon: faLine, account: 'Wisnu Ibnu', color: '#0ebe31', link: 'https://line.me/R/ti/p/wisnuibnu21?text=Halo%2C%20saya%20tertarik%20untuk%20berbicara%20lebih%20lanjut%21', massage: 'Send Me A Massage' },
  ];

  const { theme } = useContext(ThemeContext)

  return (
    <div id='contact' className='w-full px-[12%] py-12 scroll-m-20 '>
      <h4 className='text-center mb-2 text-lg font-Ovo'>Contact</h4>
      <h2 className='text-center text-5xl font-Ovo'>My Contact</h2>

      <p className='text-center max-x-2xl mx-auto text-lg mt-5 mb-12 font-Ovo'>
        I am always open to discussing new projects, creative ideas or opportunities to be part of your visions.
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 my-3'>
        {socialMedia.map(({ name, icon, color, link, account, massage }, index) => {
          const cardHover = theme === 'dark' ? 'box-shadow-white hover:bg-slate-800' : 'box-shadow-black lightHover-background'

          return (
            <motion.div
              className={`border border-gray-400 rounded-lg py-6 px-5 lg:px-10 cursor-pointer hover:-translate-y-2 duration-500 hover:shadow-lg ${cardHover}`}
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="flex items-center gap-3 gap-y-3">
                <a href={link}><FontAwesomeIcon icon={icon} style={{ color: color }} className="text-6xl" /></a>
                <div className="block gap-y-3">
                  <a href={link}><h2 className="font-bold text-xl">{name}</h2></a>
                  <a href={link}><p className="text-md">{account}</p></a>
                  <a href={link} target="_blank" className="text-blue-500 font-semibold" rel="noopener noreferrer">{massage}</a>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default Contact
