import React, { useEffect, ReactElement } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FaUserGraduate, FaClipboardList, FaBook, FaCalendarAlt, FaChartLine, FaChalkboardTeacher } from 'react-icons/fa';
import StaffLayout from '@/components/Layout/StaffLayout';
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

const StaffDashboard = () => {
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

        if (!authToken || userRole !== 'staff') {
            router.push('/login');
        }
    }, []);

    return (
        <ProtectedRoute allowedRole="staff">
            <>
                <Head>
                    <title>Staff Dashboard - MET BKC</title>
                </Head>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {/* Staff Information Card */}
                    <motion.div
                        className="bg-white rounded-lg shadow-lg overflow-hidden mb-6"
                        variants={itemVariants}
                    >
                        <div className="bg-gray-700 text-white px-6 py-4">
                            <h2 className="text-xl font-semibold">Staff Information</h2>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-start">
                                <div className="grid grid-cols-2 gap-6 flex-1">
                                    <motion.div
                                        className="space-y-1"
                                        variants={itemVariants}
                                    >
                                        <p className="text-gray-600">Employee ID:</p>
                                        <p className="font-medium">STAFF001</p>
                                    </motion.div>
                                    <motion.div
                                        className="space-y-1"
                                        variants={itemVariants}
                                    >
                                        <p className="text-gray-600">Name:</p>
                                        <p className="font-medium">John Doe</p>
                                    </motion.div>
                                    <motion.div
                                        className="space-y-1"
                                        variants={itemVariants}
                                    >
                                        <p className="text-gray-600">Department:</p>
                                        <p className="font-medium">Computer Science</p>
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
                        {/* Classes Today */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-gray-500 text-sm">Classes Today</p>
                                    <p className="text-2xl font-bold mt-1">4</p>
                                </div>
                                <div className="bg-green-100 p-3 rounded-full">
                                    <FaChalkboardTeacher className="text-green-600 text-xl" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm text-gray-500">Next class: <span className="font-medium">10:30 AM - Data Structures</span></p>
                            </div>
                        </div>

                        {/* Students Attendance */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-gray-500 text-sm">Students</p>
                                    <p className="text-2xl font-bold mt-1">124</p>
                                </div>
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <FaUserGraduate className="text-blue-600 text-xl" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm text-gray-500">Average attendance: <span className="font-medium">87%</span></p>
                            </div>
                        </div>

                        {/* Assignments */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-gray-500 text-sm">Pending Reviews</p>
                                    <p className="text-2xl font-bold mt-1">12</p>
                                </div>
                                <div className="bg-yellow-100 p-3 rounded-full">
                                    <FaClipboardList className="text-yellow-600 text-xl" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm text-gray-500">Due: <span className="font-medium">Today</span></p>
                            </div>
                        </div>

                        {/* Upcoming Events */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-gray-500 text-sm">Upcoming Events</p>
                                    <p className="text-2xl font-bold mt-1">3</p>
                                </div>
                                <div className="bg-purple-100 p-3 rounded-full">
                                    <FaCalendarAlt className="text-purple-600 text-xl" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm text-gray-500">Next: <span className="font-medium">Faculty Meeting</span></p>
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
                                            <FaChartLine className="text-green-600" />
                                        </span>
                                        <div>
                                            <p className="font-medium">Submitted mid-term results</p>
                                            <p className="text-sm text-gray-500">2 hours ago</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="bg-blue-100 p-2 rounded-full mr-3">
                                            <FaClipboardList className="text-blue-600" />
                                        </span>
                                        <div>
                                            <p className="font-medium">Created new assignment: "Database Normalization"</p>
                                            <p className="text-sm text-gray-500">Yesterday</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="bg-yellow-100 p-2 rounded-full mr-3">
                                            <FaUserGraduate className="text-yellow-600" />
                                        </span>
                                        <div>
                                            <p className="font-medium">Updated student attendance</p>
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
                                        <span className="ml-3 text-sm">Review semester assignments by end of week</span>
                                    </li>
                                    <li className="flex items-center">
                                        <input type="checkbox" className="h-4 w-4 text-red-600 rounded border-gray-300 focus:ring-red-500" />
                                        <span className="ml-3 text-sm">Prepare lab materials for Thursday's practical</span>
                                    </li>
                                    <li className="flex items-center">
                                        <input type="checkbox" className="h-4 w-4 text-red-600 rounded border-gray-300 focus:ring-red-500" />
                                        <span className="ml-3 text-sm">Submit monthly department report</span>
                                    </li>
                                    <li className="flex items-center">
                                        <input type="checkbox" className="h-4 w-4 text-red-600 rounded border-gray-300 focus:ring-red-500" />
                                        <span className="ml-3 text-sm">Update course syllabus for next semester</span>
                                    </li>
                                    <li className="flex items-center">
                                        <input type="checkbox" className="h-4 w-4 text-red-600 rounded border-gray-300 focus:ring-red-500" />
                                        <span className="ml-3 text-sm">Attend faculty development program on Friday</span>
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

// Use the staff layout for this page
StaffDashboard.getLayout = function getLayout(page: ReactElement) {
    return <StaffLayout>{page}</StaffLayout>;
};

export default StaffDashboard;