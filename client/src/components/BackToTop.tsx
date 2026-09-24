import { useState, useEffect } from "react";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 w-[50px] h-[50px] rounded-full bg-[#974FD0] hover:bg-[#7e3fb0] text-white text-[24px] flex items-center justify-center shadow-lg cursor-pointer"
    >
      ↑
    </button>
  );
};

export default BackToTop;
