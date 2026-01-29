import MyTasksPreview from "../../components/dashboard/MyTasksPreview";
import StatsCards from "../../components/dashboard/StatsCards";

const UserDashboard = () => {
  const stats = [
    {
      label: "My Tasks",
      value: 10,
      bg: "#5A6DFE, #EEF0FF",
    },
    {
      label: "Pending Tasks",
      value: 5,
      bg: "#FDBA74, #FFF7ED",
    },
    {
      label: "In Progress",
      value: 2,
      bg: "#C084FC, #F5F3FF",
    },
    {
      label: "Completed Tasks",
      value: 2,
      bg: "#4ADE80, #ECFDF5",
    },
  ];

  return (
    <div className="space-y-10">
      <StatsCards stats={stats} />
      <MyTasksPreview />
    </div>
  );
};

export default UserDashboard;
