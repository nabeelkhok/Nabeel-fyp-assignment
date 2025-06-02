import React from 'react'

function ProjectCardComponent() {
  return (
    <div>
      

<div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
  <div className="p-5">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">E-Commerce Platform</h3>
        <p className="text-sm text-gray-500">CS-401 • Spring 2024</p>
      </div>
      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>
    </div>
    <p className="mt-3 text-gray-600 text-sm">Developing a full-stack e-commerce solution with React and Node.js</p>
    <div className="mt-4 flex items-center justify-between">
      <div className="flex -space-x-2">
        <img className="w-8 h-8 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/women/12.jpg" alt="Student 1" />
        <img className="w-8 h-8 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/men/32.jpg" alt="Student 2" />
      </div>
      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View Details →</button>
    </div>
  </div>
</div>



    </div>
  )
}

export default ProjectCardComponent
