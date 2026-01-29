import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import type { AppDispatch, RootState } from "../../../store/store";

import { closeModal } from "../../../store/ui/ui-slice";
import { createTask, resetCreateTaskState } from "../../../store/tasks/create-task-slice";
import { fetchAllTasks } from "../../../store/tasks/get-all-tasks-slice";
import { getAllUsers } from "../../../store/users/get-all-users-slice";

import CustomModal from "../../common/CustomModal";
import TaskForm from "../TaskForm";

import { taskFormFields, taskInitialValues, taskValidationSchema } from "../../../data/task/task-data";

const CreateTask = () => {
  const dispatch = useDispatch<AppDispatch>();

  /* ================= UI STATE ================= */
  const { isModalOpen, modalActionType, modalEntityType } = useSelector((state: RootState) => state.ui);

  /* ================= TASK CREATE STATE ================= */
  const { isLoading, isSuccess } = useSelector((state: RootState) => state.createTask);

  /* ================= USERS STATE ================= */
  const { users, isLoading: loadingAllUsers } = useSelector((state: RootState) => state.getAllUsers);

  const isOpen = isModalOpen && modalActionType === "create" && modalEntityType === "task";

  /* ================= FETCH USERS ON MODAL OPEN ================= */
  useEffect(() => {
    if (isOpen && users.length === 0) {
      dispatch(getAllUsers());
    }
  }, [isOpen, users.length, dispatch]);

  /* ================= HANDLE SUBMIT ================= */
  const handleCreateTaskSubmit = (values: any) => {
    dispatch(createTask(values));
  };

  /* ================= CLOSE MODAL ON SUCCESS ================= */
  useEffect(() => {
    if (isSuccess) {
      dispatch(fetchAllTasks());
      dispatch(closeModal());
      dispatch(resetCreateTaskState());
    }
  }, [isSuccess, dispatch]);

  /* ================= SELECT OPTIONS ================= */
  const assignedUserOptions = users.map((user) => ({
    label: user.name,
    value: user.id,
  }));

  return (
    <CustomModal
      open={isOpen}
      title="Create Task"
      confirmText={isLoading || loadingAllUsers ? "Please wait..." : "Create Task"}
      onClose={() => dispatch(closeModal())}
      onConfirm={() => {
        if (loadingAllUsers) return; // ⛔ block submit
        document.querySelector("form")?.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
      }}
    >
      <TaskForm
        initialValues={taskInitialValues}
        validationSchema={taskValidationSchema}
        fields={taskFormFields}
        selectOptions={{
          assignedTo: assignedUserOptions,
        }}
        onSubmit={handleCreateTaskSubmit}
      />
    </CustomModal>
  );
};

export default CreateTask;
