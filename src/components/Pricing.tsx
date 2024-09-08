"use client";
import { motion } from 'framer-motion';
import { FaCheckCircle, FaDatabase, FaInfinity } from 'react-icons/fa';

export default function Pricing() {
  return (
    <div className="flex flex-col gap-12 mt-16 px-24">
      <motion.h2
        className="text-4xl font-bold text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
         Pricing
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
        
        {/* Free Plan */}
        <motion.div 
          className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center text-center border-2 border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h3 className="text-3xl font-bold mb-4">Free Tier</h3>
          <p className="text-gray-600 mb-4">Get started with our basic features.</p>
          <div className="flex gap-1 items-center"> 
            
            <h1 className="text-[80px] font-semibold">0$</h1> 
            <span className="text-dm text-gray-500 mt-8">/month</span>
            
            </div>
          <FaCheckCircle className="text-green-500 text-5xl mb-4" />
         
          <p className="text-xl font-medium mb-2">✓ 2 Projects</p>
          <p className="text-xl font-medium mb-2">✓ Basic Spring Project Generation</p>
          <p className="text-xl font-medium mb-2">✓ Custom APIs and Services</p>
          <p className="text-xl font-medium mb-2">✗ No Project Storage</p>
          <button className="bg-green-500 text-white font-bold text-xl px-6 py-2 rounded-md mt-6 hover:bg-green-600">
            Start for Free
          </button>
        </motion.div>

        {/* Pro Plan */}
        <motion.div 
          className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center text-center border-2 border-green-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          <h3 className="text-3xl font-bold mb-4">Pro Plan</h3>
          <p className="text-gray-600 mb-4">Unlock advanced features and unlimited projects.</p>
          <div className="flex gap-1 items-center"> 
            
            <h1 className="text-[80px] font-semibold">20$</h1> 
            <span className="text-dm text-gray-500 mt-8">/month</span>
            
            </div>
          <FaInfinity className="text-green-500 text-5xl mb-4" />
          <p className="text-xl font-medium mb-2">✓ Unlimited Projects</p>
          <p className="text-xl font-medium mb-2">✓ Custom APIs and Services</p>
          <p className="text-xl font-medium mb-2">✓ Save Projects to Database</p>
          <p className="text-xl font-medium mb-2">✓ Advanced Spring Project Generation</p>
          <button className="bg-green-500 text-white font-bold text-xl px-6 py-2 rounded-md mt-6 hover:bg-green-600">
            Get Pro
          </button>
        </motion.div>

       

      </div>
    </div>
  );
}
