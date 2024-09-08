import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export interface developerCard{
    name:string,
    email:String,
    profile:string,
    avatar:string,
    userId:string,
    userBio:string,
    experience:string,
    stars:number,
    views:number,
    location:string,
    school:string,
    work:string,

}
export const DeveloperCard = (developerCard : developerCard) => {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };
  return (
   
    <div className="bg-white rounded-lg shadow-md p-4 ">
     <div className='flex gap-2'>
      <Image src={developerCard.avatar? developerCard.avatar :'/images/default.png'} alt='' height={60} width={80} className='rounded-full'/>
      <div className='flex flex-col'>
        <Link href={`/portfolio/`+developerCard.userId} className='text-lg font-bold hover:underline'>{developerCard.name}</Link>
        <span className='text-gray-400 text-sm'>{developerCard.email}</span>
        <div className='flex justify-start gap-2 mt-1 '>
          <h1 className='bg-red-100  p-1 rounded-lg text-red-400 font-bold'>{developerCard.profile}</h1>
          <span className='p-1 bg-green-200 rounded-lg text-green-600 font-medium'>{developerCard.experience}</span>
          <span className='p-1 bg-gray-200 rounded-lg text-gray-600 font-medium flex items-center gap-1'><Image src={'/eye.png'} alt='' height={8} width={20} className='rounded-full '/>{developerCard.views}</span>
       </div>
      </div>

     </div>
   
     
     <p className='text-sm text-gray-700 mb-2 mt-4'>
     {truncateText(developerCard.userBio, 100)} 
     </p>
    
     <div className='flex justify-between mt-2'>
     <span className='p-1 text-lg flex items-center font-bold'>{developerCard.stars}<span className='text-xs text-gray-500 mt-1'>/5</span><Image src={'/star.svg'} alt='' height={8} width={20} className='rounded-full opacity-50'/></span>
     <Link href={`/portfolio/`+developerCard.userId} className="font-medium text-sm text-white px-4 py-2 bg-darker-blue rounded-md hover:bg-opacity-70 hover:shadow-lg flex gap-1 justify-center">
           
           <span>see more </span>
           <Image src="/arrow.png" alt="" height={20} width={20} />
         
    </Link>

     </div>
    </div>
    
  )
}
