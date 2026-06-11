import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink, Briefcase, Code2 } from 'lucide-react';

const experiences = [
  {
    title: 'Full-Stack Developer',
    company: 'Kalbonyan Elmarsous',
    location: 'Remote',
    period: '2023 — 2024',
    type: 'Intensive Program',
    description:
      'Comprehensive full-stack development program focusing on modern web technologies and best practices.',
    achievements: [
      'Completed intensive MERN stack training with 15+ real-world projects',
      'Built production applications using React, Node.js, MongoDB, and Express',
      'Collaborated with international teams on client projects',
      'Gained expertise in modern deployment workflows and CI/CD',
      'Mentored junior developers and contributed to code reviews',
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Express.js', 'JavaScript', 'Git'],
    website: 'https://kalbonyanelmarsos.com',
  },
];

const additionalExperience = [
  {
    title: 'Freelance Full-Stack Engineer',
    period: '2022 — Present',
    description: 'Delivering custom web, mobile & desktop solutions for clients worldwide',
    highlights: [
      'Production-grade delivery platform ecosystem (4 apps)',
      'AI-powered agriculture assistant (React Native)',
      'Enterprise desktop management system (Electron)',
      'Full e-commerce platform with TypeScript',
    ],
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    title: 'Open Source Contributor',
    period: '2022 — Present',
    description: 'Building and maintaining open-source projects and developer tools',
    highlights: [
      '50+ GitHub repositories',
      'Active community contributor',
      'Production code quality advocate',
    ],
    icon: <Code2 className="w-5 h-5" />,
  },
];

const Experience: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.2, staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <section id="experience" className="section-padding bg-[#080808]">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <span className="text-sm font-medium text-blue-400 tracking-widest uppercase mb-4 block">
            Career
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            My professional journey building real-world applications.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-6" />
        </motion.div>

        {/* Main Experience */}
        <div className="max-w-4xl mx-auto space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="card p-8"
              variants={itemVariants}
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span className="text-blue-400 font-semibold">{exp.company}</span>
                    <span className="text-gray-600">•</span>
                    <span className="flex items-center gap-1 text-gray-500">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-gray-500 text-sm">
                    <Calendar className="w-3 h-3" />
                    {exp.period}
                  </span>
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-medium border border-blue-500/20">
                    {exp.type}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-400 mb-6 leading-relaxed">{exp.description}</p>

              {/* Achievements */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                  Key Achievements
                </h4>
                <div className="space-y-2">
                  {exp.achievements.map((achievement, achIndex) => (
                    <motion.div
                      key={achIndex}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: achIndex * 0.08 }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mt-2 flex-shrink-0" />
                      <span className="text-gray-400 text-sm">{achievement}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-6">
                {exp.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Website Link */}
              <motion.a
                href={exp.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                whileHover={{ x: 4 }}
              >
                <ExternalLink className="w-4 h-4" />
                Visit Website
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* Additional Experience */}
        <motion.div className="mt-12 max-w-4xl mx-auto" variants={itemVariants}>
          <h3 className="text-xl font-bold text-center mb-8">
            <span className="gradient-text">Additional Experience</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {additionalExperience.map((exp, index) => (
              <motion.div
                key={index}
                className="card p-6"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/10 flex items-center justify-center text-blue-400">
                    {exp.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">{exp.title}</h4>
                    <span className="text-blue-400 text-sm font-medium">{exp.period}</span>
                  </div>
                </div>
                <p className="text-gray-500 text-sm mb-4">{exp.description}</p>
                <div className="space-y-2">
                  {exp.highlights.map((highlight, hIndex) => (
                    <div key={hIndex} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex-shrink-0" />
                      <span className="text-gray-400 text-sm">{highlight}</span>
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
