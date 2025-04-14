import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

interface TestSession {
    testId: string;
    startTime: string;
    status: 'started' | 'completed';
}

const TestHistory: React.FC = () => {
    const [testSessions, setTestSessions] = useState<TestSession[]>([]);

    useEffect(() => {
        // Load test sessions from localStorage
        const sessions = JSON.parse(localStorage.getItem('testSessions') || '[]');
        setTestSessions(sessions.reverse()); // Show newest first
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <Head>
                <title>Test History - MET BKC</title>
            </Head>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
            >
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Test History
                    </h1>
                    <p className="text-lg text-gray-600">
                        View your aptitude test attempts and results
                    </p>
                </div>

                {testSessions.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-2xl shadow-xl p-8 text-center"
                    >
                        <div className="mb-6">
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-medium text-gray-900 mb-2">No tests taken yet</h3>
                        <p className="text-gray-500 mb-6">Start a new test to see your history here.</p>
                        <button
                            onClick={() => window.location.href = '/take-test'}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Take New Test
                        </button>
                    </motion.div>
                ) : (
                    <div className="space-y-6">
                        {testSessions.map((session, index) => (
                            <motion.div
                                key={session.testId}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-xl shadow-lg overflow-hidden"
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                Aptitude Test Session
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {formatDate(session.startTime)}
                                            </p>
                                        </div>
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${session.status === 'completed'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                                }`}
                                        >
                                            {session.status === 'completed' ? 'Completed' : 'In Progress'}
                                        </span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-4">
                                        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Test ID</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{session.testId}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Start Time</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{formatDate(session.startTime)}</dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default TestHistory; 