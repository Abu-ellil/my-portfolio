import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';

const Experience: React.FC = () => {
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

  const experiences = [
    {
      title: "Full Stack Developer Intern",
      company: "Kalbonyan Elmarsous",
      location: "Remote",
      period: "2023 - 2024",
      type: "Internship",
      description: "Intensive full-stack development program focusing on modern web technologies and best practices.",
      achievements: [
        "Completed comprehensive MERN stack training program",
        "Built 15+ real-world projects using React, Node.js, and MongoDB",
        "Collaborated with international team on multiple client projects",
        "Gained expertise in modern development workflows and deployment strategies",
        "Mentored junior developers and contributed to code reviews"
      ],
      technologies: ["React", "Node.js", "MongoDB", "Express.js", "JavaScript", "Git"],
      website: "https://kalbonyanelmarsos.com"
    }
  ];

  const additionalExperience = [
    {
      title: "Freelance Developer",
      period: "2022 - Present",
      description: "Working with various clients to deliver custom web and mobile solutions",
      highlights: ["10+ successful projects", "5-star client ratings", "Mobile & Web expertise"]
    },
    {
      title: "Open Source Contributor",
      period: "2022 - Present", 
      description: "Contributing to various open-source projects and maintaining personal repositories",
      highlights: ["50+ GitHub repositories", "Active community member", "Code quality advocate"]
    }
  ];

  return (
    <section id="experience" className="py-20 px-6 bg-gray-50 dark:bg-gray-900/50">
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
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My professional journey and key accomplishments
          </p>
        </motion.div>

        {/* Main Experience */}
        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="glass p-8 rounded-xl mb-8"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                    {exp.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      {exp.company}
                    </span>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 mt-4 md:mt-0">
                  <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{exp.period}</span>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm">
                    {exp.type}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {exp.description}
              </p>

              {/* Achievements */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                  Key Achievements:
                </h4>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, achIndex) => (
                    <motion.li
                      key={achIndex}
                      className="flex items-start space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: achIndex * 0.1 }}
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-gray-400">{achievement}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
                  Technologies Used:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Website Link */}
              <motion.a
                href={exp.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline"
                whileHover={{ scale: 1.05 }}
              >
                <ExternalLink className="w-4 h-4" />
                <span>Visit Company Website</span>
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* Additional Experience */}
        <motion.div className="mt-16" variants={itemVariants}>
          <h3 className="text-2xl font-semibold text-center mb-8 gradient-text">
            Additional Experience
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {additionalExperience.map((exp, index) => (
              <motion.div
                key={index}
                className="glass p-6 rounded-xl"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <h4 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  {exp.title}
                </h4>
                <p className="text-blue-600 dark:text-blue-400 mb-3 font-medium">
                  {exp.period}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {exp.description}
                </p>
                
                <div className="space-y-1">
                  {exp.highlights.map((highlight, hIndex) => (
                    <div key={hIndex} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{highlight}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Experience;
