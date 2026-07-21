import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GameCollage from "../components/GameCollage";

function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    date_of_birth: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (formData.password !== formData.password_confirmation) {
      setErrors({ password_confirmation: ["Passwords do not match"] });
      return;
    }
    const { username, email, password, password_confirmation, date_of_birth } = formData;
    const userData = { username, email, password, password_confirmation, date_of_birth };

    register(userData)
      .then(() => {
        sessionStorage.setItem("pending-verification-email", formData.email);
        navigate("/verify-email", { state: { email: formData.email } });
      })
      .catch((err) => {
        if (err.response?.data?.errors) {
          setErrors(err.response.data.errors);
        } else {
          setErrors({
            general: err.response?.data?.message || "Registration failed",
          });
        }
      });
  }

  return (
    <main className="min-h-screen bg-bg text-text font-outfit">
      <div className="grid md:grid-cols-2 min-h-screen">
        {/* Left panel — game collage with logo */}
        <div className="relative hidden md:flex items-center justify-center overflow-hidden bg-bg sticky top-0 h-screen">
          <GameCollage pageSize={20} cols="grid-cols-4" rows="grid-rows-5" />
          <div className="absolute inset-0 bg-bg/60" />
          <div className="relative flex items-center gap-2">
            <svg width="56" height="56" viewBox="0 0 44 44" fill="none">
              <path
                d="M22 3L6 10V22C6 31 13 38.5 22 41C31 38.5 38 31 38 22V10L22 3Z"
                stroke="#C084FC"
                strokeWidth="1.5"
                fill="rgba(124,58,237,0.1)"
              />
              <circle cx="22" cy="21" r="7" stroke="#C084FC" strokeWidth="2" fill="none" />
              <line x1="27" y1="26" x2="31" y2="30" stroke="#C084FC" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span className="logo-text font-orbitron font-bold text-[32px] text-white">
              Quest<span className="text-purple-bright">Log</span>
            </span>
          </div>
        </div>

        {/* Right panel — form */}
        <div className="flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">
            {/* Logo shown only on mobile, since left panel is hidden below md */}
            <div className="mb-8 flex md:hidden flex-col items-center text-center">
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
            </div>

            <div className="mb-8 text-center">
              <h1 className="text-fluid-lg font-bold text-text">
                Create your account
              </h1>
              <p className="mt-2 text-sm text-muted">
                Track, rate, and share your favorite games
              </p>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8">
              <form className="space-y-5 w-full" onSubmit={handleSubmit}>
                {/* Username */}
                <div>
                  <label htmlFor="username" className="mb-2 text-text font-medium text-sm inline-block">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="john_doe"
                    required
                    className="px-3 py-2.5 text-sm text-text rounded-lg bg-surface2 w-full border border-border outline-none focus:border-purple focus:ring-1 focus:ring-purple transition-colors placeholder:text-muted"
                  />
                  {errors.username && (
                    <p className="text-red-400 text-sm mt-1">{errors.username[0]}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="mb-2 text-text font-medium text-sm inline-block">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    required
                    className="px-3 py-2.5 text-sm text-text rounded-lg bg-surface2 w-full border border-border outline-none focus:border-purple focus:ring-1 focus:ring-purple transition-colors placeholder:text-muted"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email[0]}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="mb-2 text-text font-medium text-sm inline-block">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    required
                    autoComplete="new-password"
                    className="px-3 py-2.5 text-sm text-text rounded-lg bg-surface2 w-full border border-border outline-none focus:border-purple focus:ring-1 focus:ring-purple transition-colors placeholder:text-muted"
                  />
                  {errors.password && (
                    <p className="text-red-400 text-sm mt-1">{errors.password[0]}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="password_confirmation" className="mb-2 text-text font-medium text-sm inline-block">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    id="password_confirmation"
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={(e) =>
                      setFormData({ ...formData, password_confirmation: e.target.value })
                    }
                    placeholder="••••••••"
                    required
                    autoComplete="new-password"
                    className="px-3 py-2.5 text-sm text-text rounded-lg bg-surface2 w-full border border-border outline-none focus:border-purple focus:ring-1 focus:ring-purple transition-colors placeholder:text-muted"
                  />
                  {errors.password_confirmation && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.password_confirmation[0]}
                    </p>
                  )}
                </div>

                {/* Date of Birth */}
                <div>
                  <label htmlFor="date_of_birth" className="mb-2 text-text font-medium text-sm inline-block">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="date_of_birth"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                    required
                    className="px-3 py-2.5 text-sm text-text rounded-lg bg-surface2 w-full border border-border outline-none focus:border-purple focus:ring-1 focus:ring-purple transition-colors [color-scheme:dark]"
                  />
                  {errors.date_of_birth && (
                    <p className="text-red-400 text-sm mt-1">{errors.date_of_birth[0]}</p>
                  )}
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start flex-wrap gap-2">
                  <label className="flex items-center group has-[input:checked]:text-text cursor-pointer">
                    <input id="tmc" name="tmc" type="checkbox" required className="sr-only" />
                    <span
                      className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-border bg-surface2 group-has-[input:checked]:bg-purple group-has-[input:checked]:border-purple transition-colors"
                      aria-hidden="true"
                    >
                      <svg
                        className="size-3 text-white opacity-0 group-has-[input:checked]:opacity-100"
                        viewBox="0 0 12 10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M1 5l3 3 7-7" />
                      </svg>
                    </span>
                    <span className="ml-3 text-sm text-muted">I accept the</span>
                  </label>

                  <a
                    href="#"
                    className="ml-1 text-sm font-medium text-purple-mid hover:text-purple-bright transition-colors"
                  >
                    Terms and Conditions
                  </a>
                </div>

                {errors.general && (
                  <p className="text-red-400 text-sm text-center">{errors.general}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 px-3.5 text-sm rounded-lg font-semibold cursor-pointer tracking-wide text-white bg-purple hover:bg-purple-mid transition-colors"
                >
                  Create an account
                </button>
              </form>

              <div className="mt-6 text-muted text-sm text-center">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-purple-mid hover:text-purple-bright font-medium transition-colors"
                >
                  Login here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default RegisterPage;