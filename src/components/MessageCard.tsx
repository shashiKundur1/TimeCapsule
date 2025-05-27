import React from 'react';
import { Message } from '../types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { formatDate } from '../utils/format-date';
import { Calendar, Mail, Edit2, Trash2 } from 'lucide-react';

interface MessageCardProps {
  message: Message;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const MessageCard: React.FC<MessageCardProps> = ({ message, onEdit, onDelete }) => {
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
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>{message.title}</CardTitle>
          {message.category && (
            <Badge variant={getBadgeVariant(message.category)}>
              {message.category}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-gray-600 line-clamp-3">{message.content}</p>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Scheduled: {formatDate(message.scheduledDate)}</span>
          </div>
          
          {message.recipientEmail && (
            <div className="flex items-center text-sm text-gray-500">
              <Mail className="h-4 w-4 mr-2" />
              <span>To: {message.recipientEmail}</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-gray-100 pt-4">
        <div className="flex justify-between w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(message.id)}
            className="flex items-center space-x-1"
          >
            <Edit2 className="h-4 w-4" />
            <span>Edit</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(message.id)}
            className="flex items-center space-x-1 text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MessageCard;