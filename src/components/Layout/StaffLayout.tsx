import React from 'react';
import Layout from './Layout';
import ProtectedRoute from '../ProtectedRoute';

interface StaffLayoutProps {
    children: React.ReactNode;
}

const StaffLayout: React.FC<StaffLayoutProps> = ({ children }) => {
    return (
        <ProtectedRoute allowedRole="staff">
            <Layout>
                {children}
            </Layout>
        </ProtectedRoute>
    );
};

export default StaffLayout;