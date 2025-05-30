import React from 'react';
import { motion } from 'framer-motion';
import { Code, Smartphone, Globe } from 'lucide-react';

const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const features = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Full-Stack Web Development",
      description: "Building complete web applications using the MERN stack with modern best practices and scalable architecture."
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile App Development",
      description: "Creating cross-platform mobile applications with React Native for both iOS and Android platforms."
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Modern Technologies",
      description: "Leveraging cutting-edge tools and frameworks to deliver high-performance, maintainable solutions."
    }
  ];

  return (
    <section id="about" className="py-20 px-6">
      <motion.div
        className="container mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* About Text */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
              Passionate Developer with a Vision
            </h3>
            
            <div className="space-y-4 text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              <p>
                I'm a dedicated full-stack developer with extensive experience in building 
                modern web and mobile applications. My journey in software development has 
                been driven by a passion for creating innovative solutions that make a real 
                impact.
              </p>
              
              <p>
                Specializing in the MERN stack (MongoDB, Express.js, React, Node.js) and 
                React Native, I bring ideas to life through clean, efficient code and 
                intuitive user experiences. I believe in continuous learning and staying 
                up-to-date with the latest technologies and best practices.
              </p>
              
              <p>
                When I'm not coding, I enjoy exploring new technologies, contributing to 
                open-source projects, and sharing knowledge with the developer community.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">50+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">4+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">10+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Technologies</div>
              </div>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div className="space-y-6" variants={itemVariants}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="glass p-6 rounded-xl hover:scale-105 transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
