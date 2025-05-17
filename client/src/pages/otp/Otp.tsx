// pages/Otp.tsx
import React, { useState, useEffect, useRef } from "react";
import Footer from "../../components/Footer";
import { otpverify, resendOtp } from "../../services/otpService";
import { useNavigate } from "react-router-dom";

const OTP_LENGTH = 6;
const RESEND_TIME = 120; // 2 minutes in seconds

const Otp: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [timer, setTimer] = useState(RESEND_TIME);
  const [canResend, setCanResend] = useState(false);
  const inputsRef = useRef<Array<HTMLInputElement | null>>(
    Array(OTP_LENGTH).fill(null)
  );
  const navigate = useNavigate();

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  // Format timer MM:SS
  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Handle input change
  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto focus next input if value entered
      if (value && index < OTP_LENGTH - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  // Handle key press for backspace navigation
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // Handle paste (paste all digits)
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text").slice(0, OTP_LENGTH);
    if (/^\d+$/.test(pastedText)) {
      const newOtp = pastedText.split("");
      while (newOtp.length < OTP_LENGTH) newOtp.push("");
      setOtp(newOtp);
      // Focus last filled or last input
      const lastIndex =
        pastedText.length >= OTP_LENGTH ? OTP_LENGTH - 1 : pastedText.length;
      inputsRef.current[lastIndex]?.focus();
    }
  };

  // Handle resend OTP
  const handleResend = async () => {
    if (!canResend) return;

    const email = localStorage.getItem("email");
    if (!email) {
      alert("Email not found. Please sign up again.");
      navigate("/signup");
      return;
    }

    setOtp(Array(OTP_LENGTH).fill(""));
    setTimer(RESEND_TIME);
    setCanResend(false);
    inputsRef.current[0]?.focus();

    try {
      const response = await resendOtp(email);
      console.log("OTP resent:", response.data);
      alert("OTP resent successfully.");
    } catch (err: any) {
      console.error("Resend OTP failed:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to resend OTP.");
    }
  };

  // Handle submit
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const otpValue = otp.join("");

  if (otp.includes("") || otpValue.length !== OTP_LENGTH) {
    alert("Please enter the complete OTP");
    return;
  }

  const email = localStorage.getItem("email");
  if (!email) {
    alert("Email not found. Please sign up again.");
    navigate("/signup");
    return;
  }

  try {
    const response = await otpverify({email , otp :otpValue  });
    console.log("OTP verified:", response.data);

    alert("OTP verified successfully!");
    navigate("/");
  } catch (err: any) {
    console.error(
      "OTP verification failed:",
      err.response?.data || err.message
    );
    alert(err.response?.data?.message || "Invalid OTP. Please try again.");
  }
};


  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="bg-white p-8 rounded shadow max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">Verify OTP</h2>
          <p className="text-center mb-6 text-gray-600">
            Enter the 6-digit OTP sent to your email or phone
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center space-x-2 mb-6">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className="w-12 h-12 text-center text-xl border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  onPaste={handlePaste}
                  ref={(el) => {
                    inputsRef.current[i] = el;
                  }}
                  autoComplete="one-time-code"
                />
              ))}
            </div>

            <div className="text-center mb-6">
              <p className="text-gray-600">
                Time remaining:{" "}
                <span className="font-mono font-semibold">
                  {formatTimer(timer)}
                </span>
              </p>
              <button
                type="button"
                disabled={!canResend}
                onClick={handleResend}
                className={`mt-2 text-sm font-semibold ${
                  canResend
                    ? "text-blue-600 hover:underline"
                    : "text-gray-400 cursor-not-allowed"
                }`}
              >
                Resend OTP
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold"
            >
              Verify OTP
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Otp;
