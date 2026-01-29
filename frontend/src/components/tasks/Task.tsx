import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import CustomTable from "../common/CustomTable";
import { fetchAllTasks } from "../../store/tasks/get-all-tasks-slice";
import { taskColumns } from "../columns/tasks-columns-data";
import type { TaskStatusFilter } from "./StatusFilterTab";
import StatusFilterTabs from "./StatusFilterTab";
import { openModal } from "../../store/ui/ui-slice";
import CreateTask from "./actions/CreateTask";

const Task = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, isLoading } = useSelector((state: RootState) => state.getAllTasks);
  const { isModalOpen, modalActionType, modalEntityType, selectedTaskId } = useSelector((state: RootState) => state.ui);
  const [statusFilter, setStatusFilter] = useState<TaskStatusFilter>("ALL");

  useEffect(() => {
    dispatch(fetchAllTasks());
  }, [dispatch]);

  // ✅ Filtered data (client-side)
  const filteredTasks = useMemo(() => {
    if (statusFilter === "ALL") return tasks;
    return tasks.filter((task) => task.status === statusFilter);
  }, [tasks, statusFilter]);

  const handleCreateModalOpen = () => {
    dispatch(
      openModal({
        actionType: "create",
        entityType: "task",
      }),
    );
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">All Tasks</h1>
          <p className="text-sm text-gray-500">Manage, assign, and track tasks across your team.</p>
        </div>

        <button className="btn btn-primary" onClick={handleCreateModalOpen}>
          Create Task
        </button>
      </div>

      {/* FILTER TABS */}
      <StatusFilterTabs value={statusFilter} onChange={setStatusFilter} />

      {/* TABLE */}
      <CustomTable columns={taskColumns} data={filteredTasks} isLoading={isLoading} emptyMessage="No tasks found" />

      {isModalOpen && modalActionType === "create" && modalEntityType === "task" && <CreateTask />}
    </div>
  );
};

export default Task;
