'use client'
import React, { useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Navigation, Autoplay } from 'swiper/modules'
import { experienceData } from '@/assets/assets'
import Image from 'next/image'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'

const Experiences = () => {
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const [navigationReady, setNavigationReady] = useState(false)

  
  useEffect(() => {
    setNavigationReady(true)
  }, [])

  return (
    <div id="experiences" className="w-full px-[12%] py-12 scroll-m-20 ">
      <h4 className='text-center mb-2 text-lg font-Ovo'>Work, Organizational & Committee Experiences⌛</h4>
      <h2 className='text-center text-5xl font-Ovo mb-10'>Experiences</h2>

      <p className='text-center max-x-2xl mx-auto text-lg mt-5 mb-12 font-Ovo'>
        During my college years, I actively participated in various organizations and committees while also gaining valuable work experiences that broadened my horizons.
      </p>
      <div className="max-w-7xl mx-auto max-h-10/12">
        <div className="relative group rounded-full">
          {navigationReady && (
            <Swiper
              modules={[EffectCoverflow, Navigation, Autoplay]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              slidesPerView="auto"
              coverflowEffect={{
                rotate: 5,
                stretch: -30,
                depth: 100,
                modifier: 2,
                slideShadows: true,
              }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                // Pastikan tombol sudah di-assign ulang
                if (typeof swiper.params.navigation !== 'boolean') {
                  swiper.params.navigation.prevEl = prevRef.current
                  swiper.params.navigation.nextEl = nextRef.current
                }
              }}
              className="swiper-container px-12 h-10/12 rounded-2xl"
            >
              {experienceData && experienceData.length > 0 ? (
                experienceData.map((experience) => (
                  <SwiperSlide key={experience.id} className="max-w-xs md:max-w-md lg:max-w-xl">
                    <div className="rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl bg-white group-hover:scale-95 hover:scale-110 hover:!opacity-100">
                      <div className="relative h-48 bg-gradient-to-r flex items-center justify-center">
                        {experience.logo && (
                          <Image 
                            src={experience.logo} 
                            alt={experience.title}
                            width={300}
                            height={300}
                            className="object-contain p-4 mt-10"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-black">{experience.title}</h3>
                        <p className="text-lg font-semibold text-gray-700 mt-1">{experience.position}</p>
                        <p className="text-sm text-gray-500 mt-2">{experience.duration}</p>
                        <ul className="mt-4 space-y-2">
                          {experience.description.map((item, idx) => (
                            <li key={idx} className="text-gray-600 text-sm flex items-start">
                              <span className="text-gray-700 mr-2">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                <p className="text-center text-gray-500">No experience data available.</p>
              )}
            </Swiper>
          )}

          {/* Navigasi Prev dan Next */}
          <div className="flex justify-center mt-9">
            <div className="navigasi flex justify-center items-center gap-4 max-w-[200px]">
              <div ref={prevRef} className="swiper-button-prev p-6 !static !h-12 !w-12 sm:!h-14 sm:!w-14 rounded-full bg-white/80 hover:bg-white border-2 border-gray-300 hover:border-gray-400 shadow-lg transition-all duration-300 flex items-center justify-center after:!text-xl after:!text-gray-700 after:!font-bold hover:scale-105 hover:shadow-xl active:scale-95"></div>
              <div ref={nextRef} className="swiper-button-next p-6 !static !h-12 !w-12 sm:!h-14 sm:!w-14 rounded-full bg-white/80 hover:bg-white border-2 border-gray-300 hover:border-gray-400 shadow-lg transition-all duration-300 flex items-center justify-center after:!text-xl after:!text-gray-700 after:!font-bold hover:scale-105 hover:shadow-xl active:scale-95"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Experiences
