import QuickActions from "../../components/dashboard/QuickActions";
import StatsCards from "../../components/dashboard/StatsCards";

const AdminDashboard = () => {
  const stats = [
    {
      label: "Total Tasks",
      value: 24,
      color: "blue",
      bg: "#5A6DFE, #EEF0FF",
    },
    {
      label: "Pending Tasks",
      value: 10,
      color: "orange",
      bg: "#FDBA74, #FFF7ED",
    },
    {
      label: "In Progress Tasks",
      value: 14,
      color: "purple",
      bg: "#C084FC, #F5F3FF",
    },
    {
      label: "Completed Tasks",
      value: 14,
      color: "green",
      bg: "#4ADE80, #ECFDF5",
    },
  ];

  return (
    <div className="space-y-10">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <StatsCards stats={stats} />

      <QuickActions />
    </div>
  );
};

export default AdminDashboard;
