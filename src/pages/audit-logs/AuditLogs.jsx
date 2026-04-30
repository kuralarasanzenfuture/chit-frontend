import React from "react";
import "./AuditLogs.css";

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

export const AuditLogs = () => (
  <>
    <div className="wrapper_header ">
      <div>
        <h5 className="header_title">Audit Logs</h5>
        <p className="header_text">Track and monitor all user activities</p>
      </div>
    </div>

    <div className="filter-wrapper d-flex gap-2 align-items-center mb-3 flex-wrap justify-content-between">
      <small className="mb-0">Search by the Filters :</small>
      <div className="flex-fill">
        <select className="form-select">
          <option value="">Action</option>
          <option>Update</option>
          <option>Delete</option>
          <option>Changing</option>
          <option>Uploading</option>
        </select>
      </div>

      <div className="flex-fill">
        <div className="search-item ms-2">
          <div className="search-box">
            <input className="search-input" placeholder="Search Logs Here..." type="text" />
            <i className="bi bi-search search-icon" />
          </div>
        </div>
      </div>
      <div className="flex-fill">
        <div className="d-flex align-items-center justify-content-md-end gap-2  filter-calender flex-wrap ">
          <div className="d-flex align-items-center gap-2">
            <label>
              From <span className="d-none d-md-inline-block">Date</span> :
            </label>
            <input className="form-control" type="date" value="" />
          </div>
          <div className="d-flex align-items-center gap-2">
            <label>
              To <span className="d-none d-md-inline-block">Date</span> :
            </label>
            <input className="form-control" type="date" value="" />
          </div>
        </div>
      </div>
      <button className="btn main-btn">
        <i className="bi bi-download" /> &nbsp;Export Logs
      </button>
    </div>

    <div className="wrapper-table-outer">
      <table className="premium_table table-striped">
        <thead>
          <tr>
            <th>User</th>
            <th>Action</th>
            <th>Date &amp; Time</th>
            <th>Subject</th>
            <th>Actions</th>
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

              <td className="action-buttons d-flex align-items-center gap-2">
                <button className="btn btn-sm btn-warning text-dark">
                  <i className="bi bi-pencil" />
                </button>
                <button className="btn btn-sm btn-danger text-light">
                  <i className="bi bi-trash" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
);
