import Link from 'next/link'
import React from 'react'

export const Add = () => {
  return (
    <div className="bg-darker-blue text-white rounded-lg shadow-md py-4 px-6 border-[1px] border-gray-400 ">
    
    <div className='flex flex-col justify-center icentertems- mt-2'>
       
       <h1 className="text-2xl font-bold">Premium</h1>
       <div className="flex gap-1 items-center"> 
    
            <h1 className="text-[60px] font-semibold">9$</h1> 
            <span className="text-dm text-gray-300 mt-6">/month</span>
            
     </div>

     <p className="text-gray-200 text-md max-w-[200px] lg:text-sm">Unlock more features  and customization to elevate
     your portfolio.</p>
     

       <button className="border-[2px] mt-4 bg-white text-gray-900 border-gray-400 hover:bg-slate-200 flex  justify-center px-4 py-4 rounded-lg  font-bold">Get Started</button>
     </div>
   </div>

  )
}
