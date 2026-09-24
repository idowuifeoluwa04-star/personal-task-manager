import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import backArrow from "../assets/back-arrow.svg";
import { TaskContext } from "../context/TaskContext";
import type { Category } from "../types";

const NewTask = () => {
  const navigate = useNavigate();
  const { createTask } = useContext(TaskContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState<Category>("Work");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!title || !description || !dueDate) {
      setError("All fields are required.");
      return;
    }
    const today = new Date().toISOString().split("T")[0];
    if (dueDate < today) {
      setError("Due date cannot be in the past.");
      return;
    }
    setError("");
    createTask({ title, description, dueDate, category });
    navigate("/my-tasks");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <Navbar />
      <div className="px-4 md:px-10 xl:px-[100px] 2xl:px-[170px] pt-8 md:pt-10 pb-16">
        <div
          className="flex items-center gap-2 cursor-pointer w-fit"
          onClick={() => navigate("/my-tasks")}
        >
          <img
            src={backArrow}
            alt=""
            className="w-[36px] h-[36px] sm:w-[48px] sm:h-[48px] md:w-[60px] md:h-[60px]"
          />
          <h1 className="font-['Signika_Negative'] font-medium text-[28px] sm:text-[36px] md:text-[50px] text-[#292929]">
            New Task
          </h1>
        </div>
        <div className="flex flex-col gap-6 sm:gap-10 md:gap-[68px] mt-6 md:mt-8">
          <div className="relative border border-[#B8B6B6] rounded-[5px] px-4 sm:px-[30px] md:px-[45px] pt-5 md:pt-[26px] pb-3 md:pb-[10px] focus-within:border-[#974FD0]">
            <label className="absolute top-0 left-4 sm:left-[30px] md:left-[45px] -translate-y-1/2 bg-white px-2 font-['Signika_Negative'] font-normal text-[18px] sm:text-[24px] md:text-[30px] text-[#9C9C9C]">
              Task Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g Project Defense, Assignment ..."
              className="w-full font-['Signika_Negative'] font-normal text-[16px] sm:text-[19px] md:text-[22px] text-[#292929] placeholder-[#CCCCCC] focus:outline-none"
            />
          </div>
          <div className="relative border border-[#B8B6B6] rounded-[5px] px-4 sm:px-[30px] md:px-[45px] pt-5 md:pt-[26px] pb-3 md:pb-[10px] focus-within:border-[#974FD0]">
            <label className="absolute top-0 left-4 sm:left-[30px] md:left-[45px] -translate-y-1/2 bg-white px-2 font-['Signika_Negative'] font-normal text-[18px] sm:text-[24px] md:text-[30px] text-[#9C9C9C]">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Briefly describe your task..."
              rows={4}
              className="w-full font-['Signika_Negative'] font-normal text-[16px] sm:text-[19px] md:text-[22px] text-[#292929] placeholder-[#CCCCCC] focus:outline-none resize-none"
            />
          </div>
          <div className="relative border border-[#B8B6B6] rounded-[5px] px-4 sm:px-[30px] md:px-[45px] pt-5 md:pt-[26px] pb-3 md:pb-[10px] focus-within:border-[#974FD0]">
            <label className="absolute top-0 left-4 sm:left-[30px] md:left-[45px] -translate-y-1/2 bg-white px-2 font-['Signika_Negative'] font-normal text-[18px] sm:text-[24px] md:text-[30px] text-[#9C9C9C]">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full font-['Signika_Negative'] font-normal text-[16px] sm:text-[19px] md:text-[22px] text-[#292929] focus:outline-none [color-scheme:light]"
            />
          </div>
          <div className="relative border border-[#B8B6B6] rounded-[5px] px-4 sm:px-[30px] md:px-[45px] pt-5 md:pt-[26px] pb-3 md:pb-[10px] focus-within:border-[#974FD0]">
            <label className="absolute top-0 left-4 sm:left-[30px] md:left-[45px] -translate-y-1/2 bg-white px-2 font-['Signika_Negative'] font-normal text-[18px] sm:text-[24px] md:text-[30px] text-[#9C9C9C]">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full font-['Signika_Negative'] font-normal text-[16px] sm:text-[19px] md:text-[22px] text-[#292929] focus:outline-none cursor-pointer"
            >
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
          {error && (
            <p className="font-['Signika_Negative'] text-[15px] md:text-[18px] text-[#F38383]">
              {error}
            </p>
          )}
          <button
            onClick={handleSubmit}
            className="w-full h-[60px] sm:h-[72px] md:h-[84px] flex items-center justify-center rounded-[8px] bg-[#974FD0] hover:bg-[#7e3fb0] cursor-pointer text-[#FAF9FB] font-['Signika_Negative'] font-medium text-[22px] sm:text-[28px] md:text-[35px] mt-4"
          >
            Done
          </button>
          <span
            onClick={scrollToTop}
            className="cursor-pointer text-center underline font-['Signika_Negative'] font-normal text-[18px] md:text-[26px] text-[#974FD0]"
          >
            Back To Top
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewTask;
