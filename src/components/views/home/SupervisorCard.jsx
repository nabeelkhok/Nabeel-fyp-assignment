import React from 'react';

const SupervisorCard = ({ name, department, expertise, availability, imageUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="p-5">
        <div className="flex items-center">
          <img 
            className="w-12 h-12 rounded-full object-cover mr-4" 
            src={imageUrl || 'https://randomuser.me/api/portraits/men/41.jpg'} 
            alt={name}
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
            <p className="text-sm text-gray-600">{department}</p>
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Expertise</h4>
          <div className="flex flex-wrap gap-2">
            {expertise.map((skill, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <span className={`text-sm px-3 py-1 rounded-full ${
            availability === 'Available' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {availability}
          </span>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View Profile →
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupervisorCard;