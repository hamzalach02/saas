

import { FaDatabase, FaCogs } from 'react-icons/fa';
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function Page() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (user){
  return (
    <div className="flex flex-col items-center gap-12 mt-16 px-4 min-h-screen">
      <h1 className="text-[40px] font-bold text-center">Choose the Type of Project You Want to Create</h1>
      
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-[80%]">
        {/* Simple CRUD Project */}
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
         
          <FaDatabase className="text-5xl text-blue-500 mb-4" />
          
          <h2 className="text-xl font-semibold text-center">Simple CRUD Project</h2>
         
          <p className="text-gray-600 mt-4 text-center">
          Customize your project with tailored services and features. 
          </p>
          
          
          <Link href='/simple' className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md font-bold hover:bg-green-600">
          Generate Project
          </Link>
        </div>

        
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
          <FaCogs className="text-5xl text-green-500 mb-4" />
          <h2 className="text-xl font-semibold text-center">Customize Your Project</h2>
          <p className="text-gray-600 mt-4 text-center">
          Customize your project with the desired dependencies.
          </p>

          <Link href='/GenerateSpring' className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md font-bold hover:bg-green-600">
          Generate Project
          </Link>
        </div>

      </div>
    </div>
  );}
  else{
    redirect('/login');
  }
}
