import { createContext, useState, useEffect, type ReactNode } from "react";
import type { Task, TaskContextValue, NewTaskInput } from "../types";
import { toast } from "react-toastify";

export const TaskContext = createContext({} as TaskContextValue);

interface TaskProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = "taskduty-tasks";

const loadTasks = (): Task[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const TaskProvider = ({ children }: TaskProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const createTask = (taskData: NewTaskInput): void => {
    const newTask: Task = {
      id: Date.now().toString(),
      ...taskData,
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
    toast.success("Task Created Successfully");
  };

  const updateTask = (id: string, updatedData: NewTaskInput): void => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updatedData } : task)),
    );
    toast.success("Task Updated Successfully");
  };

  const deleteTask = (id: string): void => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    toast.success("Task Deleted Successfully");
  };

  const toggleComplete = (id: string): void => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  return (
    <TaskContext.Provider
      value={{ tasks, createTask, updateTask, deleteTask, toggleComplete }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
