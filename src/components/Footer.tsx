"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 absolute w-full right-0 left-0">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          {/* Branding Section */}
          <motion.div 
            className="text-center lg:text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center justify-center lg:justify-start mb-4">
              <h1 className="text-4xl font-bold">Easy<span className="text-green-500">2</span>Code</h1>
            </div>
            <p className="text-lg">
              Simplify your development process with automated project generation.
            </p>
          </motion.div>

          {/* Links Section */}
          <div className="flex flex-col lg:flex-row gap-8">
            <motion.div 
              className="flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <a href="/#hero" className="text-gray-400 hover:text-white mb-2">Home</a>
              <a href="/#features" className="text-gray-400 hover:text-white mb-2">Features</a>
              <a href="/#benefits" className="text-gray-400 hover:text-white mb-2">Benefits</a>
              <a href="/#how-it-works" className="text-gray-400 hover:text-white mb-2">How It Works</a>
              
              <a href="#faq" className="text-gray-400 hover:text-white">FAQ</a>
            </motion.div>

            <motion.div 
              className="flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <p className="text-gray-400 mb-2">Email: <a href="mailto:support@springgg.com" className="hover:text-white">support@Easy2Code.com</a></p>
              <p className="text-gray-400 mb-2">Phone: <a href="tel:+1234567890" className="hover:text-white">+212 6 36 92 00 46</a></p>
              <p className="text-gray-400">Address: Marrakech, Morocco</p>
            </motion.div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Easy2Code. All rights reserved.
          </p>
          <p className="text-gray-400">
            Designed with <span className="text-red-500">&hearts;</span> by <a href="https://www.linkedin.com/in/hamza-lachgar-068a90275/" className="text-white hover:text-green-500">Hamza Lachgar</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
