import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../slices/AuthSlice";
import PlanReducer from "../slices/PlanSlice";
import agentAndStaffReducer from "../slices/agentAndStaff";
import CustomerReducer from "../slices/CustomerSlice";

export const Store = configureStore({
  reducer: {
    userAuth: AuthReducer,
    plans: PlanReducer,
    customer: CustomerReducer,
    agentAndStaff: agentAndStaffReducer,
  },
});
