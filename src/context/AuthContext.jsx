import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On app load, check if token exists in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');  // ← IMPORTANT: Get email
    const userId = localStorage.getItem('userId');
    const hostelBlock = localStorage.getItem('hostelBlock');
    const roomNumber = localStorage.getItem('roomNumber');

    if (token && role) {
      setUser({ 
        token, 
        role, 
        name,
        email,  // ← IMPORTANT: Set email
        userId: userId ? parseInt(userId) : null,
        hostelBlock: hostelBlock || null,
        roomNumber: roomNumber || null
      });
    }
    setLoading(false);
  }, []);

  const login = (data) => {
    // Save EVERYTHING to localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.role);
    localStorage.setItem('name', data.name);
    localStorage.setItem('email', data.email);  // ← IMPORTANT: Save email
    localStorage.setItem('userId', data.userId);
    
    // Save student-specific data if it exists
    if (data.hostelBlock) {
      localStorage.setItem('hostelBlock', data.hostelBlock);
    }
    if (data.roomNumber) {
      localStorage.setItem('roomNumber', data.roomNumber);
    }
    
    // Set user state with email
    setUser({ 
      token: data.token, 
      role: data.role, 
      name: data.name,
      email: data.email,  // ← IMPORTANT: Include email in state
      userId: data.userId,
      hostelBlock: data.hostelBlock || null,
      roomNumber: data.roomNumber || null
    });
  };

  const logout = () => {
    // Clear all localStorage items
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    localStorage.removeItem('email');  // ← IMPORTANT: Remove email
    localStorage.removeItem('userId');
    localStorage.removeItem('hostelBlock');
    localStorage.removeItem('roomNumber');
    
    // Clear user state
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook — any component can call useAuth() to get user
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/*
What gets stored:

token - JWT for API calls

role - STUDENT or ADMIN

name - User's full name

userId - Database ID

hostelBlock - Only for students

roomNumber - Only for students
*/