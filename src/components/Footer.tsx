import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">TimeCapsule</span>
            </div>
            <p className="mt-4 text-gray-600 max-w-md">
              Schedule messages to be delivered in the future. Perfect for birthdays, anniversaries, 
              and sending your future self some words of wisdom.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary-600 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Pages</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/calendar" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Calendar
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500">
            &copy; {new Date().getFullYear()} TimeCapsule. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;