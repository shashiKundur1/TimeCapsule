import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import { format, isSameDay } from 'date-fns';
import { useMessageStore } from '../store/messageStore';
import { Message } from '../types';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Plus, Calendar as CalendarIcon } from 'lucide-react';
import { formatDate } from '../utils/format-date';

const CalendarPage: React.FC = () => {
  const { messages, fetchMessages, isLoading } = useMessageStore();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [messagesForSelectedDate, setMessagesForSelectedDate] = useState<Message[]>([]);
  
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);
  
  useEffect(() => {
    if (selectedDate && messages.length > 0) {
      const filtered = messages.filter(message => 
        isSameDay(new Date(message.scheduledDate), selectedDate)
      );
      setMessagesForSelectedDate(filtered);
    }
  }, [selectedDate, messages]);
  
  // Function to get message count for each date
  const getMessageCountForDate = (date: Date) => {
    return messages.filter(message => isSameDay(new Date(message.scheduledDate), date)).length;
  };
  
  // Custom tile content to show message indicators
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view !== 'month') return null;
    
    const count = getMessageCountForDate(date);
    if (count === 0) return null;
    
    return (
      <div className="absolute bottom-1 left-0 right-0 flex justify-center">
        <div className={`w-${Math.min(count, 3) * 2} h-1 rounded-full bg-primary-500`}></div>
      </div>
    );
  };
  
  const getBadgeVariant = (category?: string) => {
    switch (category?.toLowerCase()) {
      case 'birthday':
        return 'accent';
      case 'work':
        return 'secondary';
      case 'reminder':
        return 'tertiary';
      case 'motivation':
        return 'default';
      default:
        return 'outline';
    }
  };
  
  return (
    <div className="container-custom py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Message Calendar</h1>
          <p className="text-gray-600">
            View your scheduled messages by date
          </p>
        </div>
        
        <Link to="/create-message" className="mt-4 md:mt-0">
          <Button className="flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>New Message</span>
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 opacity-0 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Schedule Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                tileContent={tileContent}
                className="w-full"
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="opacity-0 animate-fade-in [animation-delay:200ms]">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5 text-primary-600" />
                <span>
                  {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a Date'}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center my-8">
                  <div className="w-10 h-10 border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin"></div>
                </div>
              ) : messagesForSelectedDate.length > 0 ? (
                <div className="space-y-4">
                  {messagesForSelectedDate.map(message => (
                    <Link
                      key={message.id}
                      to={`/edit-message/${message.id}`}
                      className="block"
                    >
                      <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{message.title}</h3>
                          {message.category && (
                            <Badge variant={getBadgeVariant(message.category)}>
                              {message.category}
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                          {message.content}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {formatDate(message.scheduledDate)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No messages scheduled for this date</p>
                  <Link to="/create-message">
                    <Button size="sm" variant="outline">
                      Schedule Message
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;