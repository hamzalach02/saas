"use client"
import CodeGenerator from '@/components/CodeGenerator';


export default async function Home() {
    

   return(
    <div className="flex flex-col items-center gap-12 mt-16 px-4 min-h-screen">
      <CodeGenerator/>
    </div>
   )

}