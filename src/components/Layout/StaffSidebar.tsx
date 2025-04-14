import React from 'react';
import BaseSidebar, { icons } from './BaseSidebar';

interface StaffSidebarProps {
    onClose: () => void;
}

const staffMenuItems: MenuItem[] = [
    { title: 'Dashboard', path: '/staff-dashboard', isMain: true },
    {
        title: 'Student Management',
        path: '/staff/students',
        isMain: true,
        subItems: [
            { title: 'View Students', path: '/staff/students/list' },
            { title: 'Student Attendance', path: '/staff/students/attendance' },
            { title: 'Results', path: '/staff/students/results' },
        ]
    },
    {
        title: 'Academics',
        path: '/staff/academics',
        isMain: true,
        subItems: [
            { title: 'Lectures', path: '/staff/academics/lectures' },
            { title: 'Assignments', path: '/staff/academics/assignments' },
            { title: 'Syllabus', path: '/staff/academics/syllabus' },
            { title: 'Timetable Scheduling', path: '/staff/academics/timetable' },
        ]
    },
    {
        title: 'Assessments',
        path: '/staff/assessments',
        isMain: true,
        subItems: [
            { title: 'Create Test', path: '/staff/assessments/create' },
            { title: 'Review Submissions', path: '/staff/assessments/review' },
            { title: 'Exam Management', path: '/staff/assessments/exams' },
            { title: 'Grade Entry', path: '/staff/assessments/grades' },
        ]
    },
    {
        title: 'Notifications',
        path: '/staff/notifications',
        isMain: true,
        subItems: [
            { title: 'Announcements', path: '/staff/notifications/announcements' },
            { title: 'Event Notifications', path: '/staff/notifications/events' }
        ]
    },
    {
        title: 'Hostel Monitoring',
        path: '/staff/hostel',
        isMain: true,
        subItems: [
            { title: 'Hostel Rooms', path: '/staff/hostel/rooms' }
        ]
    },
    {
        title: 'Event Planning',
        path: '/staff/events',
        isMain: true,
        subItems: [
            { title: 'Create Event', path: '/staff/events/create' },
            { title: 'Event Calendar', path: '/staff/events/calendar' }
        ]
    },
    {
        title: 'Placement Coordination',
        path: '/staff/placements',
        isMain: true,
        subItems: [
            { title: 'Company Listings', path: '/staff/placements/companies' },
            { title: 'Student Applications', path: '/staff/placements/applications' }
        ]
    },
    {
        title: 'Feedback',
        path: '/staff/feedback',
        isMain: true,
        subItems: [
            { title: 'Collect Feedback', path: '/staff/feedback/collect' },
            { title: 'Analyze Feedback', path: '/staff/feedback/analysis' }
        ]
    },
    {
        title: 'Reports',
        path: '/staff/reports',
        isMain: true,
        subItems: [
            { title: 'Attendance Reports', path: '/staff/reports/attendance' },
            { title: 'Performance Reports', path: '/staff/reports/performance' },
            { title: 'Student Reports', path: '/staff/reports/students' },
            { title: 'Analysis', path: '/staff/reports/analysis' }
        ]
    },
    { title: 'Update Profile', path: '/staff/profile', isMain: true },
    { title: 'Change Password', path: '/staff/change-password', isMain: true },
    {
        title: 'Department',
        path: '/staff/department',
        isMain: true,
        subItems: [
            { title: 'Department Notice', path: '/staff/department/notices' },
            { title: 'Department Events', path: '/staff/department/events' }
        ]
    },
    { title: 'Logout', path: '/logout', isMain: true }
];


const StaffSidebar: React.FC<StaffSidebarProps> = ({ onClose }) => {
    return (
        <BaseSidebar
            onClose={onClose}
            menuItems={staffMenuItems}
            role="staff"
        />
    );
};

export default StaffSidebar;