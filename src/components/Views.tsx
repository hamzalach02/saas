"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export const Views = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (count < 122) {
        setCount(prevCount => prevCount + 1);
      } else {
        clearInterval(timer);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [count]);

  return (
    <div className="bg-blue-600 text-white rounded-lg shadow-md py-3 px-4 border-[1px] border-blue-400">
      <div className='flex flex-col justify-center items-center'>
        <div className="flex items-center gap-2 mb-2">
          <Image src="/eye.png" alt="Eye icon" width={24} height={24} />
          <h2 className="text-lg font-semibold text-white">Profile Views</h2>
        </div>
        <motion.div
          className="flex items-baseline"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white">{count}</h1>
          <span className="text-sm text-blue-100 ml-1">viewed</span>
        </motion.div>
        <p className="text-xs text-blue-100 mt-2 text-center max-w-[180px]">
          Upgrade to appear first in search results!
        </p>
        <Link href="/upgrade" passHref>
          <button className="mt-3 bg-white text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-50 transition duration-300">
            Upgrade Now
          </button>
        </Link>
      </div>
    </div>
  );
};