import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar } from 'lucide-react';

const Certifications: React.FC = () => {
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

  const certifications = [
    {
      title: "React - The Complete Guide",
      issuer: "Udemy",
      date: "2023",
      icon: "⚛️",
      description: "Comprehensive React course covering hooks, context, Redux, and modern patterns",
      skills: ["React", "Redux", "Hooks", "Context API"],
      credentialId: "UC-XXXXXXXX",
      link: "#"
    },
    {
      title: "Node.js - The Complete Guide",
      issuer: "Udemy", 
      date: "2023",
      icon: "🟢",
      description: "Complete Node.js development including Express, MongoDB, and REST APIs",
      skills: ["Node.js", "Express.js", "MongoDB", "REST APIs"],
      credentialId: "UC-XXXXXXXX",
      link: "#"
    },
    {
      title: "Full Stack Web Development",
      issuer: "Kalbonyan Elmarsous",
      date: "2024",
      icon: "🎓",
      description: "Intensive full-stack development program with real-world projects",
      skills: ["MERN Stack", "TypeScript", "Testing", "Deployment"],
      credentialId: "KE-XXXXXXXX",
      link: "#"
    },
    {
      title: "React Native Development",
      issuer: "Udemy",
      date: "2023",
      icon: "📱",
      description: "Cross-platform mobile app development with React Native",
      skills: ["React Native", "Expo", "Navigation", "Native Modules"],
      credentialId: "UC-XXXXXXXX",
      link: "#"
    },
    {
      title: "MongoDB Developer",
      issuer: "MongoDB University",
      date: "2023",
      icon: "🍃",
      description: "Database design, aggregation, and performance optimization",
      skills: ["MongoDB", "Aggregation", "Indexing", "Performance"],
      credentialId: "MDB-XXXXXXXX",
      link: "#"
    },
    {
      title: "JavaScript Algorithms",
      issuer: "freeCodeCamp",
      date: "2022",
      icon: "💛",
      description: "Data structures and algorithms implementation in JavaScript",
      skills: ["JavaScript", "Algorithms", "Data Structures", "Problem Solving"],
      credentialId: "FCC-XXXXXXXX",
      link: "#"
    }
  ];

  const stats = [
    { number: "6+", label: "Certifications" },
    { number: "500+", label: "Hours of Learning" },
    { number: "15+", label: "Courses Completed" },
    { number: "4.9/5", label: "Average Rating" }
  ];

  return (
    <section id="certifications" className="py-20 px-6">
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
            <span className="gradient-text">Certifications</span> & Learning
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Continuous learning and professional development achievements
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          variants={itemVariants}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center glass p-6 rounded-xl"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-3xl font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              className="glass rounded-xl overflow-hidden hover:scale-105 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              {/* Certificate Header */}
              <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">{cert.icon}</div>
                  <motion.a
                    href={cert.link}
                    className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>
                </div>
                
                <h3 className="text-lg font-semibold mb-2">{cert.title}</h3>
                <div className="flex items-center justify-between text-sm opacity-90">
                  <span>{cert.issuer}</span>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{cert.date}</span>
                  </div>
                </div>
              </div>

              {/* Certificate Content */}
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                  {cert.description}
                </p>

                {/* Skills */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Credential ID */}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Award className="w-3 h-3" />
                    <span>ID: {cert.credentialId}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Learning Philosophy */}
        <motion.div 
          className="mt-16 text-center"
          variants={itemVariants}
        >
          <div className="glass p-8 rounded-xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4 gradient-text">
              Commitment to Continuous Learning
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              In the rapidly evolving world of technology, I believe that continuous learning 
              is not just beneficial—it's essential. I regularly invest time in expanding my 
              knowledge through online courses, workshops, and hands-on projects.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-2xl mb-2">📚</div>
                <h4 className="font-semibold mb-2">Always Learning</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Staying updated with latest technologies and best practices
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-2xl mb-2">🎯</div>
                <h4 className="font-semibold mb-2">Goal-Oriented</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Setting clear learning objectives and achieving them systematically
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-2xl mb-2">🤝</div>
                <h4 className="font-semibold mb-2">Knowledge Sharing</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Contributing to the community through mentoring and open source
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Certifications;
