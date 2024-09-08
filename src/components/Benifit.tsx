"use client"
import { motion } from 'framer-motion';

export default function Benefit() {
  return (
    <div className="flex flex-col gap-12 mt-16 px-24">
      <motion.h2 
        className="text-4xl font-bold text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Why Choose Us?
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <motion.div 
          className="p-6  rounded-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h3 className="text-2xl font-bold mb-4 text-green-600">Save 50% of Your Development Time</h3>
          <p className="text-gray-600">With our automated project setup, you can focus on writing code that matters, cutting down your setup time by half.</p>
        </motion.div>
        <motion.div 
          className="p-6  rounded-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold mb-4 text-green-600">Increase Your Productivity</h3>
          <p className="text-gray-600">Our tool automates repetitive tasks, allowing you to stay focused and productive, resulting in higher-quality work.</p>
        </motion.div>
        <motion.div 
          className="p-6  rounded-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-4 text-green-600">Simplify Complex Tasks</h3>
          <p className="text-gray-600">We simplify the complex tasks of setting up projects, configuring security, and generating code, so you can start building right away.</p>
        </motion.div>
      </div>
      <motion.div 
        className="mt-8 bg-green-500 text-white text-center p-8 rounded-md shadow-lg "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <motion.h3 
          className="text-3xl font-bold mb-4"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          "Empower your development process with the efficiency of automation."
        </motion.h3>
        <motion.p 
          className="text-xl"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          Start today and transform the way you build applications.
        </motion.p>
      </motion.div>
    </div>
  );
}
