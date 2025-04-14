import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Printer } from 'lucide-react';
import Image from 'next/image';

interface AdmissionFormData {
    admissionType: string;
    applicationYear: string;
    branch: string;
    name: string;
    gender: string;
    bloodGroup: string;
    fatherName: string;
    motherName: string;
    dateOfBirth: string;
    category: string;
    caste: string;
    localAddress: string;
    permanentAddress: string;
    parentMobile: string;
    studentMobile: string;
    studentEmail: string;
    hasVehicle: string;
    vehicleNo: string;
}

const AdmissionRequest = () => {
    const [isViewMode, setIsViewMode] = useState(false);
    const [formData, setFormData] = useState<AdmissionFormData>({
        admissionType: 'MS',
        applicationYear: 'Fourth',
        branch: 'Computer Science and Design',
        name: '',
        gender: '',
        bloodGroup: '',
        fatherName: '',
        motherName: '',
        dateOfBirth: '',
        category: '',
        caste: '',
        localAddress: '',
        permanentAddress: '',
        parentMobile: '',
        studentMobile: '',
        studentEmail: '',
        hasVehicle: 'No',
        vehicleNo: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Admission Request Application</h1>
                    <div className="space-x-4">
                        <button
                            onClick={() => setIsViewMode(false)}
                            className={`px-4 py-2 rounded ${!isViewMode ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                        >
                            Fill Form
                        </button>
                        <button
                            onClick={() => setIsViewMode(true)}
                            className={`px-4 py-2 rounded ${isViewMode ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                        >
                            View Form
                        </button>
                    </div>
                </div>

                {isViewMode ? (
                    <div className="space-y-6 p-8 bg-white">
                        {/* Header */}
                        <div className="text-center space-y-2">
                            <h1 className="text-2xl font-bold">BHUJBAL KNOWLEDGE CITY</h1>
                            <div className="flex justify-center items-center gap-4">
                                <h2 className="text-xl">MET's Institute of Technology-Polytechnic</h2>
                                <div className="w-16 h-16 relative">
                                    <Image
                                        src="/met-logo.png"
                                        alt="MET Logo"
                                        width={64}
                                        height={64}
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                            <p>Bhujbal Knowledge City, Adgaon, Nashik, 422 003</p>
                            <h2 className="text-xl font-bold mt-4">APPLICATION FORM FOR ADMISSION 2024-2025</h2>
                        </div>

                        <p className="text-sm mt-4">
                            I, hereby apply for admission at Institute of Technology-Polytechnic for academic year 2024-2025. My
                            details for the purpose are as follows:
                        </p>

                        {/* Admission Details Section */}
                        <div className="border border-gray-300 p-4">
                            <div className="flex justify-between">
                                <div>
                                    <h3 className="font-bold mb-2">Admission Details:</h3>
                                    <table className="w-full">
                                        <tbody>
                                            <tr>
                                                <td className="py-1">Admission Type:</td>
                                                <td>{formData.admissionType}</td>
                                                <td className="text-right">Dt of Admission:</td>
                                                <td>07/08/2024</td>
                                            </tr>
                                            <tr>
                                                <td className="py-1">Application for Admission in:</td>
                                                <td colSpan={3}>
                                                    Year: {formData.applicationYear}<br />
                                                    Branch: {formData.branch}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="py-1">Application Type:</td>
                                                <td colSpan={3}>Confirm Admission</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="w-32 h-40 border border-gray-300">
                                    {/* Photo placeholder */}
                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-sm text-gray-500">
                                        Photo
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Personal Details Section */}
                        <div className="border border-gray-300 p-4">
                            <h3 className="font-bold mb-2">Personal Details of Student:</h3>
                            <table className="w-full">
                                <tbody>
                                    <tr>
                                        <td className="py-1 w-32">1. Name:</td>
                                        <td>{formData.name}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-1">2. Sex:</td>
                                        <td>{formData.gender}</td>
                                        <td className="py-1">Blood Group:</td>
                                        <td>{formData.bloodGroup}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-1">3. Father's Name:</td>
                                        <td>{formData.fatherName}</td>
                                        <td className="py-1">Mother's Name:</td>
                                        <td>{formData.motherName}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-1">4. Date of Birth:</td>
                                        <td>{formData.dateOfBirth}</td>
                                        <td className="py-1">Category:</td>
                                        <td>{formData.category}</td>
                                        <td className="py-1">Caste:</td>
                                        <td>{formData.caste}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-1">5. Local Address:</td>
                                        <td colSpan={5}>{formData.localAddress}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-1">6. Permanent Address:</td>
                                        <td colSpan={5}>{formData.permanentAddress}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-1">7. Telephone No:</td>
                                        <td></td>
                                        <td className="py-1">Parent Mobile No:</td>
                                        <td>{formData.parentMobile}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-1">8. Student Mobile No:</td>
                                        <td>{formData.studentMobile}</td>
                                        <td className="py-1">Student e-mail ID:</td>
                                        <td>{formData.studentEmail}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-1">9. I use own vehicle:</td>
                                        <td>{formData.hasVehicle}</td>
                                        <td className="py-1">Vehicle No:</td>
                                        <td>{formData.vehicleNo}</td>
                                        <td className="py-1">License No:</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Last Examination Details */}
                        <div className="border border-gray-300 p-4">
                            <h3 className="font-bold mb-2">Last Examination Details:</h3>
                            <table className="w-full border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="border border-gray-300 px-4 py-2">SrNo</th>
                                        <th className="border border-gray-300 px-4 py-2">Year</th>
                                        <th className="border border-gray-300 px-4 py-2">Semester</th>
                                        <th className="border border-gray-300 px-4 py-2">Subjects Appeared</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2 text-center">0</td>
                                        <td className="border border-gray-300 px-4 py-2"></td>
                                        <td className="border border-gray-300 px-4 py-2"></td>
                                        <td className="border border-gray-300 px-4 py-2"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Declaration */}
                        <p className="text-sm mt-4">
                            I know the rules and regulations of Provisional / Confirm admission. My admission will be confirmed / cancelled
                            accordingly to eligibility and result of previous university examination for which I have appeared.
                        </p>

                        {/* Signature Section */}
                        <div className="flex justify-between mt-8">
                            <div className="text-center">
                                <div className="border-t border-gray-300 w-48 mt-8"></div>
                                <p className="mt-2">Name of Student & Signature</p>
                            </div>
                            <div className="text-center">
                                <div className="border-t border-gray-300 w-48 mt-8"></div>
                                <p className="mt-2">Name of Parent / Guardian & Signature</p>
                            </div>
                        </div>

                        {/* Print Button */}
                        <div className="flex justify-end mt-4">
                            <button
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                onClick={() => window.print()}
                            >
                                <Printer size={20} />
                                Print Form
                            </button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Admission Type</label>
                                    <input
                                        type="text"
                                        name="admissionType"
                                        value={formData.admissionType}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Year</label>
                                    <input
                                        type="text"
                                        name="applicationYear"
                                        value={formData.applicationYear}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Branch</label>
                                    <input
                                        type="text"
                                        name="branch"
                                        value={formData.branch}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Blood Group</label>
                                    <input
                                        type="text"
                                        name="bloodGroup"
                                        value={formData.bloodGroup}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Father's Name</label>
                                    <input
                                        type="text"
                                        name="fatherName"
                                        value={formData.fatherName}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Mother's Name</label>
                                    <input
                                        type="text"
                                        name="motherName"
                                        value={formData.motherName}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={formData.dateOfBirth}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Category</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        <option value="General">General</option>
                                        <option value="OBC">OBC</option>
                                        <option value="SC">SC</option>
                                        <option value="ST">ST</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Local Address</label>
                                <textarea
                                    name="localAddress"
                                    value={formData.localAddress}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Permanent Address</label>
                                <textarea
                                    name="permanentAddress"
                                    value={formData.permanentAddress}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Parent Mobile</label>
                                <input
                                    type="tel"
                                    name="parentMobile"
                                    value={formData.parentMobile}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Student Mobile</label>
                                <input
                                    type="tel"
                                    name="studentMobile"
                                    value={formData.studentMobile}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Student Email</label>
                            <input
                                type="email"
                                name="studentEmail"
                                value={formData.studentEmail}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={() => setFormData({
                                    admissionType: 'MS',
                                    applicationYear: 'Fourth',
                                    branch: 'Computer Science and Design',
                                    name: '',
                                    gender: '',
                                    bloodGroup: '',
                                    fatherName: '',
                                    motherName: '',
                                    dateOfBirth: '',
                                    category: '',
                                    caste: '',
                                    localAddress: '',
                                    permanentAddress: '',
                                    parentMobile: '',
                                    studentMobile: '',
                                    studentEmail: '',
                                    hasVehicle: 'No',
                                    vehicleNo: '',
                                })}
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Reset
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AdmissionRequest; 