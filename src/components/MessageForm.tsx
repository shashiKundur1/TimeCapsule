import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/Card';
import { Input } from './ui/Input';
import { TextArea } from './ui/TextArea';
import { Button } from './ui/Button';
import { useMessageStore } from '../store/messageStore';
import { Message } from '../types';
import { Calendar, Clock, Mail, Tag, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface MessageFormProps {
  initialMessage?: Partial<Message>;
  isEditing?: boolean;
}

const categories = ['Birthday', 'Work', 'Reminder', 'Motivation', 'Personal'];

const MessageForm: React.FC<MessageFormProps> = ({ 
  initialMessage,
  isEditing = false
}) => {
  const navigate = useNavigate();
  const { createMessage, updateMessage, isLoading } = useMessageStore();
  
  const [title, setTitle] = useState(initialMessage?.title || '');
  const [content, setContent] = useState(initialMessage?.content || '');
  const [recipientEmail, setRecipientEmail] = useState(initialMessage?.recipientEmail || '');
  const [category, setCategory] = useState(initialMessage?.category || '');
  const [scheduledDate, setScheduledDate] = useState<Date>(
    initialMessage?.scheduledDate || new Date(Date.now() + 24 * 60 * 60 * 1000)
  );
  const [errors, setErrors] = useState({
    title: '',
    content: '',
    scheduledDate: '',
    recipientEmail: '',
  });
  
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      title: '',
      content: '',
      scheduledDate: '',
      recipientEmail: '',
    };
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    }
    
    if (!content.trim()) {
      newErrors.content = 'Message content is required';
      isValid = false;
    }
    
    if (!scheduledDate || scheduledDate.getTime() <= Date.now()) {
      newErrors.scheduledDate = 'Please select a future date';
      isValid = false;
    }
    
    if (recipientEmail && !/\S+@\S+\.\S+/.test(recipientEmail)) {
      newErrors.recipientEmail = 'Please enter a valid email address';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    try {
      if (isEditing && initialMessage?.id) {
        await updateMessage(initialMessage.id, {
          title,
          content,
          recipientEmail,
          category,
          scheduledDate,
        });
        toast.success('Message updated successfully!');
      } else {
        await createMessage({
          title,
          content,
          recipientEmail,
          category,
          scheduledDate,
        });
        toast.success('Message scheduled successfully!');
      }
      navigate('/dashboard');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };
  
  const handleCancel = () => {
    navigate('/dashboard');
  };
  
  // Date and time formatting for input field
  const formatDateForInput = (date: Date) => {
    return date.toISOString().slice(0, 16);
  };
  
  return (
    <div className="opacity-0 animate-fade-in">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{isEditing ? 'Edit Message' : 'Create New Message'}</CardTitle>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div>
              <Input
                label="Title"
                id="title"
                placeholder="Enter message title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={errors.title}
              />
            </div>
            
            <div>
              <TextArea
                label="Message Content"
                id="content"
                placeholder="Write your message here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                error={errors.content}
                rows={5}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="category">
                  <div className="flex items-center space-x-1">
                    <Tag className="h-4 w-4" />
                    <span>Category (Optional)</span>
                  </div>
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-300 focus:outline-none transition-all duration-200"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="scheduledDate">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Scheduled Date & Time</span>
                  </div>
                </label>
                <Input
                  id="scheduledDate"
                  type="datetime-local"
                  value={formatDateForInput(scheduledDate)}
                  onChange={(e) => setScheduledDate(new Date(e.target.value))}
                  min={formatDateForInput(new Date())}
                  error={errors.scheduledDate}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="recipientEmail">
                <div className="flex items-center space-x-1">
                  <Mail className="h-4 w-4" />
                  <span>Recipient Email (Optional)</span>
                </div>
              </label>
              <Input
                id="recipientEmail"
                type="email"
                placeholder="Enter recipient's email address"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                error={errors.recipientEmail}
              />
              <p className="mt-1 text-sm text-gray-500">
                Leave blank to only send to yourself
              </p>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between border-t border-gray-100 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            
            <Button 
              type="submit" 
              loading={isLoading}
            >
              {isEditing ? 'Update Message' : 'Schedule Message'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default MessageForm;