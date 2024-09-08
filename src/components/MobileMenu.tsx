"use client"

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from 'next/link';
import React, { useState } from 'react'
import { FaHome, FaSignInAlt, FaUserPlus } from 'react-icons/fa';


export const MobileMenu = () => {
    const { data: session } = useSession();
    const user = session?.user;
    const [isOpen,setIsOpen] = useState(false);
  return (
    <div className='lg:hidden'>
        <div className="flex flex-col gap-[4.5px] cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
        >
            <div className = {`w-6 h-1 bg-gray-300 rounded-sm ${isOpen ?"rotate-45":"" } origin-left ease-in-out duration-500`} ></div>
            <div className = {`w-6 h-1 bg-gray-300 rounded-sm ${isOpen ?"opacity-0":"" } ease-in-out duration-500`} ></div>
            <div className = {`w-6 h-1 bg-gray-300 rounded-sm ${isOpen ?"-rotate-45":"" } origin-left ease-in-out duration-500`} ></div>
        </div>
        {
            isOpen &&
            <div className="absolute left-0 top-24 w-full 
             bg-green-200 flex flex-col items-center justify-center gap-8 font-medium text-xl z-10 p-2">
                {user && (<button className="cursor-pointer flex items-center justify-center p-2 gap-1 bg-gray-200 rounded-full hover:bg-gray-300 hover:shadow-lg" onClick={() => {signOut(),setIsOpen((prev) => !prev)}}>
                  <span>Logout</span>
                  <Image src="/Logout.png" alt="" height={24} width={24} />
                  </button> )}

              { !user && <> 
                <Link 
                  onClick={() => setIsOpen((prev) => !prev)} 
                  href="/" 
                  className="flex items-center text-green-600 hover:text-green-700 underline hover:no-underline transition-all duration-300 ease-in-out px-4 py-2 rounded-md"
                >
                  <FaHome className="mr-2" /> Home
                </Link>

                <Link 
                  onClick={() => setIsOpen((prev) => !prev)} 
                  href="/login" 
                  className="flex items-center text-green-600 hover:text-green-700 underline hover:no-underline transition-all duration-300 ease-in-out px-4 py-2 rounded-md"
                >
                  <FaSignInAlt className="mr-2" /> Login
                </Link>

                <Link 
                  onClick={() => setIsOpen((prev) => !prev)} 
                  href="/register" 
                  className="flex items-center text-green-600 hover:text-green-700 underline hover:no-underline transition-all duration-300 ease-in-out px-4 py-2 rounded-md"
                >
                  <FaUserPlus className="mr-2" /> Register
                </Link>
                </>}
               
            </div>
        }
    </div>
  )
}
