import { FaChevronDown, FaChevronUp, FaCheckCircle, FaClock, FaHourglassHalf } from 'react-icons/fa';

const MeetingCard = ({ meeting, isExpanded, toggleExpand }) => {
  const statusIcons = {
    Completed: <FaCheckCircle className="text-green-500" />,
    Upcoming: <FaClock className="text-blue-500" />,
    Pending: <FaHourglassHalf className="text-amber-500" />
  };

  return (
    <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden">
      <div 
        className={`p-4 flex justify-between items-center cursor-pointer ${isExpanded ? 'bg-gray-50' : ''}`}
        onClick={() => toggleExpand && toggleExpand(meeting.id)}
      >
        <div>
          <h3 className="font-semibold">{meeting.title}</h3>
          <p className="text-sm text-gray-600">{meeting.date}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-2 py-1 rounded-full text-xs ${
            meeting.status === 'Completed' ? 'bg-green-100 text-green-800' :
            meeting.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
            'bg-amber-100 text-amber-800'
          }`}>
            {meeting.status}
          </span>
          {toggleExpand && (
            isExpanded ? <FaChevronUp /> : <FaChevronDown />
          )}
        </div>
      </div>
      
      {(!toggleExpand || isExpanded) && (
        <div className="p-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Participants</h4>
              <p>{meeting.participants}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Supervisor</h4>
              <p>{meeting.supervisor}</p>
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Progress</h4>
            <div className="space-y-2">
              {meeting.progress.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.label}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500" 
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {meeting.notes && (
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Notes</h4>
              <p className="text-sm">{meeting.notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MeetingCard;