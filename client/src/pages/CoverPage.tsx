import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import illustration from "../assets/cover-illustration.svg";

const CoverPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-10 xl:px-[100px] 2xl:px-[170px] pt-10 md:pt-[60px] xl:pt-[81px] gap-8 md:gap-10">
        <div className="contents md:flex md:flex-col md:gap-[21px] md:max-w-[535px]">
          <div className="order-1 flex flex-col gap-4 sm:gap-5 md:gap-[21px] text-center md:text-left">
            <h1 className="font-['Signika_Negative'] font-medium text-[28px] sm:text-[36px] md:text-[50px] leading-[110%] md:leading-[100%] text-[#292929]">
              Manage your Tasks on{" "}
              <span className="block text-[#974FD0]">TaskDuty</span>
            </h1>
            <p className="font-['Signika_Negative'] font-normal text-[16px] sm:text-[18px] md:text-[24px] leading-[140%] md:leading-[100%] text-[#737171]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non
              tellus, sapien, morbi ante nunc euismod ac felis ac. Massa et, at
              platea tempus duis non eget. Hendrerit tortor fermentum bibendum
              mi nisl semper porttitor. Nec accumsan.
            </p>
          </div>
          <button
            onClick={() => navigate("/my-tasks")}
            className="order-3 w-full sm:w-fit mx-auto md:mx-0 rounded-[8px] bg-[#974FD0] hover:bg-[#7e3fb0] cursor-pointer text-[#FAF9FB] font-medium text-[16px] sm:text-[18px] md:text-[24px] px-[20px] py-[10px] md:px-[25px]"
          >
            Go to My Tasks
          </button>
        </div>
        <img
          src={illustration}
          alt="Task management illustration"
          className="order-2 w-[220px] h-[208px] sm:w-[320px] sm:h-[303px] md:w-[418.56px] md:h-[396.2px]"
        />
      </div>
    </div>
  );
};

export default CoverPage;
