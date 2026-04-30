import React from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

const actions = [
  {
    icon: "fi fi-rs-user-add",
    label: "Add Customer",
    sub: "KYC Registration",
    route: "/chit-customers",
    color: "#6366f1",
    bg: "#eef2ff",
  },
  {
    icon: "fi fi-rs-users",
    label: "New Chit Plan",
    sub: "Create & Schedule",
    route: "/chit-plans",
    color: "#0891b2",
    bg: "#ecfeff",
  },
  {
    icon: "fi fi-rs-hand-holding-usd",
    label: "Record Payment",
    sub: "Cash / UPI / Bank",
    route: "/chit-payments",
    color: "#059669",
    bg: "#ecfdf5",
  },
  {
    icon: "fi fi-rs-user-headset",
    label: "Add Staff / Agent",
    sub: "Refrence & Collect",
    route: "/agent-staff",
    color: "#d97706",
    bg: "#fffbeb",
  },

];

export const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="qa_card">
      <div className="qa_header">
        <h6 className="qa_title">Quick Actions</h6>
      </div>

      <div className="qa_grid">
        {actions.map((item, i) => (
          <button
            key={i}
            className="qa_item"
            style={{ "--accent": item.color, "--accent-bg": item.bg }}
            onClick={() => navigate(item.route)}
          >
            <div className="qa_icon_wrap">
              <i className={item.icon}></i>
            </div>
            <div className="qa_label">{item.label}</div>
            <div className="qa_sub">{item.sub}</div>
          </button>
        ))}
      </div>
    </div>
  );
};