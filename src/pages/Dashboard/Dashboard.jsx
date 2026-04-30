import React from "react";
import "./Dashboard.css";
import { CollectionChart } from "./CollectionChart";
import { PaymentStatusChart } from "./PaymentStatusChart";
import { CustomerGrowthChart } from "./CustomerGrowthChart";
import { QuickActions } from "./QuickActions";

/* ── Static log data ── */
const LOGS = [
  { name: "Raj Kumar", empId: "Emp-001", action: "Changes", date: "02 Apr 2026", time: "04.51.35", subject: "Changing Dates" },
  { name: "Sridhar S B", empId: "Emp-002", action: "Delete", date: "01 Apr 2026", time: "04.51.35", subject: "Customer Delete" },
  { name: "Kural", empId: "Emp-003", action: "Update", date: "31 Mar 2026", time: "04.51.35", subject: "Auction Detail Update" },
  { name: "Priya R", empId: "Emp-004", action: "Upload", date: "30 Mar 2026", time: "10.22.10", subject: "Document Uploading" },
  { name: "Murugan K", empId: "Emp-005", action: "Changes", date: "29 Mar 2026", time: "09.14.05", subject: "Payment Date Change" },
];

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#6366f1"];

const getColor = (i) => COLORS[i % COLORS.length];
const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const ACTION_CLASS = {
  Changes: "ui-change",
  Delete: "ui-delete",
  Update: "ui-update",
  Upload: "ui-upload",
};

const stackData = [
  {
    title: "Total Active Chits",
    count: "142",
    icon: "fi fi-rs-workflow",
    badge: "Active",
    extra: (
      <small>
        <span className="text-success">+12%</span> vs last Month
      </small>
    ),
  },
  {
    title: "Active Customers",
    count: "120",
    icon: "fi fi-rs-expense",
    extra: (
      <small>
        <b className="text-success"><i class="fi fi-rs-arrow-up me-1"></i>8</b> new this month
      </small>
    ),
  },
  {
    title: "Collection (Month)",
    count: "₹8.4M",
    icon: "fi fi-rs-sack-dollar",
    progress: true,
  },
  {
    title: "Pending Dues",
    count: "₹64K",
    icon: "fi fi-rs-diamond-exclamation",
    extra: <small className="p-1 bg-danger-subtle text-danger rounded-1">8 members overdue</small>,
  },
];

export const Dashboard = () => {
  const percent = 65;

  return (
    <>
      <div className="stack_list">
        <div className="row gy-4">
          {stackData.map((item, index) => (
            <div className="col-lg-3 col-md-3" key={index}>
              <div className="stack_card">
                {/* Badge */}
                {item.badge && <span className="stack_badge">{item.badge}</span>}

                {/* Icon */}
                <div className="icon">
                  <i className={item.icon}></i>
                </div>

                {/* Title */}
                <h5 className="stack_title">{item.title}</h5>

                {/* Count */}
                <p className="stack_count">{item.count}</p>

                {/* Progress */}
                {item.progress && (
                  <div className="progress_wrapper">
                    <div className="progress">
                      <div className="progress-bar" style={{ width: `${percent}%` }}></div>
                    </div>
                    <span className="progress_text">{percent}%</span>
                  </div>
                )}

                {/* Extra */}
                {item.extra}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3">
        <div className="row gy-4">
          <div className="col-lg-8">
            <CollectionChart />
          </div>
          <div className="col-lg-4">
            <QuickActions />
          </div>
          <div className="col-lg-4">
            <CustomerGrowthChart />
          </div>
          <div className="col-lg-4">
            <PaymentStatusChart />
          </div>
          <div className="col-lg-4">
            {/* <div className="auction_detail">
              <h6 className="mb-2">Upcoming Auctions</h6>
              <div className="row gy-3">
                <div className="col-lg-12">
                  <div className="auction_card">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <h5 className="card-title">Gold_SEC_01</h5>
                      <small className="date_text">Tommorow</small>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <p className="card-text">Value</p>
                        <h6 className="card-count">₹50,0000</h6>
                      </div>
                      <div className="text-end">
                        <p className="card-text">Time</p>
                        <h6 className="card-time">11.30 AM</h6>
                      </div>
                    </div>
                    <div className="mt-2">
                      <button className="btn auction-btn w-100">Manage Auctions</button>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="auction_card">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <h5 className="card-title">Gold_SEC_02</h5>
                      <small className="date_text">Wed 15 APR</small>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <p className="card-text">Value</p>
                        <h6 className="card-count">₹10,0000</h6>
                      </div>
                      <div className="text-end">
                        <p className="card-text">Time</p>
                        <h6 className="card-time">11.30 AM</h6>
                      </div>
                    </div>
                    <div className="mt-2">
                      <button className="btn auction-btn w-100">Manage Auctions</button>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <div className="wrapper-table-outer mt-4">
        <div class="table-header d-flex justify-content-between align-items-center">
          <h6>
            <i class="fi fi-rs-refresh me-2"></i>Recent Activities
          </h6>
        </div>
        <table className="premium_table table-striped">
          <thead>
            <tr>
              <th>User</th>
              <th>Action</th>
              <th>Date &amp; Time</th>
              <th>Subject</th>
            </tr>
          </thead>
          <tbody>
            {LOGS.map((log, i) => (
              <tr key={i}>
                <td className="customer_cell">
                  <span className="name_badge" style={{ background: getColor(i) }}>
                    {getInitials(log.name)}
                  </span>
                  <div>
                    {log.name}
                    <br />
                    <small className="text-secondary">{log.empId}</small>
                  </div>
                </td>

                <td className="time-cell">
                  <small className={`ui-badge ${ACTION_CLASS[log.action] || ""}`}>{log.action}</small>
                </td>

                <td>
                  {log.date}
                  <br />
                  <small>{log.time}</small>
                </td>

                <td className="time-cell">"{log.subject}"</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
