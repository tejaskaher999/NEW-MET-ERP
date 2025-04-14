import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaUser, FaCalendar, FaFileAlt } from 'react-icons/fa';
import { useRouter } from 'next/router';

interface GrievanceFormData {
    studentId: string;
    name: string;
    email: string;
    phone: string;
    category: string;
    subCategory: string;
    subject: string;
    description: string;
    priority: 'Low' | 'Medium' | 'High';
    attachments: File[];
}

const RegisterGrievancePage = () => {
    const [formData, setFormData] = useState<GrievanceFormData>({
        studentId: '',
        name: '',
        email: '',
        phone: '',
        category: '',
        subCategory: '',
        subject: '',
        description: '',
        priority: 'Medium',
        attachments: []
    });

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Grievance submitted:', formData);
        // Add your form submission logic here
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({
                ...formData,
                attachments: Array.from(e.target.files)
            });
        }
    };

    const handleCancel = () => {
        router.back();
    };

    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    const formVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <>
            <Head>
                <title>Register Grievance - MET BKC</title>
            </Head>
            <motion.div
                className="max-w-4xl mx-auto"
                initial="initial"
                animate="animate"
                variants={pageVariants}
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Register Grievance</h1>
                    <p className="text-gray-600">Submit your grievance for resolution</p>
                </div>

                {/* Grievance Form Card */}
                <motion.div
                    className="bg-white rounded-lg shadow-md p-6 mb-8"
                    variants={formVariants}
                >
                    <div className="flex items-center mb-6">
                        <div className="bg-red-100 p-3 rounded-full mr-4">
                            <FaExclamationTriangle className="text-red-600 text-xl" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Grievance Details</h2>
                            <p className="text-gray-600">Please provide complete information about your grievance</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">
                                    Student ID
                                </label>
                                <input
                                    type="text"
                                    id="studentId"
                                    value={formData.studentId}
                                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                    required
                                />
                            </div>
                        </div>

                        {/* Grievance Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                    Category
                                </label>
                                <select
                                    id="category"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="Academic">Academic</option>
                                    <option value="Administrative">Administrative</option>
                                    <option value="Infrastructure">Infrastructure</option>
                                    <option value="Hostel">Hostel</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700">
                                    Sub-Category
                                </label>
                                <select
                                    id="subCategory"
                                    value={formData.subCategory}
                                    onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                    required
                                >
                                    <option value="">Select Sub-Category</option>
                                    <option value="Examination">Examination</option>
                                    <option value="Attendance">Attendance</option>
                                    <option value="Fees">Fees</option>
                                    <option value="Library">Library</option>
                                    <option value="Transport">Transport</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                                    Priority Level
                                </label>
                                <select
                                    id="priority"
                                    value={formData.priority}
                                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'Low' | 'Medium' | 'High' })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                    required
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={4}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="attachments" className="block text-sm font-medium text-gray-700">
                                Attachments (if any)
                            </label>
                            <input
                                type="file"
                                id="attachments"
                                multiple
                                onChange={handleFileChange}
                                className="mt-1 block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-md file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-red-50 file:text-red-700
                                    hover:file:bg-red-100"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end space-x-3 pt-4">
                            <motion.button
                                type="button"
                                onClick={handleCancel}
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
                                Submit Grievance
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </>
    );
};

export default RegisterGrievancePage;