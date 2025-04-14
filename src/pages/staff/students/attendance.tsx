import React, { useState, useEffect, ReactElement } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FaSearch, FaCalendarAlt, FaSave, FaHistory, FaFileExport } from 'react-icons/fa';
import StaffLayout from '@/components/Layout/StaffLayout';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

// Mock student data from your existing list
const mockStudents = [
  {
    id: 'N04112100064',
    name: 'Lachake Atharva Santosh',
    year: 'Fourth',
    division: 'A',
    branch: 'Computer Science and Design',
    status: 'Active'
  },
  {
    id: 'N04112100065',
    name: 'John Smith',
    year: 'Third',
    division: 'B',
    branch: 'Computer Science',
    status: 'Active'
  },
  {
    id: 'N04112100066',
    name: 'Sara Jones',
    year: 'Fourth',
    division: 'A',
    branch: 'Information Technology',
    status: 'Active'
  },
  {
    id: 'N04112100067',
    name: 'Raj Patel',
    year: 'Second',
    division: 'C',
    branch: 'Electrical Engineering',
    status: 'Active'
  },
  {
    id: 'N04112100068',
    name: 'Priya Sharma',
    year: 'First',
    division: 'B',
    branch: 'Mechanical Engineering',
    status: 'Active'
  }
];

const subjects = [
  'Data Structures and Algorithms',
  'Database Management Systems',
  'Operating Systems',
  'Computer Networks',
  'Software Engineering',
  'Machine Learning',
  'Web Development'
];

