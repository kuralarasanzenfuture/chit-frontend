import React, { useEffect, useState } from "react";
import "./ChitCustomer.css";
import { useLocation, useParams } from "react-router-dom";
import api from "../../api/api";

export const ChitCustomerDetail = () => {
  // ✅ Ledger State
  const [selectedGroup, setSelectedGroup] = useState("");
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    getCustomer();
  }, []);

  const getCustomer = async () => {
    try {
      const res = await api.get(`/customer-id/${id}`);
      setCustomer(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!customer) return <p>Loading...</p>;

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

  const filteredLedger = selectedGroup
    ? ledgerData.filter((item) => item.group === selectedGroup)
    : ledgerData;

  const BASE_URL = `http://localhost:8080`;

  const getFileUrl = (path) => {
    if (!path) return null;

    return `${BASE_URL}/${path.replace(/\\/g, "/")}`;
  };

  console.log(customer);

  return (
    <div className="user_detail">
      <div className="row gy-4">
        {/* PROFILE */}
        <div className="col-lg-3">
          <div className="user_img_box">
            <img
              src={encodeURI(getFileUrl(customer.photoFile))}
              style={{ width: "100%" }}
              alt="profile"
            />
          </div>
        </div>

        {/* INFO */}
        <div className="col-lg-6">
          <div className="info_box">
            <div className="row gy-4">
              <div className="col-lg-5">
                <div className="info_detail">
                  <h6 className="title">
                    <i className="bi bi-telephone-fill"></i>Phone Number
                  </h6>
                  <p className="text">{customer.customerPhone}</p>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="info_detail">
                  <h6 className="title">
                    <i className="bi bi-envelope-fill"></i>Email Address
                  </h6>
                  <p className="text">{customer.customerEmail}</p>
                </div>
              </div>
              <div className="col-lg-2">
                <div className="info_detail">
                  <h6 className="title">
                    <i class="bi bi-door-open-fill"></i>Door No
                  </h6>
                  <p className="text">{customer.doorNumber}</p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="info_detail">
                  <h6 className="title">
                    <i className="bi bi-person-vcard-fill"></i>Aadhar Number
                  </h6>
                  <p className="text">{customer.aadharNumber}</p>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="info_detail">
                  <h6 className="title">
                    <i className="bi bi-credit-card-2-back-fill"></i>Pan Number
                  </h6>
                  <p className="text">{customer.panNumber}</p>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="info_detail">
                  <h6 className="title">
                    <i className="bi bi-building"></i>Place
                  </h6>
                  <p className="text">{customer.place}</p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="info_detail">
                  <h6 className="title">
                    <i className="bi bi-pin-map-fill"></i>District
                  </h6>
                  <p className="text">{customer.district}</p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="info_detail">
                  <h6 className="title">
                    <i className="bi bi-geo-fill"></i>State
                  </h6>
                  <p className="text">{customer.state}</p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="info_detail">
                  <h6 className="title">
                    <i className="bi bi-geo-fill"></i>Pincode
                  </h6>
                  <p className="text">{customer.pincode}</p>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="info_detail">
                  <h6 className="title">
                    <i className="bi bi-geo-alt-fill"></i>Address
                  </h6>
                  <p className="text">{customer.address}</p>
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
                        <i className="fi fi-rs-chart-mixed-up-circle-dollar"></i>
                      </span>
                      <div className="d-flex justify-content-between gap-2">
                        <div className="content">
                          <h5 className="box_text">Total Investment</h5>{" "}
                          <h4 className="box_title">145000</h4>
                        </div>
                        <div className="box_icon ">
                          <div className="ico icon_batch">
                            <i className="fi fi-rs-plan"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="stack_box green">
                      <span className="stack_icon">
                        <i className="fi fi-rs-coworking"></i>
                      </span>
                      <div className="d-flex justify-content-between gap-2">
                        <div className="content">
                          <h5 className="box_text">Active Groups</h5>{" "}
                          <h4 className="box_title">3</h4>
                        </div>
                        <div className="box_icon ">
                          <div className="ico icon_group">
                            <i className="fi fi-rs-users-alt"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="stack_box violet">
                      <span className="stack_icon">
                        <i className="fi fi-rs-auction-paddle"></i>
                      </span>
                      <div className="d-flex justify-content-between gap-2">
                        <div className="content">
                          <h5 className="box_text">Next Collection Date</h5>{" "}
                          <h4 className="box_title">14.05.2026</h4>
                        </div>
                        <div className="box_icon ">
                          <div className="ico icon_plan">
                            <i className="fi fi-rs-calendar"></i>
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

        {/* ================= KYC DETAILS ================= */}
        <div className="col-lg-12">
          <div className="info_box">
            <h6 className="border-bottom pb-2 mb-3">
              <i className="bi bi-patch-check-fill me-2"></i>KYC Details
            </h6>

            <div className="row gy-4">
              {/* ID Proof */}
              <div className="col-lg-3">
                <div className="info_detail">
                  <h6 className="title">
                    <i className="bi bi-card-list"></i>ID Proof Type
                  </h6>
                  <p className="text">{customer.idProofType}</p>
                </div>

                {customer.idProofFile && (
                  <div className="doc-item mt-3 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-3">
                      <div className="file-icon pdf">
                        <i className="fi fi-rs-file"></i>
                      </div>
                      <small className="doc-name">ID Proof</small>
                    </div>

                    <a
                      href={encodeURI(getFileUrl(customer.idProofFile))}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fi fi-rs-download download-icon"></i>
                    </a>
                  </div>
                )}
              </div>

              {/* ID Number */}
              <div className="col-lg-3">
                <div className="info_detail">
                  <h6 className="title">
                    <i className="bi bi-person-vcard-fill"></i>ID Proof Number
                  </h6>
                  <p className="text">{customer.idProofNumber}</p>
                </div>
              </div>

              {/* Address Proof */}
              <div className="col-lg-3">
                <div className="info_detail">
                  <h6 className="title">
                    <i className="bi bi-card-list"></i>Address Proof Type
                  </h6>
                  <p className="text">{customer.addressProofType}</p>
                </div>

                {customer.addressProofFile && (
                  <div className="doc-item mt-3 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-3">
                      <div className="file-icon doc">
                        <i className="fi fi-rs-file"></i>
                      </div>
                      <small className="doc-name">Address Proof</small>
                    </div>

                    <a
                      href={encodeURI(getFileUrl(customer.addressProofFile))}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fi fi-rs-download download-icon"></i>
                    </a>
                  </div>
                )}
              </div>

              {/* Status */}
              <div className="col-lg-3">
                <div className="info_detail">
                  <h6 className="title">
                    <i className="bi bi-file-earmark-check-fill"></i>KYC Status
                  </h6>
                  {/* <small
                    className={`py-1 px-2 rounded-pill ${customer.kycStatus === "Verified" ? "bg-success-subtle text-success" : item.kycStatus === "Pending" ? "bg-warning-subtle text-warning" : "bg-warning-subtle text-warning"}`}>
                    {customer.kycStatus || "Pending"}
                  </small> */}
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
                    <div className="user-cell">
                      <div className="avatar green">GD</div>{" "}
                      <span>Gold Plan - ₹1,00,000</span>
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
                style={{
                  backgroundColor: "#efefef",
                  fontSize: "14px",
                  minWidth: "150px",
                }}
                onChange={(e) => setSelectedGroup(e.target.value)}
              >
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
                      <span
                        className={`status ${item.status === "Paid" ? "active" : "pending"}`}
                      >
                        {item.status}
                      </span>
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
