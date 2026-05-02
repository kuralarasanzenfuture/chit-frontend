import React, { useState } from "react";
import "./ChitCustomer.css";

export const ChitCustomerDetail = () => {
  // ✅ Ledger State
  const [selectedGroup, setSelectedGroup] = useState("");

  // ✅ Dummy Ledger Data
  const ledgerData = [
    {
      id: 1,
      group: "Gold Plan",
      date: "01 Apr 2026",
      installment: 1,
      amount: 10000,
      penalty: 0,
      status: "Paid",
      balance: 40000,
    },
    {
      id: 2,
      group: "Gold Plan",
      date: "01 May 2026",
      installment: 2,
      amount: 10000,
      penalty: 200,
      status: "Overdue",
      balance: 30000,
    },
    {
      id: 3,
      group: "Silver Plan",
      date: "10 Apr 2026",
      installment: 1,
      amount: 5000,
      penalty: 0,
      status: "Paid",
      balance: 20000,
    },
  ];

  const filteredLedger = selectedGroup ? ledgerData.filter((item) => item.group === selectedGroup) : ledgerData;

  return (
    <div className="user_detail">
      <div className="row gy-4">
        {/* PROFILE */}
        <div className="col-lg-3">
          <div className="user_info_box">
            <div className="row gy-4">
              <div className="col-lg-12">
                <div className="user_icon text-center">SR</div>
              </div>
              <div className="col-lg-12">
                <h5 className="user_name text-center">Subash Rohith</h5>
                <p className="user_id text-center">Member ID :Cus-2026-001</p>
              </div>
              <div className="col-lg-12">
                <button className="btn light-btn w-100 d-block">
                  <i className="fi fi-rs-pencil me-2"></i>Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* INFO */}
        <div className="col-lg-6">
          <div className="info_box">
            <div className="row gy-4">
              <div className="col-lg-6">
                <div className="info_detail">
                  <h6 className="title">
                    <i className="bi bi-telephone-fill"></i>Phone Number
                  </h6>
                  <p className="text">8124546966</p>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="info_detail">
                  <h6 className="title">
                    <i className="bi bi-person-vcard-fill"></i>Aadhar Number
                  </h6>
                  <p className="text">206638826956</p>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="info_detail">
                  <h6 className="title">
                    <i className="bi bi-credit-card-2-back-fill"></i>Pan Number
                  </h6>
                  <p className="text">HAOP1234F</p>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="info_detail">
                  <h6 className="title">
                    <i className="bi bi-geo-fill"></i>State
                  </h6>
                  <p className="text">Tamilnadu</p>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="info_detail">
                  <h6 className="title">
                    <i className="bi bi-pin-map-fill"></i>District
                  </h6>
                  <p className="text">Dharmapuri</p>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="info_detail">
                  <h6 className="title">
                    <i className="bi bi-building"></i>Place
                  </h6>
                  <p className="text">Pauparapatti</p>
                </div>
              </div>

              <div className="col-lg-12">
                <div className="info_detail">
                  <h6 className="title">
                    <i className="bi bi-geo-alt-fill"></i>Address
                  </h6>
                  <p className="text">145,Vallur , Papparapatti, Penagaram, Dharmapuri , 636809</p>
                </div> 
              </div>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="col-lg-3">
          <div className="stack_list">
            <div className="row gy-3">
              <div className="stack_list">
                <div className="row gy-3">
                  <div className="col-lg-12">
                    <div className="stack_box blue">
                      <span className="stack_icon">
                        <i class="fi fi-rs-chart-mixed-up-circle-dollar"></i>
                      </span>
                      <div className="d-flex justify-content-between gap-2">
                        <div className="content">
                          <h5 className="box_text">Total Investment</h5> <h4 className="box_title">145000</h4>
                        </div>
                        <div className="box_icon ">
                          <div className="ico icon_batch">
                            <i class="fi fi-rs-plan"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="stack_box green">
                      <span className="stack_icon">
                        <i class="fi fi-rs-coworking"></i>
                      </span>
                      <div className="d-flex justify-content-between gap-2">
                        <div className="content">
                          <h5 className="box_text">Active Groups</h5> <h4 className="box_title">3</h4>
                        </div>
                        <div className="box_icon ">
                          <div className="ico icon_group">
                            <i class="fi fi-rs-users-alt"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="stack_box violet">
                      <span className="stack_icon">
                        <i class="fi fi-rs-auction-paddle"></i>
                      </span>
                      <div className="d-flex justify-content-between gap-2">
                        <div className="content">
                          <h5 className="box_text">Next Collection Date</h5> <h4 className="box_title">14.05.2026</h4>
                        </div>
                        <div className="box_icon ">
                          <div className="ico icon_plan">
                            <i class="fi fi-rs-calendar"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* KYC DETAILS */}
       {/* ================= KYC DETAILS ================= */}
