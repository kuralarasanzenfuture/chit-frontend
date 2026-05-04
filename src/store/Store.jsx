import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../slices/AuthSlice";
import PlanReducer from "../slices/PlanSlice";
import agentAndStaffReducer from "../slices/agentAndStaff";

export const Store = configureStore({
  reducer: {
    userAuth: AuthReducer,
    plans: PlanReducer,
    agentAndStaff: agentAndStaffReducer,
  },
});
