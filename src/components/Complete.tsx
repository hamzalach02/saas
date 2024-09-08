"use client"
import Image from "next/image";
import { ProgressChart } from "./ProgressChart";
import Link from "next/link";
import { useState } from "react";

export const Complete = () => {
  const[value,setValue]=useState(80);
  return (
   <div className="flex flex-col items-center justify-center rounded-md border-gray-300 border-2 py-4 px-2 gap-4  bg-slate-200 shadow-sm">
        <ProgressChart value={value}/>
        {(value!==100) && <>
            <p className="self-center text-center">Complete your Profile ,Get more visitors</p>
          <Link href="/myprofile" className="font-medium mt-4 ml-2 text-sm px-4 py-2 bg-green-500 text-white rounded-md hover:bg-opacity-70 hover:shadow-lg flex gap-1 justify-center">
           
           <span>Complete</span>
           <Image src="/arrow.png" alt="" height={20} width={20} />
         
           </Link>
            </>}
            {
                (value === 100) && <p className="self-center text-center">Congrats!!your Profile is Complete</p>
            }
   </div>
  );
};
