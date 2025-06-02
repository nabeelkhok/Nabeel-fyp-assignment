import React, { useState } from 'react';
import { FaUser, FaBell, FaLock, FaPalette, FaSignOutAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Setting = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  const tabs = [
    { id: 'profile', icon: <FaUser />, label: 'Profile' },
    { id: 'notifications', icon: <FaBell />, label: 'Notifications' },
    { id: 'security', icon: <FaLock />, label: 'Security' },
    { id: 'appearance', icon: <FaPalette />, label: 'Appearance' }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 ease-in-out ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-4xl font-extrabold tracking-tight mb-10 border-b border-gray-300 dark:border-gray-700 pb-4">
          Settings
        </h1>
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Sidebar */}
          <aside className={`w-full md:w-72 rounded-xl shadow-lg transition-colors duration-500 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="p-5 border-b border-gray-300 dark:border-gray-700">
              <h2 className="font-semibold text-xl tracking-wide">Account Settings</h2>
            </div>
            <nav className="flex flex-col p-3 space-y-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-5 py-3 rounded-lg text-lg font-medium transition-colors 
                    ${
                      activeTab === tab.id
                        ? 'bg-indigo-500 text-white shadow-md'
                        : 'text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 dark:text-gray-300 dark:hover:bg-indigo-600 dark:hover:text-white'
                    }
                  `}
                  aria-current={activeTab === tab.id ? 'page' : undefined}
                >
                  <span className="text-xl">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
              <button
                className="mt-6 flex items-center gap-3 px-5 py-3 rounded-lg text-red-600 font-semibold hover:bg-red-100 dark:hover:bg-red-700 dark:text-red-400 transition"
                onClick={() => alert('Logging out...')}
              >
                <FaSignOutAlt className="text-xl" />
                Logout
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className={`flex-1 rounded-xl shadow-lg p-8 transition-colors duration-500 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {activeTab === 'profile' && (
                <>
                  <h2 className="text-3xl font-semibold mb-8 tracking-wide">Profile Information</h2>
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                      { label: 'Full Name', type: 'text', placeholder: 'Dr. John Smith' },
                      { label: 'Email', type: 'email', placeholder: 'john.smith@university.edu' },
                      { label: 'Department', type: 'text', placeholder: 'Computer Science' },
                      { label: 'Phone Number', type: 'tel', placeholder: '+1 (555) 123-4567' }
                    ].map(({ label, type, placeholder }) => (
                      <div key={label}>
                        <label className="block text-sm font-medium mb-2">{label}</label>
                        <input
                          type={type}
                          placeholder={placeholder}
                          className={`w-full px-5 py-3 rounded-lg border ${
                            darkMode ? 'border-gray-700 bg-gray-700 text-gray-100 placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                          } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition`}
                        />
                      </div>
                    ))}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Bio</label>
                      <textarea
                        rows={5}
                        placeholder="Tell us about yourself..."
                        className={`w-full px-5 py-3 rounded-lg border ${
                          darkMode ? 'border-gray-700 bg-gray-700 text-gray-100 placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none`}
                      />
                    </div>
                    <div className="md:col-span-2 flex justify-end">
                      <button
                        type="submit"
                        className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </>
              )}

              {activeTab === 'notifications' && (
                <>
                  <h2 className="text-3xl font-semibold mb-8 tracking-wide">Notification Preferences</h2>
                  <div className="space-y-8">
                    {[
                      {
                        title: 'Email Notifications',
                        description: 'Receive email alerts for important updates',
                        checked: emailAlerts,
                        onChange: () => setEmailAlerts(!emailAlerts),
                      },
                      {
                        title: 'Push Notifications',
                        description: 'Receive app notifications',
                        checked: notifications,
                        onChange: () => setNotifications(!notifications),
                      },
                    ].map(({ title, description, checked, onChange }) => (
                      <div key={title} className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{title}</h3>
                          <p className="text-gray-500 dark:text-gray-400">{description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={checked}
                            onChange={onChange}
                          />
                          <div className="w-12 h-6 bg-gray-300 rounded-full peer dark:bg-gray-600 peer-checked:bg-indigo-600 transition"></div>
                          <div className="absolute left-1 top-1 bg-white w-5 h-5 rounded-full shadow-md peer-checked:translate-x-6 transform transition"></div>
                        </label>
                      </div>
                    ))}

                    <div>
                      <h3 className="font-semibold text-lg mb-4">Notification Types</h3>
                      <div className="space-y-4">
                        {[
                          { id: 'meeting-reminders', label: 'Meeting Reminders' },
                          { id: 'student-updates', label: 'Student Progress Updates' },
                          { id: 'deadline-alerts', label: 'Deadline Alerts' }
                        ].map(({ id, label }) => (
                          <div key={id} className="flex items-center">
                            <input
                              id={id}
                              type="checkbox"
                              className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label htmlFor={id} className="ml-3 text-base font-medium">
                              {label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'security' && (
                <>
                  <h2 className="text-3xl font-semibold mb-8 tracking-wide">Security Settings</h2>
                  <form className="space-y-8 max-w-md">
                    {[
                      { label: 'Current Password', placeholder: 'Enter current password' },
                      { label: 'New Password', placeholder: 'Enter new password' },
                      { label: 'Confirm New Password', placeholder: 'Confirm new password' }
                    ].map(({ label, placeholder }) => (
                      <div key={label}>
                        <label className="block text-sm font-medium mb-2">{label}</label>
                        <input
                          type="password"
                          placeholder={placeholder}
                          className={`w-full px-5 py-3 rounded-lg border ${
                            darkMode ? 'border-gray-700 bg-gray-700 text-gray-100 placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                          } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition`}
                        />
                      </div>
                    ))}
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
                      >
                        Update Password
                      </button>
                    </div>
                  </form>
                </>
              )}

              {activeTab === 'appearance' && (
                <>
                  <h2 className="text-3xl font-semibold mb-8 tracking-wide">Appearance</h2>
                  <div className="flex items-center justify-between max-w-sm">
                    <div>
                      <h3 className="font-semibold text-lg">Dark Mode</h3>
                      <p className="text-gray-500 dark:text-gray-400 max-w-xs">
                        Enable dark theme for better night viewing and reduced eye strain.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                      />
                      <div className="w-14 h-7 bg-gray-300 rounded-full peer dark:bg-gray-700 peer-checked:bg-indigo-600 transition"></div>
                      <div className="absolute left-1 top-1 bg-white w-6 h-6 rounded-full shadow-md peer-checked:translate-x-7 transform transition"></div>
                    </label>
                  </div>
                </>
              )}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Setting;
