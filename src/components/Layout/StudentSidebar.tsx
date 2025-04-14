import React from 'react';
import BaseSidebar, { icons } from './BaseSidebar';

interface StudentSidebarProps {
    onClose: () => void;
}

const studentMenuItems = [
    { title: 'Home', path: '/', icon: <icons.FaHome /> },
    { title: 'Admission Request Application', path: '/admission-request', icon: <icons.FaFileAlt /> },
    { title: 'Feedback Form', path: '/feedback', icon: <icons.FaClipboard /> },
    { title: 'Update Profile', path: '/update-profile', icon: <icons.FaUserCircle /> },
    { title: 'Change Password', path: '/change-password', icon: <icons.FaLock /> },
    {
        title: 'Hostel',
        path: '/hostel',
        icon: <icons.FaBed />,
        subItems: []
    },
    {
        title: 'Assignments',
        path: '/assignments',
        icon: <icons.FaClipboardList />,
        subItems: []
    },
    {
        title: 'Internship',
        path: '/internship',
        icon: <icons.FaGraduationCap />,
        subItems: []
    },
    {
        title: 'Grievance',
        path: '/grievance',
        icon: <icons.FaFileAlt />,
        subItems: []
    },
    {
        title: 'Accounts',
        path: '/accounts',
        icon: <icons.FaUsers />,
        subItems: []
    },
    {
        title: 'Online Test',
        path: '/online-test',
        icon: <icons.FaLaptop />,
        subItems: []
    },
    {
        title: 'E-Material',
        path: '/e-material',
        icon: <icons.FaBookOpen />,
        subItems: []
    },
    { title: 'Course PO-PSO Justification', path: '/course-justification', icon: <icons.FaBook /> }
];

const StudentSidebar: React.FC<StudentSidebarProps> = ({ onClose }) => {
    return (
        <BaseSidebar
            onClose={onClose}
            menuItems={studentMenuItems}
            role="student"
        />
    );
};

export default StudentSidebar; 