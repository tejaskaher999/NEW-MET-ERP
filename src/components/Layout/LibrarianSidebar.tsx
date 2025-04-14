import React from 'react';
import BaseSidebar, { icons } from './BaseSidebar';

interface LibrarianSidebarProps {
    onClose: () => void;
}

interface MenuItem {
    title: string;
    path: string;
    icon?: React.ReactNode;
    isMain?: boolean;
    subItems?: MenuItem[];
}

const librarianMenuItems: MenuItem[] = [
    {
        title: 'Dashboard',
        path: '/librarian-dashboard',
        icon: <icons.FaHome />,
        isMain: true
    },
    {
        title: 'Book Management',
        path: '/librarian/books',
        icon: <icons.FaBook />,
        isMain: true,
        subItems: [
            { title: 'All Books', path: '/librarian/books/list' },
            { title: 'Add New Book', path: '/librarian/books/add' },
            { title: 'Categories', path: '/librarian/books/categories' }
        ]
    },
    {
        title: 'Member Management',
        path: '/librarian/members',
        icon: <icons.FaUsers />,
        isMain: true,
        subItems: [
            { title: 'View Members', path: '/librarian/members/list' },
            { title: 'Add Member', path: '/librarian/members/add' }
        ]
    },
    {
        title: 'Circulation',
        path: '/librarian/circulation',
        icon: <icons.FaExchangeAlt />,
        isMain: true,
        subItems: [
            { title: 'Issue Book', path: '/librarian/circulation/issue' },
            { title: 'Return Book', path: '/librarian/circulation/return' },
            { title: 'Due Returns', path: '/librarian/circulation/due' }
        ]
    },
    {
        title: 'Reports',
        path: '/librarian/reports',
        icon: <icons.FaChartLine />,
        isMain: true,
        subItems: [
            { title: 'Usage Statistics', path: '/librarian/reports/usage' },
            { title: 'Fine Collection', path: '/librarian/reports/fines' },
            { title: 'Book Status', path: '/librarian/reports/books' }
        ]
    },
    {
        title: 'Notifications',
        path: '/librarian/notifications',
        icon: <icons.FaBell />,
        isMain: true,
        subItems: [
            { title: 'Due Date Reminders', path: '/librarian/notifications/reminders' },
            { title: 'Announcements', path: '/librarian/notifications/announcements' }
        ]
    },
    {
        title: 'Update Profile',
        path: '/update-profile',
        icon: <icons.FaUserCircle />,
        isMain: true
    },
    {
        title: 'Change Password',
        path: '/change-password',
        icon: <icons.FaLock />,
        isMain: true
    }
];

const LibrarianSidebar: React.FC<LibrarianSidebarProps> = ({ onClose }) => {
    return (
        <BaseSidebar
            onClose={onClose}
            menuItems={librarianMenuItems}
            role="librarian"
        />
    );
};

export default LibrarianSidebar; 