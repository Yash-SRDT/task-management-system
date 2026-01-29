import { authReducer } from "./auth/auth-slice";
import { userReducer } from "./auth/get-loggedIn-user-details-slice";
import { loginReducer } from "./auth/login-slice";
import { registerReducer } from "./auth/register-slice";
import { createTaskReducer } from "./tasks/create-task-slice";
import { getAllTasksReducer } from "./tasks/get-all-tasks-slice";
import { uiReducer } from "./ui/ui-slice";
import { getAllUsersReducer } from "./users/get-all-users-slice";

const RootReducer = {
  ui: uiReducer,
  auth: authReducer,

  login: loginReducer,
  register: registerReducer,
  userDetails: userReducer,

  getAllUsers: getAllUsersReducer,

  getAllTasks: getAllTasksReducer,
  createTask: createTaskReducer,
};

export default RootReducer;
