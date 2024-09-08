import Image from 'next/image'
import React from 'react'
import { developerCard } from './DeveloperCard'
import Link from 'next/link'

export const MyCard = (developerCard : developerCard) => {
  return (
    <div className="bg-white rounded-lg shadow-md py-4 px-6 border-[1px] border-gray-400 ">
    <div className='flex gap-2 justify-center flex-col items-center '>
     <Image src={developerCard.avatar? developerCard.avatar :'/images/default.png'} alt='' height={60} width={80} className='rounded-full'/>
    

    </div>
    <div className='flex flex-col justify-center items-center mt-2'>
       <Link href={`/portfolio/`+developerCard.userId} className='text-lg font-bold hover:underline'>{developerCard.name}</Link>
       <span className='text-gray-400 text-sm'>{developerCard.email}</span>
       <div className='flex justify-start gap-2 mt-1 '>
          <h1 className='bg-red-100  p-1 rounded-lg text-red-400 font-bold'>{developerCard.profile}</h1>
          <span className='p-1 bg-green-200 rounded-lg text-green-600 font-medium'>{developerCard.experience}</span>
          <span className='p-1 bg-gray-200 rounded-lg text-gray-600 font-medium flex items-center gap-1'><Image src={'/eye.png'} alt='' height={8} width={20} className='rounded-full opacity-50'/>{developerCard.views}</span>
       </div>
       <div className='flex flex-col self-start gap-2 mt-4'>
      
      
      <div className="flex items-center gap-2">
          <Image src="/map.png" alt="" width={16} height={16} />
          <span>Living in <b>{developerCard.location}</b></span>
      </div>
     
        <div className="flex items-center gap-2">
            <Image src="/school.png" alt="" width={16} height={16}/>
            <span>went to <b>{developerCard.school}</b></span>
        </div>

        <div className="flex items-center gap-2">
            <Image src="/work.png" alt="" width={16} height={16}/>
            <span>Works at <b>{developerCard.work}</b></span>
        </div>

        





       </div>

       <Link href={`/settings`} className="mt-4 w-full font-medium text-sm text-white px-4 py-2 bg-darker-blue rounded-md hover:bg-opacity-70 hover:shadow-lg flex gap-2 justify-center">
           
           <span>Edit</span>
           <Image src="/Edit.png" alt="" height={20} width={20} />
         
    </Link>
     
     </div>

  
    
    
   
   
   </div>
  )
}
