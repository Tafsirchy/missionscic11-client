import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import Loading from "../Components/Loading";
import register from "../assets/register.jpg";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

const Register = () => {
  const { createUser, setUser, handleGoogleSignIn, updateUser } =
    useContext(AuthContext);

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo;
    const email = form.email.value;
    const password = form.password.value;
    const file = photo.files[0];
    console.log(file);

    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;

    if (password.length < 6) {
      setError("Password must be 6 characters long");
      return;
    }
    if (!uppercase.test(password)) {
      setError("Password must contain at least one uppercase letter");
      return;
    }
    if (!lowercase.test(password)) {
      setError("Password must contain at least one lowercase letter");
      return;
    }

    setLoading(true);

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=8e77ac3eea553e979eb569aacc9010ac`,
      { image: file },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(res.data);
    // return;

    const mainPhotoUrl = res.data.data.display_url;

    const formData = {
      name,
      email,
      password,
      mainPhotoUrl,
    };

    if (res.data.success == true) {
      createUser(email, password)
        .then((result) => {
          console.log(result);
          return updateUser({
            displayName: name,
            photoURL: mainPhotoUrl,
          });
        })
        .then(() => {
          axios.post("http://localhost:5000/users", formData)
          .then ((res) => {
            console.log(res.data);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          })
          toast.success("Sign Up Successful");
          navigate("/");
        })
        .catch((err) => {
          setLoading(false);

          if (err.code === "auth/email-already-in-use") {
            toast.error("Email already in Use");
          } else {
            setError(err.message);
          }
        });
    }

    // return;
  };

  const googleSignUp = () => {
    setLoading(true);

    handleGoogleSignIn()
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  // {
  //   loading && (
  //     <div className="min-h-screen flex justify-center items-center">
  //       <Loading></Loading>
  //     </div>
  //   );
  // }

  const renderLoadingSpinner = (
    <div className="flex justify-center items-center">
      <Loading></Loading>
    </div>
  );

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-gray-700 to-blue-900">
          <img
            src={register}
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-white text-center">
            <h1 className="text-5xl font-bold mb-4">Build Better Habits</h1>
            <p className="text-xl opacity-90">
              Track your progress, achieve your goals
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-5xl font-bold text-[#A3B18A]  mb-2">Sign Up</h2>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-purple-500 outline-none transition-colors bg-transparent"
                placeholder="Name..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Email
              </label>
              <input
                name="email"
                type="email"
                className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-purple-500 outline-none transition-colors bg-transparent"
                placeholder="Email address..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Photo URL
              </label>
              <input
                name="photo"
                type="file"
                className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-purple-500 outline-none transition-colors bg-transparent"
                placeholder="Photo URL..."
                required
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Password
              </label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 pr-12 border-b-2 border-gray-200 focus:border-purple-500 outline-none transition-colors bg-transparent"
                placeholder="************"
                onChange={() => setError("")}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-11 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-full  bg-gradient-to-r from-[#234C6A] to-[#1B3C53] text-white font-semibold hover:from-[]#1B3C53 hover:to-[#1B3C5390] transition-all shadow-lg mt-6"
              disabled={loading}
            >
              {loading ? renderLoadingSpinner : "Sign Up"}
            </button>

            <button
              type="button"
              onClick={googleSignUp}
              className="w-full py-3 px-6 rounded-full bg-white border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
            >
              <svg
                aria-label="Google logo"
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Continue with Google
            </button>

            <div className="text-center mt-6">
              <p className="text-gray-600 text-sm">
                Already Have an Account?{" "}
                <Link
                  to="/auth/login"
                  className="text-purple-600 font-semibold hover:underline"
                >
                  Sign in →
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
