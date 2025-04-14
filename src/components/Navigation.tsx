import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function Navigation() {
  const [currentPath, setCurrentPath] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Safe to access window in useEffect
    setCurrentPath(window.location.pathname);
  }, []);

  const handleNavigation = (path) => {
    // Prevent navigating to current page
    if (currentPath !== path) {
      router.push(path);
    }
  };

  return (
    // Navigation component
  );
}