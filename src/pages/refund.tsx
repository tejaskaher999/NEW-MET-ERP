import React, { useState } from 'react';
import { Send, School, CreditCard } from 'lucide-react';

interface RefundFormData {
  studentName: string;
  enrollmentNumber: string;
  course: string;
  semester: string;
  email: string;
  phone: string;
  amount: string;
  reason: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
}

const RefundForm: React.FC = () => {
  const [formData, setFormData] = useState<RefundFormData>({
    studentName: '',
    enrollmentNumber: '',
    course: '',
    semester: '',
    email: '',
    phone: '',
    amount: '',
    reason: '',
    bankName: '',
    accountNumber: '',
    ifscCode: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('personal');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Here you would typically make an API call to submit the form
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      alert('Refund application submitted successfully!');
    } catch (error) {
      alert('Failed to submit refund application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="relative bg-red-600 p-8 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 opacity-90"></div>
            <div className="relative">
              <School className="w-16 h-16 mx-auto text-white mb-4 animate-bounce" />
              <h1 className="text-4xl font-bold text-white mb-2">Refund Application Form</h1>
              <p className="text-red-100 text-lg">MET BKC - Mumbai Educational Trust</p>
            </div>
          </div>

          <div className="p-8">
            <div className="flex justify-center mb-8 space-x-4">
              <button
                onClick={() => setActiveSection('personal')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeSection === 'personal'
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Personal Details
              </button>
              <button
                onClick={() => setActiveSection('refund')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeSection === 'refund'
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Refund Details
              </button>
              <button
                onClick={() => setActiveSection('bank')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeSection === 'bank'
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Bank Details
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className={`transition-all duration-500 ${
                activeSection === 'personal' ? 'block' : 'hidden'
              }`}>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="studentName"
                      id="studentName"
                      required
                      value={formData.studentName}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="enrollmentNumber" className="block text-sm font-medium text-gray-700">
                      Enrollment Number
                    </label>
                    <input
                      type="text"
                      name="enrollmentNumber"
                      id="enrollmentNumber"
                      required
                      value={formData.enrollmentNumber}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
                      placeholder="Enter enrollment number"
                    />
                  </div>

                  <div>
                    <label htmlFor="course" className="block text-sm font-medium text-gray-700">
                      Course
                    </label>
                    <input
                      type="text"
                      name="course"
                      id="course"
                      required
                      value={formData.course}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
                      placeholder="Enter your course"
                    />
                  </div>

                  <div>
                    <label htmlFor="semester" className="block text-sm font-medium text-gray-700">
                      Semester
                    </label>
                    <input
                      type="text"
                      name="semester"
                      id="semester"
                      required
                      value={formData.semester}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
                      placeholder="Enter semester"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
              </div>

              <div className={`transition-all duration-500 ${
                activeSection === 'refund' ? 'block' : 'hidden'
              }`}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                      Refund Amount (₹)
                    </label>
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      required
                      value={formData.amount}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
                      placeholder="Enter refund amount"
                    />
                  </div>

                  <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                      Reason for Refund
                    </label>
                    <textarea
                      name="reason"
                      id="reason"
                      required
                      value={formData.reason}
                      onChange={handleChange}
                      rows={4}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
                      placeholder="Please explain the reason for requesting a refund"
                    />
                  </div>
                </div>
              </div>

              <div className={`transition-all duration-500 ${
                activeSection === 'bank' ? 'block' : 'hidden'
              }`}>
                <div className="bg-gray-50 p-6 rounded-xl space-y-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <CreditCard className="w-6 h-6 text-red-600" />
                    <h3 className="text-lg font-medium text-gray-900">Bank Details</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">
                        Bank Name
                      </label>
                      <input
                        type="text"
                        name="bankName"
                        id="bankName"
                        required
                        value={formData.bankName}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
                        placeholder="Enter bank name"
                      />
                    </div>

                    <div>
                      <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">
                        Account Number
                      </label>
                      <input
                        type="text"
                        name="accountNumber"
                        id="accountNumber"
                        required
                        value={formData.accountNumber}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
                        placeholder="Enter account number"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700">
                        IFSC Code
                      </label>
                      <input
                        type="text"
                        name="ifscCode"
                        id="ifscCode"
                        required
                        value={formData.ifscCode}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
                        placeholder="Enter IFSC code"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={() => {
                    if (activeSection === 'refund') setActiveSection('personal');
                    if (activeSection === 'bank') setActiveSection('refund');
                  }}
                  className={`${
                    activeSection === 'personal' ? 'invisible' : ''
                  } px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900`}
                >
                  Previous
                </button>

                {activeSection !== 'bank' ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (activeSection === 'personal') setActiveSection('refund');
                      if (activeSection === 'refund') setActiveSection('bank');
                    }}
                    className="ml-auto px-6 py-3 bg-red-600 text-white font-medium rounded-lg shadow-md hover:bg-red-700"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="ml-auto inline-flex items-center px-6 py-3 rounded-lg shadow-md text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Submit Application
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundForm;