import React, { useState } from "react";
import "./ChitPlans.css";

const data = [
  {
    id: 1,
    name: "Gold Premium",
    desc: "Institutional Growth Fund",
    amount: "₹5,00,000",
    duration: "50 Months",
    monthly: "₹10,000",
    members: "50 Slots",
    commission: "5%",
    status: "ACTIVE",
    icon: "fi fi-tr-star",
    bgColor: "#ecfdf5",
    iconColor: "#16a34a",
  },
  {
    id: 4,
    name: "Elite Diamond",
    desc: "High Value Investors",
    amount: "₹10,00,000",
    duration: "60 Months",
    monthly: "₹20,000",
    members: "60 Slots",
    commission: "6%",
    status: "ACTIVE",
    icon: "fi fi-tr-diamond",
    bgColor: "#f5f3ff",
    iconColor: "#7c3aed",
  },
  {
    id: 5,
    name: "Silver Saver",
    desc: "Mid-Level Savings Plan",
    amount: "₹1,50,000",
    duration: "30 Months",
    monthly: "₹5,000",
    members: "30 Slots",
    commission: "4%",
    status: "ACTIVE",
    icon: "fi fi-tr-coins",
    bgColor: "#f8fafc",
    iconColor: "#0ea5e9",
  },
];

export const ChitPlans = () => {
  const [view, setView] = useState("grid"); // grid | list
  const [showModal, setShowModal] = useState(false);

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

  return (
    <>
      <div className="chit-plan-list">
        <div className="wrapper_header">
          <div>
            <h5 className="header_title">Chit Plan</h5>
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
              <i class="bi bi-plus"></i> Create New Plan
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
                      <small>{item.desc}</small>
                    </div>

                    <span className={`status ${item.status.toLowerCase()}`}>{item.status}</span>
                  </div>

                  <div className="plan_value">
                    <span>Total Value</span>
                    <h3>{item.amount}</h3>
                  </div>

                  <div className="plan_details">
                    <div>
                      <small>Duration</small>
                      <p>{item.duration}</p>
                    </div>
                    <div>
                      <small>Monthly</small>
                      <p>{item.monthly}</p>
                    </div>
                    <div>
                      <small>Members</small>
                      <p>{item.members}</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <button className="_btn edit"> Edit Plan</button>
                    <button className="_btn delete" style={{ width: "50px" }}>
                      {" "}
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="list_view">
              {data.map((plan) => (
                <div className="list_card" key={plan.id}>
                  {/* LEFT */}
                  <div className="list_left">
                    <div className="list_avatar" style={{ background: plan.bgColor, color: plan.iconColor }}>
                      {getInitials(plan.name)}
                    </div>

                    <div>
                      <h5>{plan.name}</h5>
                      <p>{plan.desc}</p>
                    </div>
                  </div>

                  {/* CENTER */}
                  <div className="list_center">
                    <div>
                      <span>Total Value</span>
                      <strong>{plan.amount}</strong>
                    </div>

                    <div>
                      <span>Duration</span>
                      <strong>{plan.duration}</strong>
                    </div>

                    <div>
                      <span>Monthly</span>
                      <strong>{plan.monthly}</strong>
                    </div>

                    <div>
                      <span>Members</span>
                      <strong>{plan.members}</strong>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="list_right">
                    <span className={`status ${plan.status.toLowerCase()}`}>{plan.status}</span>

                    <div class="text-end">
                      <button class="btn btn-sm btn-warning me-2">
                        <i class="bi bi-pencil"></i>
                      </button>
                      <button class="btn btn-sm btn-danger">
                        <i class="bi bi-trash"></i>
                      </button>
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
                  <h1 class="title ">Create New Chit Group</h1>
                  <button type="button" class="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body form_content">
                  <form className="">
                    <div className="row g-3">
                      {/* PLAN NAME */}
                      <div className="col-md-4">
                        <label className="form-label">Plan Name</label>
                        <input type="text" className="form-control" name="title" placeholder="Enter plan name" />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">Plan Desc</label>
                        <input type="text" className="form-control" name="title" placeholder="Enter plan name" />
                      </div>

                      {/* START DATE */}
                      <div className="col-md-4">
                        <label className="form-label">Start Date</label>
                        <input type="date" className="form-control" name="startDate" />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">End Date</label>
                        <input type="date" className="form-control" name="startDate" />
                      </div>

                      {/* TOTAL VALUE */}
                      <div className="col-md-4">
                        <label className="form-label">Total Value</label>
                        <input type="number" className="form-control" name="totalValue" placeholder="₹" />
                      </div>

                      {/* DURATION */}
                      <div className="col-md-4">
                        <label className="form-label">Duration (Months)</label>
                        <input type="number" className="form-control" name="duration" />
                      </div>

                      {/* MONTHLY */}
                      <div className="col-md-4">
                        <label className="form-label">Monthly Amount</label>
                        <input type="number" className="form-control" name="monthly" />
                      </div>

                      {/* MEMBERS */}
                      <div className="col-md-4">
                        <label className="form-label">Members</label>
                        <input type="number" className="form-control" name="members" />
                      </div>

                      {/* COMMISSION */}
                      <div className="col-md-4">
                        <label className="form-label">Commission (%)</label>
                        <input type="number" className="form-control" name="commission" />
                      </div>

                      {/* STATUS */}
                      <div className="col-md-4">
                        <label className="form-label">Status</label>
                        <select className="form-select" name="status">
                          <option>Active</option>
                          <option>Draft</option>
                        </select>
                      </div>

                      {/* BUTTON */}
                      <div className="col-12 text-end mt-3">
                        <button type="button" className="btn light-btn me-2" onClick={closeModal}>
                          Cancel
                        </button>
                        <button type="submit" className="btn main-btn">
                          Create Group
                        </button>
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
