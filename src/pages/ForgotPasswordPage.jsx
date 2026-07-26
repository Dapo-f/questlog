import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLibrary } from "../context/LibraryContext";

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { forgotPassword } = useAuth();
  const { showToast } = useLibrary();
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    forgotPassword(email)
      .then(() => {
        showToast("A reset code has been sent to your email.");
        sessionStorage.setItem("pending-reset", email);
        navigate("/reset-password", { state: { email: email } });
      })
      .catch((err) => {
        if (err.response?.data?.errors) {
          setErrors(err.response.data.errors);
        } else {
          setErrors({
            general: err.response?.data?.message || "Forgot Password Failed",
          });
        }
      });
  }
  return (
    <main className="min-h-screen bg-bg text-text font-outfit flex flex-col items-center justify-center px-4 py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* <!-- Icon Container --> */}
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-surface2 border-border">
          <svg
            className="h-6 w-6 text-purple-bright"
            xmlns="http://w3.org"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
            />
          </svg>
        </div>

        {/* <!-- Header Text --> */}
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white tracking-tight">
          Forgot password?
        </h2>
        <p className="mt-2 text-center text-sm text-muted">
          No worries, we'll send you reset instructions.
        </p>
      </div>

      {errors.general && (
        <p className="mt-2 text-red-400 text-sm text-center">
          {errors.general}
        </p>
      )}

      {/* <!-- Form Card --> */}
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-surface border border-border py-8 px-4 shadow-xl shadow-surface sm:rounded-xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text"
              >
                Email address
              </label>
              <div className="mt-2 relative rounded-md shadow-sm">
                {/* <!-- Input Field --> */}
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  className="block w-full px-4 py-3 rounded-lg bg-surface2 border border-border text-text placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple focus:border-purple transition-colors duration-150 ease-in-out sm:text-sm"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email[0]}</p>
                )}
              </div>
            </div>

            <div>
              {/* <!-- Submit Button --> */}
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-purple hover:bg-purple-mid transition-colors duration-150 ease-in-out"
              >
                Reset password
              </button>
            </div>
          </form>

          {/* <!-- Bottom Navigation Link --> */}
          <div className="mt-4">
            <div className="flex items-center justify-center">
              <Link
                to={"/login"}
                className="inline-flex items-center text-sm font-medium  text-purple-mid hover:text-purple-bright transition-colors duration-150 ease-in-out"
              >
                <svg
                  className="mr-2 h-4 w-4"
                  xmlns="http://w3.org"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>
                Back to log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ForgotPasswordPage;
