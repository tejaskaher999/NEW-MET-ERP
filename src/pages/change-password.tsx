import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

const inputVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.4
        }
    }
};

const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            delay: 0.4,
            duration: 0.3
        }
    },
    hover: {
        scale: 1.03,
        transition: {
            duration: 0.2
        }
    },
    tap: {
        scale: 0.97
    }
};

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        retypePassword: ''
    });

    const [errors, setErrors] = useState({
        currentPassword: '',
        newPassword: '',
        retypePassword: ''
    });

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            currentPassword: '',
            newPassword: '',
            retypePassword: ''
        };

        if (!formData.currentPassword) {
            newErrors.currentPassword = 'Current password is required';
            isValid = false;
        }

        if (!formData.newPassword) {
            newErrors.newPassword = 'New password is required';
            isValid = false;
        } else if (formData.newPassword.length < 8) {
            newErrors.newPassword = 'Password must be at least 8 characters long';
            isValid = false;
        }

        if (!formData.retypePassword) {
            newErrors.retypePassword = 'Please retype your password';
            isValid = false;
        } else if (formData.newPassword !== formData.retypePassword) {
            newErrors.retypePassword = 'Passwords do not match';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            // Handle password change logic here
            console.log('Form submitted:', formData);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    return (
        <>
            <Head>
                <title>Change Password - MET BKC</title>
            </Head>
            <motion.div
                className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8"
                initial="hidden"
                animate="visible"
                variants={formVariants}
            >
                <div className="max-w-2xl mx-auto">
                    <motion.div
                        className="bg-white rounded-lg shadow-xl overflow-hidden"
                        initial="hidden"
                        animate="visible"
                        variants={formVariants}
                    >
                        {/* Header */}
                        <motion.div
                            className="bg-gray-700 px-8 py-5"
                            whileHover={{ backgroundColor: "#374151" }}
                            transition={{ duration: 0.2 }}
                        >
                            <h2 className="text-2xl font-bold text-white">Reset Password</h2>
                            <p className="mt-1 text-gray-300 text-sm">Please enter your current password and choose a new password</p>
                        </motion.div>

                        {/* Form */}
                        <motion.div
                            className="px-8 py-6"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-5">
                                    {/* Current Password */}
                                    <motion.div variants={inputVariants} className="space-y-1">
                                        <label
                                            htmlFor="currentPassword"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Current Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="password"
                                                id="currentPassword"
                                                name="currentPassword"
                                                value={formData.currentPassword}
                                                onChange={handleChange}
                                                className={`
                                                    block w-full px-4 py-3 rounded-md shadow-sm text-gray-900
                                                    focus:ring-2 focus:ring-red-500 focus:border-transparent
                                                    ${errors.currentPassword
                                                        ? 'border-red-500 bg-red-50'
                                                        : 'border-gray-300 hover:border-gray-400'
                                                    }
                                                `}
                                            />
                                            {errors.currentPassword && (
                                                <motion.p
                                                    className="mt-1 text-sm text-red-600"
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                >
                                                    {errors.currentPassword}
                                                </motion.p>
                                            )}
                                        </div>
                                    </motion.div>

                                    {/* New Password */}
                                    <motion.div variants={inputVariants} className="space-y-1">
                                        <label
                                            htmlFor="newPassword"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            New Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="password"
                                                id="newPassword"
                                                name="newPassword"
                                                value={formData.newPassword}
                                                onChange={handleChange}
                                                className={`
                                                    block w-full px-4 py-3 rounded-md shadow-sm text-gray-900
                                                    focus:ring-2 focus:ring-red-500 focus:border-transparent
                                                    ${errors.newPassword
                                                        ? 'border-red-500 bg-red-50'
                                                        : 'border-gray-300 hover:border-gray-400'
                                                    }
                                                `}
                                            />
                                            {errors.newPassword && (
                                                <motion.p
                                                    className="mt-1 text-sm text-red-600"
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                >
                                                    {errors.newPassword}
                                                </motion.p>
                                            )}
                                        </div>
                                    </motion.div>

                                    {/* Retype Password */}
                                    <motion.div variants={inputVariants} className="space-y-1">
                                        <label
                                            htmlFor="retypePassword"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Retype Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="password"
                                                id="retypePassword"
                                                name="retypePassword"
                                                value={formData.retypePassword}
                                                onChange={handleChange}
                                                className={`
                                                    block w-full px-4 py-3 rounded-md shadow-sm text-gray-900
                                                    focus:ring-2 focus:ring-red-500 focus:border-transparent
                                                    ${errors.retypePassword
                                                        ? 'border-red-500 bg-red-50'
                                                        : 'border-gray-300 hover:border-gray-400'
                                                    }
                                                `}
                                            />
                                            {errors.retypePassword && (
                                                <motion.p
                                                    className="mt-1 text-sm text-red-600"
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                >
                                                    {errors.retypePassword}
                                                </motion.p>
                                            )}
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Submit Button */}
                                <motion.div
                                    className="pt-6"
                                    variants={buttonVariants}
                                >
                                    <motion.button
                                        type="submit"
                                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                                        whileHover="hover"
                                        whileTap="tap"
                                    >
                                        Change Password
                                    </motion.button>
                                </motion.div>
                            </form>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </>
    );
};

export default ChangePassword; 