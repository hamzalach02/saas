"use client"
import { motion } from 'framer-motion';

export default function Features() {
  return (
    <div className="flex flex-col gap-12 mt-16 px-24">
      <motion.h2 
        className="text-4xl font-bold text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        what we offer?
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        <motion.div 
          className="p-6 bg-white shadow-lg rounded-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h3 className="text-2xl font-bold mb-4 text-green-500 underline">Model Generation</h3>
          <p className="text-gray-600">Automatically generate database models based on your schema, ensuring consistency and saving time in the development process.</p>
        </motion.div>
        <motion.div 
          className="p-6 bg-white shadow-lg rounded-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold mb-4 text-green-500 underline">REST API Generation</h3>
          <p className="text-gray-600">Instantly create fully functional RESTful endpoints for your models, making it easier to build and scale your application.</p>
        </motion.div>
        <motion.div 
          className="p-6 bg-white shadow-lg rounded-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-4 text-green-500 underline">Service Layer Generation</h3>
          <p className="text-gray-600">Generate service layers that handle business logic, making your codebase clean and maintainable.</p>
        </motion.div>
        <motion.div 
          className="p-6 bg-white shadow-lg rounded-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-4 text-green-500 underline">Security Configurations</h3>
          <p className="text-gray-600">Automatically set up robust security configurations, including authentication and authorization, to protect your application from threats.</p>
        </motion.div>
      </div>
    </div>
  );
}
