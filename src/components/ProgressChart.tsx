import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type Props = {
  value: number;
  size?: number;
  thickness?: number;
  duration?: number;
};

export const ProgressChart: React.FC<Props> = ({
  value,
  size = 100,
  thickness = 10,
  duration = 1.5,
}) => {
  const [progress, setProgress] = useState(0);
  const radius = size / 2 - thickness / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    setProgress(value);
  }, [value]);

  return (
    <div className="relative flex items-center justify-center ml-10" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={thickness}
          fill="transparent"
          className="text-gray-400"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={thickness}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          className={progress === 100 ? "text-green-500" : "text-blue-500"}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (progress / 100) * circumference }}
          transition={{ duration: duration, ease: "easeInOut" }}
        />
      </svg>
      <motion.div
        className="absolute text-2xl font-bold mr-10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: duration * 0.5 }}
      >
        {`${Math.round(progress)}%`}
      </motion.div>
    </div>
  );
};