import React from 'react';
import Layout from './Layout';
import ProtectedRoute from '../ProtectedRoute';

interface StudentLayoutProps {
    children: React.ReactNode;
}

const StudentLayout: React.FC<StudentLayoutProps> = ({ children }) => {
    return (
        <ProtectedRoute allowedRole="student">
            <Layout>
                {children}
            </Layout>
        </ProtectedRoute>
    );
};

export default StudentLayout; 