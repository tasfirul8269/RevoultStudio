'use client';

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ScrollAnimation from './ScrollAnimation';

interface ServiceDescriptionProps {
  title: string;
  description: string;
  content: string | React.ReactNode;
  image?: string;
  reversed?: boolean;
}

const ServiceDescription = ({ 
  title, 
  description, 
  content, 
  image = "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
  reversed = false 
}: ServiceDescriptionProps) => {
  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Centered Title and Description */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <div className="max-w-4xl w-full">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="gradient-text">{title}</span>
            </motion.h2>
            <motion.p 
              className="text-xl text-[#b8c5ff] font-medium mb-10 px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {description}
            </motion.p>
          </div>
        </div>

        <div className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}>
          {/* Image side */}
          <ScrollAnimation 
            duration={0.7} 
            delay={0.2} 
            direction={reversed ? "right" : "left"} 
            once={false}
            className="w-full lg:w-1/2"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/20 h-[400px] md:h-[500px] transform hover:scale-[1.02] transition-all duration-500">
              <img 
                src={image} 
                alt={title}
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0613]/70 to-transparent"></div>
            </div>
          </ScrollAnimation>
          
          {/* Content side */}
          <ScrollAnimation 
            duration={0.7} 
            delay={0.3} 
            direction={reversed ? "left" : "right"} 
            once={false}
            className="w-full lg:w-1/2"
          >
            <div className="text-gray-300 space-y-4 leading-relaxed">
              {typeof content === 'string' ? <p>{content}</p> : content}
            </div>
          </ScrollAnimation>
        </div>
        
        {/* Centered Button */}
        <motion.div 
          className="mt-12 w-full flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button className="bg-gradient-to-r from-[#5f6bc9] to-[#7784e4] hover:from-[#4a56b8] hover:to-[#5f6bc9] text-white font-semibold py-4 px-10 rounded-full transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl shadow-purple-500/20">
            Get Started
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceDescription;
