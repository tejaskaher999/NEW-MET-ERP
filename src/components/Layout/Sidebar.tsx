import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { FaBars, FaTimes } from 'react-icons/fa';

// Dynamically import the mobile menu button with no SSR
const MobileMenuButton = dynamic(() => import('./MobileMenuButton'), {
    ssr: false
});

interface SidebarProps {
    onClose?: () => void;
    handleLinkClick?: (path: string) => void;
}

interface MenuItem {
    title: string;
    path: string;
    isMain?: boolean;
    subItems?: { title: string; path: string; }[];
    isActive?: boolean;
}

const menuItems: MenuItem[] = [
    { title: 'Home', path: '/', isMain: true },
    {
        title: 'Admission Request Application',
        path: '/admission-request',
        isMain: true
    },
    { title: 'Feedback Form', path: '/feedback', isMain: true },
    { title: 'Update Profile', path: '/profile', isMain: true },
    { title: 'Change Password', path: '/change-password', isMain: true },
    {
        title: 'Hostel',
        path: '/hostel',
        isMain: true,
        subItems: [
            { title: 'Hostel Admission Request', path: '/hostel-admission' }
        ]
    },
    {
        title: 'Assignments',
        path: '/assignments',
        isMain: true,
        subItems: [
            { title: 'Upload Assignment', path: '/upload-assignment' },
            { title: 'View Assignment', path: '/view-assignment' }
        ]
    },
    {
        title: 'Internship',
        path: '/internship',
        isMain: true,
        subItems: [
            { title: 'Internship Details', path: '/internship' }
        ]
    },
    {
        title: 'Grievance',
        path: '/grievance',
        isMain: true,
        subItems: [
            { title: 'Register Grievance', path: '/register-grievance' }
        ]
    },
    {
        title: 'Accounts',
        path: '/accounts',
        isMain: true,
        subItems: [
            { title: 'Download Receipt', path: '/download-receipt' },
            { title: 'Outstanding Details', path: '/outstanding-details' },
            { title: 'Refund Application', path: '/refund' }
        ]
    },
    {
        title: 'Online Test',
        path: '/online-test',
        isMain: true,
        subItems: [
            { title: 'Take Test', path: '/take-test' },
            { title: 'Test History', path: '/test-history' }
        ]
    },
    {
        title: 'E-Material',
        path: '/e-material',
        isMain: true,
        subItems: [
            { title: 'Download E-Material', path: '/download-material' }
        ]
    },
    { title: 'Course-PO-PSO Justification', path: '/course-po-pso', isMain: true }
];

const Sidebar: React.FC<SidebarProps> = ({ onClose, handleLinkClick }) => {
    const router = useRouter();
    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    const [activeItem, setActiveItem] = useState<string>(router.pathname);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleItem = (path: string, e: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setExpandedItems(prev =>
            prev.includes(path)
                ? prev.filter(p => p !== path)
                : [...prev, path]
        );
    };

    const handleItemClick = (path: string, e: React.MouseEvent) => {
        e.preventDefault();
        setActiveItem(path);
        router.push(path);
        if (onClose) {
            onClose();
        }

        if (mounted && window.innerWidth < 768) {
            setIsMobileMenuOpen(false);
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Sidebar content
    const SidebarContent = () => (
        <>
            <nav className="flex-1 overflow-y-auto">
                <ul className="space-y-0.5">
                    {menuItems.map((item) => (
                        <li key={item.path} className="relative">
                            <div className={`
                                ${item.isMain ? 'bg-[#4A5568]' : ''}
                                ${activeItem === item.path ? 'bg-red-600' : ''}
                                ${item.subItems ? 'cursor-pointer' : ''}
                                group
                            `}>
                                <Link
                                    href={item.path}
                                    onClick={(e) => item.subItems ? toggleItem(item.path, e) : handleItemClick(item.path, e)}
                                    className={`
                                        flex items-center justify-between px-4 py-2
                                        ${item.isMain ? 'text-gray-100' : 'text-gray-300'} 
                                        hover:bg-red-600 hover:text-white 
                                        transition-colors duration-200
                                        ${activeItem === item.path ? 'text-white' : ''}
                                    `}
                                >
                                    <span className="text-sm font-medium">{item.title}</span>
                                    {item.subItems && (
                                        <span className={`
                                            text-xs transition-transform duration-200
                                            ${expandedItems.includes(item.path) ? 'rotate-180' : ''}
                                        `}>
                                            ▼
                                        </span>
                                    )}
                                </Link>
                            </div>
                            {item.subItems && expandedItems.includes(item.path) && (
                                <ul className="bg-[#1A202C] py-1">
                                    {item.subItems.map((subItem) => (
                                        <li key={subItem.path}>
                                            <Link
                                                href={subItem.path}
                                                onClick={(e) => handleItemClick(subItem.path, e)}
                                                className={`
                                                    block pl-8 pr-4 py-2 
                                                    text-sm text-gray-400
                                                    hover:bg-red-600 hover:text-white 
                                                    transition-colors duration-200
                                                    ${activeItem === subItem.path ? 'bg-red-600 text-white' : ''}
                                                `}
                                            >
                                                {subItem.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                                    </ul>
            </nav>
            <div className="px-6 py-4 bg-[#1A202C] text-gray-400 text-sm border-t border-gray-700">
                <p className="text-center">Development Contact:</p>
                <p className="text-center mt-2">+91 1234567890</p>
                <a
                    href="mailto:dev@metbkc.edu"
                    className="block text-center text-blue-400 hover:text-blue-300"
                >
                    dev@metbkc.edu
                </a>
            </div>
        </>
    );

    // Server-side rendering placeholder
    if (!mounted) {
        return (
            <aside className="w-64 bg-[#2D3748] min-h-screen flex flex-col fixed md:static">
                <SidebarContent />
            </aside>
        );
    }

    return (
        <>
            {/* Mobile menu button */}
            <MobileMenuButton isOpen={isMobileMenuOpen} onToggle={toggleMobileMenu} />

            {/* Overlay for mobile menu */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={toggleMobileMenu}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    w-64 bg-[#2D3748] min-h-screen flex flex-col
                    fixed md:static
                    transition-transform duration-300 ease-in-out z-40
                    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                    md:translate-x-0
                `}
            >
                <SidebarContent />
            </aside>
        </>
    );
};

export default Sidebar;