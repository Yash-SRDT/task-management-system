const MyTasksPreview = () => {
  return (
    <div className="bg-white rounded-xl border p-6">
      <h3 className="font-medium mb-1">My Tasks</h3>
      <p className="text-sm text-gray-500 mb-4">Track and update your assigned tasks</p>

      <div className="text-sm text-gray-400">Task table will render here (reuse CustomTable)</div>
    </div>
  );
};

export default MyTasksPreview;
