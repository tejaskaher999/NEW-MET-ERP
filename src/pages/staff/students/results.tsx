import React, { useState, useEffect, ReactElement } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FaSearch, FaCalendarAlt, FaSave, FaFileCsv, FaFileExport, FaFilter } from 'react-icons/fa';
import StaffLayout from '@/components/Layout/StaffLayout';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

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

// Mock student results data
const mockStudentResults = [
  {
    id: 'N04112100064',
    name: 'Lachake Atharva Santosh',
    year: 'Fourth',
    division: 'A',
    branch: 'Computer Science and Design',
    subject: 'Data Science Optimization',
    marks: {
      internal: 25,
      midSem: 18,
      endSem: 45
    },
    total: 88,
    grade: 'A',
    status: 'Pass'
  },
  {
    id: 'N04112100065',
    name: 'John Smith',
    year: 'Third',
    division: 'B',
    branch: 'Computer Science and Engineering',
    subject: 'Database Management',
    marks: {
      internal: 22,
      midSem: 15,
      endSem: 40
    },
    total: 77,
    grade: 'B',
    status: 'Pass'
  },
  {
    id: 'N04112100066',
    name: 'Sara Jones',
    year: 'Fourth',
    division: 'A',
    branch: 'Computer Science and Design',
    subject: 'Natural Language Processing',
    marks: {
      internal: 28,
      midSem: 19,
      endSem: 48
    },
    total: 95,
    grade: 'A+',
    status: 'Pass'
  },
  {
    id: 'N04112100067',
    name: 'Raj Patel',
    year: 'Second',
    division: 'C',
    branch: 'Civil Engineering',
    subject: 'Structural Analysis',
    marks: {
      internal: 18,
      midSem: 12,
      endSem: 32
    },
    total: 62,
    grade: 'C',
    status: 'Pass'
  },
  {
    id: 'N04112100068',
    name: 'Priya Sharma',
    year: 'First',
    division: 'B',
    branch: 'Mechanical Engineering',
    subject: 'Engineering Mechanics',
    marks: {
      internal: 15,
      midSem: 10,
      endSem: 28
    },
    total: 53,
    grade: 'D',
    status: 'Pass'
  }
];

// Subjects data
const mockSubjects = [
  'Data Science Optimization',
  'Database Management',
  'Natural Language Processing',
  'Structural Analysis',
  'Engineering Mechanics',
  'Applied Physics',
  'Machine Learning'
];

// Exam sessions
const mockSessions = [
  'Winter 2023',
  'Summer 2023',
  'Winter 2022',
  'Summer 2022'
];

const ResultsPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedSession, setSelectedSession] = useState('Winter 2023');
  const [searchTerm, setSearchTerm] = useState('');
  const [studentResults, setStudentResults] = useState(mockStudentResults);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  // Get unique values for filters
  const years = Array.from(new Set(studentResults.map(student => student.year)));
  const divisions = Array.from(new Set(studentResults.map(student => student.division)));
  const branches = Array.from(new Set(studentResults.map(student => student.branch)));
  const subjects = Array.from(new Set(mockSubjects));

  // Filter students based on selected filters and search term
  const filteredResults = studentResults.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = selectedYear ? student.year === selectedYear : true;
    const matchesDivision = selectedDivision ? student.division === selectedDivision : true;
    const matchesBranch = selectedBranch ? student.branch === selectedBranch : true;
    const matchesSubject = selectedSubject ? student.subject === selectedSubject : true;
    
    return matchesSearch && matchesYear && matchesDivision && matchesBranch && matchesSubject;
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (key: string) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedResults = [...filteredResults].sort((a, b) => {
    if (sortConfig.key === '') return 0;
    
    let aValue, bValue;
    
    if (sortConfig.key === 'total' || sortConfig.key.startsWith('marks.')) {
      // Handle nested properties for marks
      if (sortConfig.key.startsWith('marks.')) {
        const markType = sortConfig.key.split('.')[1];
        aValue = a.marks[markType as keyof typeof a.marks];
        bValue = b.marks[markType as keyof typeof b.marks];
      } else {
        aValue = a[sortConfig.key as keyof typeof a];
        bValue = b[sortConfig.key as keyof typeof b];
      }
    } else {
      aValue = a[sortConfig.key as keyof typeof a];
      bValue = b[sortConfig.key as keyof typeof b];
    }
    
    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handleExportResults = () => {
    try {
      // Convert the filtered results to Excel-friendly format
      const exportData = sortedResults.map(student => ({
        'Student ID': student.id,
        'Name': student.name,
        'Year': student.year,
        'Division': student.division,
        'Branch': student.branch,
        'Subject': student.subject,
        'Internal Marks (30)': student.marks.internal,
        'Mid Sem Marks (20)': student.marks.midSem,
        'End Sem Marks (50)': student.marks.endSem,
        'Total (100)': student.total,
        'Grade': student.grade,
        'Status': student.status
      }));
  
      // Create workbook and worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(exportData);
  
      // Set column widths
      const colWidths = [
        { wch: 15 },  // Student ID
        { wch: 25 },  // Name
        { wch: 10 },  // Year
        { wch: 10 },  // Division
        { wch: 25 },  // Branch
        { wch: 25 },  // Subject
        { wch: 15 },  // Internal Marks
        { wch: 15 },  // Mid Sem Marks
        { wch: 15 },  // End Sem Marks
        { wch: 12 },  // Total
        { wch: 8 },   // Grade
        { wch: 8 }    // Status
      ];
      ws['!cols'] = colWidths;
  
      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(wb, ws, 'Student Results');
  
      // Generate Excel file
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      
      // Get current date for filename
      const date = new Date().toISOString().split('T')[0];
      const filename = `student_results_${date}.xlsx`;
  
      // Save the file
      saveAs(dataBlob, filename);
    } catch (error) {
      console.error('Error exporting results:', error);
      alert('Failed to export results. Please try again.');
    }
  };

  const getSortIndicator = (key: string) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
    }
    return '';
  };

  return (
    <>
      <Head>
        <title>Student Results - MET BKC</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style jsx global>{`
          /* Enhanced table styling */
          .results-table {
            table-layout: fixed;
            width: 100%;
            border-collapse: separate;
            border-spacing: 0 1rem;
          }
          
          .results-table thead {
            position: sticky;
            top: 0;
            z-index: 2;
            background: white;
          }
          
          .result-header {
            cursor: pointer;
            user-select: none;
            white-space: nowrap;
            padding: 0.75rem 0.5rem !important;
            font-weight: 600;
            letter-spacing: 0.05em;
            background: #f9fafb;
            border-bottom: 2px solid #e5e7eb;
          }
          
          .result-row {
            background: white;
            transition: all 0.2s;
          }
          
          .result-row > td {
            padding: 1rem 0.5rem;
            background: white;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          
          .result-row:hover > td {
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
            transform: translateY(-1px);
          }
          
          .compact-cell {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            background: white;
          }
          
          .result-row td:first-child {
            border-top-left-radius: 0.375rem;
            border-bottom-left-radius: 0.375rem;
          }
          
          .result-row td:last-child {
            border-top-right-radius: 0.375rem;
            border-bottom-right-radius: 0.375rem;
          }
          
          /* Column widths */
          .id-column { width: 11%; }
          .name-column { width: 16%; }
          .year-column, .div-column { width: 6%; }
          .subject-column { width: 16%; }
          .marks-column { width: 8%; }
          .total-column { width: 9%; }
          .grade-column { width: 6%; }
          .status-column { width: 6%; }
        `}</style>
      </Head>

      <motion.div 
        className="p-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Student Results</h1>
            <div className="flex space-x-4">
              <button
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                onClick={handleExportResults}
              >
                <FaFileExport className="mr-2" />
                Export Results
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div className="bg-white rounded-lg shadow-md p-6 mb-6" variants={itemVariants}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-4">
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search Students</label>
              <div className="relative">
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search by name or ID..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaSearch className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Exam Session</label>
              <select
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={selectedSession}
                onChange={(e) => setSelectedSession(e.target.value)}
              >
                {mockSessions.map(session => (
                  <option key={session} value={session}>{session}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
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
                  <option key={division} value={division}>{division}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
              <select
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
              >
                <option value="">All Branches</option>
                {branches.map(branch => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
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
          </div>
        </motion.div>

        <motion.div className="bg-white rounded-lg shadow-md overflow-hidden" variants={itemVariants}>
          <div className="overflow-x-auto p-4"> {/* Added padding */}
            <table className="min-w-full divide-y divide-gray-200 results-table">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    scope="col" 
                    className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider result-header id-column" 
                    onClick={() => handleSort('id')}
                    data-sort={sortConfig.key === 'id' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                  >
                    Student ID
                  </th>
                  <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider result-header name-column" onClick={() => handleSort('name')}>
                    Name {getSortIndicator('name')}
                  </th>
                  <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider result-header year-column" onClick={() => handleSort('year')}>
                    Year {getSortIndicator('year')}
                  </th>
                  <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider result-header div-column" onClick={() => handleSort('division')}>
                    Div {getSortIndicator('division')}
                  </th>
                  <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider result-header subject-column" onClick={() => handleSort('subject')}>
                    Subject {getSortIndicator('subject')}
                  </th>
                  <th scope="col" className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider result-header marks-column" onClick={() => handleSort('marks.internal')}>
                    Int(30) {getSortIndicator('marks.internal')}
                  </th>
                  <th scope="col" className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider result-header marks-column" onClick={() => handleSort('marks.midSem')}>
                    Mid(20) {getSortIndicator('marks.midSem')}
                  </th>
                  <th scope="col" className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider result-header marks-column" onClick={() => handleSort('marks.endSem')}>
                    End(50) {getSortIndicator('marks.endSem')}
                  </th>
                  <th scope="col" className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider result-header total-column" onClick={() => handleSort('total')}>
                    Total {getSortIndicator('total')}
                  </th>
                  <th scope="col" className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider result-header grade-column" onClick={() => handleSort('grade')}>
                    Grade {getSortIndicator('grade')}
                  </th>
                  <th scope="col" className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider result-header status-column" onClick={() => handleSort('status')}>
                    Status {getSortIndicator('status')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedResults.map((student) => (
                  <tr key={student.id} id={`student-${student.id}`} className="result-row">
                    <td className="compact-cell text-sm font-medium text-gray-900 id-column">
                      {student.id}
                    </td>
                    <td className="compact-cell text-sm text-gray-900 name-column">
                      {student.name}
                    </td>
                    <td className="compact-cell text-sm text-gray-500 year-column">
                      {student.year}
                    </td>
                    <td className="compact-cell text-sm text-gray-500 div-column">
                      {student.division}
                    </td>
                    <td className="compact-cell text-sm text-gray-500 subject-column" title={student.subject}>
                      {student.subject}
                    </td>
                    <td className="compact-cell text-sm text-gray-900 text-center marks-column">
                      {student.marks.internal}
                    </td>
                    <td className="compact-cell text-sm text-gray-900 text-center marks-column">
                      {student.marks.midSem}
                    </td>
                    <td className="compact-cell text-sm text-gray-900 text-center marks-column">
                      {student.marks.endSem}
                    </td>
                    <td className="compact-cell text-sm font-medium text-gray-900 text-center total-column">
                      {student.total}
                    </td>
                    <td className="compact-cell text-center grade-column">
                      <div className={`grade-cell grade-${student.grade}`}>
                        {student.grade}
                      </div>
                    </td>
                    <td className="compact-cell text-sm font-semibold text-center status-column">
                      <span className={`status-${student.status}`}>{student.status}</span>
                    </td>
                  </tr>
                ))}
                {sortedResults.length === 0 && (
                  <tr>
                    <td colSpan={11} className="px-6 py-4 text-center text-sm text-gray-500">
                      No results found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

ResultsPage.getLayout = function getLayout(page: ReactElement) {
  return <StaffLayout>{page}</StaffLayout>;
};

export default ResultsPage;