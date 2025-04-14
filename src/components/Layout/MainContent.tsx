import React from 'react';
import Image from 'next/image';

interface FeedbackItem {
    semester: string;
    subject: string;
    facultyName: string;
    status: string;
}

const feedbackData: FeedbackItem[] = [
    {
        semester: 'VII',
        subject: 'Data Engineering Lab',
        facultyName: 'Sonje Mahesh Bhalachandra',
        status: 'No'
    },
    {
        semester: 'VII',
        subject: 'Natural Language Processing',
        facultyName: 'Shaikh Samir Sadik',
        status: 'No'
    },
    {
        semester: 'VII',
        subject: 'Advanced Computer Vision',
        facultyName: 'Khairnar Swapnil Padmakar',
        status: 'No'
    },
    {
        semester: 'VII',
        subject: 'Natural Language Processing Lab',
        facultyName: 'Khairnar Swapnil Padmakar',
        status: 'No'
    },
    {
        semester: 'VII',
        subject: 'Data Science Optimization',
        facultyName: 'Bhamare Vinod Bhaskar',
        status: 'No'
    },
    {
        semester: 'VII',
        subject: 'Natural Language Processing Lab',
        facultyName: 'Bhamare Vinod Bhaskar',
        status: 'No'
    },
    {
        semester: 'VII',
        subject: 'Project Phase-I',
        facultyName: 'Shaikh Samir Sadik',
        status: 'No'
    },
    {
        semester: 'VII',
        subject: 'Project Phase-I',
        facultyName: 'Bhamare Vinod Bhaskar',
        status: 'No'
    },
    // Add more feedback items as needed
];

const MainContent: React.FC = () => {
    return (
        <div className="p-6 bg-gray-100 flex-1">
            {/* Student Information Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex justify-between">
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-4">Student Information</h2>
                        <div className="grid grid-cols-2 gap-y-4">
                            <div>
                                <p className="text-gray-600">Roll Number:</p>
                                <p className="font-medium">N041121000003</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Name:</p>
                                <p className="font-medium">Deshmukh Snehal Bhushan</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Year:</p>
                                <p className="font-medium">Fourth</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Last Login:</p>
                                <p className="font-medium">08/04/2025 09:42</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-gray-600">Update Your Bank Details.</p>
                            <a href="/eligibility.pdf" className="text-blue-600 hover:underline">
                                Eligibility Number PDF
                            </a>
                        </div>
                    </div>
                    <div className="ml-6">
                        <div className="w-32 h-40 relative">
                            <Image
                                src="/student-photo.jpg"
                                alt="Student Photo"
                                width={128}
                                height={160}
                                className="rounded-lg shadow-md object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Feedback Details Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Feedback Details</h2>
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
                        <tbody className="divide-y divide-gray-200">
                            {feedbackData.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="py-3 px-6">{item.semester}</td>
                                    <td className="py-3 px-6">{item.subject}</td>
                                    <td className="py-3 px-6">{item.facultyName}</td>
                                    <td className="py-3 px-6">{item.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MainContent; 