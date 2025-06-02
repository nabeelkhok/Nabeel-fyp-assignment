import React, { useState, useEffect } from 'react';

function MeetingScheduleComponent() {
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      title: "Progress Review",
      description: "With Team A (E-Commerce Project)",
      date: "2024-05-10",
      time: "10:00 AM - 10:30 AM",
      participants: ["John Doe", "Jane Smith", "Mike Johnson"],
      agenda: "Review Q2 progress and discuss next milestones",
      color: "blue"
    },
    {
      id: 2,
      title: "Thesis Draft Review",
      description: "With Sarah Johnson (AI Project)",
      date: "2024-05-12",
      time: "2:00 PM - 3:00 PM",
      participants: ["Sarah Johnson", "Dr. Robert Chen"],
      agenda: "Review chapter 3 of the thesis draft and provide feedback",
      color: "green"
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMeeting, setNewMeeting] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    participants: "",
    agenda: "",
    color: "blue"
  });
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const meetingNotification = {
      id: Date.now(),
      title: "New Meeting Scheduled",
      message: "Thesis Draft Review with Sarah Johnson",
      fullMessage: "A new meeting 'Thesis Draft Review' with Sarah Johnson has been scheduled for May 12, 2024 from 2:00 PM to 3:00 PM.",
      time: "Just now",
      icon: "calendar",
      read: false
    };
    setNotifications([meetingNotification]);
  }, []);

  const openMeetingDetails = (meeting) => {
    setSelectedMeeting(meeting);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMeeting(null);
  };

  const handleAddMeeting = () => {
    const meeting = {
      id: Date.now(),
      ...newMeeting,
      participants: newMeeting.participants.split(',').map(p => p.trim())
    };
    
    setMeetings([...meetings, meeting]);
    
    const notification = {
      id: Date.now() + 1,
      title: "New Meeting Scheduled",
      message: `${newMeeting.title} with ${newMeeting.description}`,
      fullMessage: `A new meeting '${newMeeting.title}' has been scheduled for ${newMeeting.date} from ${newMeeting.time}.\n\nParticipants: ${newMeeting.participants}\n\nAgenda: ${newMeeting.agenda}`,
      time: "Just now",
      icon: "calendar",
      read: false
    };
    
    setNotifications([...notifications, notification]);
    setShowAddForm(false);
    setNewMeeting({
      title: "",
      description: "",
      date: "",
      time: "",
      participants: "",
      agenda: "",
      color: "blue"
    });
  };

  const getColorClasses = (color) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-800';
      case 'green': return 'bg-green-100 text-green-800';
      case 'red': return 'bg-red-100 text-red-800';
      case 'purple': return 'bg-purple-100 text-purple-800';
      case 'yellow': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Meeting Schedule</h1>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {showAddForm ? 'Cancel' : 'Schedule New Meeting'}
          </button>
        </div>

        {/* Add Meeting Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Schedule New Meeting</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
                  <input
                    type="text"
                    value={newMeeting.title}
                    onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Meeting title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
                  <input
                    type="text"
                    value={newMeeting.description}
                    onChange={(e) => setNewMeeting({...newMeeting, description: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="With whom (description)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date*</label>
                  <input
                    type="date"
                    value={newMeeting.date}
                    onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time*</label>
                  <input
                    type="text"
                    value={newMeeting.time}
                    onChange={(e) => setNewMeeting({...newMeeting, time: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="2:00 PM - 3:00 PM"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Participants (comma separated)</label>
                  <input
                    type="text"
                    value={newMeeting.participants}
                    onChange={(e) => setNewMeeting({...newMeeting, participants: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John Doe, Jane Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Color Theme</label>
                  <select
                    value={newMeeting.color}
                    onChange={(e) => setNewMeeting({...newMeeting, color: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="red">Red</option>
                    <option value="purple">Purple</option>
                    <option value="yellow">Yellow</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Agenda</label>
              <textarea
                value={newMeeting.agenda}
                onChange={(e) => setNewMeeting({...newMeeting, agenda: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Meeting agenda"
              ></textarea>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleAddMeeting}
                disabled={!newMeeting.title || !newMeeting.date || !newMeeting.time}
                className={`px-6 py-2 rounded-md text-white font-medium ${(!newMeeting.title || !newMeeting.date || !newMeeting.time) ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}
              >
                Schedule Meeting
              </button>
            </div>
          </div>
        )}

        {/* Meetings List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Upcoming Meetings</h2>
          </div>
          
          {meetings.length === 0 ? (
            <div className="p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No meetings scheduled</h3>
              <p className="mt-1 text-gray-500">Get started by scheduling a new meeting.</p>
              <div className="mt-6">
                <button
                  onClick={() => setShowAddForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  New Meeting
                </button>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {meetings.map((meeting) => (
                <div 
                  key={meeting.id} 
                  className="p-6 hover:bg-gray-50 transition-colors cursor-pointer flex items-start"
                  onClick={() => openMeetingDetails(meeting)}
                >
                  <div className={`rounded-lg p-3 mr-4 ${getColorClasses(meeting.color)}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">{meeting.title}</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {new Date(meeting.date) > new Date() ? 'Upcoming' : 'Completed'}
                      </span>
                    </div>
                    <p className="mt-1 text-gray-600">{meeting.description}</p>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {new Date(meeting.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })} • {meeting.time}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {meeting.participants.slice(0, 3).map((participant, index) => (
                        <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {participant}
                        </span>
                      ))}
                      {meeting.participants.length > 3 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          +{meeting.participants.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  <button 
                    className="ml-4 text-blue-600 hover:text-blue-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      openMeetingDetails(meeting);
                    }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Meeting Details Modal */}
      {showModal && selectedMeeting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className={`px-8 py-6 ${getColorClasses(selectedMeeting.color)} rounded-t-lg flex justify-between items-center`}>
              <div>
                <h3 className="text-2xl font-bold text-white">{selectedMeeting.title}</h3>
                <p className="mt-1 text-blue-100">{selectedMeeting.description}</p>
              </div>
              <button 
                onClick={closeModal}
                className="text-white hover:text-blue-200"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Date & Time</h4>
                  <div className="mt-4 flex items-center">
                    <svg className="h-6 w-6 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="text-lg font-medium text-gray-900">
                        {new Date(selectedMeeting.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                      <p className="text-gray-600">{selectedMeeting.time}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Participants</h4>
                  <ul className="mt-4 space-y-3">
                    {selectedMeeting.participants.map((participant, index) => (
                      <li key={index} className="flex items-center">
                        <span className={`h-3 w-3 rounded-full mr-3 ${getColorClasses(selectedMeeting.color)}`}></span>
                        <span className="text-gray-900">{participant}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Agenda</h4>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="whitespace-pre-line text-gray-700">{selectedMeeting.agenda}</p>
                </div>
              </div>
              <div className="mt-8 flex space-x-4">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md font-medium transition-colors flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Join Meeting
                </button>
                <button className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-md font-medium transition-colors flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Meeting
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MeetingScheduleComponent;