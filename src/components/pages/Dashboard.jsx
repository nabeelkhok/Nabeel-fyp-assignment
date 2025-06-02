import React, { useState } from 'react';
import {
  FaUserGraduate,
  FaBook,
  FaCalendarAlt,
  FaChartLine,
  FaUsersCog,
  FaLightbulb,
  FaExternalLinkAlt,
  FaArrowLeft,
  FaChalkboardTeacher,
  FaTasks,
  FaClipboardCheck,
  FaPlus,
  FaMicrophone,
  FaVideo,
  FaPhoneSlash,
  FaBolt,
  FaShareAlt,
  FaFileMedical,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';
import { motion } from 'framer-motion';

// Logo component
const Logo = () => (
  <motion.div 
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.5 }}
    className="flex items-center gap-2 text-blue-600 font-bold text-xl"
  >
    <FaChalkboardTeacher size={24} />
    <span>SupervisorHub</span>
  </motion.div>
);

const MeetingCard = ({ meeting, isExpanded, toggleExpand }) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3"
  >
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-semibold text-gray-800">{meeting.title}</h3>
        <p className="text-sm text-gray-500">With {meeting.participants}</p>
      </div>
      <span className={`text-xs px-2 py-1 rounded ${
        meeting.status === 'Completed' ? 'bg-green-100 text-green-800' :
        meeting.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {meeting.status}
      </span>
    </div>
    <div className="mt-2 text-sm">
      <p>{meeting.date}</p>
      <p className="text-gray-600">{meeting.participants} • {meeting.supervisor}</p>
    </div>
    
    {isExpanded && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        transition={{ duration: 0.3 }}
        className="mt-4"
      >
        <div className="flex justify-center space-x-4 mb-4">
          <button className="p-3 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition">
            <FaMicrophone />
          </button>
          <button className="p-3 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition">
            <FaVideo />
          </button>
          <button className="p-3 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition">
            <FaPhoneSlash />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {meeting.progress.map((item, index) => (
            <div key={index} className="text-center">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${
                    index === 0 ? 'bg-green-500' :
                    index === 1 ? 'bg-blue-500' :
                    index === 2 ? 'bg-purple-500' : 'bg-amber-500'
                  }`} 
                  style={{ width: `${item.value}%` }}
                ></div>
              </div>
              <p className="text-xs mt-1 text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
        {meeting.notes && (
          <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
            <p className="font-medium">Meeting Notes:</p>
            <p className="text-gray-600">{meeting.notes}</p>
          </div>
        )}
      </motion.div>
    )}
    
    {toggleExpand && (
      <div className="mt-3 pt-3 border-t border-gray-100 flex justify-center">
        <button 
          onClick={toggleExpand}
          className="text-blue-600 text-sm flex items-center gap-1"
        >
          {isExpanded ? (
            <>
              <FaChevronUp size={12} /> Show Less
            </>
          ) : (
            <>
              <FaChevronDown size={12} /> Show More
            </>
          )}
        </button>
      </div>
    )}
  </motion.div>
);

const CircularProgressBar = ({ percentage, color = 'blue', size = 'md' }) => {
  const dimensions = {
    sm: { width: 16, height: 16, radius: 6, stroke: 2 },
    md: { width: 24, height: 24, radius: 10, stroke: 3 },
    lg: { width: 40, height: 40, radius: 16, stroke: 4 }
  };
  
  const { width, height, radius, stroke } = dimensions[size];
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <circle
          cx={width/2}
          cy={height/2}
          r={radius}
          stroke="currentColor"
          strokeWidth={stroke}
          fill="transparent"
          className="text-gray-200"
        />
        <circle
          cx={width/2}
          cy={height/2}
          r={radius}
          stroke="currentColor"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          className={`text-${color}-500`}
          transform={`rotate(-90 ${width/2} ${height/2})`}
        />
      </svg>
      {size === 'lg' && (
        <span className="absolute text-xs font-medium">{percentage}%</span>
      )}
    </div>
  );
};

