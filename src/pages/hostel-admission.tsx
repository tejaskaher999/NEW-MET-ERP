import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FaUserGraduate, FaHome, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

interface HostelFormData {
    fullName: string;
    studentId: string;
    department: string;
    year: string;
    gender: string;
    contactNumber: string;
    email: string;
    address: string;
    guardianName: string;
    guardianContact: string;
    roomPreference: string;
    admissionType: 'Regular' | 'Emergency';
    specialRequirements: string;
}

const HostelAdmissionPage = () => {
    const [formData, setFormData] = useState<HostelFormData>({
        fullName: '',
        studentId: '',
        department: '',
        year: '',
        gender: '',
        contactNumber: '',
        email: '',
        address: '',
        guardianName: '',
        guardianContact: '',
        roomPreference: '',
        admissionType: 'Regular',
        specialRequirements: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add your form submission logic here
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
                <title>Hostel Admission Request - MET BKC</title>
            </Head>
            <motion.div
                className="max-w-4xl mx-auto"
                initial="initial"
                animate="animate"
                variants={pageVariants}
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Hostel Admission Request</h1>
                    <p className="text-gray-600">Fill out the form below to request hostel accommodation</p>
                </div>

                {/* Student Info Card */}
                <motion.div
                    className="bg-white rounded-lg shadow-md p-6 mb-8"
                    variants={formVariants}
                >
                    <div className="flex items-center mb-6">
                        <div className="bg-red-100 p-3 rounded-full mr-4">
                            <FaUserGraduate className="text-red-600 text-xl" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Student Information</h2>
                            <p className="text-gray-600">Please provide your personal details</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                    required
                                />
                            </div>

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
                                <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                                    Department
                                </label>
                                <select
                                    id="department"
                                    value={formData.department}
                                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                    required
                                >
                                    <option value="">Select Department</option>
                                    <option value="Computer Science">Computer Science</option>
                                    <option value="Information Technology">Information Technology</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Mechanical">Mechanical</option>
                                    <option value="Civil">Civil</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                                    Year
                                </label>
                                <select
                                    id="year"
                                    value={formData.year}
                                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                    required
                                >
                                    <option value="">Select Year</option>
                                    <option value="First">First Year</option>
                                    <option value="Second">Second Year</option>
                                    <option value="Third">Third Year</option>
                                    <option value="Fourth">Fourth Year</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                                    Gender
                                </label>
                                <select
                                    id="gender"
                                    value={formData.gender}
                                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
                                    Contact Number
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaPhone className="text-gray-400" />
                                    </div>
                                    <input
                                        type="tel"
                                        id="contactNumber"
                                        value={formData.contactNumber}
                                        onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                                        className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email Address
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaEnvelope className="text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                    Permanent Address
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaMapMarkerAlt className="text-gray-400" />
                                    </div>
                                    <textarea
                                        id="address"
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        rows={3}
                                        className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Guardian Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="guardianName" className="block text-sm font-medium text-gray-700">
                                    Guardian Name
                                </label>
                                <input
                                    type="text"
                                    id="guardianName"
                                    value={formData.guardianName}
                                    onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="guardianContact" className="block text-sm font-medium text-gray-700">
                                    Guardian Contact Number
                                </label>
                                <input
                                    type="tel"
                                    id="guardianContact"
                                    value={formData.guardianContact}
                                    onChange={(e) => setFormData({ ...formData, guardianContact: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                    required
                                />
                            </div>
                        </div>

                        {/* Hostel Preferences */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="roomPreference" className="block text-sm font-medium text-gray-700">
                                    Room Preference
                                </label>
                                <select
                                    id="roomPreference"
                                    value={formData.roomPreference}
                                    onChange={(e) => setFormData({ ...formData, roomPreference: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                    required
                                >
                                    <option value="">Select Room Type</option>
                                    <option value="Single">Single Room</option>
                                    <option value="Double">Double Sharing</option>
                                    <option value="Triple">Triple Sharing</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="admissionType" className="block text-sm font-medium text-gray-700">
                                    Admission Type
                                </label>
                                <select
                                    id="admissionType"
                                    value={formData.admissionType}
                                    onChange={(e) => setFormData({ ...formData, admissionType: e.target.value as 'Regular' | 'Emergency' })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                    required
                                >
                                    <option value="Regular">Regular</option>
                                    <option value="Emergency">Emergency</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="specialRequirements" className="block text-sm font-medium text-gray-700">
                                Special Requirements (if any)
                            </label>
                            <textarea
                                id="specialRequirements"
                                value={formData.specialRequirements}
                                onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                                rows={3}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end space-x-3 pt-4">
                            <motion.button
                                type="button"
                                onClick={() => window.history.back()}
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
                                Submit Application
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </>
    );
};

export default HostelAdmissionPage; 