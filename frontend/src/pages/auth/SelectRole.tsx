import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import roleIllustration from "../../assets/checklist.png";
import type { AppDispatch, RootState } from "../../store/store";
import { chooseRole } from "../../store/auth/register-slice";

const SelectRole = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoading } = useSelector((state: RootState) => state.register);

  // userId passed from signup
  const userId: string | undefined = location.state?.userId;

  // Safety check
  if (!userId) {
    navigate("/register");
    return null;
  }

  const handleRoleSelect = async (role: "admin" | "user") => {
    const res = await dispatch(chooseRole({ userId, role }));
    if (chooseRole.fulfilled.match(res)) {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT ILLUSTRATION */}
      <div className="hidden md:flex w-1/2 bg-[#EEF0FF] items-center justify-center">
        <img src={roleIllustration} alt="Role Selection" className="max-w-md" />
      </div>

      {/* RIGHT CONTENT */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-8">
        <div className="w-full max-w-lg">
          <h2 className="text-2xl font-semibold mb-2">Choose Your Role</h2>
          <p className="text-sm text-gray-500 mb-8">
            Select how you want to use the dashboard.
            <br />
            You can’t change this later without admin support.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ADMIN CARD */}
            <div className="border rounded-xl p-6 hover:border-primary transition">
              <h3 className="text-lg font-semibold mb-2">Admin</h3>
              <ul className="text-sm text-gray-500 mb-6 space-y-1">
                <li>• Create, assign & manage tasks</li>
                <li>• View all users</li>
                <li>• Track task progress</li>
              </ul>
              <button
                disabled={isLoading}
                onClick={() => handleRoleSelect("admin")}
                className="w-full bg-primary text-white py-2.5 rounded-lg"
              >
                Continue as Admin
              </button>
            </div>

            {/* USER CARD */}
            <div className="border rounded-xl p-6 hover:border-primary transition">
              <h3 className="text-lg font-semibold mb-2">User</h3>
              <ul className="text-sm text-gray-500 mb-6 space-y-1">
                <li>• View assigned tasks</li>
                <li>• Update task status</li>
                <li>• Track progress</li>
              </ul>
              <button
                disabled={isLoading}
                onClick={() => handleRoleSelect("user")}
                className="w-full border border-primary text-primary py-2.5 rounded-lg"
              >
                Continue as User
              </button>
            </div>
          </div>

          {isLoading && <p className="text-sm text-center mt-6">Saving your role...</p>}
        </div>
      </div>
    </div>
  );
};

export default SelectRole;
