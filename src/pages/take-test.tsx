import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

interface TestSession {
    testId: string;
    startTime: string;
    status: 'started' | 'completed';
}

const TakeTest: React.FC = () => {
    const router = useRouter();
    const [testId, setTestId] = useState<string>('');
    const [testUrl, setTestUrl] = useState<string>('');

    useEffect(() => {
        // Generate a unique test ID when the component mounts
        const uniqueId = Math.random().toString(36).substring(2, 15);
        setTestId(uniqueId);
        // Set the IndiaBix aptitude test URL
        setTestUrl('https://www.indiabix.com/online-test/aptitude-test/random');
    }, []);

    const startTest = () => {
        // Store test session in localStorage
        const testSession: TestSession = {
            testId,
            startTime: new Date().toISOString(),
            status: 'started'
        };

        // Get existing test sessions or initialize empty array
        const existingSessions = JSON.parse(localStorage.getItem('testSessions') || '[]');
        localStorage.setItem('testSessions', JSON.stringify([...existingSessions, testSession]));

        // Open test in new window
        window.open(testUrl, '_blank');

        // Navigate to test history page
        router.push('/test-history');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <Head>
                <title>Take Test - MET BKC</title>
            </Head>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
            >
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Take Aptitude Test
                    </h1>
                    <p className="text-lg text-gray-600">
                        Scan the QR code or click the button below to begin your assessment
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                Start Your Test
                            </h2>
                            <p className="text-gray-600">
                                Use your mobile device to scan the QR code or click the button below to start the aptitude test.
                            </p>
                        </div>

                        <div className="flex justify-center mb-10">
                            {testUrl && (
                                <div className="p-4 bg-white rounded-xl shadow-md border-2 border-gray-100 hover:border-blue-500 transition-colors duration-300">
                                    <QRCodeSVG
                                        value={testUrl}
                                        size={240}
                                        level="H"
                                        includeMargin={true}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="space-y-6">
                            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                                <h3 className="text-lg font-semibold text-blue-900 mb-4">
                                    Test Instructions:
                                </h3>
                                <ul className="text-blue-800 space-y-3">
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                        Scan the QR code or click the button below
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                        You will be redirected to the aptitude test platform
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                        Complete all questions in the given time
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                        Your progress will be tracked automatically
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                        View your results in the Test History section
                                    </li>
                                </ul>
                            </div>

                            <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-100">
                                <p className="text-gray-600 mb-4">Test ID: <span className="font-semibold text-gray-900">{testId}</span></p>
                                <button
                                    onClick={startTest}
                                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
                                >
                                    Start Test Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default TakeTest; 