// Students.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Students = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'Sara',
      email: 'Sara@university.edu',
      project: 'Skin Disease Detection',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Nabeel Farooq',
      email: 'nabeel@university.edu',
      project: 'Speak2Design',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Zeeshan',
      email: 'shaan@university.edu',
      project: 'ForexSmartX',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      status: 'On Leave',
    },
    // Added 2 dummy students:
    {
      id: 4,
      name: 'Ayesha',
      email: 'ayesha@university.edu',
      project: 'AI Chatbot',
      avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
      status: 'Active',
    },
    {
      id: 5,
      name: 'Omar',
      email: 'omar@university.edu',
      project: 'Smart Logistics',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      status: 'On Leave',
    },
  ]);

  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    avatar: '',
    status: 'Active',
  });
  const [darkMode, setDarkMode] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const lightBg = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80';
  const darkBg = 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80';

  useEffect(() => {
    document.body.className = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  }, [darkMode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Helper function to generate a random avatar URL
  const getRandomAvatar = () => {
    const gender = Math.random() > 0.5 ? 'men' : 'women';
    const num = Math.floor(Math.random() * 100);
    return `https://randomuser.me/api/portraits/${gender}/${num}.jpg`;
  };

  const handleAddStudent = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.project.trim()) {
      alert('Please fill in all required fields (Name, Email, Project)');
      return;
    }

    const newStudent = {
      id: Date.now(),
      ...formData,
      avatar: formData.avatar.trim() || getRandomAvatar(),
    };

    setStudents((prev) => [...prev, newStudent]);
    setFormData({ name: '', email: '', project: '', avatar: '', status: 'Active' });
    setIsFormOpen(false);
  };

  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: 'beforeChildren',
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <div
      className={`min-h-screen bg-cover bg-center bg-no-repeat transition-colors duration-300 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}
      style={{ backgroundImage: `url(${darkMode ? darkBg : lightBg})` }}
    >
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 bg-opacity-80' : 'bg-white bg-opacity-90'} transition-colors duration-300`}>
        <div className="container mx-auto p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4"
          >
            <div>
              <h1 className={`text-3xl md:text-4xl font-bold ${darkMode ? 'text-indigo-300' : 'text-indigo-800'} mb-1`}>
                Student Management
              </h1>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                Total Students: <span className="font-semibold">{students.length}</span> |
                Filtered: <span className="font-semibold">{filteredStudents.length}</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <input
                type="text"
                placeholder="Search by name..."
                className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-800 border-gray-700 focus:ring-indigo-400 placeholder-gray-500 text-white' : 'bg-white border-gray-300 focus:ring-indigo-500'}`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsFormOpen(!isFormOpen)}
                  className="px-4 py-2 rounded-lg font-medium bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  {isFormOpen ? 'Cancel' : '+ Add Student'}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setDarkMode(!darkMode)}
                  className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
                >
                  {darkMode ? '☀️' : '🌙'}
                </motion.button>
              </div>
            </div>
          </motion.div>

          <AnimatePresence>
            {isFormOpen && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleAddStudent}
                className={`overflow-hidden shadow-xl rounded-xl p-6 mb-8 space-y-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
              >
                <h2 className={`text-xl md:text-2xl font-semibold ${darkMode ? 'text-indigo-300' : 'text-indigo-700'} mb-4`}>
                  Add New Student
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['name', 'email', 'project', 'avatar'].map((field) => (
                    <input
                      key={field}
                      type={field === 'email' ? 'email' : 'text'}
                      name={field}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      value={formData[field]}
                      onChange={handleInputChange}
                      className={`w-full rounded-lg px-4 py-3 border focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-indigo-400' : 'bg-white border-gray-300 text-gray-800 focus:ring-indigo-500'}`}
                      required={field !== 'avatar'}
                    />
                  ))}

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg px-4 py-3 border focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-indigo-400' : 'bg-white border-gray-300 text-gray-800 focus:ring-indigo-500'}`}
                  >
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                  </select>
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-lg font-medium bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition"
                >
                  Add Student
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Display students */}
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredStudents.map(({ id, name, email, project, avatar, status }) => (
              <motion.li
                key={id}
                variants={itemVariants}
                className={`bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center ${
                  darkMode ? 'bg-gray-800 text-gray-100' : 'text-gray-900'
                }`}
              >
                <img
                  src={avatar}
                  alt={`${name}'s avatar`}
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
                <h3 className="text-xl font-semibold">{name}</h3>
                <p className="text-sm mb-1">{email}</p>
                <p className="text-sm mb-2 italic">{project}</p>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    status === 'Active' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                  }`}
                >
                  {status}
                </span>
                <button
                  onClick={() => deleteStudent(id)}
                  className="mt-4 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </div>
  );
};

export default Students;
