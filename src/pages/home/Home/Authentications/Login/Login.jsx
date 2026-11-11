import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaHandsHelping, FaStore, FaUser, FaUserShield } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";

import toast from "react-hot-toast";
import useAuth from "../../../../../hooks/useAuth";
import SocialLogin from "./SocialLogin";
import { Helmet } from "react-helmet-async";

const demoRoles = [
  {
    role: "admin",
    label: "Continue as Admin",
    description: "Explore platform management tools.",
    icon: <FaUserShield className="text-xl" />,
  },
  {
    role: "restaurant",
    label: "Continue as Restaurant",
    description: "Explore food donation management.",
    icon: <FaStore className="text-xl" />,
  },
  {
    role: "charity",
    label: "Continue as Charity",
    description: "Explore donation discovery and requests.",
    icon: <FaHandsHelping className="text-xl" />,
  },
  {
    role: "user",
    label: "Continue as Individual",
    description: "Explore individual user features.",
    icon: <FaUser className="text-xl" />,
  },
];

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn, signInWithDemoToken, resetPassword, logOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(null);
  const [forgotMode, setForgotMode] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await signIn(data.email, data.password);
      toast.success("Welcome back to MealGiver!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!resetEmail) {
      toast.error("Please enter your email for password reset.");
      return;
    }
    try {
      setResetLoading(true);
      await resetPassword(resetEmail);
      toast.success("Password reset email sent. Please check your inbox.");
      setForgotMode(false);
      setResetEmail("");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to send reset email.");
    } finally {
      setResetLoading(false);
    }
  };

  const handleDemoLogin = async (role) => {
    try {
      setDemoLoading(role);
      const apiBase = import.meta.env.VITE_API_BASE_URL?.trim();
      if (!apiBase) {
        throw new Error(
          "The API URL is not configured. Set VITE_API_BASE_URL and rebuild the client.",
        );
      }

      const response = await fetch(`${apiBase.replace(/\/$/, "")}/demo-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });

      const contentType = response.headers.get("content-type") || "";
      const payload = contentType.includes("application/json")
        ? await response.json()
        : null;
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(
            "The API does not have the demo-login route yet. Deploy the latest backend and try again.",
          );
        }
        throw new Error(
          payload?.message ||
            `Demo login request failed (HTTP ${response.status}). Check the API deployment and server configuration.`,
        );
      }
      if (!payload || typeof payload !== "object") {
        throw new Error(
          "The configured API returned an invalid response. Check VITE_API_BASE_URL.",
        );
      }

      if (payload.role !== role || typeof payload.token !== "string") {
        throw new Error("The server returned an invalid demo account.");
      }

      const credential = await signInWithDemoToken(payload.token);
      const { claims } = await credential.user.getIdTokenResult();
      if (claims.demo !== true || claims.role !== role) {
        await logOut();
        throw new Error("The demo account role could not be verified.");
      }

      toast.success(`Demo login successful for ${role}.`);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Demo login failed:", error);
      toast.error(
        error instanceof TypeError
          ? "Cannot reach the API. Check VITE_API_BASE_URL and confirm the backend is deployed."
          : error.message || "Demo login failed.",
      );
    } finally {
      setDemoLoading(null);
    }
  };

  return (
    <>
      <Helmet>
        <title>MealGiver | Login</title>
      </Helmet>
      <div
        data-aos="fade-up"
        className="card max-w-md mx-auto px-4 pb-3 md:shadow-md bg-white"
      >
        <h2 className="md:text-2xl text-base text-nowrap font-bold text-center mt-4 text-primary">
          {forgotMode ? "Reset Your Password" : "Access your account"}
        </h2>

        {!forgotMode ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            {/* Email */}
            <div>
              <label
                className="label text-gray-500 font-medium"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email address",
                  },
                })}
                className={`input input-bordered w-full ${
                  errors.email ? "input-error" : ""
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                className="label text-gray-500 font-medium"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className={`input input-bordered w-full pr-10 ${
                    errors.password ? "input-error" : ""
                  }`}
                  placeholder="Enter your password"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-lg text-gray-500"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => setForgotMode(true)}
                className="link text-gray-500 link-hover text-sm"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary text-white w-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Register Link */}
            <p className="text-sm text-gray-500 text-center mt-4">
              Don’t have an account?{" "}
              <Link
                state={{ from }}
                to="/register"
                className="text-primary font-medium hover:underline"
              >
                Create one
              </Link>
            </p>
          </form>
        ) : (
          <div className="space-y-4">
            <p className="text-center text-sm text-gray-500">
              Enter your email and we’ll send a link to reset your password.
            </p>

            <div>
              <label
                className="label text-sm font-medium text-gray-700"
                htmlFor="resetEmail"
              >
                Email Address
              </label>
              <input
                id="resetEmail"
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="you@example.com"
                className="input input-bordered w-full"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-3 mt-4">
              <button
                onClick={handleResetPassword}
                disabled={resetLoading}
                className="btn btn-primary text-white w-full sm:w-auto"
              >
                {resetLoading ? "Sending..." : "Send Reset Email"}
              </button>
              <button
                onClick={() => setForgotMode(false)}
                disabled={resetLoading}
                className="btn btn-outline w-full text-black hover:text-accent sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="my-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-500/20 dark:bg-emerald-900/10">
          <h3 className="text-center text-lg font-bold text-primary">
            Explore MealGiver – Demo Access
          </h3>
          <p className="mt-2 text-center text-sm">
            Choose an account type and explore the platform instantly. No
            registration required.
          </p>
          <div className="mt-4 grid gap-3">
            {demoRoles.map(({ role, label, description, icon }) => (
              <button
                key={role}
                type="button"
                onClick={() => handleDemoLogin(role)}
                disabled={demoLoading !== null}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 text-left transition hover:border-primary hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-70 dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {icon}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-800 dark:text-slate-100">
                    {label}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">
                    {description}
                  </div>
                </div>
                <span className="text-sm font-medium text-primary">
                  {demoLoading === role ? "Loading..." : "Open"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Social Login */}
        <div className="mb-2">
          <SocialLogin />
        </div>
      </div>
    </>
  );
};

export default Login;
