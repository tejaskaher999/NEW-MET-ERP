"use client";

import React from 'react';
import { FaDownload } from 'react-icons/fa';

export default function FileActions({ filePath }: { filePath?: string }) {
  const handleDownload = () => {
    if (filePath) {
      const filename = filePath.split('/').pop();
      if (filename) {
        window.open(`/api/view/${encodeURIComponent(filename)}`, '_blank');
      }
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="text-blue-600 hover:text-blue-800"
    >
      <FaDownload className="text-xl" />
    </button>
  );
}