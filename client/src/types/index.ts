export type Category = "Work" | "Personal" | "Urgent";

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  category: Category;
  completed: boolean;
}
export interface NewTaskInput {
  title: string;
  description: string;
  dueDate: string;
  category: Category;
}

export interface TaskContextValue {
  tasks: Task[];
  loading: boolean;
  createTask: (taskData: NewTaskInput) => Promise<void>;
  updateTask: (id: string, updatedData: NewTaskInput) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleComplete: (id: string) => Promise<void>;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}
