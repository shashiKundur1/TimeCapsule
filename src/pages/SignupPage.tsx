import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { User, Mail, Lock } from 'lucide-react';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuthStore();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    
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
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      await signup(name, email, password);
      navigate('/dashboard');
    } catch (error) {
      // Error handling is done in the store with toast
    }
  };
  
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md opacity-0 animate-fade-in">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create an Account</CardTitle>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div>
                <Input
                  label="Full Name"
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={errors.name}
                  icon={<User className="h-5 w-5 text-gray-400" />}
                />
              </div>
              
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
              
              <div>
                <Input
                  label="Confirm Password"
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={errors.confirmPassword}
                  icon={<Lock className="h-5 w-5 text-gray-400" />}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                loading={isLoading}
              >
                Create Account
              </Button>
            </CardContent>
          </form>
          
          <CardFooter className="flex justify-center border-t border-gray-100 pt-6">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;