const AttendancePage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState(mockStudents);
  const [attendance, setAttendance] = useState<Record<string, 'present' | 'absent' | 'late'>>({});

  // Get unique values for filters
  const years = Array.from(new Set(students.map(student => student.year)));
  const divisions = Array.from(new Set(students.map(student => student.division)));
  const branches = Array.from(new Set(students.map(student => student.branch)));

  // Filter students based on selected filters and search term
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        student.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = selectedYear ? student.year === selectedYear : true;
    const matchesDivision = selectedDivision ? student.division === selectedDivision : true;
    const matchesBranch = selectedBranch ? student.branch === selectedBranch : true;
    
    return matchesSearch && matchesYear && matchesDivision && matchesBranch;
  });

  // Initialize attendance when filtered students change
  useEffect(() => {
    // Create default attendance records for each student (not marked)
    const initialAttendance: Record<string, 'present' | 'absent' | 'late'> = {};
    filteredStudents.forEach(student => {
      // If no attendance is set yet for this student
      if (!attendance[student.id]) {
        initialAttendance[student.id] = 'present'; // Default to present
      } else {
        initialAttendance[student.id] = attendance[student.id];
      }
    });
    setAttendance(initialAttendance);
  }, [filteredStudents]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleMarkAttendance = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendance(prev => {
      // If the same status is clicked again, we keep it (don't toggle off)
      // Otherwise we set the new status
      return {
        ...prev,
        [studentId]: status
      };
    });
    
    // Optional: Add visual feedback
    const studentRow = document.getElementById(`student-${studentId}`);
    if (studentRow) {
      studentRow.classList.add('bg-gray-50');
      setTimeout(() => {
        studentRow.classList.remove('bg-gray-50');
      }, 200);
    }
  };

  const handleSaveAttendance = () => {
    // Here you would typically send this data to your backend
    console.log('Saving attendance:', {
      date: selectedDate,
      year: selectedYear,
      division: selectedDivision,
      branch: selectedBranch,
      subject: selectedSubject,
      attendance
    });
    alert('Attendance saved successfully!');
  };

  const handleExportAttendance = () => {
    // Similar to your export function in the student list
    const headers = ['Student ID', 'Name', 'Year', 'Division', 'Branch', 'Status'];
    
    // Format the student data
    const data = filteredStudents.map(student => [
      student.id,
      student.name,
      student.year,
      student.division,
      student.branch,
      attendance[student.id] || 'not marked'
    ]);
    
    // Combine headers and data
    const csvContent = [
      headers.join(','),
      ...data.map(row => row.join(','))
    ].join('\n');
    
    // Create a Blob for the CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Create a link element to download the file
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    // Set link properties
    const formattedDate = selectedDate.toISOString().slice(0, 10);
    link.setAttribute('href', url);
    link.setAttribute('download', `attendance_${formattedDate}_${selectedYear || 'all'}_${selectedDivision || 'all'}.csv`);
    link.style.visibility = 'hidden';
    
    // Append to the document, click it and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Head>
        <title>Student Attendance - Staff Dashboard - MET BKC</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style jsx global>{`
          /* Updated attendance button styles with glossy 3D effect */
          .attendance-status {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 9999px;
            padding: 0.4rem 0.9rem;
            font-weight: 600;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s;
            position: relative;
            overflow: hidden;
            border: 2px solid rgba(255, 255, 255, 0.5);
            box-shadow: 
              0 1px 3px rgba(0, 0, 0, 0.2),
              inset 0 1px 1px rgba(255, 255, 255, 0.6),
              inset 0 -1px 1px rgba(0, 0, 0, 0.2);
            text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
          }
          
          /* Present button */
          .status-present {
            background: linear-gradient(to bottom, #34d399 0%, #059669 100%);
            color: white;
          }
          
          .status-present.active {
            background: linear-gradient(to bottom, #059669 0%, #047857 100%);
            transform: translateY(1px);
            box-shadow: 
              0 0 2px rgba(0, 0, 0, 0.3),
              inset 0 1px 1px rgba(255, 255, 255, 0.4),
              inset 0 -1px 1px rgba(0, 0, 0, 0.3);
          }
          
          /* Absent button */
          .status-absent {
            background: linear-gradient(to bottom, #f87171 0%, #dc2626 100%);
            color: white;
          }
          
          .status-absent.active {
            background: linear-gradient(to bottom, #dc2626 0%, #b91c1c 100%);
            transform: translateY(1px);
            box-shadow: 
              0 0 2px rgba(0, 0, 0, 0.3),
              inset 0 1px 1px rgba(255, 255, 255, 0.4),
              inset 0 -1px 1px rgba(0, 0, 0, 0.3);
          }
          
          /* Late button */
          .status-late {
            background: linear-gradient(to bottom, #fbbf24 0%, #d97706 100%);
            color: white;
          }
          
          .status-late.active {
            background: linear-gradient(to bottom, #d97706 0%, #b45309 100%);
            transform: translateY(1px);
            box-shadow: 
              0 0 2px rgba(0, 0, 0, 0.3),
              inset 0 1px 1px rgba(255, 255, 255, 0.4),
              inset 0 -1px 1px rgba(0, 0, 0, 0.3);
          }
          
          /* Glossy effect overlay */
          .attendance-status::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 50%;
            background: linear-gradient(to bottom, 
              rgba(255, 255, 255, 0.7) 0%, 
              rgba(255, 255, 255, 0.3) 50%, 
              rgba(255, 255, 255, 0) 100%);
            border-radius: 9999px 9999px 0 0;
          }
          
          /* Hover effects */
          .status-present:hover {
            background: linear-gradient(to bottom, #3ee6aa 0%, #05b77f 100%);
          }
          
          .status-absent:hover {
            background: linear-gradient(to bottom, #fb8585 0%, #e72f2f 100%);
          }
          
          .status-late:hover {
            background: linear-gradient(to bottom, #fcc937 0%, #e68307 100%);
          }
          
          .date-picker-wrapper {
            position: relative;
          }
          /* Improved calendar icon styling */
          .date-picker-wrapper .react-datepicker-wrapper {
            width: 100%;
          }
          
          .date-picker-wrapper .absolute {
            z-index: 10;
          }
          
          /* Ensure the calendar icon has proper contrast */
          .date-picker-wrapper svg {
            color: #4B5563; /* Gray-600 for better visibility */
            width: 16px;
            height: 16px;
          }
        
          /* Fixes for react-datepicker calendar positioning */
          .react-datepicker-popper {
            z-index: 20;
          }
        `}</style>
        <style jsx global>{`
          /* Clean consolidated button styles */
          .attendance-status {
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            border-radius: 9999px !important;
            padding: 0.5rem 1.2rem !important;
            font-weight: 600 !important;
            font-size: 0.9rem !important;
            cursor: pointer !important;
            transition: all 0.2s !important;
            position: relative !important;
            overflow: hidden !important;
            border: 2px solid rgba(255, 255, 255, 0.5) !important;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
            text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2) !important;
            min-width: 90px !important;
            margin: 0 3px !important;
          }
          
          /* Present button - with solid color background */
          .status-present {
            background-color: #10b981 !important;
            color: white !important;
          }
          
          .status-present.active {
            background-color: #059669 !important;
            transform: translateY(1px) !important;
            box-shadow: 0 0 2px rgba(0, 0, 0, 0.3) !important,
                        inset 0 1px 1px rgba(255, 255, 255, 0.4) !important,
                        inset 0 -1px 1px rgba(0, 0, 0, 0.3) !important;
          }
          
          /* Absent button */
          .status-absent {
            background-color: #ef4444 !important;
            color: white !important;
          }
          
          .status-absent.active {
            background-color: #dc2626 !important;
            transform: translateY(1px) !important;
            box-shadow: 0 0 2px rgba(0, 0, 0, 0.3) !important,
                        inset 0 1px 1px rgba(255, 255, 255, 0.4) !important,
                        inset 0 -1px 1px rgba(0, 0, 0, 0.3) !important;
          }
          
          /* Late button */
          .status-late {
            background-color: #f59e0b !important;
            color: white !important;
          }
          
          .status-late.active {
            background-color: #d97706 !important;
            transform: translateY(1px) !important;
            box-shadow: 0 0 2px rgba(0, 0, 0, 0.3) !important,
                        inset 0 1px 1px rgba(255, 255, 255, 0.4) !important,
                        inset 0 -1px 1px rgba(0, 0, 0, 0.3) !important;
          }
          
          /* Hover effects */
          .status-present:hover {
            background-color: #34d399 !important;
          }
          
          .status-absent:hover {
            background-color: #f87171 !important;
          }
          
          .status-late:hover {
            background-color: #fbbf24 !important;
          }

          /* Other existing styles */
          .date-picker-wrapper {
            position: relative;
          }
          /* etc... */
        `}</style>
        <style jsx global>{`
  /* 3D glossy button styles like the login button */
  .attendance-status {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    border-radius: 20px !important;
    padding: 0.5rem 1.2rem !important;
    font-weight: 700 !important;
    font-size: 0.95rem !important;
    cursor: pointer !important;
    transition: all 0.2s !important;
    position: relative !important;
    overflow: hidden !important;
    min-width: 90px !important;
    margin: 0 3px !important;
    border: 1px solid rgba(255, 255, 255, 0.5) !important;
    box-shadow: 
      0 0 0 2px rgba(30, 64, 175, 0.3),
      0 3px 5px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.6) !important;
    text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.3) !important;
    letter-spacing: 0.5px !important;
  }
  
  /* Present button */
  .status-present {
    background: linear-gradient(to bottom, #38d9a9 10%, #0c9e70 100%) !important;
    color: white !important;
  }
  
  .status-present.active {
    background: linear-gradient(to bottom, #0c9e70 0%, #087f5b 100%) !important;
    transform: translateY(1px) !important;
    box-shadow: 
      0 0 0 2px rgba(30, 64, 175, 0.3),
      0 1px 3px rgba(0, 0, 0, 0.3),
      inset 0 1px 2px rgba(0, 0, 0, 0.2) !important;
  }
  
  /* Absent button */
  .status-absent {
    background: linear-gradient(to bottom, #f87171 10%, #dc2626 100%) !important;
    color: white !important;
  }
  
  .status-absent.active {
    background: linear-gradient(to bottom, #dc2626 0%, #b91c1c 100%) !important;
    transform: translateY(1px) !important;
    box-shadow: 
      0 0 0 2px rgba(30, 64, 175, 0.3),
      0 1px 3px rgba(0, 0, 0, 0.3),
      inset 0 1px 2px rgba(0, 0, 0, 0.2) !important;
  }
  
  /* Late button */
  .status-late {
    background: linear-gradient(to bottom, #fbbf24 10%, #d97706 100%) !important;
    color: white !important;
  }
  
  .status-late.active {
    background: linear-gradient(to bottom, #d97706 0%, #b45309 100%) !important;
    transform: translateY(1px) !important;
    box-shadow: 
      0 0 0 2px rgba(30, 64, 175, 0.3),
      0 1px 3px rgba(0, 0, 0, 0.3),
      inset 0 1px 2px rgba(0, 0, 0, 0.2) !important;
  }
  
  /* Enhanced glossy effect overlay like the login button */
  .attendance-status::before {
    content: '' !important;
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    height: 50% !important;
    background: linear-gradient(to bottom, 
      rgba(255, 255, 255, 0.9) 0%, 
      rgba(255, 255, 255, 0.5) 40%, 
      rgba(255, 255, 255, 0.1) 100%) !important;
    border-radius: 20px 20px 100px 100px !important;
    pointer-events: none !important;
  }
`}</style>
      </Head>
      
      <motion.div 
        className="p-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center" variants={itemVariants}>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Student Attendance</h1>
            <p className="text-gray-600">Mark and track student attendance</p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-2">
            <button 
              onClick={handleSaveAttendance}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded flex items-center"
            >
              <FaSave className="mr-2" /> Save Attendance
            </button>
            <button 
              onClick={handleExportAttendance}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded flex items-center"
            >
              <FaFileExport className="mr-2" /> Export
            </button>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div className="bg-white rounded-lg shadow-md p-6 mb-6" variants={itemVariants}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="date-picker-wrapper">
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <div className="relative">
                {/* Enhanced calendar icon styling */}
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
                  <FaCalendarAlt className="text-gray-600 h-4 w-4" /> {/* Darker color and specific size */}
                </div>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date: Date | null) => date && setSelectedDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10 pr-3 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <select
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="">All Subjects</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name or ID..."
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <select
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="">All Years</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Division</label>
              <select
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={selectedDivision}
                onChange={(e) => setSelectedDivision(e.target.value)}
              >
                <option value="">All Divisions</option>
                {divisions.map(division => (
                  <option key={division} value={division}>Division {division}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
              <select
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-ellipsis"
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
              >
                <option value="">All Branches</option>
                {branches.map(branch => (
                  <option key={branch} value={branch} title={branch}>{branch}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Attendance Table */}
        <motion.div className="bg-white rounded-lg shadow-md w-full overflow-hidden" variants={itemVariants}>
          <div className="overflow-x-auto w-full">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Year
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Div
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attendance
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr key={student.id} id={`student-${student.id}`} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {student.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.year}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.division}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            className={`attendance-status status-present ${attendance[student.id] === 'present' ? 'active' : ''}`}
                            onClick={() => handleMarkAttendance(student.id, 'present')}
                            type="button"
                          >
                            Present
                          </button>
                          <button
                            className={`attendance-status status-absent ${attendance[student.id] === 'absent' ? 'active' : ''}`}
                            onClick={() => handleMarkAttendance(student.id, 'absent')}
                            type="button"
                          >
                            Absent
                          </button>
                          <button
                            className={`attendance-status status-late ${attendance[student.id] === 'late' ? 'active' : ''}`}
                            onClick={() => handleMarkAttendance(student.id, 'late')}
                            type="button"
                          >
                            Late
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      No students found matching the criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Summary Section */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-4 justify-between items-center">
              <div className="text-sm text-gray-700">
                <p><span className="font-medium">{filteredStudents.length}</span> students total</p>
                <p>
                  <span className="font-medium text-green-700">
                    {Object.values(attendance).filter(status => status === 'present').length}
                  </span> present,
                  <span className="font-medium text-red-700 ml-1">
                    {Object.values(attendance).filter(status => status === 'absent').length}
                  </span> absent,
                  <span className="font-medium text-yellow-700 ml-1">
                    {Object.values(attendance).filter(status => status === 'late').length}
                  </span> late
                </p>
              </div>
              
              <button 
                className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                onClick={() => alert('View previous attendance records')}
              >
                <FaHistory className="mr-1" /> View Past Records
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

// Use StaffLayout for this page
AttendancePage.getLayout = function getLayout(page: ReactElement) {
  return <StaffLayout>{page}</StaffLayout>;
};

export default AttendancePage;