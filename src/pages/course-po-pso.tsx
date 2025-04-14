import React, { useState } from 'react';
import { motion } from 'framer-motion';

type DataItem = {
  id: number;
  subject: string;
  fileUrl: string;
  uploadedBy: string;
};

type JustificationData = {
  [branch: string]: {
    [year: string]: {
      [course: string]: DataItem[];
    };
  };
};

const justificationData: JustificationData = {
  'Computer Science and Design': {
    Fourth: {
      '2013-Pattern': [],
      '2019-Pattern': [
        {
          id: 1,
          subject: 'Software Engineering',
          fileUrl: '/Dbatu-Syallbus.pdf',
          uploadedBy: 'Prof. A',
        },
      ],
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const CoursePOPSO: React.FC = () => {
  const branches = ['Computer Science and Design'];
  const years = ['First', 'Second', 'Third', 'Fourth'];
  const courses = ['2013-Pattern', '2019-Pattern'];

  const [branch, setBranch] = useState(branches[0]);
  const [year, setYear] = useState(years[3]);
  const [course, setCourse] = useState(courses[1]);

  const data = justificationData[branch]?.[year]?.[course] || [];

  return (
    <motion.div
      className="p-4 md:p-6 max-w-6xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <motion.h2
        className="bg-[#0A1F44] text-white font-semibold text-center py-4 rounded-t-md text-xl sm:text-2xl shadow"
        variants={fadeIn}
      >
        🎓 Course-PO-PSO Justification
      </motion.h2>

      <motion.div
        className="bg-white p-6 shadow-lg rounded-b-md space-y-6 border border-gray-200"
        variants={fadeIn}
      >
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          variants={fadeIn}
        >
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Branch</label>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full border rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled
            >
              {branches.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Year</label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full border rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Course</label>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full border rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {courses.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </motion.div>

        <motion.div className="overflow-x-auto border rounded-lg" variants={fadeIn}>
          <table className="min-w-full text-sm text-left text-gray-800">
            <thead className="bg-gray-100 border-b font-semibold text-gray-700">
              <tr>
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Download</th>
                <th className="py-3 px-4">Uploaded By</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item, i) => (
                  <motion.tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-all duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <td className="py-3 px-4">{item.id}</td>
                    <td className="py-3 px-4">{item.subject}</td>
                    <td className="py-3 px-4 text-blue-600">
                      <a
                        href={item.fileUrl}
                        download
                        className="hover:underline transition-transform duration-300 ease-in-out hover:scale-105 inline-flex items-center gap-1"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                          />
                        </svg>
                        Download
                      </a>
                    </td>
                    <td className="py-3 px-4">{item.uploadedBy}</td>
                  </motion.tr>
                ))
              ) : (
                <motion.tr initial="hidden" animate="visible" variants={fadeIn}>
                  <td colSpan={4} className="py-6 text-center text-gray-500 italic">
                    🚫 No Data Available for selected options.
                  </td>
                </motion.tr>
              )}
            </tbody>
          </table>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CoursePOPSO;
