import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaUserGraduate } from 'react-icons/fa';
import { motion } from 'framer-motion';

const CircularProgress = ({ percentage, color }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-24 h-24">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-gray-200"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
        <circle
          className={`text-${color}-500`}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <span className="text-lg font-semibold">{percentage}%</span>
      </div>
    </div>
  );
};

const StudentProgressTracker = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const students = [
    { 
      id: 1, 
      name: 'Nabeel Farooq', 
      progress: { literature: 65, implementation: 45, documentation: 30 },
      project: 'AI Research Project'
    },
    { 
      id: 2, 
      name: 'Zeeshan Qasim', 
      progress: { literature: 85, implementation: 60, documentation: 40 },
      project: 'Data Visualization'
    },
    { 
      id: 3, 
      name: 'Ali', 
      progress: { literature: 95, implementation: 30, documentation: 20 },
      project: 'ML Optimization'
    },
    { 
      id: 4, 
      name: 'Ahmed ', 
      progress: { literature: 80, implementation: 50, documentation: 35 },
      project: 'Cloud Computing'
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200"
    >
      <div className="p-3 border-b border-gray-200">
        <h2 className="font-semibold flex items-center gap-2">
          <FaUserGraduate className="text-green-500" />
          Student Progress
          <button 
            onClick={() => setExpanded(!expanded)}
            className="ml-auto text-gray-500 hover:text-gray-700"
          >
            {expanded ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
          </button>
        </h2>
      </div>
      
      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="p-3"
        >
          {!selectedStudent ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {students.map(student => (
                <motion.div
                  key={student.id}
                  whileHover={{ y: -3 }}
                  onClick={() => setSelectedStudent(student)}
                  className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg cursor-pointer hover:bg-gray-50 transition"
                >
                  <div className="flex-shrink-0">
                    <CircularProgress 
                      percentage={Math.round(
                        (student.progress.literature + 
                         student.progress.implementation + 
                         student.progress.documentation) / 3
                      )} 
                      color="blue" 
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{student.name}</h3>
                    <p className="text-sm text-gray-500">{student.project}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{selectedStudent.name}'s Progress</h3>
                <button 
                  onClick={() => setSelectedStudent(null)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Back to all students
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex flex-col items-center p-3 border border-gray-100 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Literature Review</h4>
                  <CircularProgress percentage={selectedStudent.progress.literature} color="blue" />
                </div>
                <div className="flex flex-col items-center p-3 border border-gray-100 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Implementation</h4>
                  <CircularProgress percentage={selectedStudent.progress.implementation} color="green" />
                </div>
                <div className="flex flex-col items-center p-3 border border-gray-100 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Documentation</h4>
                  <CircularProgress percentage={selectedStudent.progress.documentation} color="purple" />
                </div>
              </div>
              
              <div className="pt-3 border-t border-gray-200">
                <h4 className="text-sm font-medium mb-2">Overall Progress</h4>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{
                      width: `${(
                        selectedStudent.progress.literature + 
                        selectedStudent.progress.implementation + 
                        selectedStudent.progress.documentation
                      ) / 3}%`
                    }} 
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Next Milestone: System Design Review - Due May 15, 2024
                </p>
              </div>
            </div>
          )}
        </motion.div>
      )}
      
      {!expanded && (
        <div className="p-3 space-y-3">
          {students.slice(0, 3).map(student => (
            <div key={student.id}>
              <div className="flex justify-between text-sm mb-1">
                <span>{student.name}</span>
                <span>{Math.round(
                  (student.progress.literature + 
                   student.progress.implementation + 
                   student.progress.documentation) / 3
                )}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${
                    student.id === 1 ? 'bg-green-500' :
                    student.id === 2 ? 'bg-blue-500' :
                    student.id === 3 ? 'bg-amber-500' : 'bg-purple-500'
                  }`}
                  style={{
                    width: `${(
                      student.progress.literature + 
                      student.progress.implementation + 
                      student.progress.documentation
                    ) / 3}%`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default StudentProgressTracker;