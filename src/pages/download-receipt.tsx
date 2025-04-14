import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

type Receipt = {
    id: string;
    date: string;
    type: string;
    amount: number;
};

type ReceiptData = Record<string, Receipt[]>;

const DownloadReceipt: React.FC = () => {
    const [year, setYear] = React.useState<string>("2023-2024");
    const [receipts, setReceipts] = React.useState<Receipt[]>([]);
    const [selectedReceipts, setSelectedReceipts] = React.useState<string[]>([]);

    const academicYears = ["2023-2024", "2025-2026"];

    // Sample Data
    const sampleData: ReceiptData = {
        "2023-2024": [
            { id: "20230402008", date: "12/08/2023", type: "Main Fee", amount: 6864 },
            { id: "20230402009", date: "15/08/2023", type: "Library Fee", amount: 1200 },
            { id: "20230402010", date: "20/08/2023", type: "Lab Fee", amount: 2500 },
        ],
        "2025-2026": [],
    };

    // Load data into localStorage only once
    React.useEffect(() => {
        if (!localStorage.getItem("receiptData")) {
            localStorage.setItem("receiptData", JSON.stringify(sampleData));
        }
        const data: ReceiptData = JSON.parse(
            localStorage.getItem("receiptData") || "{}"
        );
        setReceipts(data[year] || []);
    }, []);

    React.useEffect(() => {
        const data: ReceiptData = JSON.parse(
            localStorage.getItem("receiptData") || "{}"
        );
        setReceipts(data[year] || []);
        setSelectedReceipts([]);
    }, [year]);

    const handleSelect = (id: string) => {
        setSelectedReceipts((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const handleDownloadSelected = () => {
        if (selectedReceipts.length === 0) {
            alert("Please select at least one receipt to download");
            return;
        }
        alert("Selected receipts downloaded:\n" + selectedReceipts.join(", "));
    };

    const handleDownloadAll = () => {
        if (receipts.length === 0) {
            alert("No receipts available for download");
            return;
        }
        alert("All receipts downloaded for " + year);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <Head>
                <title>Download Receipt - MET BKC</title>
            </Head>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
            >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                            Print Receipt
                        </h2>

                        <div className="space-y-6">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50 p-4 rounded-lg">
                                <label className="text-gray-700 font-medium">Academic Year</label>
                                <select
                                    className="border border-gray-300 p-2 rounded w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                >
                                    {academicYears.map((y) => (
                                        <option key={y} value={y}>
                                            {y}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="overflow-x-auto border rounded-lg bg-white">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-100 text-gray-700">
                                        <tr>
                                            <th className="p-4">Select</th>
                                            <th className="p-4">Receipt No.</th>
                                            <th className="p-4">Date</th>
                                            <th className="p-4">Type</th>
                                            <th className="p-4">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {receipts.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="p-6 text-gray-500 text-center">
                                                    No receipts available for this academic year
                                                </td>
                                            </tr>
                                        ) : (
                                            receipts.map((receipt) => (
                                                <tr
                                                    key={receipt.id}
                                                    className="border-t hover:bg-gray-50 transition duration-200"
                                                >
                                                    <td className="p-4">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedReceipts.includes(receipt.id)}
                                                            onChange={() => handleSelect(receipt.id)}
                                                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                                        />
                                                    </td>
                                                    <td className="p-4 font-medium">{receipt.id}</td>
                                                    <td className="p-4">{receipt.date}</td>
                                                    <td className="p-4">{receipt.type}</td>
                                                    <td className="p-4 font-semibold text-gray-900">
                                                        ₹{receipt.amount.toFixed(2)}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
                                <button
                                    onClick={handleDownloadSelected}
                                    disabled={selectedReceipts.length === 0}
                                    className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${selectedReceipts.length === 0
                                        ? 'bg-gray-300 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                                        }`}
                                >
                                    Download Selected ({selectedReceipts.length})
                                </button>
                                <button
                                    onClick={handleDownloadAll}
                                    disabled={receipts.length === 0}
                                    className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${receipts.length === 0
                                        ? 'bg-gray-300 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                                        }`}
                                >
                                    Download All ({receipts.length})
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default DownloadReceipt; 