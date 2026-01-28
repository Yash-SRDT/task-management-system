import { loginReducer } from "./auth/login-slice";
import { registerReducer } from "./auth/register-slice";
import { uiReducer } from "./ui/ui-slice";

const RootReducer = {
  ui: uiReducer,
  login: loginReducer,
  register: registerReducer,
};

export default RootReducer;
