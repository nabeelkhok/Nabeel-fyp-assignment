import React, { useState } from 'react';
import { FaVideo, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaPlus, FaEdit, FaTrash, FaCheck } from 'react-icons/fa';
import { MdMeetingRoom } from 'react-icons/md';

const Meetings = () => {
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      title: "Project Milestone Review",
      date: "2023-06-15",
      time: "14:00",
      duration: "1 hour",
      type: "Virtual",
      participants: ["Alice Johnson", "Bob Smith"],
      status: "Upcoming"
    },
    {
      id: 2,
      title: "Thesis Proposal Discussion",
      date: "2023-06-10",
      time: "11:30",
      duration: "45 mins",
      type: "In-Person",
      location: "Room 302, CS Building",
      participants: ["Charlie Brown"],
      status: "Completed"
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newMeeting, setNewMeeting] = useState({
    title: "",
    date: "",
    time: "",
    duration: "30 mins",
    type: "Virtual",
    location: "",
    participants: [],
    status: "Upcoming"
  });

  const handleStartMeeting = (id) => {
    alert(`Starting meeting with ID: ${id}`);
    // Here you would typically integrate with your video conferencing API
  };

  const handleReschedule = (id) => {
    alert(`Rescheduling meeting with ID: ${id}`);
    // Implement rescheduling logic
  };

  const handleDeleteMeeting = (id) => {
    setMeetings(meetings.filter(meeting => meeting.id !== id));
  };

  const handleAddMeeting = () => {
    const newId = Math.max(...meetings.map(m => m.id), 0) + 1;
    setMeetings([...meetings, { ...newMeeting, id: newId }]);
    setShowModal(false);
    setNewMeeting({
      title: "",
      date: "",
      time: "",
      duration: "30 mins",
      type: "Virtual",
      location: "",
      participants: [],
      status: "Upcoming"
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMeeting({ ...newMeeting, [name]: value });
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}>
      {/* Changed the overlay to be lighter */}
      <div className="min-h-screen bg-white bg-opacity-30">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              <MdMeetingRoom className="inline mr-2" />
              My Meetings
            </h1>
            <button 
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center shadow-lg hover:shadow-xl"
            >
              <FaPlus className="mr-2" />
              Schedule Meeting
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {meetings.map(meeting => (
                <div 
                  key={meeting.id} 
                  className={`bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition transform hover:-translate-y-1 border-l-4 ${
                    meeting.status === 'Completed' ? 'border-green-500' : 'border-blue-500'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-800">{meeting.title}</h3>
                      <div className="flex flex-wrap gap-4 mb-3">
                        <div className="flex items-center text-gray-700">
                          <FaCalendarAlt className="mr-2 text-blue-600" />
                          <span>{meeting.date} at {meeting.time}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <FaClock className="mr-2 text-blue-600" />
                          <span>{meeting.duration}</span>
                        </div>
                        {meeting.type === 'Virtual' ? (
                          <div className="flex items-center text-gray-700">
                            <FaVideo className="mr-2 text-blue-600" />
                            <span>Virtual Meeting</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-gray-700">
                            <FaMapMarkerAlt className="mr-2 text-blue-600" />
                            <span>{meeting.location}</span>
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-gray-600 mb-1">Participants:</h4>
                        <div className="flex flex-wrap gap-2">
                          {meeting.participants.map((participant, index) => (
                            <span 
                              key={index} 
                              className="bg-blue-100 px-3 py-1 rounded-full text-sm text-blue-800"
                            >
                              {participant}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      meeting.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {meeting.status}
                    </span>
                  </div>
                  <div className="flex justify-end space-x-3 mt-4">
                    {meeting.status === 'Upcoming' && (
                      <button 
                        onClick={() => handleStartMeeting(meeting.id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm flex items-center shadow hover:shadow-md"
                      >
                        <FaVideo className="mr-2" />
                        Start Meeting
                      </button>
                    )}
                    <button 
                      onClick={() => handleReschedule(meeting.id)}
                      className="border border-blue-300 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-50 transition text-sm flex items-center shadow hover:shadow-md"
                    >
                      <FaEdit className="mr-2" />
                      Reschedule
                    </button>
                    <button 
                      onClick={() => handleDeleteMeeting(meeting.id)}
                      className="border border-red-300 text-red-700 px-4 py-2 rounded-lg hover:bg-red-50 transition text-sm flex items-center shadow hover:shadow-md"
                    >
                      <FaTrash className="mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-6">
              <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Upcoming Schedule</h2>
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <div className="text-center text-blue-800 font-medium mb-2">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </div>
                  <div className="space-y-3">
                    {meetings
                      .filter(meeting => meeting.status === 'Upcoming')
                      .sort((a, b) => {
                        const dateA = new Date(`${a.date}T${a.time}`);
                        const dateB = new Date(`${b.date}T${b.time}`);
                        return dateA - dateB;
                      })
                      .map(meeting => (
                        <div key={meeting.id} className="bg-white p-3 rounded-lg shadow-sm border border-blue-100">
                          <div className="font-medium text-blue-700">{meeting.title}</div>
                          <div className="text-sm text-gray-600">
                            {meeting.time} • {meeting.duration}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="aspect-w-1 aspect-h-1">
                  <iframe 
                    src="https://calendar.google.com/calendar/embed?height=300&wkst=1&bgcolor=%23ffffff&ctz=America%2FNew_York&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=0&showCalendars=0&showTz=0&mode=AGENDA" 
                    className="w-full h-96 border-0 rounded-lg"
                    frameBorder="0" 
                    scrolling="no"
                    title="Google Calendar"
                  ></iframe>
                </div>
              </div>
              
              <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-lg p-6">
                <h3 className="font-medium mb-3 text-gray-800">Meeting Best Practices</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-blue-700 mb-1">Before the Meeting:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li className="flex items-start">
                        <FaCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span>Define clear objectives and agenda</span>
                      </li>
                      <li className="flex items-start">
                        <FaCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span>Invite only necessary participants</span>
                      </li>
                      <li className="flex items-start">
                        <FaCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span>Share materials in advance</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-blue-700 mb-1">During the Meeting:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li className="flex items-start">
                        <FaCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span>Start and end on time</span>
                      </li>
                      <li className="flex items-start">
                        <FaCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span>Assign a note-taker</span>
                      </li>
                      <li className="flex items-start">
                        <FaCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span>Stick to the agenda</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-blue-700 mb-1">After the Meeting:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li className="flex items-start">
                        <FaCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span>Share meeting notes and action items</span>
                      </li>
                      <li className="flex items-start">
                        <FaCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span>Follow up on assigned tasks</span>
                      </li>
                      <li className="flex items-start">
                        <FaCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span>Schedule follow-ups if needed</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Meeting Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Schedule New Meeting</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Title</label>
                <input
                  type="text"
                  name="title"
                  value={newMeeting.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter meeting title"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={newMeeting.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    name="time"
                    value={newMeeting.time}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <select
                  name="duration"
                  value={newMeeting.duration}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="15 mins">15 minutes</option>
                  <option value="30 mins">30 minutes</option>
                  <option value="45 mins">45 minutes</option>
                  <option value="1 hour">1 hour</option>
                  <option value="1.5 hours">1.5 hours</option>
                  <option value="2 hours">2 hours</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Type</label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value="Virtual"
                      checked={newMeeting.type === "Virtual"}
                      onChange={handleInputChange}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2">Virtual</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value="In-Person"
                      checked={newMeeting.type === "In-Person"}
                      onChange={handleInputChange}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2">In-Person</span>
                  </label>
                </div>
              </div>
              
              {newMeeting.type === "In-Person" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={newMeeting.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter meeting location"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Participants (comma separated)</label>
                <input
                  type="text"
                  name="participants"
                  value={newMeeting.participants.join(", ")}
                  onChange={(e) => {
                    const participants = e.target.value.split(",").map(p => p.trim()).filter(p => p);
                    setNewMeeting({ ...newMeeting, participants });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Alice Johnson, Bob Smith"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMeeting}
                disabled={!newMeeting.title || !newMeeting.date || !newMeeting.time}
                className={`px-4 py-2 rounded-lg text-white transition ${!newMeeting.title || !newMeeting.date || !newMeeting.time ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                Schedule Meeting
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Meetings;