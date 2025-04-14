import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';

const data = [
    { srNo: 1, particular: 'Institute Fees', status: 'No Dues' },
    { srNo: 2, particular: 'Library Due', status: 'No Dues' },
    { srNo: 3, particular: 'Laboratory Dues', status: 'No Dues' },
    { srNo: 4, particular: 'Breakage Charges', status: 'No Dues' },
    { srNo: 5, particular: 'Examination', status: 'No Dues' },
    { srNo: 6, particular: 'Sports & Music Charges', status: 'No Dues' },
    { srNo: 7, particular: 'Total Institute Amount Due', status: '0' },
    { srNo: 8, particular: 'Scholarship', status: 'Rs. 63636.00 Scholarship Due' },
    { srNo: 9, particular: 'Hostel Fees', status: 'No Dues' },
    { srNo: 10, particular: 'Hostel Dues', status: 'No Dues' },
    { srNo: 11, particular: 'Transportation Fees', status: 'No Dues' },
    { srNo: 12, particular: 'Transportation Dues', status: 'No Dues' },
    { srNo: 13, particular: 'Total Amount Due', status: '0' },
];

const OutstandingDetails: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <Head>
                <title>Outstanding Details - MET BKC</title>
            </Head>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            >
                <div className="bg-[#0A1F44] text-white text-3xl font-bold text-center py-5 rounded-t-xl shadow-xl tracking-wide">
                    Outstanding Details
                </div>

                <div className="bg-white rounded-b-xl shadow-xl overflow-x-auto">
                    <table className="w-full min-w-[600px] text-sm md:text-base text-gray-900">
                        <thead>
                            <tr className="bg-[#0A1F44]/50 text-white">
                                <th className="text-left px-6 py-4">Sr. No.</th>
                                <th className="text-left px-6 py-4">Particular</th>
                                <th className="text-left px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, idx) => {
                                const isDue =
                                    row.status !== 'No Dues' &&
                                    row.status !== '0' &&
                                    !row.status.toLowerCase().includes('no dues');

                                return (
                                    <tr
                                        key={idx}
                                        className="hover:bg-[#0A1F44]/5 transition-all duration-200 ease-in-out border-b border-gray-200"
                                    >
                                        <td className="px-6 py-4 font-medium text-[#0A1F44]">
                                            {row.srNo}.
                                        </td>
                                        <td className="px-6 py-4">{row.particular}</td>
                                        <td className="px-6 py-4 flex items-center gap-2">
                                            {isDue ? (
                                                <>
                                                    <AlertCircle className="text-red-600 w-5 h-5" />
                                                    <span className="text-red-700 font-semibold">
                                                        {row.status}
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <CheckCircle className="text-green-600 w-5 h-5" />
                                                    <span className="text-green-700 font-semibold">
                                                        {row.status}
                                                    </span>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

export default OutstandingDetails; 