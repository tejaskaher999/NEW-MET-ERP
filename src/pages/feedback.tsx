import React, { useState } from 'react';

interface RatingGroupProps {
  title: string;
  icon: string;
  onRatingChange: (rating: number) => void;
}

function RatingGroup({ title, icon, onRatingChange }: RatingGroupProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    onRatingChange(rating);
  };

  return (
    <div className="mb-6 transform hover:scale-102 transition-transform duration-200">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-red-500 animate-bounce">{icon}</span>
        <span className="font-medium">{title}</span>
      </div>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            onClick={() => handleRatingClick(num)}
            className={`w-8 h-8 rounded-full transition-all duration-300 transform hover:scale-110 
              ${selectedRating === num 
                ? 'bg-red-500 text-white scale-105' 
                : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}

interface SelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

function Select({ label, options, value, onChange, className = '' }: SelectProps) {
  return (
    <div className={`${className} transform hover:scale-102 transition-all duration-200`}>
      <label className="block text-red-500 text-sm mb-1 animate-pulse">{label}</label>
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded-md transition-all duration-200 hover:border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 focus:border-red-500"
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

interface FeedbackFormData {
  session: string;
  semester: string;
  branch: string;
  year: string;
  division: string;
  subject: string;
  facultyName: string;
  ratings: {
    subjectKnowledge: number;
    communicationSkills: number;
    punctuality: number;
    teachingAids: number;
    teachingMethods: number;
    classroomManagement: number;
    guidance: number;
    practicalDemonstrations: number;
  };
  comments: string;
}

export default function FeedbackForm() {
  const [formData, setFormData] = useState<FeedbackFormData>({
    session: '',
    semester: '',
    branch: '',
    year: '',
    division: '',
    subject: '',
    facultyName: '',
    ratings: {
      subjectKnowledge: 0,
      communicationSkills: 0,
      punctuality: 0,
      teachingAids: 0,
      teachingMethods: 0,
      classroomManagement: 0,
      guidance: 0,
      practicalDemonstrations: 0
    },
    comments: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const sessions = [
    '2024-2025',
    '2023-2024',
    '2022-2023',
    '2021-2022',
    '2020-2021'
  ];

  const semesters = Array.from({ length: 8 }, (_, i) => `Semester ${i + 1}`);

  const branches = [
    'Computer Science and Design',
    'Computer Science and Engineering',
    'Electronics and Communication Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering',
    'Chemical Engineering',
    'Aerospace Engineering',
    'Information Technology'
  ];

  const years = [
    'First',
    'Second',
    'Third',
    'Fourth'
  ];

  const divisions = ['A', 'B', 'C', 'D'];

  const subjects = [
    'Data Structures and Algorithms',
    'Database Management Systems',
    'Computer Networks',
    'Operating Systems',
    'Software Engineering',
    'Artificial Intelligence',
    'Machine Learning',
    'Web Development',
    'Cloud Computing',
    'Cybersecurity'
  ];

  const facultyNames = [
    'Dr. John Doe',
    'Prof. Jane Smith',
    'Dr. Robert Johnson',
    'Prof. Sarah Williams'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically make an API call to submit the feedback
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated API call
      
      // Reset form after successful submission
      setFormData({
        session: '',
        semester: '',
        branch: '',
        year: '',
        division: '',
        subject: '',
        facultyName: '',
        ratings: {
          subjectKnowledge: 0,
          communicationSkills: 0,
          punctuality: 0,
          teachingAids: 0,
          teachingMethods: 0,
          classroomManagement: 0,
          guidance: 0,
          practicalDemonstrations: 0
        },
        comments: ''
      });

      alert('Feedback submitted successfully!');
    } catch (error) {
      alert('Error submitting feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateRating = (key: keyof FeedbackFormData['ratings']) => (rating: number) => {
    setFormData(prev => ({
      ...prev,
      ratings: {
        ...prev.ratings,
        [key]: rating
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 transform transition-all duration-500 hover:shadow-xl">
        <h1 className="text-center text-red-500 text-2xl font-semibold mb-8 animate-fade-in">
          Teachers Feedback Form
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Select 
            label="Session"
            options={sessions}
            value={formData.session}
            onChange={(value) => setFormData(prev => ({ ...prev, session: value }))}
          />
          <Select 
            label="Semester"
            options={semesters}
            value={formData.semester}
            onChange={(value) => setFormData(prev => ({ ...prev, semester: value }))}
          />
          <Select 
            label="Branch"
            options={branches}
            value={formData.branch}
            onChange={(value) => setFormData(prev => ({ ...prev, branch: value }))}
          />
          <Select 
            label="Year"
            options={years}
            value={formData.year}
            onChange={(value) => setFormData(prev => ({ ...prev, year: value }))}
          />
          <Select 
            label="Division"
            options={divisions}
            value={formData.division}
            onChange={(value) => setFormData(prev => ({ ...prev, division: value }))}
          />
          <Select 
            label="Subject"
            options={subjects}
            value={formData.subject}
            onChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}
          />
        </div>

        <Select 
          label="Faculty Name"
          options={facultyNames}
          value={formData.facultyName}
          onChange={(value) => setFormData(prev => ({ ...prev, facultyName: value }))}
          className="mb-8"
        />

        <div className="text-red-500 font-medium mb-4 animate-pulse">Feedback Rating</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4 transform transition-all duration-500 hover:translate-x-2">
            <RatingGroup 
              title="Subject Knowledge" 
              icon="📚" 
              onRatingChange={updateRating('subjectKnowledge')}
            />
            <RatingGroup 
              title="Communication Skills" 
              icon="💬" 
              onRatingChange={updateRating('communicationSkills')}
            />
            <RatingGroup 
              title="Punctuality" 
              icon="⏰" 
              onRatingChange={updateRating('punctuality')}
            />
            <RatingGroup 
              title="Use of Teaching Aids" 
              icon="📝" 
              onRatingChange={updateRating('teachingAids')}
            />
          </div>
          <div className="space-y-4 transform transition-all duration-500 hover:translate-x-2">
            <RatingGroup 
              title="Teaching Methods" 
              icon="📖" 
              onRatingChange={updateRating('teachingMethods')}
            />
            <RatingGroup 
              title="Classroom Management" 
              icon="👥" 
              onRatingChange={updateRating('classroomManagement')}
            />
            <RatingGroup 
              title="Availability for Guidance" 
              icon="💡" 
              onRatingChange={updateRating('guidance')}
            />
            <RatingGroup 
              title="Practical Demonstrations" 
              icon="🔧" 
              onRatingChange={updateRating('practicalDemonstrations')}
            />
          </div>
        </div>

        <div className="mt-8 transform transition-all duration-300 hover:scale-102">
          <label className="block text-red-500 text-sm mb-2">Additional Comments</label>
          <textarea
            value={formData.comments}
            onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
            placeholder="Please share any additional feedback or suggestions..."
            className="w-full h-32 p-3 border rounded-md transition-all duration-200 hover:border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 focus:border-red-500"
          />
        </div>

        <div className="mt-6 text-center">
          <button 
            type="submit"
            disabled={isSubmitting}
            className={`relative px-6 py-2 rounded-md transition-all duration-300 transform hover:scale-105 
              ${isSubmitting 
                ? 'bg-green-500 text-white cursor-not-allowed' 
                : 'bg-red-500 text-white hover:bg-red-600'}`}
          >
            <span className={`transition-opacity duration-300 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
              Submit Feedback
            </span>
            {isSubmitting && (
              <span className="absolute inset-0 flex items-center justify-center">
                ✓
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}