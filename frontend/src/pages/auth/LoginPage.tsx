import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import loginIllustration from "../../assets/checklist.png";
import type { AppDispatch, RootState } from "../../store/store";
import { loginUser } from "../../store/auth/login-slice";
import { login } from "../../store/auth/auth-slice";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isLoading, error } = useSelector((state: RootState) => state.login);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(loginUser(form))
      .unwrap()
      .then((res) => {
        // store token + expiration (same as HRMS)
        const expirationTime = Date.now() + 2 * 60 * 60 * 1000; // 2 hours

        dispatch(
          login({
            token: res.token,
            expirationTime,
          }),
        );
        navigate("/");
      })
      .catch(() => {
        // error already handled in slice + toast
      });
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-[#EEF0FF] items-center justify-center">
        <img src={loginIllustration} alt="Login Illustration" className="max-w-md" />
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-1">Welcome back 👋</h2>
          <p className="text-sm text-gray-500 mb-6">Please enter your details to sign in.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm">Email address</label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full mt-1 px-4 py-2 border rounded-lg"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="text-sm">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                className="w-full mt-1 px-4 py-2 border rounded-lg"
                onChange={handleChange}
                required
              />
            </div>

            <button disabled={isLoading} className="w-full bg-primary text-white py-2.5 rounded-lg mt-4">
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {error && <p className="text-sm text-red-500 mt-4">{error}</p>}

          <p className="text-sm text-center mt-6">
            Don’t have an account?{" "}
            <span className="text-primary cursor-pointer" onClick={() => navigate("/register")}>
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
