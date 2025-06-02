import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationMessageView = ({ notification, onClose, onMarkAsRead, onBack }) => {
  useEffect(() => {
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
  }, [notification.id, notification.read, onMarkAsRead]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-900/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-gray-700 bg-gray-900/50 flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={onBack}
              className="mr-3 text-gray-400 hover:text-white transition-colors"
              aria-label="Back to notifications"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <h3 className="text-xl font-bold">{notification.title}</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close notification"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-400">From: System</span>
            <span className="text-sm text-gray-400">{notification.time}</span>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4">
            <p className="whitespace-pre-line text-gray-300">{notification.message}</p>
          </div>
          {notification.actions && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Actions</h4>
              <div className="flex space-x-3">
                {notification.actions.map((action, index) => (
                  <button
                    key={index}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium transition-colors"
                    onClick={() => {
                      action.onClick();
                      onClose();
                    }}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const NotificationCenter = ({ notifications, onClose, onMarkAllAsRead, onNotificationClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-900/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-gray-700 bg-gray-900/50 flex justify-between items-center">
          <h3 className="text-xl font-bold">Notification Center</h3>
          <div className="flex space-x-3">
            <button 
              onClick={onMarkAllAsRead}
              className="text-sm text-purple-300 hover:text-white transition-colors"
            >
              Mark all as read
            </button>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        <div className="overflow-y-auto flex-1">
          {notifications.length > 0 ? (
            <div className="divide-y divide-gray-700">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 hover:bg-gray-700/50 transition-colors cursor-pointer ${!notification.read ? 'bg-gray-800/50' : ''}`}
                  onClick={() => onNotificationClick(notification)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-lg">{notification.title}</h4>
                      <p className="text-gray-300 mt-1 line-clamp-2">{notification.message}</p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{notification.time}</span>
                  </div>
                  {!notification.read && (
                    <div className="mt-2 inline-block px-2 py-0.5 text-xs bg-blue-500/20 text-blue-300 rounded-full">
                      New
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="mt-2">No notifications available</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const NotificationPanel = () => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationCenterOpen, setNotificationCenterOpen] = useState(false);
  const [messageViewOpen, setMessageViewOpen] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(null);
  const [notificationCount, setNotificationCount] = useState(3);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Meeting Reminder',
      message: 'Your meeting with John is in 30 minutes.\n\nLocation: Conference Room B\nAgenda: Project progress review\n\nPlease bring your updated project timeline and any blockers you\'re facing.',
      time: '10 mins ago',
      read: false,
      actions: [
        {
          label: 'Join Meeting',
          onClick: () => console.log('Joining meeting...')
        },
        {
          label: 'Reschedule',
          onClick: () => console.log('Rescheduling...')
        }
      ]
    },
    {
      id: 2,
      title: 'Project Update',
      message: 'Sarah submitted her progress report for the FYP project.\n\nKey updates:\n- Completed module A testing\n- Implemented new authentication flow\n- Needs feedback on UI redesign\n\nPlease review and provide feedback by Friday.',
      time: '2 hours ago',
      read: false
    },
    {
      id: 3,
      title: 'System Alert',
      message: 'New software update available for your dashboard.\n\nVersion: 2.3.1\nChanges:\n- Fixed security vulnerabilities\n- Improved performance\n- Added dark mode toggle\n\nRecommended to update at your earliest convenience.',
      time: '1 day ago',
      read: true
    }
  ]);
  
  const notificationRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleNotifications = () => {
    setNotificationOpen(!notificationOpen);
    if (!notificationOpen) {
      markAllAsRead();
    }
  };

  const openNotificationCenter = () => {
    setNotificationOpen(false);
    setNotificationCenterOpen(true);
    markAllAsRead();
  };

  const closeNotificationCenter = () => {
    setNotificationCenterOpen(false);
  };

  const openMessageView = (notification) => {
    setCurrentNotification(notification);
    setMessageViewOpen(true);
    setNotificationOpen(false);
    setNotificationCenterOpen(false);
  };

  const closeMessageView = () => {
    setMessageViewOpen(false);
  };

  const markAsRead = (id) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
    setNotificationCount(updatedNotifications.filter(n => !n.read).length);
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }));
    setNotifications(updatedNotifications);
    setNotificationCount(0);
  };

  return (
    <div className="relative ml-4" ref={notificationRef}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleNotifications}
        className="p-2 rounded-full relative hover:bg-gray-700/50 transition-colors"
        aria-label="Notifications"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6 text-purple-300" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {notificationCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {notificationCount}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {notificationOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden z-50"
          >
            <div className="px-4 py-3 border-b border-gray-700 bg-gray-900 flex justify-between items-center">
              <h3 className="font-semibold text-lg">Notifications</h3>
              <button 
                className="text-sm text-purple-300 hover:text-white"
                onClick={markAllAsRead}
              >
                Mark all as read
              </button>
            </div>
            <div className="divide-y divide-gray-700 max-h-96 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`px-4 py-3 hover:bg-gray-700/50 cursor-pointer transition-colors ${!notification.read ? 'bg-gray-800/50' : ''}`}
                    onClick={() => openMessageView(notification)}
                  >
                    <div className="flex justify-between">
                      <h4 className="font-medium">{notification.title}</h4>
                      <span className="text-xs text-gray-400">{notification.time}</span>
                    </div>
                    <p className="text-sm text-gray-300 mt-1 line-clamp-2">{notification.message}</p>
                    {!notification.read && (
                      <div className="mt-2 w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-400">
                  No notifications
                </div>
              )}
            </div>
            <div className="px-4 py-2 border-t border-gray-700 bg-gray-900 text-center">
              <button 
                className="text-sm text-purple-300 hover:text-white"
                onClick={openNotificationCenter}
              >
                View all notifications
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {notificationCenterOpen && (
          <NotificationCenter 
            notifications={notifications}
            onClose={closeNotificationCenter}
            onMarkAllAsRead={markAllAsRead}
            onNotificationClick={openMessageView}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {messageViewOpen && currentNotification && (
          <NotificationMessageView 
            notification={currentNotification}
            onClose={() => {
              setMessageViewOpen(false);
              setNotificationCenterOpen(false);
            }}
            onMarkAsRead={markAsRead}
            onBack={() => {
              setMessageViewOpen(false);
              setNotificationCenterOpen(true);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationPanel;