export const meetings = [
  {
    id: 'm1',
    title: 'Thesis Draft Review',
    participants: 'Sarah Johnson (AI Project)',
    supervisor: 'Dr. Robert Chen',
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
  // More meetings...
];

export const supervisors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    department: 'Computer Science',
    university: 'Stanford University',
    expertise: ['AI', 'Machine Learning', 'NLP'],
    availability: 'Available',
    rating: 4.8,
    reviews: 42,
    imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    availabilitySlots: [
      { day: 'Monday', time: '9:00 AM - 12:00 PM' },
      { day: 'Wednesday', time: '2:00 PM - 5:00 PM' },
      { day: 'Friday', time: '10:00 AM - 1:00 PM' }
    ]
  },
  // More supervisors...
];

export const students = [
  { 
    id: 1, 
    name: 'Sarah Johnson', 
    progress: 85,
    project: 'AI Research Project',
    details: {
      literature: 85,
      implementation: 45,
      documentation: 30
    }
  },
  // More students...
];