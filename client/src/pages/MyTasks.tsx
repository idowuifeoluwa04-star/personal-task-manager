import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import BackToTop from "../components/BackToTop";
import CustomSelect from "../components/CustomSelect";
import ConfirmModal from "../components/ConfirmModal";
import { TaskContext } from "../context/TaskContext";
import type { Category } from "../types";
import editIcon from "../assets/edit-icon.svg";
import deleteIcon from "../assets/delete-icon.svg";

const categoryColors: Record<Category, string> = {
  Urgent: "#F38383",
  Personal: "#73C3A6",
  Work: "#5B8DEF",
};

const categoryOptions = [
  { value: "All", label: "All Categories" },
  { value: "Work", label: "Work" },
  { value: "Personal", label: "Personal" },
  { value: "Urgent", label: "Urgent" },
];

const statusOptions = [
  { value: "All", label: "All Status" },
  { value: "Completed", label: "Completed" },
  { value: "Not Completed", label: "Not Completed" },
];

const MyTasks = () => {
  const navigate = useNavigate();
  const { tasks, deleteTask, toggleComplete } = useContext(TaskContext);
  const [categoryFilter, setCategoryFilter] = useState<Category | "All">("All");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Completed" | "Not Completed"
  >("All");
  const [visibleTasks, setVisibleTasks] = useState(tasks);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  useEffect(() => {
    let filtered = tasks;
    if (categoryFilter !== "All") {
      filtered = filtered.filter((task) => task.category === categoryFilter);
    }
    if (statusFilter === "Completed") {
      filtered = filtered.filter((task) => task.completed);
    } else if (statusFilter === "Not Completed") {
      filtered = filtered.filter((task) => !task.completed);
    }
    setVisibleTasks(filtered);
  }, [tasks, categoryFilter, statusFilter]);

  const taskPendingDelete = tasks.find((task) => task.id === taskToDelete);

  return (
    <div>
      <Navbar />
      <div className="px-4 md:px-10 xl:px-[100px] 2xl:px-[170px] pt-8 md:pt-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h1 className="font-['Signika_Negative'] font-medium text-[28px] sm:text-[36px] md:text-[50px] text-[#292929]">
            My Tasks
          </h1>
          <span
            className="cursor-pointer font-['Signika_Negative'] font-medium text-[16px] sm:text-[20px] md:text-[24px] text-[#974FD0]"
            onClick={() => navigate("/new-task")}
          >
            + Add New Task
          </span>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6">
          <div className="w-full sm:w-[180px]">
            <CustomSelect
              options={categoryOptions}
              value={categoryFilter}
              onChange={(v) => setCategoryFilter(v as Category | "All")}
              buttonClassName="w-full flex items-center justify-between font-['Signika_Negative'] font-medium text-[14px] sm:text-[16px] text-[#974FD0] border border-[#974FD0] rounded-[8px] px-4 py-2 cursor-pointer focus:outline-none"
            />
          </div>
          <div className="w-full sm:w-[180px]">
            <CustomSelect
              options={statusOptions}
              value={statusFilter}
              onChange={(v) =>
                setStatusFilter(v as "All" | "Completed" | "Not Completed")
              }
              buttonClassName="w-full flex items-center justify-between font-['Signika_Negative'] font-medium text-[14px] sm:text-[16px] text-[#974FD0] border border-[#974FD0] rounded-[8px] px-4 py-2 cursor-pointer focus:outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col gap-8 sm:gap-12 md:gap-[79px] mt-8 md:mt-10 mb-16">
          {visibleTasks.length === 0 ? (
            <p className="font-['Signika_Negative'] text-[18px] md:text-[22px] text-[#737171]">
              No tasks yet.
            </p>
          ) : (
            visibleTasks.map((task) => (
              <div
                key={task.id}
                className="rounded-[10px] border-[0.5px] border-[#B8B6B6] px-3 pt-5 pb-[24px] md:pb-[35px]"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#B8B6B6]">
                  <span
                    className="font-['Signika_Negative'] font-normal text-[16px] sm:text-[20px] md:text-[24px] leading-[100%]"
                    style={{ color: categoryColors[task.category] }}
                  >
                    {task.category}
                  </span>
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-wrap">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleComplete(task.id)}
                      className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer"
                    />
                    <button
                      onClick={() => navigate(`/edit-task/${task.id}`)}
                      className="flex items-center gap-1 sm:gap-2 md:gap-[10px] rounded-[8px] bg-[#974FD0] hover:bg-[#7e3fb0] cursor-pointer text-[#FAF9FB] font-medium text-[14px] sm:text-[18px] md:text-[24px] px-[14px] sm:px-[18px] md:px-[25px] py-[6px] sm:py-[8px] md:py-[10px]"
                    >
                      <img
                        src={editIcon}
                        alt=""
                        className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] md:w-[24px] md:h-[24px]"
                      />
                      Edit
                    </button>
                    <button
                      onClick={() => setTaskToDelete(task.id)}
                      className="flex items-center gap-1 sm:gap-2 md:gap-[10px] rounded-[8px] border border-[#974FD0] hover:bg-[#974FD0] hover:text-white cursor-pointer text-[#974FD0] font-medium text-[14px] sm:text-[18px] md:text-[24px] px-[14px] sm:px-[18px] md:px-[25px] py-[6px] sm:py-[8px] md:py-[10px]"
                    >
                      <img
                        src={deleteIcon}
                        alt=""
                        className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] md:w-[24px] md:h-[24px]"
                      />
                      Delete
                    </button>
                  </div>
                </div>
                <h2 className="font-['Signika_Negative'] font-normal text-[20px] sm:text-[26px] md:text-[35px] text-[#292929] mt-4">
                  {task.title}
                </h2>
                <p className="font-['Signika_Negative'] font-normal text-[15px] sm:text-[18px] md:text-[24px] leading-[140%] md:leading-[100%] text-[#737171] mt-2">
                  {task.description}
                </p>
                <p className="text-sm text-[#737171] mt-2">
                  Due: {task.dueDate}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
      <BackToTop />
      <ConfirmModal
        isOpen={taskToDelete !== null}
        taskTitle={taskPendingDelete?.title}
        onCancel={() => setTaskToDelete(null)}
        onConfirm={() => {
          if (taskToDelete) deleteTask(taskToDelete);
          setTaskToDelete(null);
        }}
      />
    </div>
  );
};

export default MyTasks;
