import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Smartphone, Globe, Users } from 'lucide-react';

const Projects: React.FC = () => {
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

  const projects = [
    {
      title: "MERN Todo Application",
      description: "Full-stack todo application built with MERN stack featuring user authentication, task management, and real-time updates.",
      icon: <Globe className="w-6 h-6" />,
      technologies: ["React", "Node.js", "Express", "MongoDB", "JWT"],
      github: "https://github.com/Abu-ellil/mern-project-todo",
      demo: "https://mern-project-todo-kalbonyan.vercel.app/",
      image: "https://user-images.githubusercontent.com/94858304/250264715-31cbb966-2312-4e9d-b5ec-c5ab299070af.png",
      featured: true
    },
    {
      title: "Social Media App",
      description: "Complete social media platform with user profiles, posts, likes, comments, and real-time interactions built with MERN stack.",
      icon: <Users className="w-6 h-6" />,
      technologies: ["React", "Node.js", "Express", "MongoDB", "Socket.io"],
      github: "https://github.com/Abu-ellil/social-app",
      demo: "https://social-app-wahy.vercel.app/",
      image: "https://user-images.githubusercontent.com/94858304/250264715-31cbb966-2312-4e9d-b5ec-c5ab299070af.png",
      featured: true
    },
    {
      title: "Your Car App",
      description: "Modern car showcase application with beautiful UI, car listings, detailed views, and responsive design.",
      icon: <Globe className="w-6 h-6" />,
      technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
      github: "https://github.com/Abu-ellil/your-car-app",
      demo: "https://abu-ellil.github.io/your-car-app/",
      image: "https://user-images.githubusercontent.com/94858304/246162094-f78167e8-9adf-4d74-8a89-897da00c9485.png",
      featured: true
    },
    {
      title: "20 Vanilla JS Projects",
      description: "Collection of 20 interactive JavaScript projects showcasing DOM manipulation, APIs, local storage, and modern JS features.",
      icon: <Globe className="w-6 h-6" />,
      technologies: ["JavaScript", "HTML5", "CSS3", "APIs", "Local Storage"],
      github: "https://github.com/Abu-ellil/20-Vanilla-JS-PROJECTS",
      demo: "https://abu-ellil.github.io/20-Vanilla-JS-PROJECTS/",
      image: "https://user-images.githubusercontent.com/94858304/231672110-488dfbec-cf4c-4ea5-85d3-041ecc33a61a.png",
      featured: false
    },
    {
      title: "Kanban Board",
      description: "Interactive Kanban board for project management with drag-and-drop functionality, task organization, and progress tracking.",
      icon: <Globe className="w-6 h-6" />,
      technologies: ["JavaScript", "HTML5", "CSS3", "Drag & Drop API"],
      github: "https://github.com/Abu-ellil/KanbanBoard",
      demo: "https://abu-ellil.github.io/KanbanBoard/",
      image: "https://user-images.githubusercontent.com/94858304/231673207-c6eebb31-9f75-4acb-8b42-330c810a3681.png",
      featured: false
    },
    {
      title: "Appie Landing Page",
      description: "Modern, responsive landing page for mobile app with beautiful animations, smooth scrolling, and professional design.",
      icon: <Smartphone className="w-6 h-6" />,
      technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
      github: "https://github.com/Abu-ellil/Appie",
      demo: "https://abu-ellil.github.io/Appie/",
      image: "https://user-images.githubusercontent.com/94858304/231668224-187f8e82-f36a-493a-abc6-12cedb097f35.png",
      featured: false
    },
    {
      title: "Jobs Application",
      description: "Job search and application platform with user authentication, job listings, application tracking, and employer dashboard.",
      icon: <Globe className="w-6 h-6" />,
      technologies: ["React", "Node.js", "Express", "MongoDB"],
      github: "https://github.com/Abu-ellil/jops-app",
      demo: "#",
      image: "https://user-images.githubusercontent.com/94858304/250264715-31cbb966-2312-4e9d-b5ec-c5ab299070af.png",
      featured: false
    },
    {
      title: "React Native Quiz App",
      description: "Mobile quiz application built with React Native featuring multiple categories, score tracking, and beautiful UI.",
      icon: <Smartphone className="w-6 h-6" />,
      technologies: ["React Native", "Expo", "JavaScript", "AsyncStorage"],
      github: "https://github.com/Abu-ellil/react_native_quizapp",
      demo: "#",
      image: "https://user-images.githubusercontent.com/94858304/250264715-31cbb966-2312-4e9d-b5ec-c5ab299070af.png",
      featured: false
    }
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section id="projects" className="py-20 px-6 bg-gray-50 dark:bg-gray-900/50">
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
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills in full-stack development
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={index}
              className="glass rounded-xl overflow-hidden hover:scale-105 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition-colors text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github className="w-4 h-4" />
                  </motion.a>
                  {project.demo !== "#" && (
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition-colors text-white"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  )}
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white">
                    {project.icon}
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-semibold text-center mb-8">Other Notable Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <motion.div
                key={index}
                className="glass p-6 rounded-xl hover:scale-105 transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden mb-4 rounded-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-32 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition-colors text-white"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Github className="w-3 h-3" />
                    </motion.a>
                    {project.demo !== "#" && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition-colors text-white"
                        whileHover={{ scale: 1.1 }}
                      >
                        <ExternalLink className="w-3 h-3" />
                      </motion.a>
                    )}
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <div className="p-1.5 bg-white/20 backdrop-blur-sm rounded text-white">
                      {project.icon}
                    </div>
                  </div>
                </div>

                <h4 className="text-lg font-semibold mb-2">{project.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 text-gray-500 text-xs">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Projects;
