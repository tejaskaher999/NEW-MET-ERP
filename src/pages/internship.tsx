import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaBriefcase,
    FaCalendarAlt,
    FaGraduationCap,
    FaChartLine,
    FaCode,
    FaDatabase,
    FaMobileAlt,
    FaCloud,
    FaRobot,
    FaChartBar,
    FaCheckCircle,
    FaSpinner,
    FaClock
} from 'react-icons/fa';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
);

interface Internship {
    id: string;
    position: string;
    company: string;
    duration: string;
    startDate: string;
    status: 'pending' | 'active' | 'completed';
    description: string;
    skills: string[];
    progress?: number;
}

interface InternshipFormData {
    position: string;
    company: string;
    duration: string;
    startDate: string;
    status: string;
    description: string;
    skills: string;
}

const InternshipPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState<InternshipFormData>({
        position: '',
        company: '',
        duration: '',
        startDate: '',
        status: '',
        description: '',
        skills: ''
    });

    // Sample data for visualizations
    const skillsData = {
        labels: ['React', 'Node.js', 'Python', 'Java', 'SQL', 'AWS', 'Docker', 'TypeScript'],
        datasets: [
            {
                label: 'Skills Acquired',
                data: [85, 65, 70, 55, 75, 60, 45, 80],
                backgroundColor: 'rgba(239, 68, 68, 0.5)',
                borderColor: 'rgba(239, 68, 68, 1)',
                borderWidth: 1,
            },
        ],
    };

    const statusData = {
        labels: ['Completed', 'Active', 'Pending'],
        datasets: [
            {
                data: [2, 1, 1],
                backgroundColor: [
                    'rgba(34, 197, 94, 0.5)',
                    'rgba(59, 130, 246, 0.5)',
                    'rgba(234, 179, 8, 0.5)',
                ],
                borderColor: [
                    'rgba(34, 197, 94, 1)',
                    'rgba(59, 130, 246, 1)',
                    'rgba(234, 179, 8, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const progressData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Learning Progress',
                data: [30, 45, 60, 75, 85, 90],
                fill: false,
                borderColor: 'rgb(239, 68, 68)',
                tension: 0.1,
            },
        ],
    };

    // Sample internships data
    const [internships, setInternships] = useState<Internship[]>([
        {
            id: '1',
            position: 'Frontend Developer',
            company: 'Tech Solutions Inc.',
            duration: '3 months',
            startDate: '2024-01-15',
            status: 'active',
            description: 'Working on React-based web applications with modern UI/UX practices.',
            skills: ['React', 'TypeScript', 'Tailwind CSS', 'Redux'],
            progress: 45
        },
        {
            id: '2',
            position: 'Data Analyst',
            company: 'Analytics Corp',
            duration: '2 months',
            startDate: '2023-12-01',
            status: 'completed',
            description: 'Analyzed large datasets and created visualizations using Python and Tableau.',
            skills: ['Python', 'SQL', 'Tableau', 'Excel'],
            progress: 100
        },
        {
            id: '3',
            position: 'ML Engineer',
            company: 'AI Solutions Ltd',
            duration: '6 months',
            startDate: '2024-02-01',
            status: 'pending',
            description: 'Will be working on machine learning models for predictive analytics.',
            skills: ['Python', 'TensorFlow', 'SQL', 'AWS'],
            progress: 0
        }
    ]);

    // Calculate statistics
    const stats = {
        total: internships.length,
        active: internships.filter(i => i.status === 'active').length,
        completed: internships.filter(i => i.status === 'completed').length,
        pending: internships.filter(i => i.status === 'pending').length,
        totalDuration: internships.reduce((acc, curr) => {
            const months = parseInt(curr.duration.split(' ')[0]);
            return acc + months;
        }, 0),
        uniqueSkills: Array.from(new Set(internships.flatMap(i => i.skills))).length
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setFormData({
            position: '',
            company: '',
            duration: '',
            startDate: '',
            status: '',
            description: '',
            skills: ''
        });
        setIsModalOpen(false);
    };

    // Animation variants
    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: { duration: 0.4 }
        }
    };

    const cardVariants = {
        initial: { scale: 0.95, opacity: 0 },
        animate: {
            scale: 1,
            opacity: 1,
            transition: { duration: 0.4 }
        },
        hover: {
            scale: 1.02,
            transition: { duration: 0.2 }
        }
    };

    const formVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    // Render skill badges
    const renderSkillBadges = (skills: string[]) => {
        return (
            <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill, index) => {
                    // Map skills to icons
                    let icon = <FaCode />;
                    if (skill.toLowerCase().includes('sql') || skill.toLowerCase().includes('database')) {
                        icon = <FaDatabase />;
                    } else if (skill.toLowerCase().includes('react') || skill.toLowerCase().includes('frontend')) {
                        icon = <FaMobileAlt />;
                    } else if (skill.toLowerCase().includes('aws') || skill.toLowerCase().includes('cloud')) {
                        icon = <FaCloud />;
                    } else if (skill.toLowerCase().includes('ml') || skill.toLowerCase().includes('ai')) {
                        icon = <FaRobot />;
                    }

                    return (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                        >
                            <span className="mr-1">{icon}</span>
                            {skill}
                        </motion.span>
                    );
                })}
            </div>
        );
    };

    // Render status badge
    const renderStatusBadge = (status: string) => {
        let bgColor = 'bg-yellow-100 text-yellow-800';
        let icon = <FaClock className="w-4 h-4" />;

        if (status === 'active') {
            bgColor = 'bg-blue-100 text-blue-800';
            icon = <FaSpinner className="w-4 h-4" />;
        } else if (status === 'completed') {
            bgColor = 'bg-green-100 text-green-800';
            icon = <FaCheckCircle className="w-4 h-4" />;
        }

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor}`}>
                <span className="mr-1">{icon}</span>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    // Render progress bar
    const renderProgressBar = (progress: number) => {
        return (
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <motion.div
                    className="bg-red-600 h-2.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                />
            </div>
        );
    };

    return (
        <>
            <Head>
                <title>Internship Tracking - MET BKC</title>
            </Head>
            <div className="p-6">
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Internship Tracking</h1>
                    <p className="text-gray-600">Track and manage your internship journey</p>
                </motion.div>

                {/* Student Info Card */}
                <motion.div
                    className="bg-white rounded-lg shadow-md p-6 mb-8"
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                >
                    <div className="flex items-center">
                        <div className="bg-red-100 p-3 rounded-full mr-4">
                            <FaGraduationCap className="text-red-600 text-xl" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Student Information</h2>
                            <p className="text-gray-600">ID: STU2024001 | Department: Computer Science | Year: 3rd</p>
                        </div>
                    </div>
                </motion.div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <motion.div
                        className="bg-white p-6 rounded-lg shadow-md"
                        variants={cardVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Internships</p>
                                <h3 className="text-2xl font-bold text-gray-900">{stats.total}</h3>
                            </div>
                            <div className="bg-blue-100 p-3 rounded-full">
                                <FaBriefcase className="text-blue-600 text-xl" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="bg-white p-6 rounded-lg shadow-md"
                        variants={cardVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        transition={{ delay: 0.1 }}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Active</p>
                                <h3 className="text-2xl font-bold text-gray-900">{stats.active}</h3>
                            </div>
                            <div className="bg-green-100 p-3 rounded-full">
                                <FaChartLine className="text-green-600 text-xl" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="bg-white p-6 rounded-lg shadow-md"
                        variants={cardVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Completed</p>
                                <h3 className="text-2xl font-bold text-gray-900">{stats.completed}</h3>
                            </div>
                            <div className="bg-purple-100 p-3 rounded-full">
                                <FaGraduationCap className="text-purple-600 text-xl" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="bg-white p-6 rounded-lg shadow-md"
                        variants={cardVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        transition={{ delay: 0.3 }}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Pending</p>
                                <h3 className="text-2xl font-bold text-gray-900">{stats.pending}</h3>
                            </div>
                            <div className="bg-yellow-100 p-3 rounded-full">
                                <FaCalendarAlt className="text-yellow-600 text-xl" />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Visualization Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Skills Chart */}
                    <motion.div
                        className="bg-white p-6 rounded-lg shadow-md"
                        variants={cardVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                    >
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Skills Development</h3>
                        <div className="h-64">
                            <Bar
                                data={skillsData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            display: false,
                                        },
                                    },
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            max: 100,
                                        },
                                    },
                                }}
                            />
                        </div>
                    </motion.div>

                    {/* Status Distribution */}
                    <motion.div
                        className="bg-white p-6 rounded-lg shadow-md"
                        variants={cardVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                    >
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Internship Status</h3>
                        <div className="h-64 flex items-center justify-center">
                            <div className="w-64 h-64">
                                <Doughnut
                                    data={statusData}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: {
                                                position: 'bottom',
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Learning Progress */}
                    <motion.div
                        className="bg-white p-6 rounded-lg shadow-md lg:col-span-2"
                        variants={cardVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                    >
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Learning Progress</h3>
                        <div className="h-64">
                            <Line
                                data={progressData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            display: false,
                                        },
                                    },
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            max: 100,
                                        },
                                    },
                                }}
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Additional Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <motion.div
                        className="bg-white p-6 rounded-lg shadow-md"
                        variants={cardVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Duration</p>
                                <h3 className="text-2xl font-bold text-gray-900">{stats.totalDuration} months</h3>
                            </div>
                            <div className="bg-indigo-100 p-3 rounded-full">
                                <FaCalendarAlt className="text-indigo-600 text-xl" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="bg-white p-6 rounded-lg shadow-md"
                        variants={cardVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Unique Skills</p>
                                <h3 className="text-2xl font-bold text-gray-900">{stats.uniqueSkills}</h3>
                            </div>
                            <div className="bg-pink-100 p-3 rounded-full">
                                <FaCode className="text-pink-600 text-xl" />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Add Internship Button */}
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <motion.button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Add New Internship
                    </motion.button>
                </motion.div>

                {/* Internship List */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-medium text-gray-900">Your Internships</h2>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {internships.map((internship) => (
                            <motion.div
                                key={internship.id}
                                className="p-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center">
                                            <h3 className="text-lg font-medium text-gray-900">{internship.position}</h3>
                                            <div className="ml-3">
                                                {renderStatusBadge(internship.status)}
                                            </div>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-600">{internship.company}</p>
                                        <p className="mt-1 text-sm text-gray-500">{internship.description}</p>

                                        <div className="mt-2 flex items-center text-sm text-gray-500">
                                            <div className="flex items-center mr-4">
                                                <FaCalendarAlt className="mr-1" />
                                                <span>{internship.startDate}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <FaBriefcase className="mr-1" />
                                                <span>{internship.duration}</span>
                                            </div>
                                        </div>

                                        {renderSkillBadges(internship.skills)}

                                        {internship.progress !== undefined && (
                                            <div className="mt-3">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">Progress</span>
                                                    <span className="text-gray-900 font-medium">{internship.progress}%</span>
                                                </div>
                                                {renderProgressBar(internship.progress)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal Form */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white rounded-lg p-6 w-full max-w-md mx-auto"
                            variants={formVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium">Add New Internship</h3>
                                <motion.button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-400 hover:text-gray-500"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <span className="sr-only">Close</span>
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </motion.button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                                        Position
                                    </label>
                                    <input
                                        type="text"
                                        id="position"
                                        value={formData.position}
                                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                        required
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                                        Company
                                    </label>
                                    <input
                                        type="text"
                                        id="company"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                        required
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                                        Duration (in months)
                                    </label>
                                    <input
                                        type="number"
                                        id="duration"
                                        value={formData.duration}
                                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                        required
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                                        Start Date
                                    </label>
                                    <input
                                        type="date"
                                        id="startDate"
                                        value={formData.startDate}
                                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                        required
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                        Status
                                    </label>
                                    <input
                                        type="text"
                                        id="status"
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                        placeholder="Enter status (e.g., pending, active, completed)"
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={3}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                                        Skills (comma separated)
                                    </label>
                                    <input
                                        type="text"
                                        id="skills"
                                        value={formData.skills}
                                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                        placeholder="React, Node.js, TypeScript"
                                    />
                                </motion.div>

                                <div className="flex justify-end space-x-3 pt-4">
                                    <motion.button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Add Internship
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default InternshipPage;