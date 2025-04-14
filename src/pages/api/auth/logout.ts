import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  success: boolean;
  message?: string;
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
    // Clear authentication cookies
    res.setHeader('Set-Cookie', [
      'authToken=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict',
      'userRole=; Path=/; Max-Age=0; SameSite=Strict',
      'user=; Path=/; Max-Age=0; SameSite=Strict'
    ]);
    
    // Return success response
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'An error occurred during logout' 
    });
  }
}