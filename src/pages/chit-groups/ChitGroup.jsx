import React, { useState } from "react";
import "../chit-plans/ChitPlans.css";
import { Link } from "react-router-dom";
import Select from "react-select";

const data = [
  {
    id: 1,
    name: "Gold Premium A1",
    category: "Monthly Savings",
    value: "₹5,00,000",
    duration: "50 Months",
    members: "32 / 50",
    progress: 64,
    status: "Active",
    statusClass: "active",
    bgColor: "#ecfdf5",
    iconColor: "#16a34a",
  },
  {
    id: 2,
    name: "Retail Growth",
    category: "Business Plan",
    value: "₹2,00,000",
    duration: "40 Months",
    members: "18 / 40",
    progress: 45,
    status: "Pending",
    statusClass: "pending",
    bgColor: "#fef3c7",
    iconColor: "#f59e0b",
  },
  {
    id: 3,
    name: "Micro Finance",
    category: "Rural Plan",
    value: "₹1,00,000",
    duration: "25 Months",
    members: "25 / 25",
    progress: 100,
    status: "Completed",
    statusClass: "completed",
    bgColor: "#e0f2fe",
    iconColor: "#0284c7",
  },
];
export const ChitGroup = () => {
  const [view, setView] = useState("grid"); // grid | list
  const [showModal, setShowModal] = useState(false);
  const planOptions = data.map((plan) => ({
    value: plan.id,
    label: `${plan.name} (${plan.value})`,
  }));

  const [selectedPlans, setSelectedPlans] = useState([]);

  const openModal = () => {
    setShowModal(true);
  };

  // ================= CLOSE MODAL =================
  const closeModal = () => {
    setShowModal(false);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const handlePlanSelect = (id) => {
    setSelectedPlans((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <>
      <div className="chit-plan-list">
        <div className="wrapper_header">
          <div>
            <h5 className="header_title">Chit Groups</h5>
            <p className="header_text">Configure and Manage Financial Pool For Subscribers</p>
          </div>
          <div className="d-flex align-items-center gap-2">
            <div>
              <div className="view_toggle">
                <button className={view === "grid" ? "active" : ""} onClick={() => setView("grid")}>
                  <i class="bi bi-grid"></i> Grid
                </button>

                <button className={view === "list" ? "active" : ""} onClick={() => setView("list")}>
                  <i class="bi bi-list-task"></i> List
                </button>
              </div>
            </div>
            <button className="btn main-btn" onClick={openModal}>
              <i class="bi bi-plus"></i> Add Customer
            </button>
          </div>
        </div>

        <div className="mt-3">
          {view === "grid" ? (
            <div className="plan_grid">
              {data.map((item) => (
                <div className="plan_card" key={item.id}>
                  <div className="plan_header">
                    <div className="avatar" style={{ background: item.bgColor, color: item.iconColor }}>
                      {getInitials(item.name)}
                    </div>

                    <div>
                      <h5>{item.name}</h5>
                      <small>{item.category}</small>
                    </div>

                    <span className={`status ${item.status.toLowerCase()}`}>{item.status}</span>
                  </div>

                  <div className="plan_value">
                    <span>Total Value</span>
                    <h3>{item.value}</h3>
                  </div>

                  <div className="plan_details">
                    <div>
                      <small>Duration</small>
                      <p>{item.duration}</p>
                    </div>

                    <div>
                      <small>Members</small>
                      <p>{item.members}</p>
                    </div>
                  </div>
                  {/* PROGRESS */}
                  <div className="progress_wrapper mt-2">
                    <div className="progress">
                      <div className="progress_bar" style={{ width: `${item.progress}%` }}></div>
                    </div>

                    <span className="progress_text">{item.progress}%</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <Link className="_btn" to="/chit-groups/chit-members-list">
                      {" "}
                      Manage Groups
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="list_view">
              {data.map((plan) => (
                <div className="list_card" key={plan.id}>
                  {/* LEFT */}
                  <div className="list_left flex-shrink">
                    <div className="list_avatar" style={{ background: plan.bgColor, color: plan.iconColor }}>
                      {getInitials(plan.name)}
                    </div>

                    <div>
                      <h5>{plan.name}</h5>
                      <p>{plan.category}</p>
                    </div>
                  </div>

                  {/* CENTER */}
                  <div className="list_center flex-fill">
                    <div>
                      <span>Total Value</span>
                      <strong>{plan.value}</strong>
                    </div>

                    <div>
                      <span>Duration</span>
                      <strong>{plan.duration}</strong>
                    </div>

                    {/* ✅ ADD PROGRESS HERE */}
                    <div className="list_progress">
                      <span className="progress_label">Progress</span>

                      <div className="progress_wrapper">
                        <div className="progress">
                          <div className="progress_bar" style={{ width: `${plan.progress}%` }}></div>
                        </div>

                        <span className="progress_text">{plan.progress}%</span>
                      </div>
                    </div>

                    <div>
                      <span>Members</span>
                      <strong>{plan.members}</strong>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="list_right flex-shrink">
                    <span className={`status ${plan.status.toLowerCase()}`}>{plan.status}</span>

                    <div class="text-end">
                      <Link class="btn btn-sm btn-light border" to="/chit-groups/chit-members-list">
                        <small>Manage Groups</small>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <>
          <div className="modal-backdrop fade show"></div>

          <div className="modal modal-form fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal_form modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div class="modal-header form_title ">
                  <h1 class="title ">Add Customer</h1>
                  <button type="button" class="btn-close btn-sm" onClick={closeModal}></button>
                </div>
                <div className="modal-body form_content">
                  <form className="">
                    <div className="row g-3">
                      {/* PLAN NAME */}

                      <div className="col-md-4">
                        <p style={{ fontSize: "12px", textTransform: "uppercase", fontWeight: "500" }}>Customer Details</p>
                        <label className="form-label mt-2">Select Customer</label>
                        <select className="form-select" name="customer">
                          <option value="">Select Customer</option>
                          <option>Arun Kumar</option>
                          <option>Ravi Kumar</option>
                          <option>Suresh Babu</option>
                        </select>
                      </div>

                      <div className="col-md-8">
                        <p style={{ fontSize: "12px", textTransform: "uppercase", fontWeight: "500" }}>Assign Chit Groups</p>
                        <label className="form-label mt-2">Assign Chit Groups</label>

                        <Select
                          isMulti
                          options={planOptions}
                          value={selectedPlans}
                          onChange={(selected) => setSelectedPlans(selected)}
                          placeholder="Search and select chit groups..."
                          className="basic-multi-select p-0"
                          classNamePrefix="select"
                        />
                      </div>
                      <div className="col-md-12">
                        <small className="text-muted">
                          Selected Groups:{" "}
                          <span className="text-success">
                            {selectedPlans.length} / {data.length}
                          </span>
                        </small>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Nominee Name</label>
                        <input type="text" className="form-control" name="title" placeholder="Nominee Name" />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Nominee Phone Number</label>
                        <input type="text" className="form-control" name="title" placeholder="Nominee Phone Number" />
                      </div>

                      <div className="payment-form-detail mt-4">
                        <div className="row gy-4">
                          <div className="col-lg-12">
                            <h4 className="subtitle pb-3">Booking Reference Information</h4>

                            {/* RADIO BUTTONS */}
                            <div className="form-check form-check-inline">
                              <input className="form-check-input" type="radio" name="booking_reference" />
                              <label className="form-check-label">Agent</label>
                            </div>

                            <div className="form-check form-check-inline">
                              <input className="form-check-input" type="radio" name="booking_reference" />
                              <label className="form-check-label">Staff</label>
                            </div>

                            <div className="form-check form-check-inline">
                              <input className="form-check-input" type="radio" name="booking_reference" />
                              <label className="form-check-label">Office Walk In</label>
                            </div>

                            {/* SEARCH INPUT */}
                            <div className="mt-3">
                              <div className="row gy-4">
                                <div className="col-lg-12">
                                  <label className="form-label">Search Agent / Staff</label>

                                  <input type="text" className="form-control" placeholder="Search Agent or Staff" list="referenceList" />

              

                                  {/* STATIC DATALIST */}
                                  <datalist id="referenceList">
                                    <option value="Raj Kumar - 9876543210" />
                                    <option value="Arun Kumar - 9123456780" />
                                    <option value="Vijay Raj - 9012345678" />
                                  </datalist>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* BUTTON */}
                      <div className="col-12 text-end mt-3 border-top pt-3">
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <div class="form-check">
                              <input class="form-check-input" type="checkbox" value="" id="checkDefault" />
                              <label class="form-check-label" for="checkDefault">
                                I accept the{" "}
                                <Link to="" className="common">
                                  Terms & Conditions
                                </Link>
                              </label>
                            </div>
                          </div>
                          <div>
                            <button type="button" className="btn light-btn me-2" onClick={closeModal}>
                              Cancel
                            </button>
                            <button type="submit" className="btn main-btn">
                              Add Customer
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
