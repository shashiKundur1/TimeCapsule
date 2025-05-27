import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMessageStore } from '../store/messageStore';
import { Message } from '../types';
import MessageCard from '../components/MessageCard';
import { Button } from '../components/ui/Button';
import { Plus, Search, Calendar, Filter, AlertTriangle } from 'lucide-react';
import { formatRelativeDate } from '../utils/format-date';
import { toast } from 'react-hot-toast';

const DashboardPage: React.FC = () => {
  const { messages, fetchMessages, deleteMessage, isLoading } = useMessageStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortOption, setSortOption] = useState('scheduledDate');
  
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);
  
  const handleEdit = (id: string) => {
    // Navigation is handled by the Link component in the MessageCard
  };
  
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteMessage(id);
        toast.success('Message deleted successfully');
      } catch (error) {
        toast.error('Failed to delete message');
      }
    }
  };
  
  // Filter and sort messages
  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          message.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === '' || message.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  const sortedMessages = [...filteredMessages].sort((a, b) => {
    if (sortOption === 'scheduledDate') {
      return new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime();
    } else if (sortOption === 'title') {
      return a.title.localeCompare(b.title);
    } else {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });
  
  // Get unique categories for filter
  const categories = Array.from(new Set(messages.map(m => m.category).filter(Boolean)));
  
  // Get upcoming message if any
  const upcomingMessage = sortedMessages.find(m => 
    new Date(m.scheduledDate).getTime() > Date.now() && !m.isDelivered
  );
  
  return (
    <div className="container-custom py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Messages</h1>
          <p className="text-gray-600">
            Manage and track all your scheduled messages
          </p>
        </div>
        
        <Link to="/create-message" className="mt-4 md:mt-0">
          <Button className="flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>New Message</span>
          </Button>
        </Link>
      </div>
      
      {upcomingMessage && (
        <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 mb-8 flex items-center justify-between opacity-0 animate-fade-in">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-primary-600 mr-3" />
            <div>
              <p className="font-medium">
                Next scheduled message: <span className="text-primary-700">{upcomingMessage.title}</span>
              </p>
              <p className="text-sm text-gray-600">
                Scheduled for {formatRelativeDate(upcomingMessage.scheduledDate)}
              </p>
            </div>
          </div>
          <Link to={`/edit-message/${upcomingMessage.id}`}>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </Link>
        </div>
      )}
      
      <div className="bg-white rounded-xl shadow-md p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-300 focus:outline-none transition-all duration-200"
            />
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-300 focus:outline-none transition-all duration-200"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-300 focus:outline-none transition-all duration-200"
            >
              <option value="scheduledDate">Sort by Date (Soonest)</option>
              <option value="createdAt">Sort by Created (Newest)</option>
              <option value="title">Sort by Title (A-Z)</option>
            </select>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center my-12">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin"></div>
        </div>
      ) : sortedMessages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedMessages.map((message, index) => (
            <div 
              key={message.id} 
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link to={`/edit-message/${message.id}`} className="block h-full">
                <MessageCard
                  message={message}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 opacity-0 animate-fade-in">
          <AlertTriangle className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Messages Found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || categoryFilter
              ? "No messages match your current filters."
              : "You haven't created any messages yet."}
          </p>
          <Link to="/create-message">
            <Button>
              <Plus className="h-5 w-5 mr-2" />
              Create Your First Message
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;