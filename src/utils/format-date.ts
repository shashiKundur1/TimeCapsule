import { format, formatDistanceToNow, isToday, isTomorrow } from 'date-fns';

export function formatDate(date: Date): string {
  if (isToday(date)) {
    return `Today at ${format(date, 'h:mm a')}`;
  }
  
  if (isTomorrow(date)) {
    return `Tomorrow at ${format(date, 'h:mm a')}`;
  }
  
  return format(date, 'MMM d, yyyy \'at\' h:mm a');
}

export function formatRelativeDate(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true });
}