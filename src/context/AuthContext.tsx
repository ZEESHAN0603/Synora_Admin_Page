import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  user: any | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for mock session
    const savedUser = localStorage.getItem('synora_mock_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    // Simplified delay for realism
    await new Promise(resolve => setTimeout(resolve, 800));

    if (email === 'admin@gmail.com' && password === 'admin123') {
      const mockUser = { id: 'admin-id', email: 'admin@gmail.com' };
      setUser(mockUser);
      localStorage.setItem('synora_mock_user', JSON.stringify(mockUser));
    } else {
      throw new Error('Invalid credentials. Hint: use admin@gmail.com / admin123');
    }
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('synora_mock_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
