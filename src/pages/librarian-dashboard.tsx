import React, { useEffect, ReactElement } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FaBook, FaUsers, FaExclamationTriangle, FaCalendarCheck, FaExchangeAlt, FaClipboardList } from 'react-icons/fa';
import LibrarianLayout from '@/components/Layout/LibrarianLayout';
import { useRouter } from 'next/router';
import ProtectedRoute from '../components/ProtectedRoute';

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

const LibrarianDashboard = () => {
    const router = useRouter();
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    const formattedTime = currentDate.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    // Add to pages that need authentication
    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        const userRole = localStorage.getItem('userRole');

        if (!authToken || userRole !== 'librarian') {
            router.push('/login');
        }
    }, []);

    return (
        <ProtectedRoute allowedRole="librarian">
            <>
                <Head>
                    <title>Librarian Dashboard - MET BKC</title>
                </Head>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {/* Librarian Information Card */}
                    <motion.div
                        className="bg-white rounded-lg shadow-lg overflow-hidden mb-6"
                        variants={itemVariants}
                    >
                        <div className="bg-gray-700 text-white px-6 py-4">
                            <h2 className="text-xl font-semibold">Librarian Information</h2>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-start">
                                <div className="grid grid-cols-2 gap-6 flex-1">
                                    <motion.div
                                        className="space-y-1"
                                        variants={itemVariants}
                                    >
                                        <p className="text-gray-600">Employee ID:</p>
                                        <p className="font-medium">LIB001</p>
                                    </motion.div>
                                    <motion.div
                                        className="space-y-1"
                                        variants={itemVariants}
                                    >
                                        <p className="text-gray-600">Name:</p>
                                        <p className="font-medium">Jane Smith</p>
                                    </motion.div>
                                    <motion.div
                                        className="space-y-1"
                                        variants={itemVariants}
                                    >
                                        <p className="text-gray-600">Department:</p>
                                        <p className="font-medium">Library</p>
                                    </motion.div>
                                    <motion.div
                                        className="space-y-1"
                                        variants={itemVariants}
                                    >
                                        <p className="text-gray-600">Last Login:</p>
                                        <p className="font-medium">{`${formattedDate} ${formattedTime}`}</p>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Stats */}
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"
                        variants={itemVariants}
                    >
                        {/* Total Books */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-gray-500 text-sm">Total Books</p>
                                    <p className="text-2xl font-bold mt-1">5,234</p>
                                </div>
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <FaBook className="text-blue-600 text-xl" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm text-gray-500">Available: <span className="font-medium">4,890</span></p>
                            </div>
                        </div>

                        {/* Active Members */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-gray-500 text-sm">Active Members</p>
                                    <p className="text-2xl font-bold mt-1">1,245</p>
                                </div>
                                <div className="bg-green-100 p-3 rounded-full">
                                    <FaUsers className="text-green-600 text-xl" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm text-gray-500">New this month: <span className="font-medium">45</span></p>
                            </div>
                        </div>

                        {/* Overdue Books */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-gray-500 text-sm">Overdue Books</p>
                                    <p className="text-2xl font-bold mt-1">23</p>
                                </div>
                                <div className="bg-red-100 p-3 rounded-full">
                                    <FaExclamationTriangle className="text-red-600 text-xl" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm text-gray-500">Due today: <span className="font-medium">8</span></p>
                            </div>
                        </div>

                        {/* Today's Transactions */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-gray-500 text-sm">Today's Transactions</p>
                                    <p className="text-2xl font-bold mt-1">45</p>
                                </div>
                                <div className="bg-purple-100 p-3 rounded-full">
                                    <FaCalendarCheck className="text-purple-600 text-xl" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm text-gray-500">Returns: <span className="font-medium">28</span></p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Recent Activity & Tasks */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Recent Activity */}
                        <motion.div
                            className="bg-white rounded-lg shadow-lg overflow-hidden"
                            variants={itemVariants}
                        >
                            <div className="bg-gray-700 text-white px-6 py-4">
                                <h2 className="text-xl font-semibold">Recent Activity</h2>
                            </div>
                            <div className="p-6">
                                <ul className="space-y-4">
                                    <li className="flex items-start">
                                        <span className="bg-green-100 p-2 rounded-full mr-3">
                                            <FaBook className="text-green-600" />
                                        </span>
                                        <div>
                                            <p className="font-medium">Added new book: "Data Structures"</p>
                                            <p className="text-sm text-gray-500">2 hours ago</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="bg-blue-100 p-2 rounded-full mr-3">
                                            <FaUsers className="text-blue-600" />
                                        </span>
                                        <div>
                                            <p className="font-medium">Registered new member</p>
                                            <p className="text-sm text-gray-500">Yesterday</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="bg-purple-100 p-2 rounded-full mr-3">
                                            <FaExchangeAlt className="text-purple-600" />
                                        </span>
                                        <div>
                                            <p className="font-medium">Processed book returns</p>
                                            <p className="text-sm text-gray-500">2 days ago</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* Upcoming Tasks */}
                        <motion.div
                            className="bg-white rounded-lg shadow-lg overflow-hidden"
                            variants={itemVariants}
                        >
                            <div className="bg-gray-700 text-white px-6 py-4">
                                <h2 className="text-xl font-semibold">Upcoming Tasks</h2>
                            </div>
                            <div className="p-6">
                                <ul className="space-y-3">
                                    <li className="flex items-center">
                                        <input type="checkbox" className="h-4 w-4 text-red-600 rounded border-gray-300 focus:ring-red-500" />
                                        <span className="ml-3 text-sm">Process new book arrivals</span>
                                    </li>
                                    <li className="flex items-center">
                                        <input type="checkbox" className="h-4 w-4 text-red-600 rounded border-gray-300 focus:ring-red-500" />
                                        <span className="ml-3 text-sm">Send overdue notifications</span>
                                    </li>
                                    <li className="flex items-center">
                                        <input type="checkbox" className="h-4 w-4 text-red-600 rounded border-gray-300 focus:ring-red-500" />
                                        <span className="ml-3 text-sm">Update library catalog</span>
                                    </li>
                                    <li className="flex items-center">
                                        <input type="checkbox" className="h-4 w-4 text-red-600 rounded border-gray-300 focus:ring-red-500" />
                                        <span className="ml-3 text-sm">Conduct inventory check</span>
                                    </li>
                                    <li className="flex items-center">
                                        <input type="checkbox" className="h-4 w-4 text-red-600 rounded border-gray-300 focus:ring-red-500" />
                                        <span className="ml-3 text-sm">Prepare monthly circulation report</span>
                                    </li>
                                </ul>

                                <button className="mt-4 text-sm text-red-600 hover:text-red-800 font-medium">
                                    + Add New Task
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </>
        </ProtectedRoute>
    );
};

// Use the librarian layout for this page
LibrarianDashboard.getLayout = function getLayout(page: ReactElement) {
    return <LibrarianLayout>{page}</LibrarianLayout>;
};

export default LibrarianDashboard;
