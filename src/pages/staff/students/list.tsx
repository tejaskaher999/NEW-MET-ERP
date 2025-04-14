import React, { useState, useEffect, ReactElement } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaDownload, FaEdit, FaTrash } from 'react-icons/fa';
import StaffLayout from '@/components/Layout/StaffLayout';

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

// Mock student data
const mockStudents = [
  {
    id: 'N04112100064',
    name: 'Lachake Atharva Santosh',
    year: 'Fourth',
    division: 'A',
    branch: 'Computer Science and Design',
    email: 'atharva.lachake@example.com',
    mobile: '9876543210',
    status: 'Active'
  },
  {
    id: 'N04112100065',
    name: 'John Smith',
    year: 'Third',
    division: 'B',
    branch: 'Computer Science',
    email: 'john.smith@example.com',
    mobile: '9876543211',
    status: 'Active'
  },
  {
    id: 'N04112100066',
    name: 'Sara Jones',
    year: 'Fourth',
    division: 'A',
    branch: 'Information Technology',
    email: 'sara.jones@example.com',
    mobile: '9876543212',
    status: 'Active'
  },
  {
    id: 'N04112100067',
    name: 'Raj Patel',
    year: 'Second',
    division: 'C',
    branch: 'Electrical Engineering',
    email: 'raj.patel@example.com',
    mobile: '9876543213',
    status: 'Active'
  },
  {
    id: 'N04112100068',
    name: 'Priya Sharma',
    year: 'First',
    division: 'B',
    branch: 'Mechanical Engineering',
    email: 'priya.sharma@example.com',
    mobile: '9876543214',
    status: 'Active'
  }
];

