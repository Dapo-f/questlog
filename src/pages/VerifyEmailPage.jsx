import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLibrary } from "../context/LibraryContext";

function VerifyEmailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [resendMessage, setResendMessage] = useState("");
  const { verifyEmail, resendCode } = useAuth();
  const { showToast } = useLibrary();
  const [errors, setErrors] = useState({});
  const [email] = useState(() => {
    return (
      location.state?.email ||
      sessionStorage.getItem("pending-verification-email") ||
      null
    );
  });
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  useEffect(() => {
    if (!email) {
      navigate("/register", { replace: true });
    }
  }, [email, navigate]);

  if (!email) {
    return null;
  }

  const handleChange = (e, index) => {
    const value = e.value;
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.substring(value.length - 1);
    setCode(newCode);

    if (value && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      const newCode = pastedData.split("");
      setCode(newCode);
      inputRefs[5].current.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    const finalCode = code.join("");
    verifyEmail(email, finalCode)
      .then(() => {
        sessionStorage.removeItem("pending-verification-email");
        showToast("Email verified successfully!");
        navigate("/library");
      })
      .catch((err) => {
        if (err.response?.data?.errors) {
          setErrors(err.response.data.errors);
        } else {
          setErrors({
            general: err.response?.data?.message || "Verification failed",
          });
        }
      });
  }

  function handleResend() {
    resendCode(email)
      .then(() => setResendMessage("A new code has been sent to your email."))
      .catch(() =>
        setResendMessage("Failed to resend code. Please try again."),
      );
  }

  return (
    <main className="min-h-screen bg-bg text-text font-outfit flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-6">
            <svg width="32" height="32" viewBox="0 0 44 44" fill="none">
              <path
                d="M22 3L6 10V22C6 31 13 38.5 22 41C31 38.5 38 31 38 22V10L22 3Z"
                stroke="#C084FC"
                strokeWidth="1.5"
                fill="rgba(124,58,237,0.1)"
              />
              <circle cx="22" cy="21" r="7" stroke="#C084FC" strokeWidth="2" fill="none" />
              <line x1="27" y1="26" x2="31" y2="30" stroke="#C084FC" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span className="logo-text font-orbitron font-bold text-[18px] text-white">
              Quest<span className="text-purple-bright">Log</span>
            </span>
          </div>

          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-purple/10 border border-purple/30 mb-4">
            <svg
              className="h-6 w-6 text-purple-bright"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
          </div>

          <h2 className="text-fluid-lg font-bold text-text">
            Verify your email
          </h2>
          <p className="mt-2 text-sm text-muted">
            We sent a 6-digit code to{" "}
            <span className="font-medium text-text">{email}</span>
          </p>
        </div>

        {errors.general && (
          <p className="text-red-400 text-sm text-center mb-4">{errors.general}</p>
        )}

        <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-text text-center mb-4">
                Enter your verification code
              </label>

              <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                {code.map((digit, index) => (
                  <div key={index} className="w-12 h-12">
                    <input
                      ref={inputRefs[index]}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(e.target, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      className="w-12 h-12 text-center text-2xl font-bold bg-surface2 border border-border rounded-lg outline-none focus:border-purple focus:ring-1 focus:ring-purple transition-colors text-text"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-lg text-sm font-semibold text-white bg-purple hover:bg-purple-mid transition-colors"
            >
              Verify Account
            </button>
          </form>

          <div className="mt-6 flex flex-col items-center space-y-2 text-sm">
            <p className="text-muted">Didn't receive the code?</p>
            <button
              type="button"
              className="font-medium text-purple-mid hover:text-purple-bright transition-colors"
              onClick={handleResend}
            >
              Resend code
            </button>
            {resendMessage && (
              <p className="text-sm text-muted">{resendMessage}</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default VerifyEmailPage;