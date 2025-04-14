import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ProtectedRoute from '../components/ProtectedRoute';

interface UserData {
    id: string;
    name: string;
    year: string;
    role: string;
    division?: string;
}

interface FeedbackItem {
    semester: string;
    subject: string;
    facultyName: string;
    status: string;
}

const feedbackData: FeedbackItem[] = [
    { semester: 'VII', subject: 'Data Engineering Lab', facultyName: 'Sonje Mahesh Bhalachandra', status: 'No' },
    { semester: 'VII', subject: 'Natural Language Processing', facultyName: 'Shaikh Samir Sadik', status: 'No' },
    { semester: 'VII', subject: 'Advanced Computer Vision', facultyName: 'Khairnar Swapnil Padmakar', status: 'No' },
    { semester: 'VII', subject: 'Natural Language Processing Lab', facultyName: 'Khairnar Swapnil Padmakar', status: 'No' },
    { semester: 'VII', subject: 'Data Science Optimization', facultyName: 'Bhamare Vinod Bhaskar', status: 'No' },
    { semester: 'VII', subject: 'Natural Language Processing Lab', facultyName: 'Bhamare Vinod Bhaskar', status: 'No' },
    { semester: 'VII', subject: 'Project Phase-I', facultyName: 'Shaikh Samir Sadik', status: 'No' },
    { semester: 'VII', subject: 'Project Phase-I', facultyName: 'Bhamare Vinod Bhaskar', status: 'No' }
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

export default function StudentDashboard() {
    const router = useRouter();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Check authentication before any client-side rendering
                const authToken = localStorage.getItem('authToken');
                const userRole = localStorage.getItem('userRole');
                const userDataStr = localStorage.getItem('user');

                if (!authToken || !userRole) {
                    await router.replace('/login');
                    return;
                }

                if (userRole === 'staff') {
                    await router.replace('/staff-dashboard');
                    return;
                }

                if (userRole === 'student' && userDataStr) {
                    const parsedUserData = JSON.parse(userDataStr) as UserData;
                    setUserData(parsedUserData);
                    setIsAuthenticated(true);
                } else {
                    await router.replace('/login');
                }
            } catch (error) {
                console.error('Auth error:', error);
                await router.replace('/login');
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    // Return loading spinner while checking authentication
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
            </div>
        );
    }

    // Don't render anything if not authenticated
    if (!isAuthenticated || !userData) {
        return null;
    }

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

    // Only render protected content after authentication is confirmed
    return (
        <ProtectedRoute allowedRole="student">
            <>
                <Head>
                    <title>Student Dashboard - MET BKC</title>
                </Head>
                {userData && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        {/* Student Information Card */}
                        <motion.div
                            className="bg-white rounded-lg shadow-lg overflow-hidden mb-6"
                            variants={itemVariants}
                        >
                            <div className="bg-gray-700 text-white px-6 py-4">
                                <h2 className="text-xl font-semibold">Student Information</h2>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start">
                                    <div className="grid grid-cols-2 gap-6 flex-1">
                                        <motion.div
                                            className="space-y-1"
                                            variants={itemVariants}
                                        >
                                            <p className="text-gray-600">GR Number:</p>
                                            <p className="font-medium">{userData.id}</p>
                                        </motion.div>
                                        <motion.div
                                            className="space-y-1"
                                            variants={itemVariants}
                                        >
                                            <p className="text-gray-600">Name:</p>
                                            <p className="font-medium">{userData.name}</p>
                                        </motion.div>
                                        <motion.div
                                            className="space-y-1"
                                            variants={itemVariants}
                                        >
                                            <p className="text-gray-600">Year:</p>
                                            <p className="font-medium">{userData.year}</p>
                                        </motion.div>
                                        <motion.div
                                            className="space-y-1"
                                            variants={itemVariants}
                                        >
                                            <p className="text-gray-600">Last Login:</p>
                                            <p className="font-medium">{`${formattedDate} ${formattedTime}`}</p>
                                        </motion.div>
                                    </div>
                                    <motion.div
                                        className="ml-6"
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <div className="w-32 h-40 relative rounded-lg overflow-hidden shadow-lg">
                                            <Image
                                                src="/atharva photo.jpg"
                                                alt="Student Photo"
                                                fill
                                                sizes="(max-width: 128px) 100vw, 128px"
                                                className="object-cover"
                                                priority
                                            />
                                        </div>
                                    </motion.div>
                                </div>
                                <motion.div
                                    className="mt-6 space-y-2"
                                    variants={itemVariants}
                                >
                                    <p className="text-gray-600">Update Your Bank Details.</p>
                                    <a
                                        href="/eligibility.pdf"
                                        className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center"
                                    >
                                        <span>Eligibility Number PDF</span>
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Feedback Details Table */}
                        <motion.div
                            className="bg-white rounded-lg shadow-lg overflow-hidden"
                            variants={itemVariants}
                        >
                            <div className="bg-gray-700 text-white px-6 py-4">
                                <h2 className="text-xl font-semibold">Feedback Details</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-800 text-white">
                                        <tr>
                                            <th className="py-3 px-6 text-left">Semester</th>
                                            <th className="py-3 px-6 text-left">Subject</th>
                                            <th className="py-3 px-6 text-left">Faculty Name</th>
                                            <th className="py-3 px-6 text-left">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {feedbackData.map((item, index) => (
                                            <motion.tr
                                                key={index}
                                                className="border-b hover:bg-gray-50 transition-colors"
                                                variants={itemVariants}
                                                custom={index}
                                                initial="hidden"
                                                animate="visible"
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                <td className="py-3 px-6">{item.semester}</td>
                                                <td className="py-3 px-6">{item.subject}</td>
                                                <td className="py-3 px-6">{item.facultyName}</td>
                                                <td className="py-3 px-6">{item.status}</td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </>
        </ProtectedRoute>
    );
};