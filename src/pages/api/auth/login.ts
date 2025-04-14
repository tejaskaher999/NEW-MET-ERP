import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  success: boolean;
  message?: string;
  user?: any;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
    const { username, password, role } = req.body;

    // Simple mock authentication
    // In a real app, you'd verify against a database
    if (role === 'student' && username === 'student' && password === 'password') {
      // Set auth cookies (secure in production)
      res.setHeader('Set-Cookie', [
        `authToken=student-token; Path=/; HttpOnly; SameSite=Strict; Max-Age=${60 * 60 * 24 * 7}`, // 1 week
        `userRole=student; Path=/; SameSite=Strict; Max-Age=${60 * 60 * 24 * 7}` // 1 week
      ]);

      return res.status(200).json({ 
        success: true,
        user: {
          id: 'N04112100064',
          name: 'Lachake Atharva Santosh',
          role: 'student',
          year: 'Fourth',
          division: 'A'
        }
      });
    } 
    else if (role === 'staff' && username === 'staff' && password === 'password') {
      // Set auth cookies (secure in production)
      res.setHeader('Set-Cookie', [
        `authToken=staff-token; Path=/; HttpOnly; SameSite=Strict; Max-Age=${60 * 60 * 24 * 7}`, // 1 week
        `userRole=staff; Path=/; SameSite=Strict; Max-Age=${60 * 60 * 24 * 7}` // 1 week
      ]);

      return res.status(200).json({ 
        success: true,
        user: {
          id: 'STAFF001',
          name: 'John Doe',
          role: 'staff',
          department: 'Computer Science'
        }
      });
    }
    
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid username or password' 
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'An error occurred during login' 
    });
  }
}