<div className="col-lg-12">
  <div className="info_box">
    <h6 className="border-bottom pb-2 mb-3">
      <i className="bi bi-patch-check-fill me-2"></i>KYC Details
    </h6>
    <div className="row gy-4">

      <div className="col-lg-3">
        <div className="info_detail">
          <h6 className="title">
            <i className="bi bi-card-list"></i>ID Proof Type
          </h6>
          <p className="text">Aadhar</p>
        </div>
      </div>

      <div className="col-lg-3">
        <div className="info_detail">
          <h6 className="title">
            <i className="bi bi-person-vcard-fill"></i>ID Proof Number
          </h6>
          <p className="text">206638826956</p>
        </div>
      </div>

      <div className="col-lg-3">
        <div className="info_detail">
          <h6 className="title">
            <i className="bi bi-card-list"></i>Address Proof Type
          </h6>
          <p className="text">Utility Bill</p>
        </div>
      </div>

      <div className="col-lg-3">
        <div className="info_detail">
          <h6 className="title">
            <i className="bi bi-file-earmark-check-fill"></i>KYC Status
          </h6>
          <span className="status active">Verified</span>
        </div>
      </div>

    </div>
  </div>
</div>
        {/* EXISTING PLAN TABLE */}
        <div className="col-lg-12">
          <div className="wrapper-table-outer">
            <table className="premium_table table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Plan Detail</th>
                  <th>Reference</th>
                  <th>Nominee</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    <div class="user-cell">
                      <div class="avatar green">GD</div> <span>Gold Plan - ₹1,00,000</span>
                    </div>
                  </td>
                  <td>Ramesh / REF001</td>
                  <td>Priya</td>
                  <td>01 Jan 2025</td>
                  <td>01 Oct 2025</td>
                  <td>
                    <span className="status active">Active</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= LEDGER ================= */}
        <div className="col-lg-12">
          <div className="wrapper-table-outer mt-2">
            <div className="table-header d-flex justify-content-between align-items-center">
              <h6>
                <i className="bi bi-journal-text me-2"></i>Member Ledger
              </h6>

              <select
                className="form-select w-auto"
                style={{ backgroundColor: "#efefef", fontSize: "14px", minWidth: "150px" }}
                onChange={(e) => setSelectedGroup(e.target.value)}>
                <option value="">All Groups</option>
                <option value="Gold Plan">Gold Plan</option>
                <option value="Silver Plan">Silver Plan</option>
              </select>
            </div>

            <table className="premium_table table-striped">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Installment</th>
                  <th>Amount</th>
                  <th>Penalty</th>
                  <th>Status</th>
                  <th>Balance</th>
                </tr>
              </thead>

              <tbody>
                {filteredLedger.map((item) => (
                  <tr key={item.id}>
                    <td>{item.date}</td>
                    <td>#{item.installment}</td>
                    <td>₹{item.amount}</td>
                    <td className="text-danger">₹{item.penalty}</td>
                    <td>
                      <span className={`status ${item.status === "Paid" ? "active" : "pending"}`}>{item.status}</span>
                    </td>
                    <td>₹{item.balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
