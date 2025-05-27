export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
}

export interface Message {
  id: string;
  userId: string;
  title: string;
  content: string;
  scheduledDate: Date;
  createdAt: Date;
  recipientEmail?: string;
  category?: string;
  isDelivered: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface MessageState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  fetchMessages: () => Promise<void>;
  createMessage: (message: Omit<Message, 'id' | 'userId' | 'createdAt' | 'isDelivered'>) => Promise<void>;
  updateMessage: (id: string, message: Partial<Message>) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
}