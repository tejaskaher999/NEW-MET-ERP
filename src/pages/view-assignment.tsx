"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FaDownload, FaEye, FaSearch, FaTimes, FaExternalLinkAlt } from 'react-icons/fa';
import FileActions from '../components/FileActions';

function useClientSideValue<T>(serverFallback: T, clientFn: () => T) {
  const [value, setValue] = useState<T>(serverFallback);
  
  useEffect(() => {
    setValue(clientFn());
  }, []);
  
  return value;
}

interface Assignment {
    id: string;
    subject: string;
    filePath?: string;
    fileType?: string;
}

const sessions = ['2021-2022', '2022-2023', '2023-2024', '2024-2025'];
const subjects = [
    'All',
    'Advanced Manufacturing Processes',
    'Applied Physics',
    'Basic Electrical And Electronics Engineering',
    'Basic Science (PHYSICS)',
    'Digital Techniques'
];

// Sample data
const assignments: Assignment[] = [
    {
        id: '042024000037',
        subject: 'Advanced Manufacturing Processes (22563)',
        filePath: '/documents/advance.docx',
        fileType: 'docx'
    },
    {
        id: '042024000018',
        subject: 'Applied Physics 312308',
        filePath: '/documents/applied.docx',
        fileType: 'docx'
    }
];

const ViewAssignment = () => {
    const [selectedSession, setSelectedSession] = useState('2023-2024');
    const [selectedSubject, setSelectedSubject] = useState('All');
    const [filteredAssignments, setFilteredAssignments] = useState(assignments);
    const [selectedFile, setSelectedFile] = useState<Assignment | null>(null);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleFilter = () => {
        let filtered = [...assignments];
        if (selectedSubject !== 'All') {
            filtered = filtered.filter(assignment => 
                assignment.subject.toLowerCase().includes(selectedSubject.toLowerCase())
            );
        }
        setFilteredAssignments(filtered);
    };

    const handleViewFile = (assignment: Assignment) => {
        if (!assignment.filePath) {
            alert('No file available for this assignment.');
            return;
        }
        setSelectedFile(assignment);
        setIsViewerOpen(true);
        setIsLoading(true);
    };

    const closeModal = () => {
        setSelectedFile(null);
        setIsViewerOpen(false);
        setIsLoading(false);
    };

    const getFileUrl = (filePath: string | undefined) => {
        if (!filePath) return '';
        const filename = filePath.startsWith('/')
            ? filePath.substring(1)
            : filePath;
        return `/api/view/${filename.split('/').pop()}`;
    };

    return (
        <>
            <Head>
                <title>View Assignments - MET BKC</title>
            </Head>
            <div className="min-h-screen bg-gray-100 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">View Assignments</h1>
                        <p className="text-gray-600">Access and view your assignments.</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Session</label>
                                <select
                                    value={selectedSession}
                                    onChange={(e) => setSelectedSession(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    {sessions.map((session) => (
                                        <option key={session} value={session}>{session}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                <select
                                    value={selectedSubject}
                                    onChange={(e) => setSelectedSubject(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    {subjects.map((subject) => (
                                        <option key={subject} value={subject}>{subject}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={handleFilter}
                                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                <FaSearch className="mr-2" />
                                Apply Filters
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">Assignment List</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredAssignments.map((assignment) => (
                                        <tr key={assignment.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assignment.subject}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex space-x-4">
                                                    <button
                                                        onClick={() => handleViewFile(assignment)}
                                                        className="text-green-600 hover:text-green-800"
                                                    >
                                                        <FaEye className="text-xl" />
                                                    </button>
                                                    <FileActions filePath={assignment.filePath} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* File Viewer Modal */}
                {isViewerOpen && selectedFile && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                        <div className="bg-white w-full h-full md:w-11/12 md:h-5/6 relative rounded-lg overflow-hidden flex flex-col">
                            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-900">File Viewer</h3>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            if (selectedFile.filePath) {
                                                window.open(getFileUrl(selectedFile.filePath), '_blank');
                                            }
                                        }}
                                        className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        <FaExternalLinkAlt />
                                        <span>Open in New Tab</span>
                                    </button>
                                    <button
                                        onClick={closeModal}
                                        className="flex items-center gap-2 px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                    >
                                        <FaTimes />
                                        <span>Close</span>
                                    </button>
                                </div>
                            </div>
                            <div className="flex-1 relative">
                                {isLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                                    </div>
                                )}
                                <ViewerComponent selectedFile={selectedFile} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

interface ViewerComponentProps {
    selectedFile: Assignment;
}

const ViewerComponent = ({ selectedFile }: ViewerComponentProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const origin = useClientSideValue('', () => window.location.origin);
    
    const getFileUrl = () => {
        if (!selectedFile?.filePath) return '';
        const filename = selectedFile.filePath.startsWith('/')
            ? selectedFile.filePath.substring(1)
            : selectedFile.filePath;
        return `/api/view/${filename.split('/').pop()}`;
    };
    
    return (
        <iframe
            src={selectedFile.fileType === 'pdf' 
                ? getFileUrl()
                : `https://docs.google.com/viewer?url=${encodeURIComponent(origin + getFileUrl())}&embedded=true`}
            className="w-full h-full border-0"
            title="File Viewer"
            onLoad={() => setIsLoading(false)}
            onError={() => {/* error handling */}}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
    );
};

export default ViewAssignment;
