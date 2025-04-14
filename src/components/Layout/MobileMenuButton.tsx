import React from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

interface MobileMenuButtonProps {
    isOpen: boolean;
    onToggle: () => void;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ isOpen, onToggle }) => {
    return (
        <button
            onClick={onToggle}
            className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#2D3748] text-white rounded-md hover:bg-[#4A5568] transition-colors duration-200"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
    );
};

export default MobileMenuButton; 