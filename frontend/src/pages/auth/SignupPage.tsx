import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import signupIllustration from "../../assets/checklist.png";
import type { AppDispatch, RootState } from "../../store/store";
import { chooseRole, registerUser } from "../../store/auth/register-slice";

type SignupStep = "form" | "role";

const Signup = () => {
  const [localUserId, setLocalUserId] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isLoading, registeredUserId, error } = useSelector((state: RootState) => state.register);

  const [step, setStep] = useState<SignupStep>("form");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  /* ================= HANDLERS ================= */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await dispatch(registerUser(form));

    if (registerUser.fulfilled.match(res)) {
      setLocalUserId(res.payload.userId); // ✅ GUARANTEED
      setStep("role");
    }
  };

  const handleRoleSelect = async (role: "admin" | "user") => {
    if (!localUserId) return;

    console.log("role clicked:", role);

    const res = await dispatch(chooseRole({ userId: localUserId, role }));

    if (chooseRole.fulfilled.match(res)) {
      navigate("/login");
    }
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen flex">
      {/* LEFT ILLUSTRATION (STATIC) */}
      <div className="hidden md:flex w-1/2 bg-[#EEF0FF] items-center justify-center">
        <img src={signupIllustration} alt="Signup Illustration" className="max-w-md" />
      </div>

      {/* RIGHT CONTENT */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-8">
        <div className="w-full max-w-md">
          {/* ================= SIGNUP FORM ================= */}
          {step === "form" && (
            <>
              <h2 className="text-2xl font-semibold mb-1">Create your account</h2>
              <p className="text-sm text-gray-500 mb-6">Get started with task management in seconds.</p>

              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <div>
                  <label className="text-sm">Full name</label>
                  <input
                    name="name"
                    placeholder="Enter your full name"
                    className="w-full mt-1 px-4 py-2 border rounded-lg"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm">Email address</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
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
                  {isLoading ? "Creating..." : "Create Account"}
                </button>
              </form>

              {error && <p className="text-sm text-red-500 mt-4">{error}</p>}

              <p className="text-sm text-center mt-6">
                Already have an account?{" "}
                <span className="text-primary cursor-pointer" onClick={() => navigate("/login")}>
                  Log in
                </span>
              </p>
            </>
          )}

          {/* ================= ROLE SELECTION ================= */}
          {step === "role" && (
            <>
              <h2 className="text-2xl font-semibold mb-2">Choose Your Role</h2>
              <p className="text-sm text-gray-500 mb-8">Select how you want to use the dashboard.</p>

              <div className="space-y-4">
                <button
                  disabled={false}
                  onClick={() => handleRoleSelect("admin")}
                  className="w-full cursor-pointer border rounded-xl p-4 text-left hover:border-primary"
                >
                  <h3 className="font-semibold">Admin</h3>
                  <p className="text-sm text-gray-500">Create, assign and manage tasks</p>
                </button>

                <button
                  disabled={false}
                  onClick={() => handleRoleSelect("user")}
                  className="w-full cursor-pointer border rounded-xl p-4 text-left hover:border-primary"
                >
                  <h3 className="font-semibold">User</h3>
                  <p className="text-sm text-gray-500">View and update assigned tasks</p>
                </button>
              </div>

              {isLoading && <p className="text-sm text-center mt-6">Saving your role...</p>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
