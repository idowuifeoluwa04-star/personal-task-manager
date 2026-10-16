import { createContext, useState, useEffect, useContext, type ReactNode } from "react";
import type { Task, TaskContextValue, NewTaskInput } from "../types";
import { toast } from "react-toastify";
import { apiRequest, ApiError } from "../api/client";
import { AuthContext } from "./AuthContext";

export const TaskContext = createContext({} as TaskContextValue);

interface TaskProviderProps {
  children: ReactNode;
}

interface RawTask {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  category: Task["category"];
  completed: boolean;
}

const toTask = (raw: RawTask): Task => ({
  id: raw._id,
  title: raw.title,
  description: raw.description,
  dueDate: raw.dueDate ? raw.dueDate.split("T")[0] : "",
  category: raw.category,
  completed: raw.completed,
});

const TaskProvider = ({ children }: TaskProviderProps) => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async (): Promise<void> => {
    setLoading(true);
    try {
      const data = await apiRequest<{ tasks: RawTask[] }>("/api/tasks");
      setTasks(data.tasks.map(toTask));
    } catch (error) {
      const message = error instanceof ApiError ? error.message : "Unable to load tasks";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTasks();
    } else {
      setTasks([]);
    }
  }, [user]);

  const createTask = async (taskData: NewTaskInput): Promise<void> => {
    try {
      const data = await apiRequest<{ task: RawTask }>("/api/tasks", {
        method: "POST",
        body: taskData,
      });
      setTasks((prev) => [toTask(data.task), ...prev]);
      toast.success("Task Created Successfully");
    } catch (error) {
      const message = error instanceof ApiError ? error.message : "Unable to create task";
      toast.error(message);
      throw error;
    }
  };

  const updateTask = async (id: string, updatedData: NewTaskInput): Promise<void> => {
    try {
      const data = await apiRequest<{ task: RawTask }>(`/api/tasks/${id}`, {
        method: "PUT",
        body: updatedData,
      });
      setTasks((prev) => prev.map((task) => (task.id === id ? toTask(data.task) : task)));
      toast.success("Task Updated Successfully");
    } catch (error) {
      const message = error instanceof ApiError ? error.message : "Unable to update task";
      toast.error(message);
      throw error;
    }
  };

  const deleteTask = async (id: string): Promise<void> => {
    try {
      await apiRequest(`/api/tasks/${id}`, { method: "DELETE" });
      setTasks((prev) => prev.filter((task) => task.id !== id));
      toast.success("Task Deleted Successfully");
    } catch (error) {
      const message = error instanceof ApiError ? error.message : "Unable to delete task";
      toast.error(message);
      throw error;
    }
  };

  const toggleComplete = async (id: string): Promise<void> => {
    const target = tasks.find((task) => task.id === id);
    if (!target) return;
    try {
      const data = await apiRequest<{ task: RawTask }>(`/api/tasks/${id}`, {
        method: "PUT",
        body: { completed: !target.completed },
      });
      setTasks((prev) => prev.map((task) => (task.id === id ? toTask(data.task) : task)));
    } catch (error) {
      const message = error instanceof ApiError ? error.message : "Unable to update task";
      toast.error(message);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, loading, createTask, updateTask, deleteTask, toggleComplete }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
