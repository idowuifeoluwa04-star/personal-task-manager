import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register = () => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await register(firstName, lastName, email, password);
      toast.success("Account created — please log in");
      navigate("/login", { state: { email } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create account.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputWrap = "relative border border-[#B8B6B6] rounded-[10px] px-4 sm:px-[30px] pt-5 pb-3 focus-within:border-[#974FD0]";
  const label = "absolute top-0 left-4 sm:left-[30px] -translate-y-1/2 bg-[#F2E9FB] px-2 font-['Signika_Negative'] font-normal text-[16px] sm:text-[20px] text-[#9C9C9C]";
  const input = "w-full font-['Signika_Negative'] font-normal text-[16px] sm:text-[18px] text-[#292929] placeholder-[#CCCCCC] focus:outline-none";
  const toggle = "absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer";

  return (
    <div className="bg-[#F2E9FB] min-h-screen">
      <Navbar />
      <div className="px-4 md:px-10 xl:px-[100px] 2xl:px-[170px] pt-10 md:pt-16 pb-16 flex justify-center">
        <div className="w-full max-w-[480px]">
          <h1 className="font-['Signika_Negative'] font-medium text-[28px] sm:text-[36px] md:text-[42px] text-[#292929] text-center mb-10">
            Create Account
          </h1>
          <div className="flex flex-col gap-6">
            <div className={inputWrap}>
              <label className={label}>First Name</label>
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={input} />
            </div>
            <div className={inputWrap}>
              <label className={label}>Last Name</label>
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className={input} />
            </div>
            <div className={inputWrap}>
              <label className={label}>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={input} />
            </div>
            <div className={inputWrap}>
              <label className={label}>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${input} pr-14`}
              />
              <span onClick={() => setShowPassword((p) => !p)} className={toggle}>
                {showPassword ? <FiEyeOff size={20} color="#974FD0" /> : <FiEye size={20} color="#974FD0" />}
              </span>
            </div>
            <div className={inputWrap}>
              <label className={label}>Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`${input} pr-14`}
              />
              <span onClick={() => setShowConfirmPassword((p) => !p)} className={toggle}>
                {showConfirmPassword ? <FiEyeOff size={20} color="#974FD0" /> : <FiEye size={20} color="#974FD0" />}
              </span>
            </div>
            {error && (
              <p className="font-['Signika_Negative'] text-[15px] text-[#F38383]">{error}</p>
            )}
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full h-[56px] sm:h-[64px] flex items-center justify-center rounded-[8px] bg-[#974FD0] hover:bg-[#7e3fb0] disabled:opacity-60 cursor-pointer text-[#FAF9FB] font-['Signika_Negative'] font-medium text-[20px] sm:text-[24px]"
            >
              {submitting ? "Creating account..." : "Create Account"}
            </button>
            <p className="text-center font-['Signika_Negative'] text-[15px] sm:text-[17px] text-[#737171]">
              Already have an account?{" "}
              <Link to="/login" className="text-[#974FD0] underline">Log In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
