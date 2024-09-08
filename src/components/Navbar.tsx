"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link"
import { MobileMenu } from "./MobileMenu"
import Image from "next/image"
import { usePathname } from "next/navigation";



export const Navbar = () => {

  const { data: session } = useSession();
  const user = session?.user;
 


  const pathname = usePathname();



  return (
    <div className="h-24 flex items-center justify-between ">
        {/* LEFT */}
        <div className="hidden xl:block w[20%]"> 
           <Link href="/" className="font-bold text-3xl text-gray-700">Easy<span className="text-green-500">2</span>Code</Link>
       </div> {/* CENTER */}
        <div className="flex w-[40%] text-sm items-center justify-center xl:ml-20">
            {/* Links */}
            <div className="w-full  flex text-gray-600">
       
            
                
            </div>
        </div>
        {/* RIGHT */}
        <div className="w-[40%] flex items-center gap-4 xl:gap-8 justify-end">

            
           {!user && (pathname !== '/login' ) && (pathname !== '/register' ) &&
            <div className="lg:flex gap-6 justify-center items-center hidden ">
             
             <Link href='/login' className="font-medium  rounded-md hover:underline">
             Sign in
             </Link>
            <Link href="/register" className="text-white bg-green-500 font-medium text-sm px-4 py-2  rounded-md hover:bg-opacity-70 hover:shadow-lg flex gap-1 justify-center">
           
            <span>Get Started </span>
            <Image src="/arrow.png" alt="" height={20} width={20} />
          
            </Link>
           
          
            </div>
            }
            {user &&
            <div className="hidden  md:flex gap-2">
            
            

              <div className="font-medium rounded-full hover:shadow-xl ">
               <Image
                    src={user.image ? user.image : "/images/default.png"}
                    className="h-10 w-10 rounded-full"
                    alt={`profile photo of ${user.name}`}
                    height={40}
                    width={40}
                  />
             </div>

             <button className="cursor-pointer flex items-center justify-center p-2 bg-gray-200 rounded-full hover:bg-gray-300 hover:shadow-lg" onClick={() => signOut()}>
               <Image src="/Logout.png" alt="" height={24} width={24} />
              </button>
            
            </div>
            }
     

        <MobileMenu />
      </div>


    </div>
  )
}
