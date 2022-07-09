export interface User {
  id: number;
  username: string;
  email: string;
  password?: string;
}

export interface Task {
  title: string;
  description: string;
  id: number;
  userId: number;
  completed: boolean;
}