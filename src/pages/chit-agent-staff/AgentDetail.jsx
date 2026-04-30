import React from "react";
import "./AgentStaff.css";

export const AgentDetail = () => {
  return (
    <>
      <div className="row gy-4">
        <div className="col-lg-3">
          <div className="agent-card">
            <div className="row gy-4">
              <div className="col-lg-12">
                <div className="user_icon text-center">SR</div>
              </div>
              <div className="col-lg-12">
                <h5 className="user_name text-center">Subash Rohith</h5>
                <p className="user_id text-center">Agent ID :Cus-2026-001</p>
              </div>
              <div className="col-lg-12">
                <button className="btn light-btn w-100 d-block">
                  <i className="fi fi-rs-pencil me-2"></i>Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-9">
          <div className="wrapper-table-outer">
            <div className="table-header d-flex justify-content-between align-items-center">
              <h6>
                <i className="fi fi-rs-users me-2"></i>Refrence Customers
              </h6>
              <button className="light-btn">
                <i class="fi fi-tr-file-excel"></i>Export Excel
              </button>
            </div>
            <table className="premium_table table-striped">
              <thead>
                <tr>
                  <th>Customer Detail</th>
                  <th>Plan Detail</th>
                  <th>Total Investment</th>
                  <th>Status </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    Rajesh Kumar M
                    <small className="w-100 d-block" style={{ color: "var(--main-color)" }}>
                      (CH-2023-001)
                    </small>
                  </td>
                  <td>
                    <div class="user-cell">
                      <div class="avatar green">GD</div> <span>Gold Plan - ₹1,00,000</span>
                    </div>
                  </td>
                  <td className="text-success">₹ 500000</td>
                  <td>
                    <span className="badge rounded-pill bg-danger bg-opacity-25 text-danger">completed</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    Karthick P
                    <small className="w-100 d-block" style={{ color: "var(--main-color)" }}>
                      (CH-2023-015)
                    </small>
                  </td>
                  <td>
                    <div class="user-cell">
                      <div class="avatar green">GD</div> <span>Gold Plan - ₹1,00,000</span>
                    </div>
                  </td>
                  <td className="text-success">₹ 120000</td>
                  <td>
                    <span className="badge rounded-pill bg-success bg-opacity-25 text-success">active</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    Rahul Sharma
                    <small className="w-100 d-block" style={{ color: "var(--main-color)" }}>
                      (CH-2023-041)
                    </small>
                  </td>
                  <td>
                    <div class="user-cell">
                      <div class="avatar green">GD</div> <span>Gold Plan - ₹1,00,000</span>
                    </div>
                  </td>
                  <td className="text-success">₹ 800000</td>
                  <td>
                    <span className="badge rounded-pill bg-success bg-opacity-25 text-success">active</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    Suresh Kumar R
                    <small className="w-100 d-block" style={{ color: "var(--main-color)" }}>
                      (CH-2023-042)
                    </small>
                  </td>
                  <td>
                    <div class="user-cell">
                      <div class="avatar green">GD</div> <span>Gold Plan - ₹1,00,000</span>
                    </div>
                  </td>
                  <td className="text-success">₹ 2,20000</td>
                  <td>
                    <span className="badge rounded-pill bg-warning bg-opacity-25 text-warning">pending</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
