import { create } from 'zustand';
import { AuthState, User } from '../types';
import { toast } from 'react-hot-toast';

// Mock users - in a real app, this would be in a database
const mockUsers: User[] = [
  {
    id: '1',
    email: 'user@example.com',
    name: 'Demo User',
    avatarUrl: 'https://ui-avatars.com/api/?name=Demo+User&background=64C9CF&color=fff',
  },
];

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = mockUsers.find(u => u.email === email);
      
      if (!user) {
        throw new Error('Invalid credentials');
      }
      
      // In a real app, we'd validate the password here
      // For demo purposes, any password works
      
      set({ user, isAuthenticated: true, isLoading: false });
      localStorage.setItem('user', JSON.stringify(user));
      toast.success('Logged in successfully!');
    } catch (error) {
      set({ isLoading: false });
      toast.error(error instanceof Error ? error.message : 'Failed to login');
      throw error;
    }
  },

  signup: async (name: string, email: string, password: string) => {
    set({ isLoading: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      if (mockUsers.some(u => u.email === email)) {
        throw new Error('User already exists');
      }
      
      // Create new user
      const newUser: User = {
        id: (mockUsers.length + 1).toString(),
        email,
        name,
        avatarUrl: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=64C9CF&color=fff`,
      };
      
      mockUsers.push(newUser);
      
      set({ user: newUser, isAuthenticated: true, isLoading: false });
      localStorage.setItem('user', JSON.stringify(newUser));
      toast.success('Account created successfully!');
    } catch (error) {
      set({ isLoading: false });
      toast.error(error instanceof Error ? error.message : 'Failed to sign up');
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('user');
    set({ user: null, isAuthenticated: false });
    toast.success('Logged out successfully!');
  },
}));

// Initialize auth from localStorage
export const initAuth = () => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      useAuthStore.setState({ user, isAuthenticated: true });
    } catch (error) {
      console.error('Failed to parse user from localStorage', error);
      localStorage.removeItem('user');
    }
  }
};