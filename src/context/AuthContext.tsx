import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simple mock JWT-like token generator
const generateToken = (user: User): string => {
  const payload = btoa(JSON.stringify({ ...user, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 }));
  return `mock_jwt_${payload}`;
};

const decodeToken = (token: string): User | null => {
  try {
    const payload = token.replace('mock_jwt_', '');
    const data = JSON.parse(atob(payload));
    if (data.exp < Date.now()) return null;
    return { id: data.id, name: data.name, email: data.email, role: data.role || 'user', createdAt: data.createdAt };
  } catch {
    return null;
  }
};

// Mock users DB in localStorage
const USERS_KEY = 'shopman_users';
const TOKEN_KEY = 'shopmart_token';

interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  createdAt: string;
}

const getStoredUsers = (): StoredUser[] => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch {
    return [];
  }
};

const saveStoredUsers = (users: StoredUser[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Seed default admin account
const seedAdmin = () => {
  const users = getStoredUsers();
  if (!users.find((u) => u.email === 'bishnu@shopmart.com')) {
    users.push({
      id: 'admin-001',
      name: 'Admin',
      email: 'bishnu@shopmart.com',
      password: 'password-Admin@2005',
      role: 'admin',
      createdAt: new Date().toISOString(),
    });
    saveStoredUsers(users);
  }
};

// Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Seed admin + restore session on mount
  useEffect(() => {
    seedAdmin();
    const savedToken = localStorage.getItem(TOKEN_KEY);
    if (savedToken) {
      const decoded = decodeToken(savedToken);
      if (decoded) {
        setUser(decoded);
        setToken(savedToken);
      } else {
        localStorage.removeItem(TOKEN_KEY);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 800));
    const users = getStoredUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) return false;

    const userData: User = { id: found.id, name: found.name, email: found.email, role: found.role || 'user', createdAt: found.createdAt };
    const newToken = generateToken(userData);
    setUser(userData);
    setToken(newToken);
    localStorage.setItem(TOKEN_KEY, newToken);
    return true;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 800));
    const users = getStoredUsers();
    if (users.find((u) => u.email === email)) return false;

    const newUser: StoredUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
      role: 'user',
      createdAt: new Date().toISOString(),
    };
    saveStoredUsers([...users, newUser]);

    const userData: User = { id: newUser.id, name: newUser.name, email: newUser.email, role: 'user', createdAt: newUser.createdAt };
    const newToken = generateToken(userData);
    setUser(userData);
    setToken(newToken);
    localStorage.setItem(TOKEN_KEY, newToken);
    return true;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, isAdmin: user?.role === 'admin', loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
