import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { FaUserGraduate, FaChalkboardTeacher, FaBook } from 'react-icons/fa';

type UserRole = 'student' | 'staff' | 'librarian';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [role, setRole] = useState<UserRole>('student');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleChange = (selectedRole: UserRole) => {
    setRole(selectedRole);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // For demo purposes, we'll use hardcoded credentials
      let isAuthenticated = false;
      let userData = {};

      if (role === 'student' && formData.username === 'student' && formData.password === 'password') {
        isAuthenticated = true;
        userData = {
          id: 'N04112100064',
          name: 'Lachake Atharva Santosh',
          role: 'student',
          year: 'Fourth',
          division: 'A'
        };
      } else if (role === 'staff' && formData.username === 'staff' && formData.password === 'password') {
        isAuthenticated = true;
        userData = {
          id: 'STAFF001',
          name: 'John Doe',
          role: 'staff',
          department: 'Computer Science'
        };
      } else if (role === 'librarian' && formData.username === 'librarian' && formData.password === 'password') {
        isAuthenticated = true;
        userData = {
          id: 'LIB001',
          name: 'Jane Smith',
          role: 'librarian',
          department: 'Library'
        };
      }

      if (isAuthenticated) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('userRole', role);
        localStorage.setItem('authToken', 'demo-token');

        // Redirect based on role
        if (role === 'staff') {
          router.push('/staff-dashboard');
        } else if (role === 'librarian') {
          router.push('/librarian-dashboard');
        } else {
          router.push('/');
        }
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login - MET BKC</title>
      </Head>
      <div className="min-h-screen flex flex-col bg-gray-100">
        {/* Institute Header - Similar to main header but without navigation */}
        <div className="bg-red-600 w-full">
          <div className="text-white text-center py-4">
            <h1 className="text-2xl md:text-3xl font-bold mb-1">MET Bhujbal Knowledge City</h1>
            <p className="text-lg">Institute of Technology-Polytechnic</p>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-center text-2xl font-extrabold text-gray-900 mb-6">
              Sign in to your account
            </h2>

            <div className="flex rounded-md shadow-sm mb-6">
              <button
                type="button"
                onClick={() => handleRoleChange('student')}
                className={`w-1/3 py-2 px-4 text-sm font-medium rounded-l-md focus:outline-none flex items-center justify-center ${role === 'student'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
              >
                <FaUserGraduate className="mr-2" />
                Student
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange('staff')}
                className={`w-1/3 py-2 px-4 text-sm font-medium focus:outline-none flex items-center justify-center ${role === 'staff'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
              >
                <FaChalkboardTeacher className="mr-2" />
                Staff
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange('librarian')}
                className={`w-1/3 py-2 px-4 text-sm font-medium rounded-r-md focus:outline-none flex items-center justify-center ${role === 'librarian'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
              >
                <FaBook className="mr-2" />
                Librarian
              </button>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="username" className="sr-only">Username</label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                    placeholder={role === 'student' ? "Student ID" : role === 'staff' ? "Employee ID" : "Librarian ID"}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-red-600 hover:text-red-500">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Login;