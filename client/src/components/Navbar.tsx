import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import avatar from "../assets/avatar .png";
import dot from "../assets/dot.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isCoverPage = location.pathname === "/";
  const isMyTasksPage = location.pathname === "/my-tasks";

  return (
    <div className="flex items-center justify-between h-[70px] sm:h-[80px] md:h-[93px] px-4 md:px-10 xl:px-[100px] 2xl:px-[170px] border-b-[0.5px] border-[#B8B6B6] bg-white">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/my-tasks")}
      >
        <img
          src={logo}
          alt="TaskDuty logo"
          className="w-[28px] h-[29px] sm:w-[34px] sm:h-[35px] md:w-[39.91px] md:h-[41px]"
        />
        <span className="text-[18px] sm:text-[22px] md:text-[27px] font-semibold text-[#2D0050]">
          TaskDuty
        </span>
      </div>

      <div className="flex items-center gap-3 sm:gap-6 md:gap-[40px]">
        {isCoverPage ? (
          <>
            <span
              className="cursor-pointer font-medium text-[13px] sm:text-[17px] md:text-[22px] text-[#292929]"
              onClick={() => navigate("/new-task")}
            >
              New Task
            </span>
            <span
              className="cursor-pointer font-medium text-[13px] sm:text-[17px] md:text-[22px] text-[#292929]"
              onClick={() => navigate("/my-tasks")}
            >
              All Tasks
            </span>
          </>
        ) : isMyTasksPage ? (
          <span
            className="cursor-pointer font-medium text-[13px] sm:text-[17px] md:text-[22px] text-[#292929]"
            onClick={() => navigate("/new-task")}
          >
            New Task
          </span>
        ) : (
          <span
            className="cursor-pointer font-medium text-[13px] sm:text-[17px] md:text-[22px] text-[#292929]"
            onClick={() => navigate("/my-tasks")}
          >
            All Task
          </span>
        )}
        <div className="relative w-[36px] h-[36px] sm:w-[48px] sm:h-[48px] md:w-[60px] md:h-[60px]">
          <img
            src={avatar}
            alt="User avatar"
            className="w-full h-full rounded-full object-cover border-[2px] sm:border-[3px] border-[#292929]"
          />
          <img
            src={dot}
            alt=""
            className="absolute top-[1px] right-[2px] sm:top-[2px] sm:right-[3px] md:top-[3px] md:right-[4px] w-[7px] h-[7px] sm:w-[9px] sm:h-[9px] md:w-[11px] md:h-[11px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
