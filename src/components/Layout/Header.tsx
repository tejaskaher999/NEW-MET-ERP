import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
    const router = useRouter();
    const [userData, setUserData] = React.useState<any>(null);
    const [userRole, setUserRole] = React.useState<string>('');

    React.useEffect(() => {
        const userDataStr = localStorage.getItem('user');
        const role = localStorage.getItem('userRole');
        if (userDataStr) {
            setUserData(JSON.parse(userDataStr));
        }
        if (role) {
            setUserRole(role);
        }
    }, []);

    const handleLogout = () => {
        try {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userRole');
            localStorage.removeItem('user');
            router.push('/login');
        } catch (error) {
            router.push('/login');
        }
    };

    return (
        <header className="bg-red-600">
            <div className="text-white text-center py-4">
                <h1 className="text-2xl md:text-3xl font-bold mb-1">MET Bhujbal Knowledge City</h1>
                <p className="text-lg">Institute of Technology-Polytechnic</p>
            </div>

            <nav className="bg-gray-700">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center h-10 text-sm">
                        <div className="flex items-center flex-1">
                            <Link href="/"
                                className="px-4 h-full flex items-center text-white hover:bg-gray-600 border-r border-gray-600"
                            >
                                Home
                            </Link>
                            {userData && (
                                <div className="flex h-full">
                                    {userRole === 'student' ? (
                                        // Student Header Info
                                        <>
                                            <span className="px-4 border-r border-gray-600 h-full flex items-center text-white">
                                                {userData.id}
                                            </span>
                                            <span className="px-4 border-r border-gray-600 h-full flex items-center text-white">
                                                {userData.name}
                                            </span>
                                            <span className="px-4 border-r border-gray-600 h-full flex items-center text-white">
                                                {userData.year}
                                            </span>
                                            <span className="px-4 border-r border-gray-600 h-full flex items-center text-white">
                                                {userData.division}
                                            </span>
                                        </>
                                    ) : (
                                        // Staff Header Info
                                        <>
                                            <span className="px-4 border-r border-gray-600 h-full flex items-center text-white">
                                                {userData.id}
                                            </span>
                                            <span className="px-4 border-r border-gray-600 h-full flex items-center text-white">
                                                {userData.name}
                                            </span>
                                            <span className="px-4 border-r border-gray-600 h-full flex items-center text-white">
                                                {userData.department}
                                            </span>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        <a
                            href="#"
                            onClick={handleLogout}
                            className="px-4 h-full flex items-center text-white hover:bg-gray-600 border-l border-gray-600"
                        >
                            Logout
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    );
}