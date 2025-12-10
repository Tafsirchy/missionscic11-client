import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import login from "../assets/login.jpeg";
import Loading from "../Components/Loading";
import { CheckCircle, Eye, EyeOff, Lock, Mail } from "lucide-react";


const Login = () => {
  const { signIn, handleGoogleSignIn, setUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target; 
    const email = form.email.value;
    const password = form.password.value;

    setError("");
    setLoading(true);

    signIn(email, password)
      .then(() => {
        toast.success("Login successfully");
        form.reset();
        navigate(location.state || "/");
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          setError("Incorrect password. Please try again.");
        } else if (error.code === "auth/user-not-found") {
          setError("No account found with this email.");
        } else if (error.code === "auth/invalid-email") {
          setError("Invalid email format.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      })
      .finally(() => setLoading(false));
  };

  const googleSignIn = () => {
    setLoading(true);

    handleGoogleSignIn()
      .then(() => {
        navigate(location.state || "/");
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }


  const handleForgetPass = () => {
    navigate(`/forgetPass/${email}`);
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-gray-900 to-blue-900]">
          <img
            src={login}
            alt="Productivity and Habits"
            className="w-full h-full object-cover opacity-70"
          />
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 w-full">
          <div className="text-center max-w-md">
            <div className="flex items-center justify-center mb-6">
              <CheckCircle className="w-16 h-16 mb-2" strokeWidth={2} />
            </div>
            <h1
              className="font-bold text-5xl mb-4"
              style={{ fontFamily: "cursive" }}
            >
              Habit Tracker
            </h1>
            <p className="text-lg leading-relaxed">
              Build better habits, one day at a time. Track your progress and
              achieve your goals with consistency.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-20 flex items-end justify-around px-8 pb-4">
          <CheckCircle className="w-12 h-12" />
          <CheckCircle className="w-16 h-16" />
          <CheckCircle className="w-10 h-10" />
          <CheckCircle className="w-14 h-14" />
          <CheckCircle className="w-12 h-12" />
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <CheckCircle className="w-8 h-8 text-[#1B3C53]" />
              <div className="w-16 h-0.5 border-t-2 border-dotted border-[#1B3C53]"></div>
            </div>
            <h1 className="text-5xl font-bold text-[#A3B18A]  mb-2">Welcome</h1>
            <p className="text-gray-500 text-sm">Login with Email</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-[#1B3C53] mb-2 uppercase tracking-wider">
                Email Id
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  name="email"
                  type="email"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#1B3C53] focus:outline-none transition-colors"
                  placeholder="John@mail.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1B3C53] mb-2 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-12 pr-12 py-3 rounded-lg border-2 border-gray-200 focus:border-[#1B3C53] focus:outline-none transition-colors"
                  placeholder="****************"
                  onChange={() => setError("")}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <Eye className="w-5 h-5" />
                  ) : (
                    <EyeOff className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={handleForgetPass}
                className="text-sm text-red-500 hover:text-red-600 transition-colors font-medium"
              >
                Forgot your password?
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#234C6A] to-[#1B3C53] text-white font-semibold py-3 rounded-lg transition-colors shadow-md hover:shadow-lg hover:from-[#A3B18A] hover:to-[#234C6A]"
            >
              LOGIN
            </button>
          </form>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gray-50 px-4 text-sm text-gray-500">OR</span>
            </div>
          </div>

          <button
            type="button"
            onClick={googleSignIn}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-lg py-3 transition-colors"
          >
            <svg
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path fill="#fff" d="M0 0h512v512H0" />
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              />
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              />
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              />
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              />
            </svg>

            <span className="font-medium text-gray-700">
              Continue with Google
            </span>
          </button>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/auth/register"
                className="text-[#1B3C53] hover:text-[#1B3C5390] font-semibold hover:underline"
              >
                Register Now
              </Link>
            </p>
          </div>

          <div className="lg:hidden mt-8 flex justify-center gap-4 opacity-10">
            <CheckCircle className="w-8 h-8 text-[#1B3C53]" />
            <CheckCircle className="w-10 h-10 text-[#1B3C53]" />
            <CheckCircle className="w-8 h-8 text-[#1B3C53]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
