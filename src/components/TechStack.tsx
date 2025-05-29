import React from 'react';
import { motion } from 'framer-motion';

const TechStack: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
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

  const technologies = [
    {
      category: "Frontend",
      skills: [
        { name: "React", level: 95, color: "from-blue-400 to-blue-600" },
        { name: "React Native", level: 90, color: "from-cyan-400 to-cyan-600" },
        { name: "TypeScript", level: 85, color: "from-blue-500 to-blue-700" },
        { name: "JavaScript", level: 95, color: "from-yellow-400 to-yellow-600" },
        { name: "HTML5/CSS3", level: 90, color: "from-orange-400 to-orange-600" },
        { name: "Tailwind CSS", level: 88, color: "from-teal-400 to-teal-600" }
      ]
    },
    {
      category: "Backend",
      skills: [
        { name: "Node.js", level: 90, color: "from-green-400 to-green-600" },
        { name: "Express.js", level: 88, color: "from-gray-400 to-gray-600" },
        { name: "MongoDB", level: 85, color: "from-green-500 to-green-700" },
        { name: "PostgreSQL", level: 80, color: "from-blue-500 to-blue-700" },
        { name: "Firebase", level: 85, color: "from-yellow-500 to-orange-500" },
        { name: "REST APIs", level: 92, color: "from-purple-400 to-purple-600" }
      ]
    },
    {
      category: "Tools & Others",
      skills: [
        { name: "Git", level: 90, color: "from-red-400 to-red-600" },
        { name: "Redux", level: 85, color: "from-purple-500 to-purple-700" },
        { name: "Socket.io", level: 80, color: "from-gray-500 to-gray-700" },
        { name: "Jest", level: 75, color: "from-red-500 to-red-700" },
        { name: "Docker", level: 70, color: "from-blue-400 to-blue-600" },
        { name: "AWS", level: 65, color: "from-orange-400 to-orange-600" }
      ]
    }
  ];

  const techIcons = [
    { name: "React", icon: "⚛️" },
    { name: "Node.js", icon: "🟢" },
    { name: "MongoDB", icon: "🍃" },
    { name: "TypeScript", icon: "📘" },
    { name: "Firebase", icon: "🔥" },
    { name: "Redux", icon: "🔄" },
    { name: "Tailwind", icon: "💨" },
    { name: "Git", icon: "📝" },
    { name: "JavaScript", icon: "💛" },
    { name: "Express", icon: "🚀" },
    { name: "PostgreSQL", icon: "🐘" },
    { name: "Docker", icon: "🐳" }
  ];

  return (
    <section id="skills" className="py-20 px-6">
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
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* Floating Tech Icons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-16"
          variants={itemVariants}
        >
          {techIcons.map((tech, index) => (
            <motion.div
              key={index}
              className="glass p-4 rounded-xl hover:scale-110 transition-all duration-300"
              whileHover={{ y: -10, rotate: 5 }}
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 3,
                delay: index * 0.2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <div className="text-2xl mb-2">{tech.icon}</div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {tech.name}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Categories */}
        <div className="grid lg:grid-cols-3 gap-8">
          {technologies.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              className="glass p-8 rounded-xl"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-2xl font-semibold mb-6 text-center gradient-text">
                {category.category}
              </h3>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: skillIndex * 0.1 }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: skillIndex * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div 
          className="text-center mt-16"
          variants={itemVariants}
        >
          <div className="glass p-8 rounded-xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4 gradient-text">
              Always Learning
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Technology evolves rapidly, and I'm committed to staying current with the latest 
              trends and best practices. I regularly explore new frameworks, attend tech conferences, 
              and contribute to open-source projects to continuously improve my skills.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TechStack;
