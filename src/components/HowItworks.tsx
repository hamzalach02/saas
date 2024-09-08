"use client";
import { motion } from 'framer-motion';
import { FaDatabase, FaCheckCircle, FaCogs, FaCloudDownloadAlt } from 'react-icons/fa';

export default function HowItWorks() {
  return (
    <div className="flex flex-col gap-12 mt-16 px-24">
      <motion.h2 
        className="text-4xl font-bold text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        How It Works?
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        <motion.div 
          className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <FaDatabase className="text-green-500 text-5xl mb-4" />
          <h3 className="text-2xl font-bold mb-4">1. Enter Your Database Schema</h3>
          <p className="text-gray-600">
            Provide your database schema as JSON, SQL, or even as a descriptive text. We'll handle the rest.
          </p>
        </motion.div>

        <motion.div 
          className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          <FaCheckCircle className="text-green-500 text-5xl mb-4" />
          <h3 className="text-2xl font-bold mb-4">2. Validate Generated Models</h3>
          <p className="text-gray-600">
            We'll translate your schema into Java models and present them to you for validation before proceeding.
          </p>
        </motion.div>

        <motion.div 
          className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
        >
          <FaCogs className="text-green-500 text-5xl mb-4" />
          <h3 className="text-2xl font-bold mb-4">3. Customize Your Services & APIs</h3>
          <p className="text-gray-600">
            Choose whether you want custom services or APIs. If not, we'll automatically generate CRUD operations for all your models.
          </p>
        </motion.div>

        <motion.div 
          className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
        >
          <FaCloudDownloadAlt className="text-green-500 text-5xl mb-4" />
          <h3 className="text-2xl font-bold mb-4">4. Finalize and Deploy</h3>
          <p className="text-gray-600">
            Decide if you need a Docker database setup, then download your fully-configured Spring Boot app, ready for deployment.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
