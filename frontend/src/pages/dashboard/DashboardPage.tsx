import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

const DashboardPage = () => {
  const { user } = useSelector((state: RootState) => state.userDetails);

  if (!user) return null;

  return user.role === "admin" ? <AdminDashboard /> : <UserDashboard />;
};

export default DashboardPage;
