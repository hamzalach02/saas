"use client"
import { motion } from 'framer-motion';

export default function FAQ() {
  return (
    <div className="flex flex-col gap-12 items-center px-6 py-16 bg-gray-100">
      <motion.h2 
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Frequently Asked Questions
      </motion.h2>
      
      <div className="w-full max-w-4xl">
        <div className="accordion">
          <motion.div 
            className="accordion-item mb-4 p-4 bg-white shadow-md rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h3 className="text-2xl font-semibold mb-2">How does the free trial work?</h3>
            <p className="text-gray-600">
              Our free trial gives you full access to our platform for 14 days. During this period, you can explore all features and generate up to 2 projects. No credit card is required to start your trial.
            </p>
          </motion.div>

          <motion.div 
            className="accordion-item mb-4 p-4 bg-white shadow-md rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-2">What happens if I cancel?</h3>
            <p className="text-gray-600">
              If you decide to cancel your subscription, you will retain access to your account until the end of your current billing cycle. Your projects and data will not be lost, and you can choose to reactivate your subscription at any time.
            </p>
          </motion.div>

          <motion.div 
            className="accordion-item mb-4 p-4 bg-white shadow-md rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold mb-2">Is there customer support available?</h3>
            <p className="text-gray-600">
              Yes, we offer 24/7 customer support through chat and email. Our support team is always ready to assist you with any issues or questions you may have.
            </p>
          </motion.div>

         
        </div>
      </div>
    </div>
  );
}