const StudentProgressTracker = ({ students }) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaUserGraduate className="text-green-500" />
          <h2 className="font-semibold">Student Progress</h2>
        </div>
        <button 
          onClick={() => setExpanded(!expanded)}
          className="text-gray-500 hover:text-gray-700"
        >
          {expanded ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
        </button>
      </div>

      {!expanded ? (
        <div className="p-3 space-y-3">
          {students.slice(0, 3).map(student => (
            <div key={student.id}>
              <div className="flex justify-between items-center text-sm mb-1">
                <span>{student.name}</span>
                <span>{student.progress}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${
                    student.id === 1 ? 'bg-green-500' :
                    student.id === 2 ? 'bg-blue-500' :
                    student.id === 3 ? 'bg-amber-500' : 'bg-purple-500'
                  }`}
                  style={{ width: `${student.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-3">
          {!selectedStudent ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {students.map(student => (
                <motion.div
                  key={student.id}
                  whileHover={{ y: -2 }}
                  onClick={() => setSelectedStudent(student)}
                  className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg cursor-pointer hover:bg-gray-50 transition"
                >
                  <div className="flex-shrink-0">
                    <CircularProgressBar 
                      percentage={student.progress} 
                      color={
                        student.id === 1 ? 'green' :
                        student.id === 2 ? 'blue' :
                        student.id === 3 ? 'amber' : 'purple'
                      }
                      size="lg"
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
                  <CircularProgressBar 
                    percentage={selectedStudent.details.literature} 
                    color="blue"
                    size="lg"
                  />
                </div>
                <div className="flex flex-col items-center p-3 border border-gray-100 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Implementation</h4>
                  <CircularProgressBar 
                    percentage={selectedStudent.details.implementation} 
                    color="green"
                    size="lg"
                  />
                </div>
                <div className="flex flex-col items-center p-3 border border-gray-100 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Documentation</h4>
                  <CircularProgressBar 
                    percentage={selectedStudent.details.documentation} 
                    color="purple"
                    size="lg"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <h4 className="text-sm font-medium mb-2">Overall Progress</h4>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${selectedStudent.progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Next Milestone: System Design Review - Due May 15, 2024
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

function App() {
  const [expandedMeetings, setExpandedMeetings] = useState({});
  const [showAllMeetings, setShowAllMeetings] = useState(false);

  const supervisors = [
    {
      name: 'Mam Fatima',
      department: 'Computer Science',
      expertise: ['Web Development','AI', 'Machine Learning', 'NLP'],
      availability: 'Available',
      imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      name: 'Prof. Salman Irfan',
      department: 'Computer Science',
      expertise: ['Web Development','Big Data', 'Data Mining', 'Cloud Computing'],
      availability: 'Limited',
      imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg'
    }
  ];

  const students = [
    { 
      id: 1, 
      name: 'Nabeel Farooq', 
      progress: 65,
      project: 'Speak2Design',
      details: {
        literature: 65,
        implementation: 45,
        documentation: 30
      }
    },
    { 
      id: 2, 
      name: 'Zeeshan Qasim', 
      progress: 85,
      project: 'Data Visualization',
      details: {
        literature: 85,
        implementation: 60,
        documentation: 40
      }
    },
    { 
      id: 3, 
      name: 'Ali', 
      progress: 95,
      project: 'ML Optimization',
      details: {
        literature: 95,
        implementation: 30,
        documentation: 20
      }
    },
    { 
      id: 4, 
      name: 'Ahmed', 
      progress: 96,
      project: 'Cloud Computing',
      details: {
        literature: 96,
        implementation: 50,
        documentation: 35
      }
    },
  ];

  const meetings = [
    {
      id: 'm1',
      title: 'Thesis Draft Review',
      participants: 'Nabeel Farooq (Speak2Design)',
      supervisor: 'Sir Salman Irfan',
      date: 'Sun, May 12, 2024 - 2:00 PM - 3:00 PM',
      status: 'Completed',
      progress: [
        { label: 'Implementation', value: 100 },
        { label: 'Documentation', value: 75 },
        { label: 'Research', value: 50 },
        { label: 'Next: System Design', value: 25 }
      ],
      notes: 'Good progress on implementation. Need to focus more on documentation in the next phase.'
    },
    {
      id: 'm2',
      title: 'Skin Disease Detection',
      participants: 'Zeeshan Qasim (Skin Disease Detection)',
      supervisor: 'Sir Abdul Ghaffar',
      date: 'Wed, May 15, 2024 - 10:00 AM - 11:00 AM',
      status: 'Upcoming',
      progress: [
        { label: 'Proposal', value: 60 },
        { label: 'Literature', value: 40 },
        { label: 'Methodology', value: 30 },
        { label: 'Next: Experiments', value: 10 }
      ]
    },
    {
      id: 'm3',
      title: 'ForexSmartX',
      participants: 'Ali (ML Project)',
      supervisor: 'Mam Fatima',
      date: 'Fri, May 17, 2024 - 3:00 PM - 4:00 PM',
      status: 'Upcoming',
      progress: [
        { label: 'Implementation', value: 70 },
        { label: 'Testing', value: 40 },
        { label: 'Documentation', value: 50 },
        { label: 'Next: Deployment', value: 20 }
      ]
    }
  ];

  const toggleMeetingExpand = (meetingId) => {
    setExpandedMeetings(prev => ({
      ...prev,
      [meetingId]: !prev[meetingId]
    }));
  };

  const AllMeetingsView = () => (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => setShowAllMeetings(false)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <FaArrowLeft /> Back to Dashboard
          </button>
          <h1 className="text-2xl font-bold text-gray-800">All Meetings</h1>
          <div></div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4">
            {meetings.map(meeting => (
              <MeetingCard 
                key={meeting.id}
                meeting={meeting}
                isExpanded={true}
                toggleExpand={null}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const DashboardView = () => (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <Logo />
            <div className="text-right">
              <h1 className="text-2xl font-bold text-gray-800">Supervisor Dashboard</h1>
              <p className="text-sm text-gray-500">Manage academic supervision</p>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg flex flex-col md:flex-row justify-between items-center mb-6"
          >
            <div className="flex items-center mb-3 md:mb-0">
              <img 
                src="https://randomuser.me/api/portraits/men/75.jpg" 
                alt="Profile" 
                className="w-10 h-10 rounded-full mr-3 border-2 border-white"
              />
              <span className="font-medium">Welcome back, Dr. Chen!</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
              <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition">
                <FaPlus size={12} /> New Meeting
              </button>
              <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition">
                <FaCalendarAlt size={12} /> Schedule
              </button>
              <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition">
                <FaShareAlt size={12} /> Share
              </button>
              <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition">
                <FaTasks size={12} /> Tasks
              </button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"
        >
          <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                <FaUserGraduate size={16} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Students</p>
                <p className="font-semibold">5 Active</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-100 rounded-full text-green-600">
                <FaBook size={16} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Projects</p>
                <p className="font-semibold">3 Ongoing</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-100 rounded-full text-purple-600">
                <FaCalendarAlt size={16} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Meetings</p>
                <p className="font-semibold">2 Today</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-amber-100 rounded-full text-amber-600">
                <FaChartLine size={16} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Progress</p>
                <p className="font-semibold">78% Avg</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <div className="p-3 border-b border-gray-200 flex items-center gap-2">
                <FaUsersCog className="text-blue-600" />
                <h2 className="font-semibold">Available Supervisors</h2>
              </div>
              <div className="p-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                {supervisors.map((supervisor, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -2 }}
                    className="flex items-center gap-3 p-2 border border-gray-100 rounded-lg"
                  >
                    <img 
                      src={supervisor.imageUrl} 
                      alt={supervisor.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium">{supervisor.name}</h3>
                      <p className="text-xs text-gray-500">{supervisor.department}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <div className="p-3 border-b border-gray-200 flex items-center gap-2">
                <FaTasks className="text-green-600" />
                <h2 className="font-semibold">Project Overview</h2>
              </div>
              <div className="p-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="border border-gray-100 rounded-lg p-3">
                    <h3 className="font-medium text-gray-800 mb-2">AI Research Project</h3>
                    <p className="text-sm text-gray-600 mb-3">Exploring neural network architectures for NLP tasks</p>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-3/4"></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">75% complete</p>
                  </div>
                  <div className="border border-gray-100 rounded-lg p-3">
                    <h3 className="font-medium text-gray-800 mb-2">Data Visualization</h3>
                    <p className="text-sm text-gray-600 mb-3">Interactive dashboards for healthcare data</p>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-1/2"></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">50% complete</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-purple-600" />
                  <h2 className="font-semibold">Recent Meetings</h2>
                </div>
                <button 
                  onClick={() => setShowAllMeetings(true)}
                  className="text-xs flex items-center gap-1 text-purple-600"
                >
                  View All <FaExternalLinkAlt size={10} />
                </button>
              </div>
              <div className="p-3">
                {meetings.slice(0, 2).map(meeting => (
                  <MeetingCard 
                    key={meeting.id}
                    meeting={meeting}
                    isExpanded={expandedMeetings[meeting.id]}
                    toggleExpand={() => toggleMeetingExpand(meeting.id)}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <div className="p-3 border-b border-gray-200">
                <h2 className="font-semibold flex items-center gap-2">
                  <FaLightbulb className="text-amber-500" />
                  Quick Actions
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-3 p-3">
                <motion.button
                  whileHover={{ y: -3 }}
                  className="flex flex-col items-center justify-center p-4 border border-gray-100 rounded-lg hover:bg-blue-50 transition"
                >
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-full mb-2">
                    <FaBolt size={16} />
                  </div>
                  <span className="text-sm font-medium">Quick Notes</span>
                </motion.button>
                <motion.button
                  whileHover={{ y: -3 }}
                  className="flex flex-col items-center justify-center p-4 border border-gray-100 rounded-lg hover:bg-green-50 transition"
                >
                  <div className="p-3 bg-green-100 text-green-600 rounded-full mb-2">
                    <FaShareAlt size={16} />
                  </div>
                  <span className="text-sm font-medium">Share Screen</span>
                </motion.button>
                <motion.button
                  whileHover={{ y: -3 }}
                  className="flex flex-col items-center justify-center p-4 border border-gray-100 rounded-lg hover:bg-purple-50 transition"
                >
                  <div className="p-3 bg-purple-100 text-purple-600 rounded-full mb-2">
                    <FaFileMedical size={16} />
                  </div>
                  <span className="text-sm font-medium">New Document</span>
                </motion.button>
                <motion.button
                  whileHover={{ y: -3 }}
                  className="flex flex-col items-center justify-center p-4 border border-gray-100 rounded-lg hover:bg-amber-50 transition"
                >
                  <div className="p-3 bg-amber-100 text-amber-600 rounded-full mb-2">
                    <FaChartLine size={16} />
                  </div>
                  <span className="text-sm font-medium">Analytics</span>
                </motion.button>
              </div>
            </motion.div>

            <StudentProgressTracker students={students} />
          </div>
        </div>
      </div>
    </div>
  );

  return showAllMeetings ? <AllMeetingsView /> : <DashboardView />;
}

export default App;