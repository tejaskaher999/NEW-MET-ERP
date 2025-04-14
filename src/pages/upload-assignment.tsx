import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

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

const subjectsBySession: { [key: string]: string[] } = {
    '2021-2022': ['Graphics', 'Physics', 'Chemistry', 'Mathematics 1', 'Mathematics 2'],
    '2022-2023': ['Mathematics 3', 'Discrete Maths', 'Data Structure', 'Basic Human Rights', 'Probability and Statistics'],
    '2023-2024': ['Internet of Things', 'Employment and Skill Development', 'Machine Learning', 'Mini Project', 'Data Visualization'],
    '2024-2025': ['Default Subject 1', 'Default Subject 2', 'Default Subject 3'],
};

const Assignments = () => {
    const [selectedSession, setSelectedSession] = useState('2023-2024');
    const [selectedSubject, setSelectedSubject] = useState(subjectsBySession[selectedSession][0]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const sessions = ['2021-2022', '2022-2023', '2023-2024', '2024-2025'];

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Submit button clicked');
        console.log('Selected Session:', selectedSession);
        console.log('Selected Subject:', selectedSubject);
        console.log('Selected File:', selectedFile);
        if (!selectedSubject) {
            alert('Please select a subject');
            return;
        }
        if (!selectedFile) {
            alert('Please select a file to upload');
            return;
        }
        // Handle file upload logic here
        console.log('Uploading assignment:', {
            session: selectedSession,
            subject: selectedSubject,
            file: selectedFile
        });
    };

    return (
        <>
            <Head>
                <title>Assignments - MET BKC</title>
            </Head>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="p-6 space-y-6"
            >
                {/* Upload Assignment Section */}
                <motion.div
                    className="bg-white rounded-lg shadow-lg overflow-hidden"
                    variants={itemVariants}
                >
                    <div className="bg-gray-700 text-white px-6 py-4">
                        <h2 className="text-xl font-semibold">Upload Assignment</h2>
                    </div>
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="session" className="block text-gray-600 mb-2">
                                    Select Session
                                </label>
                                <select
                                    id="session"
                                    value={selectedSession}
                                    onChange={(e) => setSelectedSession(e.target.value)}
                                    className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {sessions.map((session) => (
                                        <option key={session} value={session}>
                                            {session}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-gray-600 mb-2">
                                    Select Subject
                                </label>
                                <select
                                    id="subject"
                                    value={selectedSubject}
                                    onChange={(e) => setSelectedSubject(e.target.value)}
                                    className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    {subjectsBySession[selectedSession].map((subject) => (
                                        <option key={subject} value={subject}>
                                            {subject}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="file" className="block text-gray-600 mb-2">
                                    Upload File
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    onChange={handleFileChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    accept=".pdf,.doc,.docx,.zip"
                                    required
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    Accepted file types: PDF, DOC, DOCX, ZIP
                                </p>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Upload Assignment
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
};

export default Assignments; 