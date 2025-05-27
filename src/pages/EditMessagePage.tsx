import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MessageForm from '../components/MessageForm';
import { useMessageStore } from '../store/messageStore';
import { Message } from '../types';
import { toast } from 'react-hot-toast';

const EditMessagePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { messages, fetchMessages } = useMessageStore();
  const [message, setMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadMessage = async () => {
      try {
        if (messages.length === 0) {
          await fetchMessages();
        }
        
        const foundMessage = messages.find(m => m.id === id);
        
        if (foundMessage) {
          setMessage(foundMessage);
        } else {
          toast.error('Message not found');
          navigate('/dashboard');
        }
      } catch (error) {
        toast.error('Failed to load message');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    
    loadMessage();
  }, [id, messages, fetchMessages, navigate]);
  
  if (loading) {
    return (
      <div className="container-custom py-8 md:py-12 flex justify-center">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!message) {
    return null;
  }
  
  return (
    <div className="container-custom py-8 md:py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Edit Message
      </h1>
      <MessageForm initialMessage={message} isEditing={true} />
    </div>
  );
};

export default EditMessagePage;