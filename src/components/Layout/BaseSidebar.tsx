import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FaHome, FaBook, FaUsers, FaClipboardList, FaBell, FaChartLine, FaTimes, FaUserCircle, FaLock, FaBed, FaClipboard, FaGraduationCap, FaFileAlt, FaLaptop, FaBookOpen, FaExchangeAlt } from 'react-icons/fa';

interface MenuItem {
    title: string;
    path: string;
    icon?: React.ReactNode;
    isMain?: boolean;
    subItems?: MenuItem[];
}

interface BaseSidebarProps {
    onClose: () => void;
    menuItems: MenuItem[];
    role: 'student' | 'staff' | 'librarian';
}

const BaseSidebar: React.FC<BaseSidebarProps> = ({ onClose, menuItems, role }) => {
    const router = useRouter();
    const [openMenus, setOpenMenus] = useState<string[]>([]);

    const toggleMenu = (path: string) => {
        setOpenMenus(prev =>
            prev.includes(path)
                ? prev.filter(p => p !== path)
                : [...prev, path]
        );
    };

    const isActive = (path: string) => router.pathname === path;
    const isMenuActive = (item: MenuItem) =>
        item.subItems?.some(subItem => router.pathname === subItem.path) || isActive(item.path);

    return (
        <div className="bg-[#2f3542] w-64 min-h-screen shadow-lg text-white">
            {/* Mobile Close Button */}
            <button
                onClick={onClose}
                className="md:hidden absolute right-4 top-4 text-white hover:text-gray-300"
            >
                <FaTimes className="w-6 h-6" />
            </button>

            <nav className="py-4">
                {menuItems.map((item) => (
                    <div key={item.path}>
                        {item.subItems ? (
                            <>
                                <button
                                    onClick={() => toggleMenu(item.path)}
                                    className={`w-full flex items-center justify-between px-4 py-2 text-sm ${isMenuActive(item) ? 'bg-[#3d4451]' : 'hover:bg-[#3d4451]'
                                        }`}
                                >
                                    <span className="flex items-center">
                                        {item.icon && <span className="mr-3 w-5 h-5">{item.icon}</span>}
                                        {item.title}
                                    </span>
                                    {item.subItems.length > 0 && (
                                        <svg
                                            className={`w-4 h-4 transition-transform duration-200 ${openMenus.includes(item.path) ? 'transform rotate-180' : ''
                                                }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    )}
                                </button>
                                {openMenus.includes(item.path) && item.subItems.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="bg-[#3d4451]"
                                    >
                                        {item.subItems.map((subItem) => (
                                            <Link key={subItem.path} href={subItem.path}>
                                                <span
                                                    className={`block pl-12 pr-4 py-2 text-sm ${isActive(subItem.path) ? 'bg-[#4a4f5a]' : 'hover:bg-[#4a4f5a]'
                                                        }`}
                                                >
                                                    {subItem.title}
                                                </span>
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </>
                        ) : (
                            <Link href={item.path}>
                                <span
                                    className={`flex items-center px-4 py-2 text-sm ${isActive(item.path) ? 'bg-[#3d4451]' : 'hover:bg-[#3d4451]'
                                        }`}
                                >
                                    {item.icon && <span className="mr-3 w-5 h-5">{item.icon}</span>}
                                    {item.title}
                                </span>
                            </Link>
                        )}
                    </div>
                ))}
            </nav>
        </div>
    );
};

export const icons = {
    FaHome,
    FaBook,
    FaUsers,
    FaClipboardList,
    FaBell,
    FaChartLine,
    FaUserCircle,
    FaLock,
    FaBed,
    FaClipboard,
    FaGraduationCap,
    FaFileAlt,
    FaLaptop,
    FaBookOpen,
    FaExchangeAlt
};

export default BaseSidebar; 