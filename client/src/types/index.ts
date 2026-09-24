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
  createTask: (taskData: NewTaskInput) => void;
  updateTask: (id: string, updatedData: NewTaskInput) => void;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
}
