import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FaDownload, FaSearch, FaEye, FaTimes, FaSpinner } from 'react-icons/fa';

interface EMaterial {
    id: string;
    subject: string;
    topic: string;
    contentType: string;
    filePath: string;
}

const courses = ['2020-Pattern', '2015-Pattern'];
const branches = ['All', 'Computer Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Electronics Engineering'];
const years = ['All', 'First Year', 'Second Year', 'Third Year'];
const subjects = [
    'All',
    'Advanced Manufacturing Processes',
    'Applied Physics',
    'Basic Electrical And Electronics Engineering',
    'Basic Science (PHYSICS)',
    'Digital Techniques'
];

// Sample data with file paths
const materials = [
    {
        id: '042024000037',
        subject: 'Advanced Manufacturing Processes (22563)',
        topic: 'Notes of Advanced Manufacturing Processes (22563)',
        contentType: 'Text',
        filePath: '/documents/advance.docx'
    },
    {
        id: '042024000018',
        subject: 'Applied Physics 312308',
        topic: 'LAB Manual',
        contentType: 'Text',
        filePath: '/documents/applied.docx'
    },
    {
        id: '042024000023',
        subject: 'Applied Physics 312308',
        topic: 'Syllabus',
        contentType: 'Text',
        filePath: '/documents/syllabus.docx'
    },
    {
        id: '042024000008',
        subject: 'Basic Electrical And Electronics Engineering',
        topic: 'Basic Electrical Fundamentals',
        contentType: 'Text',
        filePath: '/documents/basic_electrical_fundamentals.docx'
    },
    {
        id: '042024000011',
        subject: 'Basic Electrical And Electronics Engineering',
        topic: 'Rectifiers and Filters',
        contentType: 'Text',
        filePath: '/documents/rectifiers_and_filters.docx'
    },
    {
        id: '042024000009',
        subject: 'Basic Electrical And Electronics Engineering',
        topic: 'Regulated Power Supply',
        contentType: 'Text',
        filePath: '/documents/regulated_power_supply.docx'
    },
    {
        id: '042024000010',
        subject: 'Basic Electrical And Electronics Engineering',
        topic: 'Special Purpose Diodes and their applications',
        contentType: 'Text',
        filePath: '/documents/special_purpose_diodes.docx'
    },
    {
        id: '042023000068',
        subject: 'Basic Science (PHYSICS)-311305',
        topic: 'Chapter Notes',
        contentType: 'Text',
        filePath: '/documents/chapter_notes.docx'
    },
    {
        id: '042024000001',
        subject: 'Digital Techniques',
        topic: 'Adders',
        contentType: 'Text',
        filePath: '/documents/adders.docx'
    },
    {
        id: '042024000012',
        subject: 'Digital Techniques',
        topic: 'Adders',
        contentType: 'Text',
        filePath: '/documents/adders.docx'
    },
    {
        id: '042024000014',
        subject: 'Digital Techniques',
        topic: 'Decade Counter',
        contentType: 'Text',
        filePath: '/documents/decade_counter.docx'
    },
    {
        id: '042024000015',
        subject: 'Digital Techniques',
        topic: 'MUX',
        contentType: 'Text',
        filePath: '/documents/mux.docx'
    },
    {
        id: '042024000017',
        subject: 'Digital Techniques',
        topic: 'Parallel Adder Subtractor',
        contentType: 'Text',
        filePath: '/documents/parallel_adder_subtractor.docx'
    },
    {
        id: '042024000013',
        subject: 'Digital Techniques',
        topic: 'Subtractor and Code Converter',
        contentType: 'Text',
        filePath: '/documents/subtractor_and_code_converter.docx'
    },
    {
        id: '042024000016',
        subject: 'Digital Techniques',
        topic: 'Universal Logic Gates',
        contentType: 'Text',
        filePath: '/documents/universal_logic_gates.docx'
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
};

const DownloadMaterial = () => {
    const [selectedCourse, setSelectedCourse] = useState('2020-Pattern');
    const [selectedBranch, setSelectedBranch] = useState('All');
    const [selectedYear, setSelectedYear] = useState('All');
    const [selectedSubject, setSelectedSubject] = useState('All');
    const [filteredMaterials, setFilteredMaterials] = useState(materials);
    const [viewingDocument, setViewingDocument] = useState<EMaterial | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [viewError, setViewError] = useState(false);

    const handleFilter = () => {
        let filtered = [...materials];
        
        if (selectedSubject !== 'All') {
            filtered = filtered.filter(material => 
                material.subject.toLowerCase().includes(selectedSubject.toLowerCase())
            );
        }
        
        setFilteredMaterials(filtered);
    };

    const handleDownload = (material: EMaterial) => {
        const link = document.createElement('a');
        link.href = material.filePath;
        link.download = material.topic;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleView = (material: EMaterial) => {
        setViewingDocument(material);
        setIsLoading(true);
        setViewError(false);
    };

    const closeViewer = () => {
        setViewingDocument(null);
        setIsLoading(false);
        setViewError(false);
    };

    return (
        <>
            <Head>
                <title>Download E-Material - MET BKC</title>
            </Head>
            <div className="min-h-screen bg-gray-100 p-6">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="max-w-7xl mx-auto space-y-6"
                >
                    {/* Header */}
                    <motion.div
                        className="bg-white rounded-lg shadow-lg p-6"
                        variants={itemVariants}
                    >
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">Download E-Material</h1>
                        <p className="text-gray-600">Access and download study materials for your courses.</p>
                    </motion.div>

                    {/* Filters */}
                    <motion.div
                        className="bg-white rounded-lg shadow-lg p-6"
                        variants={itemVariants}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Course Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Course
                                </label>
                                <select
                                    value={selectedCourse}
                                    onChange={(e) => setSelectedCourse(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {courses.map((course) => (
                                        <option key={course} value={course}>
                                            {course}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Branch Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Branch
                                </label>
                                <select
                                    value={selectedBranch}
                                    onChange={(e) => setSelectedBranch(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {branches.map((branch) => (
                                        <option key={branch} value={branch}>
                                            {branch}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Year Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Year
                                </label>
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {years.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Subject Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Subject
                                </label>
                                <select
                                    value={selectedSubject}
                                    onChange={(e) => setSelectedSubject(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {subjects.map((subject) => (
                                        <option key={subject} value={subject}>
                                            {subject}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Apply Filters Button */}
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={handleFilter}
                                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
                            >
                                <FaSearch />
                                <span>Apply Filters</span>
                            </button>
                        </div>
                    </motion.div>

                    {/* Materials Table */}
                    <motion.div
                        className="bg-white rounded-lg shadow-lg overflow-hidden"
                        variants={itemVariants}
                    >
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Subject
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Topic
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Content Type
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredMaterials.map((material) => (
                                        <tr key={material.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {material.subject}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {material.topic}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {material.contentType}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <div className="flex space-x-4">
                                                    <button
                                                        onClick={() => handleDownload(material)}
                                                        className="text-blue-600 hover:text-blue-800 flex items-center"
                                                    >
                                                        <FaDownload className="mr-1" />
                                                        Download
                                                    </button>
                                                    <button
                                                        onClick={() => handleView(material)}
                                                        className="text-green-600 hover:text-green-800 flex items-center"
                                                    >
                                                        <FaEye className="mr-1" />
                                                        View
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Document Viewer Modal */}
                {viewingDocument && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-3/4 h-3/4 flex flex-col">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">{viewingDocument.topic}</h2>
                                <button
                                    onClick={closeViewer}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <FaTimes className="text-xl" />
                                </button>
                            </div>
                            <div className="flex-1 relative">
                                <iframe
                                    src={`https://docs.google.com/viewer?url=${encodeURIComponent(window.location.origin + viewingDocument.filePath)}&embedded=true`}
                                    className="w-full h-full"
                                    frameBorder="0"
                                    loading="lazy"
                                    onLoad={() => setIsLoading(false)}
                                    onError={() => {
                                        setIsLoading(false);
                                        setViewError(true);
                                    }}
                                />
                                {isLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
                                        <div className="text-center">
                                            <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
                                            <p className="text-gray-600">Loading document...</p>
                                        </div>
                                    </div>
                                )}
                                {viewError && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                                        <div className="text-center p-6">
                                            <p className="text-gray-600 mb-4">Unable to view the document. Please try downloading it instead.</p>
                                            <button
                                                onClick={() => handleDownload(viewingDocument)}
                                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center"
                                            >
                                                <FaDownload className="mr-2" />
                                                Download Document
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default DownloadMaterial; 