import React from 'react';
import Layout from './Layout';
import ProtectedRoute from '../ProtectedRoute';

interface LibrarianLayoutProps {
    children: React.ReactNode;
}

const LibrarianLayout: React.FC<LibrarianLayoutProps> = ({ children }) => {
    return (
        <ProtectedRoute allowedRole="librarian">
            <Layout>
                {children}
            </Layout>
        </ProtectedRoute>
    );
};

export default LibrarianLayout; 