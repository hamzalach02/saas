"use client"
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion';
import Link from 'next/link';

export const Hero = () => {
  return (
    <div className="flex flex-col gap-6 px-4 md:px-8 lg:px-16">
      <motion.div 
        className="flex flex-col md:flex-row gap-4 items-center mt-8 md:mt-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.div 
          className="flex flex-col gap-2 md:gap-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h1 className='text-[32px] md:text-[40px] lg:text-[60px] font-bold text-center md:text-left'>
            <span className='text-green-500'>Simplify </span>
            Your Development Process
          </h1>
          <h1 className='text-[24px] md:text-[30px] lg:text-[40px] font-bold text-center md:text-left'>
            with Automated Project Generation
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className='mt-4 md:mt-0 hidden md:block'
        >
          <Image src='/spring.png' alt='' height={50} width={100} />
        </motion.div>
      </motion.div>
      <motion.span 
        className='text-center text-base md:text-xl font-medium text-gray-600'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
      >
        Generate fully-configured Spring Boot projects with just a few clicks, saving you hours of setup time.
      </motion.span>
      <Link 
        className='bg-green-500 flex justify-center text-white items-center font-bold text-lg md:text-2xl px-6 md:px-8 py-3 md:py-4 rounded-md w-full md:w-96 self-center shadow-md hover:shadow-xl hover:bg-green-600'  
        href='/choose'
      >
        Get Started
      </Link>
    </div>
  )
}
