import React, { useState } from "react";
import { Sidebar } from "./components/sidebar/Sidebar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Topbar } from "./components/topbar/Topbar";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { ChitPlans } from "./pages/chit-plans/ChitPlans";
import { ChitGroup } from "./pages/chit-groups/ChitGroup";
import { ChitGroupList } from "./pages/chit-groups/ChitGroupList";
import { ChitCustomer } from "./pages/chit-customers/ChitCustomer";
import { ChitAuction } from "./pages/chit-auction/ChitAuction";
import { ChitCustomerDetail } from "./pages/chit-customers/ChitCustomerDetail";
import { ChitAuctionList } from "./pages/chit-auction/ChitAuctionList";
import { ChitAuctionDetail } from "./pages/chit-auction/ChitAuctionDetail";
import { ChitPayments } from "./pages/chit-payments/ChitPayments";
import { ChitPaymentList } from "./pages/chit-payments/ChitPaymentList";
import { Notifications } from "./components/notification/Notifications";
import { ProfileEdit } from "./components/settings/ProfileEdit";
import CollectionReport from "./pages/report/CollectionReport";
import GroupReport from "./pages/report/GroupReport";
import { GSTDashboard } from "./pages/chit-gst/GstDashboard";
import { AgentStaffLayout } from "./pages/chit-agent-staff/AgentStaffLayout";
import { AgentStaffList } from "./pages/chit-agent-staff/AgentStaffList";
import { AgentDetail } from "./pages/chit-agent-staff/AgentDetail";
import { DailyCollection } from "./pages/chit-payments/DailyCollection";
import { PendingReminders } from "./pages/chit-payments/PendingReminders";
import { AuditLogs } from "./pages/audit-logs/AuditLogs";
import { Login } from "./pages/Login";
import { ProtectedRoutes } from "./routes/ProtectedRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const DashboardLayout = ({ collapsed, setCollapsed }) => {
  return (
    <>
      <div className="app_layout">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

        <div className={`dashboard_main ${collapsed ? "collapsed" : ""}`}>
          <Topbar collapsed={collapsed} setCollapsed={setCollapsed} />
          <div className="dashboard_container">
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="/chit-plans" element={<ChitPlans />} />
              <Route path="/chit-groups" element={<ChitGroup />} />
              <Route path="/chit-groups/chit-members-list" element={<ChitGroupList />} />
              <Route path="/chit-customers" element={<ChitCustomer />} />
              <Route path="/chit-customers/chit-customers-detail" element={<ChitCustomerDetail />} />
              <Route path="/chit-auctions-list" element={<ChitAuctionList />} />
              <Route path="/chit-auctions-list/chit-auctions" element={<ChitAuction />} />
              <Route path="/chit-auctions-list/chit-auctions/chit-auctions-detail" element={<ChitAuctionDetail />} />
              <Route path="/chit-payments" element={<ChitPayments />} />
              <Route path="/chit-payments/chit-payments-list" element={<ChitPaymentList />} />
              <Route path="/chit-payments/daily-collection" element={<DailyCollection />} />
              <Route path="/chit-payments/pending-reminders" element={<PendingReminders />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/settings" element={<ProfileEdit />} />
              <Route path="/report/collection-report" element={<CollectionReport />} />
              <Route path="/report/group-report" element={<GroupReport />} />
              <Route path="/gst" element={<GSTDashboard />} />
              <Route path="/agent-staff" element={<AgentStaffLayout />}>
                <Route index element={<AgentStaffList />} />
                <Route path="agent-detail/:id" element={<AgentDetail />} />
              </Route>
              <Route path="/audit-logs" element={<AuditLogs />} />
            </Routes>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover theme="light" />
    </>
  );
};

/* ======================
   APP
====================== */
function App() {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <BrowserRouter>
      <Routes>
        {/* DEFAULT */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* PROTECTED DASHBOARD (includes billing) */}
        <Route
          path="/*"
          element={
            <ProtectedRoutes>
              <DashboardLayout collapsed={collapsed} setCollapsed={setCollapsed} />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
