import { create } from 'zustand';
import { MessageState, Message } from '../types';
import { toast } from 'react-hot-toast';
import { addDays, addHours } from 'date-fns';

const mockMessages: Message[] = [
  {
    id: '1',
    userId: '1',
    title: 'Happy Birthday Message',
    content: 'Happy birthday! I hope you have a wonderful day filled with joy and happiness.',
    scheduledDate: addDays(new Date(), 7),
    createdAt: new Date(),
    recipientEmail: 'friend@example.com',
    category: 'Birthday',
    isDelivered: false,
  },
  {
    id: '2',
    userId: '1',
    title: 'Work Anniversary',
    content: 'Congratulations on your work anniversary! It\'s been a pleasure working with you.',
    scheduledDate: addDays(new Date(), 14),
    createdAt: new Date(),
    recipientEmail: 'colleague@example.com',
    category: 'Work',
    isDelivered: false,
  },
  {
    id: '3',
    userId: '1',
    title: 'Future Reminder',
    content: 'Remember to check on the long-term investment portfolio and consider rebalancing.',
    scheduledDate: addDays(new Date(), 30),
    createdAt: new Date(),
    recipientEmail: 'myself@example.com',
    category: 'Reminder',
    isDelivered: false,
  },
  {
    id: '4',
    userId: '1',
    title: 'Motivational Note',
    content: 'Hey future self! You\'ve been working hard and making progress. Keep it up!',
    scheduledDate: addHours(new Date(), 6),
    createdAt: new Date(),
    category: 'Motivation',
    isDelivered: false,
  },
];

export const useMessageStore = create<MessageState>((set, get) => ({
  messages: [],
  isLoading: false,
  error: null,

  fetchMessages: async () => {
    set({ isLoading: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      set({ messages: mockMessages, isLoading: false });
    } catch (error) {
      set({ 
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch messages'
      });
      toast.error('Failed to fetch messages');
    }
  },

  createMessage: async (message) => {
    set({ isLoading: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newMessage: Message = {
        id: (mockMessages.length + 1).toString(),
        userId: '1', // Hardcoded for demo
        createdAt: new Date(),
        isDelivered: false,
        ...message,
      };
      
      mockMessages.push(newMessage);
      
      set((state) => ({
        messages: [...state.messages, newMessage],
        isLoading: false,
      }));
      
      toast.success('Message scheduled successfully!');
    } catch (error) {
      set({ 
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to create message'
      });
      toast.error('Failed to schedule message');
    }
  },

  updateMessage: async (id, updatedFields) => {
    set({ isLoading: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const messageIndex = mockMessages.findIndex(m => m.id === id);
      
      if (messageIndex === -1) {
        throw new Error('Message not found');
      }
      
      mockMessages[messageIndex] = {
        ...mockMessages[messageIndex],
        ...updatedFields,
      };
      
      set((state) => ({
        messages: state.messages.map(m => 
          m.id === id ? { ...m, ...updatedFields } : m
        ),
        isLoading: false,
      }));
      
      toast.success('Message updated successfully!');
    } catch (error) {
      set({ 
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to update message'
      });
      toast.error('Failed to update message');
    }
  },

  deleteMessage: async (id) => {
    set({ isLoading: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const messageIndex = mockMessages.findIndex(m => m.id === id);
      
      if (messageIndex === -1) {
        throw new Error('Message not found');
      }
      
      mockMessages.splice(messageIndex, 1);
      
      set((state) => ({
        messages: state.messages.filter(m => m.id !== id),
        isLoading: false,
      }));
      
      toast.success('Message deleted successfully!');
    } catch (error) {
      set({ 
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to delete message'
      });
      toast.error('Failed to delete message');
    }
  },
}));