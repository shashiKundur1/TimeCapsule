import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Menu, X, Clock, Calendar, MessageSquare, User, LogOut } from 'lucide-react';
import { Button } from './ui/Button';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const location = useLocation();
  
  const navLinks = [
    { path: '/', label: 'Home', icon: <Clock className="h-5 w-5" /> },
    { path: '/dashboard', label: 'Dashboard', icon: <MessageSquare className="h-5 w-5" /> },
    { path: '/calendar', label: 'Calendar', icon: <Calendar className="h-5 w-5" /> },
  ];
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Clock className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">TimeCapsule</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated && (
              <div className="flex items-center space-x-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center space-x-1 font-medium transition-colors ${
                      location.pathname === link.path
                        ? 'text-primary-600'
                        : 'text-gray-600 hover:text-primary-600'
                    }`}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            )}
            
            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {user?.avatarUrl && (
                      <img 
                        src={user.avatarUrl} 
                        alt={user.name} 
                        className="h-8 w-8 rounded-full"
                      />
                    )}
                    <span className="font-medium text-gray-700">{user?.name}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={logout}
                    className="flex items-center space-x-1"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" size="default">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="default" size="default">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-primary-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {isAuthenticated && (
                <>
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={closeMenu}
                      className={`flex items-center space-x-2 p-2 rounded-lg ${
                        location.pathname === link.path
                          ? 'bg-primary-50 text-primary-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-primary-600'
                      }`}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </Link>
                  ))}
                  
                  <div className="pt-2 border-t border-gray-100">
                    <div className="flex items-center space-x-2 p-2">
                      {user?.avatarUrl && (
                        <img 
                          src={user.avatarUrl} 
                          alt={user.name} 
                          className="h-8 w-8 rounded-full"
                        />
                      )}
                      <span className="font-medium text-gray-700">{user?.name}</span>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        closeMenu();
                      }}
                      className="flex items-center space-x-2 p-2 w-full text-left rounded-lg text-gray-600 hover:bg-gray-50 hover:text-primary-600"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              )}
              
              {!isAuthenticated && (
                <div className="flex flex-col space-y-2">
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="p-2 rounded-lg text-center border-2 border-primary text-primary hover:bg-primary-50"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={closeMenu}
                    className="p-2 rounded-lg text-center bg-primary-600 text-white hover:bg-primary-700"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;