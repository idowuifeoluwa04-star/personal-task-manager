import { useState, useRef, useEffect } from "react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  buttonClassName?: string;
  optionClassName?: string;
}

const CustomSelect = ({
  options,
  value,
  onChange,
  buttonClassName,
  optionClassName,
}: CustomSelectProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? "";

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={
          buttonClassName ??
          "w-full flex items-center justify-between font-['Signika_Negative'] font-medium text-[16px] text-[#974FD0] border border-[#974FD0] rounded-[8px] px-4 py-2 cursor-pointer focus:outline-none"
        }
      >
        {selectedLabel}
        <svg
          className={`w-4 h-4 ml-2 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 right-0 mt-1 bg-white border border-[#974FD0] rounded-[8px] shadow-lg overflow-hidden z-20">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={
                optionClassName
                  ? `${optionClassName} ${option.value === value ? "bg-[#974FD0] text-white" : "text-[#292929] hover:bg-[#F3E8FB]"}`
                  : `px-4 py-2 cursor-pointer font-['Signika_Negative'] text-[15px] ${option.value === value ? "bg-[#974FD0] text-white font-medium" : "text-[#292929] hover:bg-[#F3E8FB]"}`
              }
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
