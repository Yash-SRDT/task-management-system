import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h3 className="text-sm font-medium mb-4">Quick actions</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div onClick={() => navigate("/tasks")} className="cursor-pointer bg-white border rounded-xl p-6 hover:shadow">
          <h4 className="font-medium">All tasks</h4>
          <p className="text-sm text-gray-500">View and manage all posted tasks</p>
        </div>

        <div
          onClick={() => navigate("/tasks/create")}
          className="cursor-pointer bg-white border rounded-xl p-6 hover:shadow"
        >
          <h4 className="font-medium">Create Task</h4>
          <p className="text-sm text-gray-500">Create new task and post</p>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
