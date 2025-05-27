import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Mail, Lock } from 'lucide-react';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: '',
      password: '',
    };
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      // Error handling is done in the store with toast
    }
  };
  
  // For demo purposes, let's pre-fill with the mock user credentials
  const fillDemoCredentials = () => {
    setEmail('user@example.com');
    setPassword('password');
  };
  
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md opacity-0 animate-fade-in">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Login to TimeCapsule</CardTitle>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div>
                <Input
                  label="Email Address"
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                  icon={<Mail className="h-5 w-5 text-gray-400" />}
                />
              </div>
              
              <div>
                <Input
                  label="Password"
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                  icon={<Lock className="h-5 w-5 text-gray-400" />}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                loading={isLoading}
              >
                Login
              </Button>
              
              <div className="text-center">
                <button
                  type="button"
                  onClick={fillDemoCredentials}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Use Demo Credentials
                </button>
              </div>
            </CardContent>
          </form>
          
          <CardFooter className="flex justify-center border-t border-gray-100 pt-6">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary-600 hover:text-primary-700 font-medium">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;