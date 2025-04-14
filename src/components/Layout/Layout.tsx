import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from './Header';
import Sidebar from './Sidebar';
import LibrarianSidebar from './LibrarianSidebar';
import StaffSidebar from './StaffSidebar';
import ChatBot from '../ChatBot/ChatBot';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [userRole, setUserRole] = useState<string>('');
    const router = useRouter();

    // Check if the current page is the login page
    const isLoginPage = router.pathname === '/login';

    // Get user role from localStorage on mount
    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData);
            setUserRole(user.role || '');
        }
    }, []);

    // Close sidebar on route change
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [router.pathname]);

    // For login page, return only the children without the layout
    if (isLoginPage) {
        return <>{children}</>;
    }

    // Get the appropriate sidebar component based on user role
    const SidebarComponent = () => {
        switch (userRole.toLowerCase()) {
            case 'librarian':
                return <LibrarianSidebar onClose={() => setIsSidebarOpen(false)} />;
            case 'staff':
                return <StaffSidebar onClose={() => setIsSidebarOpen(false)} />;
            default:
                return <Sidebar onClose={() => setIsSidebarOpen(false)} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="flex min-h-[calc(100vh-4rem)]">
                {/* Role-based Sidebar */}
                <SidebarComponent />

                {/* Main Content */}
                <main className={`
                    flex-1 p-4 md:p-6 lg:p-8
                    transition-all duration-300
                    ${isSidebarOpen ? 'md:ml-64' : ''}
                `}>
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
            <ChatBot />
        </div>
    );
};

export default Layout;