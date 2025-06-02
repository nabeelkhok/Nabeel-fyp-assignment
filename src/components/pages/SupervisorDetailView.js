import { motion } from 'framer-motion';
import { FaTimes, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';

const SupervisorDetailView = ({ supervisor, onBack }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{supervisor.name}</h2>
              <p className="text-gray-600">{supervisor.department} • {supervisor.university}</p>
            </div>
            <button 
              onClick={onBack}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-1">
              <img 
                src={supervisor.imageUrl} 
                alt={supervisor.name}
                className="w-full h-auto rounded-lg object-cover border border-gray-200"
              />
              <div className="mt-4 flex items-center justify-center gap-2">
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <FaCalendarAlt /> Request Meeting
                </button>
                <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition flex items-center gap-2">
                  <FaEnvelope /> Message
                </button>
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {supervisor.expertise.map((topic, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Availability</h3>
                <div className="grid grid-cols-2 gap-2">
                  {supervisor.availabilitySlots.map((slot, index) => (
                    <div key={index} className="p-2 bg-gray-50 rounded border border-gray-100">
                      <p className="font-medium">{slot.day}</p>
                      <p className="text-gray-600">{slot.time}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">About</h3>
                <p className="text-gray-700">
                  Professor {supervisor.name.split(' ')[1]} specializes in {supervisor.expertise.slice(0, 2).join(' and ')}. 
                  With over 10 years of experience in {supervisor.department}, they have supervised numerous successful research projects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SupervisorDetailView;