const StudentsList = () => {
  const [students, setStudents] = useState(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [filterBranch, setFilterBranch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // Add this year order mapping above the filter function
  const yearOrder = {
    'First': 1,
    'Second': 2,
    'Third': 3,
    'Fourth': 4
  };

  // Filter and sort students - updated with special handling for year field
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         student.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = filterYear ? student.year === filterYear : true;
    const matchesBranch = filterBranch ? student.branch === filterBranch : true;
    
    return matchesSearch && matchesYear && matchesBranch;
  }).sort((a, b) => {
    // Special handling for year field
    if (sortBy === 'year') {
      // Type assertion and safety check
      const aYearValue = yearOrder[a.year as keyof typeof yearOrder] || 0;
      const bYearValue = yearOrder[b.year as keyof typeof yearOrder] || 0;
      
      return sortOrder === 'asc' 
        ? aYearValue - bYearValue
        : bYearValue - aYearValue;
    }
    
    // Default handling for other fields
    if (a[sortBy as keyof typeof a] < b[sortBy as keyof typeof b]) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (a[sortBy as keyof typeof a] > b[sortBy as keyof typeof b]) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Unique values for filters - Fix the syntax to properly convert Set to Array
  const years = Array.from(new Set(students.map(student => student.year)));
  const branches = Array.from(new Set(students.map(student => student.branch)));

  const exportToCSV = () => {
    // Define the headers for CSV
    const headers = ['Student ID', 'Name', 'Year', 'Division', 'Branch', 'Email', 'Mobile', 'Status'];
    
    // Format the student data
    const data = filteredStudents.map(student => [
      student.id,
      student.name,
      student.year,
      student.division,
      student.branch,
      student.email,
      student.mobile,
      student.status
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
    link.setAttribute('href', url);
    link.setAttribute('download', `student_list_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    
    // Append to the document, click it and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Head>
        <title>Student List - Staff Dashboard - MET BKC</title>
        {/* Add responsive meta tag to ensure proper mobile rendering */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Updated table CSS to fix width issues */}
        <style jsx global>{`
          .table-container {
            overflow-x: auto;
            width: 100%;
            -webkit-overflow-scrolling: touch;
            border-radius: 0.5rem;
            max-width: 100vw;
          }
          
          .responsive-table {
            width: 100%;
            table-layout: fixed;
            border-collapse: collapse;
          }
          
          .table-cell {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          /* Full width background fix */
          tr {
            width: 100%;
          }
          
          .contact-cell {
            width: 18%;
          }
          
          .branch-cell {
            width: 17%;
          }
          
          .id-cell {
            width: 12%;
          }
          
          .name-cell {
            width: 20%;
          }
          
          .year-cell, .div-cell {
            width: 8%;
          }
          
          .status-cell {
            width: 10%;
          }
          
          .action-cell {
            width: 7%;
          }
          
          /* Fix for table background coverage */
          .bg-gray-50, .bg-white {
            background-color: inherit;
          }
          
          thead, tbody, tr, th, td {
            box-sizing: border-box;
          }
          
          /* Background fix for full width */
          thead, tbody {
            width: 100%;
            display: table;
            table-layout: fixed;
          }
          
          /* Make sure the row takes up full width */
          tr {
            display: table;
            width: 100%;
            table-layout: fixed;
          }
          
          @media (max-width: 768px) {
            .table-cell {
              padding-left: 0.5rem !important;
              padding-right: 0.5rem !important;
              font-size: 0.8rem;
            }
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
            <h1 className="text-2xl font-bold text-gray-800">Student List</h1>
            <p className="text-gray-600">Manage and view all students</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button 
              onClick={exportToCSV}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded flex items-center"
            >
              <FaDownload className="mr-2" /> Export Data
            </button>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div className="bg-white rounded-lg shadow-md p-6 mb-6" variants={itemVariants}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            
            <div>
              <select
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
              >
                <option value="">All Years</option>
                {years.map(year => (
                  <option key={year} value={year}>{year} Year</option>
                ))}
              </select>
            </div>
            
            <div>
              <select
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-ellipsis"
                value={filterBranch}
                onChange={(e) => setFilterBranch(e.target.value)}
                style={{ minWidth: '200px' }}
              >
                <option value="">All Branches</option>
                {branches.map(branch => (
                  <option key={branch} value={branch} title={branch}>{branch}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Students Table */}
        <motion.div className="bg-white rounded-lg shadow-md w-full overflow-hidden" variants={itemVariants}>
          <div className="table-container w-full">
            <table className="responsive-table w-full">
              <thead className="bg-gray-50 w-full">
                <tr className="w-full">
                  <th 
                    scope="col" 
                    className="table-cell id-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('id')}
                  >
                    Student ID
                    {sortBy === 'id' && (
                      <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th 
                    scope="col" 
                    className="table-cell name-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('name')}
                  >
                    Name
                    {sortBy === 'name' && (
                      <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th 
                    scope="col" 
                    className="table-cell year-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('year')}
                  >
                    Year
                    {sortBy === 'year' && (
                      <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th 
                    scope="col" 
                    className="table-cell div-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('division')}
                  >
                    Div
                    {sortBy === 'division' && (
                      <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th 
                    scope="col" 
                    className="table-cell branch-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('branch')}
                  >
                    Branch
                    {sortBy === 'branch' && (
                      <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th 
                    scope="col" 
                    className="table-cell contact-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Contact
                  </th>
                  <th 
                    scope="col" 
                    className="table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('status')}
                  >
                    Status
                    {sortBy === 'status' && (
                      <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th scope="col" className="table-cell action-cell px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 w-full">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="table-cell id-cell px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {student.id}
                      </td>
                      <td className="table-cell name-cell px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {student.name}
                      </td>
                      <td className="table-cell year-cell px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {student.year}
                      </td>
                      <td className="table-cell div-cell px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {student.division}
                      </td>
                      <td className="table-cell branch-cell px-4 py-3 whitespace-nowrap text-sm text-gray-500" title={student.branch}>
                        {student.branch}
                      </td>
                      <td className="table-cell contact-cell px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        <div className="truncate">{student.email}</div>
                        <div>{student.mobile}</div>
                      </td>
                      <td className="table-cell px-4 py-3 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {student.status}
                        </span>
                      </td>
                      <td className="table-cell action-cell px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-center">
                        <div className="flex justify-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <FaEdit className="h-4 w-4" title="Edit" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <FaTrash className="h-4 w-4" title="Delete" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                      No students found matching the criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 w-full">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredStudents.length}</span> of{" "}
                  <span className="font-medium">{filteredStudents.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

// Use StaffLayout for this page
StudentsList.getLayout = function getLayout(page: ReactElement) {
  return <StaffLayout>{page}</StaffLayout>;
};

export default StudentsList;