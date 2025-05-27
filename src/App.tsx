import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { initAuth } from './store/authStore';

// Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import CalendarPage from './pages/CalendarPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CreateMessagePage from './pages/CreateMessagePage';
import EditMessagePage from './pages/EditMessagePage';

// Route Guard
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  // Initialize auth from localStorage on app load
  useEffect(() => {
    initAuth();
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/create-message" element={<CreateMessagePage />} />
              <Route path="/edit-message/:id" element={<EditMessagePage />} />
            </Route>
          </Routes>
        </main>
        <Footer />
        
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff',
              color: '#333',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              borderRadius: '0.5rem',
              padding: '0.75rem 1rem',
            },
            success: {
              iconTheme: {
                primary: '#64C9CF',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#DF711B',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;