import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Speak2design',
      student: 'Nabeel',
      progress: 75,
      status: 'In Progress',
      image: 'herf',
      tags: ['Machine Learning', 'Education'],
    },
    {
      id: 2,
      title: 'ForexSmartX',
      student: 'Zeeshan',
      progress: 90,
      status: 'Final Review',
      image: 'https://source.unsplash.com/random/600x400/?blockchain,code',
      tags: ['Blockchain', 'Security'],
    },
    {
      id: 3,
      title: 'Skin Disease Detection',
      student: 'Ali',
      progress: 60,
      status: 'In Progress',
      image: 'https://source.unsplash.com/random/600x400/?iot,smart-home',
      tags: ['IoT', 'Automation'],
    },
  ]);

  const [newProject, setNewProject] = useState({
    title: '',
    student: '',
    progress: 0,
    status: 'In Progress',
    image: '',
    tags: '',
  });

  const [activeFilter, setActiveFilter] = useState('All');

  const addProject = () => {
    if (newProject.title && newProject.student) {
      setProjects([
        ...projects,
        { 
          ...newProject, 
          id: Date.now(), 
          progress: Number(newProject.progress),
          image: newProject.image || 'https://source.unsplash.com/random/600x400/?technology',
          tags: newProject.tags.split(',').map(tag => tag.trim()),
        },
      ]);
      setNewProject({ 
        title: '', 
        student: '', 
        progress: 0, 
        status: 'In Progress', 
        image: '',
        tags: '' 
      });
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.status === activeFilter);

  const stats = {
    total: projects.length,
    inProgress: projects.filter((p) => p.status === 'In Progress').length,
    finalReview: projects.filter((p) => p.status === 'Final Review').length,
    completed: projects.filter((p) => p.status === 'Completed').length,
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const cardHoverVariants = {
    hover: {
      y: -10,
      scale: 1.02,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const statusColors = {
    'In Progress': { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-400/30' },
    'Final Review': { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-400/30' },
    'Completed': { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-400/30' }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-radial from-indigo-900/30 via-transparent to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header & Stats */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
              Student Projects
            </h1>
            <p className="text-sm text-gray-400 mt-3">
              Track and manage student projects in one place
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-4 text-center min-w-[120px] border border-gray-700/50">
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <div className="text-xs text-gray-400">Total</div>
            </div>
            <div className="bg-blue-900/20 backdrop-blur-lg rounded-xl p-4 text-center min-w-[120px] border border-blue-700/30">
              <div className="text-2xl font-bold text-blue-300">{stats.inProgress}</div>
              <div className="text-xs text-blue-400">In Progress</div>
            </div>
            <div className="bg-purple-900/20 backdrop-blur-lg rounded-xl p-4 text-center min-w-[120px] border border-purple-700/30">
              <div className="text-2xl font-bold text-purple-300">{stats.finalReview}</div>
              <div className="text-xs text-purple-400">Final Review</div>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          {['All', 'In Progress', 'Final Review', 'Completed'].map(filter => (
            <motion.button
              key={filter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter 
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50'
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Add Project Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/40 backdrop-blur-lg rounded-2xl shadow-2xl p-6 mb-12 space-y-4 border border-gray-700/50"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
              Add New Project
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-600/50 to-transparent mx-4"></div>
            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-400 mb-1">Project Title</label>
              <input
                type="text"
                placeholder="e.g. AI Chatbot"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                className="border border-gray-700/70 bg-gray-900/30 rounded-lg px-4 py-3 w-full text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition"
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-400 mb-1">Student Name</label>
              <input
                type="text"
                placeholder="e.g. Sarah Williams"
                value={newProject.student}
                onChange={(e) => setNewProject({ ...newProject, student: e.target.value })}
                className="border border-gray-700/70 bg-gray-900/30 rounded-lg px-4 py-3 w-full text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition"
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-400 mb-1">Progress</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  value={newProject.progress}
                  onChange={(e) => setNewProject({ ...newProject, progress: e.target.value })}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  min="0"
                  max="100"
                />
                <span className="text-sm font-medium text-purple-300 w-12 text-center">
                  {newProject.progress}%
                </span>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
              <select
                value={newProject.status}
                onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                className="border border-gray-700/70 bg-gray-900/30 rounded-lg px-4 py-3 w-full text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition"
              >
                <option value="In Progress" className="bg-gray-800">In Progress</option>
                <option value="Final Review" className="bg-gray-800">Final Review</option>
                <option value="Completed" className="bg-gray-800">Completed</option>
              </select>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-400 mb-1">Image URL</label>
              <input
                type="text"
                placeholder="Leave blank for random image"
                value={newProject.image}
                onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                className="border border-gray-700/70 bg-gray-900/30 rounded-lg px-4 py-3 w-full text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition"
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-400 mb-1">Tags (comma separated)</label>
              <input
                type="text"
                placeholder="e.g. AI, Web, Mobile"
                value={newProject.tags}
                onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                className="border border-gray-700/70 bg-gray-900/30 rounded-lg px-4 py-3 w-full text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition"
              />
            </motion.div>
          </div>
          
          <motion.div className="pt-4">
            <motion.button
              onClick={addProject}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 0 20px 5px rgba(124, 58, 237, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg transition font-medium flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Project
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Project Cards */}
        {filteredProjects.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover="hover"
                className="relative group"
              >
                <motion.div
                  variants={cardHoverVariants}
                  className={`bg-gray-800/50 backdrop-blur-md rounded-2xl overflow-hidden border ${statusColors[project.status].border} transition-all duration-300 h-full flex flex-col`}
                >
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent opacity-70"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[project.status].bg} ${statusColors[project.status].text}`}>
                        {project.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-grow">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm mt-1">By {project.student}</p>
                    </div>

                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="pt-2">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Progress</span>
                        <span className="font-medium text-purple-300">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 rounded-full ${
                            project.progress < 30
                              ? 'bg-gradient-to-r from-red-500 to-pink-500'
                              : project.progress < 70
                              ? 'bg-gradient-to-r from-yellow-500 to-amber-500'
                              : 'bg-gradient-to-r from-green-500 to-teal-400'
                          }`}
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 mt-auto">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
                        <span className="text-xs text-gray-400">Last updated: Today</span>
                      </div>
                      <motion.button
                        onClick={() => deleteProject(project.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-gray-400 hover:text-red-400 text-sm flex items-center gap-1 transition"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="inline-block p-6 rounded-full bg-gray-800/50 mb-6 border border-dashed border-gray-700">
              <svg className="w-16 h-16 mx-auto text-purple-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-2xl font-medium text-gray-300 mb-3">No projects found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {activeFilter === 'All' 
                ? "You haven't added any projects yet. Create your first project to get started."
                : `There are no projects with status "${activeFilter}". Try a different filter.`}
            </p>
            {activeFilter !== 'All' && (
              <motion.button
                onClick={() => setActiveFilter('All')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 px-6 py-2 bg-gray-800/50 text-purple-300 rounded-lg border border-gray-700 hover:bg-gray-700/50 transition"
              >
                Show All Projects
              </motion.button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Projects;