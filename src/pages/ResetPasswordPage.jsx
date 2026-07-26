import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLibrary } from "../context/LibraryContext";

function ResetPasswordPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const { showToast } = useLibrary();
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");
  const [formData, setFormData] = useState({
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});
  const [email] = useState(() => {
    return (
      location.state?.email || sessionStorage.getItem("pending-reset") || null
    );
  });
    useEffect(() => {
      if (!email) {
        navigate("/forgot-password", { replace: true });
      }
    }, [email, navigate]);

    if (!email) {
      return null;
    }
  // Handle text changes for all inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (!code.trim() || code.length !== 6 || isNaN(code)) {
      setErrors({ token: ["Please enter a valid 6-digit code"] });
      return;
    }

    setErrors({});
    setStep(2);
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (formData.password !== formData.password_confirmation) {
      setErrors({ password_confirmation: ["Passwords do not match"] });
      return;
    }
    resetPassword(
      email,
      code,
      formData.password,
      formData.password_confirmation,
    )
      .then(() => {
        sessionStorage.removeItem("pending-reset", email);
        showToast("Password reset successful. Please log in.");
        navigate("/login");
      })
      .catch((err) => {
        if (err.response?.data?.errors) {
          setErrors(err.response.data.errors);
        } else {
          setErrors({
            general: err.response?.data?.message || "Reset password failed",
          });
        }
      });
  }
  return (
    <main className="min-h-screen bg-bg text-text font-outfit flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Top Heading Section */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-xl bg-purple text-white shadow-md shadow-purple-bright dark:shadow-none">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-3.818l5.73-5.73a.484.484 0 0 1 .43-.164.505.505 0 0 1 .43-.164m6-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
            />
          </svg>
        </div>

        <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-text">
          {step === 1 ? "Verify Token" : "Set New Password"}
        </h2>
        <p className="mt-2 text-center text-sm text-muted">
          {step === 1
            ? "Enter the verification token sent to your device."
            : "Please choose a strong security credential below."}
        </p>
      </div>

      {/* Main Card Container */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-surface py-8 px-4 shadow sm:rounded-xl sm:px-10 border border-border">
          {/* STEP 1: TOKEN INPUT FORM */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-6">
              <div>
                <label
                  htmlFor="token"
                  className="block text-sm font-medium text-text "
                >
                  Secure Token
                </label>
                <div className="mt-2">
                  <input
                    id="token"
                    name="token"
                    type="text"
                    maxLength={6}
                    required
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                    }}
                    className="block w-full px-4 py-3 rounded-lg bg-surface2 border border-border text-text placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple focus:border-purple transition-colors duration-150 ease-in-out sm:text-sm"
                    placeholder="Enter reset code"
                  />
                  {errors.token && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.token[0]}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-purple hover:bg-purple-mid transition-colors duration-150 ease-in-out"
                >
                  Continue
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: PASSWORD CREATION FORM */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-text"
                >
                  New Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 rounded-lg bg-surface2 border border-border text-text placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple focus:border-purple transition-colors duration-150 ease-in-out sm:text-sm"
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.password[0]}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-text"
                >
                  Confirm New Password
                </label>
                <div className="mt-2">
                  <input
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    required
                    value={formData.password_confirmation}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 rounded-lg bg-surface2 border border-border text-text placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple focus:border-purple transition-colors duration-150 ease-in-out sm:text-sm"
                    placeholder="••••••••"
                  />
                </div>
                {errors.password_confirmation && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.password_confirmation[0]}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-sm font-medium text-muted hover:text-purple transition-colors duration-200 cursor-pointer"
                >
                  Back to token
                </button>

                <button
                  type="submit"
                  className="inline-flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-purple hover:bg-purple-bright focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-mid transition-colors duration-200 cursor-pointer"
                >
                  Save Password
                </button>
              </div>
            </form>
          )}

          {/* Core Footer Layout Marker */}
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center text-sm font-medium  text-purple-mid hover:text-purple-bright transition-colors duration-150 ease-in-out"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
              Cancel and return to sign in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ResetPasswordPage;
