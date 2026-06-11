import React from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  Database,
  Monitor,
  Layers,
  Code2,
  Smartphone,
  Server,
  GitBranch,
  Box,
  Palette,
  Shield,
  Radio,
  Cpu,
  FileCode2,
  Workflow,
  Cloud,
  Container,
  Terminal,
  PenTool,
  Layout,
  Zap,
} from 'lucide-react';

interface TechItem {
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface TechCategory {
  title: string;
  icon: React.ReactNode;
  items: TechItem[];
}

const techCategories: TechCategory[] = [
  {
    title: 'Frontend',
    icon: <Layers className="w-5 h-5" />,
    items: [
      { name: 'React.js', icon: <Code2 className="w-5 h-5" />, color: '#61DAFB' },
      { name: 'Next.js', icon: <Globe className="w-5 h-5" />, color: '#ffffff' },
      { name: 'React Native', icon: <Smartphone className="w-5 h-5" />, color: '#61DAFB' },
      { name: 'TypeScript', icon: <FileCode2 className="w-5 h-5" />, color: '#3178C6' },
      { name: 'JavaScript', icon: <Zap className="w-5 h-5" />, color: '#F7DF1E' },
      { name: 'Tailwind CSS', icon: <Palette className="w-5 h-5" />, color: '#06B6D4' },
      { name: 'NativeWind', icon: <Palette className="w-5 h-5" />, color: '#06B6D4' },
      { name: 'Redux Toolkit', icon: <Workflow className="w-5 h-5" />, color: '#764ABC' },
      { name: 'shadcn/ui', icon: <Layout className="w-5 h-5" />, color: '#ffffff' },
    ],
  },
  {
    title: 'Backend',
    icon: <Server className="w-5 h-5" />,
    items: [
      { name: 'Node.js', icon: <Server className="w-5 h-5" />, color: '#339933' },
      { name: 'Express.js', icon: <Cpu className="w-5 h-5" />, color: '#ffffff' },
      { name: 'REST APIs', icon: <Globe className="w-5 h-5" />, color: '#FF6C37' },
      { name: 'GraphQL', icon: <Box className="w-5 h-5" />, color: '#E10098' },
      { name: 'Socket.io', icon: <Radio className="w-5 h-5" />, color: '#010101' },
      { name: 'JWT / OAuth', icon: <Shield className="w-5 h-5" />, color: '#FB015B' },
    ],
  },
  {
    title: 'Database & Cloud',
    icon: <Database className="w-5 h-5" />,
    items: [
      { name: 'MongoDB', icon: <Database className="w-5 h-5" />, color: '#47A248' },
      { name: 'Firebase', icon: <Cloud className="w-5 h-5" />, color: '#FFCA28' },
      { name: 'SQL', icon: <Database className="w-5 h-5" />, color: '#00758F' },
      { name: 'Vercel', icon: <Cloud className="w-5 h-5" />, color: '#ffffff' },
    ],
  },
  {
    title: 'Desktop & Tools',
    icon: <Monitor className="w-5 h-5" />,
    items: [
      { name: 'Electron', icon: <Monitor className="w-5 h-5" />, color: '#47848F' },
      { name: 'SQLite', icon: <Database className="w-5 h-5" />, color: '#003B57' },
      { name: 'Docker', icon: <Container className="w-5 h-5" />, color: '#2496ED' },
      { name: 'Git', icon: <GitBranch className="w-5 h-5" />, color: '#F05032' },
      { name: 'Postman', icon: <Terminal className="w-5 h-5" />, color: '#FF6C37' },
      { name: 'Figma', icon: <PenTool className="w-5 h-5" />, color: '#F24E1E' },
    ],
  },
];

const TechStack: React.FC = () => {
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
    <section id="skills" className="section-padding">
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
            Skills
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-4">
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            The technologies and tools I use to build scalable, production-grade applications.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-6" />
        </motion.div>

        {/* Tech Categories */}
        <div className="grid md:grid-cols-2 gap-8">
          {techCategories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              className="card p-8"
              variants={itemVariants}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/10 flex items-center justify-center text-blue-400">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>

              {/* Tech Items Grid */}
              <div className="grid grid-cols-3 gap-3">
                {category.items.map((tech, techIndex) => (
                  <motion.div
                    key={techIndex}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.05] transition-all duration-300 group"
                    whileHover={{ scale: 1.05, y: -2 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: techIndex * 0.05 }}
                  >
                    <span style={{ color: tech.color }} className="transition-transform duration-300 group-hover:scale-110">
                      {tech.icon}
                    </span>
                    <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors text-center leading-tight">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills Bar */}
        <motion.div
          className="mt-12 card p-6"
          variants={itemVariants}
        >
          <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 text-center">
            Also Experienced With
          </h4>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              'CI/CD', 'Payment Gateways', 'Maps Integration', 'Push Notifications',
              'OpenAI API', 'Jira', 'Trello', 'Slack', 'Context API', 'Deno.js',
            ].map((skill, index) => (
              <motion.span
                key={index}
                className="px-3 py-1.5 text-xs font-medium text-gray-500 bg-white/[0.03] border border-white/5 rounded-full hover:text-gray-300 hover:border-white/10 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TechStack;
