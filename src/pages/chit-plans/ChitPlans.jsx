// import React, { useState } from "react";
// import "./ChitPlans.css";

// const data = [
//   {
//     id: 1,
//     name: "Gold Premium",
//     desc: "Institutional Growth Fund",
//     amount: "₹5,00,000",
//     duration: "50 Months",
//     monthly: "₹10,000",
//     members: "50 Slots",
//     commission: "5%",
//     status: "ACTIVE",
//     icon: "fi fi-tr-star",
//     bgColor: "#ecfdf5",
//     iconColor: "#16a34a",
//   },
//   {
//     id: 4,
//     name: "Elite Diamond",
//     desc: "High Value Investors",
//     amount: "₹10,00,000",
//     duration: "60 Months",
//     monthly: "₹20,000",
//     members: "60 Slots",
//     commission: "6%",
//     status: "ACTIVE",
//     icon: "fi fi-tr-diamond",
//     bgColor: "#f5f3ff",
//     iconColor: "#7c3aed",
//   },
//   {
//     id: 5,
//     name: "Silver Saver",
//     desc: "Mid-Level Savings Plan",
//     amount: "₹1,50,000",
//     duration: "30 Months",
//     monthly: "₹5,000",
//     members: "30 Slots",
//     commission: "4%",
//     status: "ACTIVE",
//     icon: "fi fi-tr-coins",
//     bgColor: "#f8fafc",
//     iconColor: "#0ea5e9",
//   },
// ];

// export const ChitPlans = () => {
//   const [view, setView] = useState("grid"); // grid | list
//   const [showModal, setShowModal] = useState(false);

//   const openModal = () => {
//     setShowModal(true);
//   };

//   // ================= CLOSE MODAL =================
//   const closeModal = () => {
//     setShowModal(false);
//   };

//   const getInitials = (name) => {
//     return name
//       .split(" ")
//       .map((word) => word[0])
//       .slice(0, 2)
//       .join("")
//       .toUpperCase();
//   };

//   return (
//     <>
//       <div className="chit-plan-list">
//         <div className="wrapper_header">
//           <div>
//             <h5 className="header_title">Chit Plan</h5>
//             <p className="header_text">Configure and Manage Financial Pool For Subscribers</p>
//           </div>
//           <div className="d-flex align-items-center gap-2">
//             <div>
//               <div className="view_toggle">
//                 <button className={view === "grid" ? "active" : ""} onClick={() => setView("grid")}>
//                   <i class="bi bi-grid"></i> Grid
//                 </button>

//                 <button className={view === "list" ? "active" : ""} onClick={() => setView("list")}>
//                   <i class="bi bi-list-task"></i> List
//                 </button>
//               </div>
//             </div>
//             <button className="btn main-btn" onClick={openModal}>
//               <i class="bi bi-plus"></i> Create New Plan
//             </button>
//           </div>
//         </div>

//         <div className="mt-3">
//           {view === "grid" ? (
//             <div className="plan_grid">
//               {data.map((item) => (
//                 <div className="plan_card" key={item.id}>
//                   <div className="plan_header">
//                     <div className="avatar" style={{ background: item.bgColor, color: item.iconColor }}>
//                       {getInitials(item.name)}
//                     </div>

//                     <div>
//                       <h5>{item.name}</h5>
//                       <small>{item.desc}</small>
//                     </div>

//                     <span className={`status ${item.status.toLowerCase()}`}>{item.status}</span>
//                   </div>

//                   <div className="plan_value">
//                     <span>Total Value</span>
//                     <h3>{item.amount}</h3>
//                   </div>

//                   <div className="plan_details">
//                     <div>
//                       <small>Duration</small>
//                       <p>{item.duration}</p>
//                     </div>
//                     <div>
//                       <small>Monthly</small>
//                       <p>{item.monthly}</p>
//                     </div>
//                     <div>
//                       <small>Members</small>
//                       <p>{item.members}</p>
//                     </div>
//                   </div>

//                   <div className="d-flex align-items-center gap-2">
//                     <button className="_btn edit"> Edit Plan</button>
//                     <button className="_btn delete" style={{ width: "50px" }}>
//                       {" "}
//                       <i class="bi bi-trash"></i>
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="list_view">
//               {data.map((plan) => (
//                 <div className="list_card" key={plan.id}>
//                   {/* LEFT */}
//                   <div className="list_left">
//                     <div className="list_avatar" style={{ background: plan.bgColor, color: plan.iconColor }}>
//                       {getInitials(plan.name)}
//                     </div>

//                     <div>
//                       <h5>{plan.name}</h5>
//                       <p>{plan.desc}</p>
//                     </div>
//                   </div>

//                   {/* CENTER */}
//                   <div className="list_center">
//                     <div>
//                       <span>Total Value</span>
//                       <strong>{plan.amount}</strong>
//                     </div>

//                     <div>
//                       <span>Duration</span>
//                       <strong>{plan.duration}</strong>
//                     </div>

//                     <div>
//                       <span>Monthly</span>
//                       <strong>{plan.monthly}</strong>
//                     </div>

//                     <div>
//                       <span>Members</span>
//                       <strong>{plan.members}</strong>
//                     </div>
//                   </div>

//                   {/* RIGHT */}
//                   <div className="list_right">
//                     <span className={`status ${plan.status.toLowerCase()}`}>{plan.status}</span>

//                     <div class="text-end">
//                       <button class="btn btn-sm btn-warning me-2">
//                         <i class="bi bi-pencil"></i>
//                       </button>
//                       <button class="btn btn-sm btn-danger">
//                         <i class="bi bi-trash"></i>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ================= MODAL ================= */}
//       {showModal && (
//         <>
//           <div className="modal-backdrop fade show"></div>

//           <div className="modal modal-form fade show d-block" tabIndex="-1">
//             <div className="modal-dialog modal_form modal-dialog-centered modal-lg">
//               <div className="modal-content">
//                 <div class="modal-header form_title ">
//                   <h1 class="title ">Create New Chit Group</h1>
//                   <button type="button" class="btn-close" onClick={closeModal}></button>
//                 </div>
//                 <div className="modal-body form_content">
//                   <form className="">
//                     <div className="row g-3">
//                       {/* PLAN NAME */}
//                       <div className="col-md-4">
//                         <label className="form-label">Plan Name</label>
//                         <input type="text" className="form-control" name="title" placeholder="Enter plan name" />
//                       </div>

//                       <div className="col-md-4">
//                         <label className="form-label">Plan Desc</label>
//                         <input type="text" className="form-control" name="title" placeholder="Enter plan name" />
//                       </div>

//                       {/* START DATE */}
//                       <div className="col-md-4">
//                         <label className="form-label">Start Date</label>
//                         <input type="date" className="form-control" name="startDate" />
//                       </div>

//                       <div className="col-md-4">
//                         <label className="form-label">End Date</label>
//                         <input type="date" className="form-control" name="startDate" />
//                       </div>

//                       {/* TOTAL VALUE */}
//                       <div className="col-md-4">
//                         <label className="form-label">Total Value</label>
//                         <input type="number" className="form-control" name="totalValue" placeholder="₹" />
//                       </div>

//                       {/* DURATION */}
//                       <div className="col-md-4">
//                         <label className="form-label">Duration (Months)</label>
//                         <input type="number" className="form-control" name="duration" />
//                       </div>

//                       {/* MONTHLY */}
//                       <div className="col-md-4">
//                         <label className="form-label">Monthly Amount</label>
//                         <input type="number" className="form-control" name="monthly" />
//                       </div>

//                       {/* MEMBERS */}
//                       <div className="col-md-4">
//                         <label className="form-label">Members</label>
//                         <input type="number" className="form-control" name="members" />
//                       </div>

//                       {/* COMMISSION */}
//                       <div className="col-md-4">
//                         <label className="form-label">Commission (%)</label>
//                         <input type="number" className="form-control" name="commission" />
//                       </div>

//                       {/* STATUS */}
//                       <div className="col-md-4">
//                         <label className="form-label">Status</label>
//                         <select className="form-select" name="status">
//                           <option>Active</option>
//                           <option>Draft</option>
//                         </select>
//                       </div>

//                       {/* BUTTON */}
//                       <div className="col-12 text-end mt-3">
//                         <button type="button" className="btn light-btn me-2" onClick={closeModal}>
//                           Cancel
//                         </button>
//                         <button type="submit" className="btn main-btn">
//                           Create Group
//                         </button>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// };

import React, { useState, useEffect } from "react";
import "./ChitPlans.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPlans,
  createPlan,
  updatePlan,
  deletePlan,
} from "../../slices/PlanSlice";

import { ToastContainer, toast } from "react-toastify";

export const ChitPlans = () => {
  const dispatch = useDispatch();
  const { plans = [] } = useSelector((state) => state.plans || {});

  const [view, setView] = useState("grid");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    totalValue: "",
    duration: "",
    monthly: "",
    members: "",
    status: "Active",
  });

  /* ================= LOAD ================= */
  useEffect(() => {
    dispatch(fetchPlans());
  }, [dispatch]);

  /* ================= MODAL ================= */
  const openModal = () => setShowModal(true);

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    resetForm();
    setErrors({});
  };

  /* ================= FORM ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    validate({ [name]: value });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      totalValue: "",
      duration: "",
      monthly: "",
      members: "",
      status: "Active",
    });
  };

  /* ================= MAP ================= */
  const mapToApiPayload = () => ({
    planName: formData.title,
    description: formData.description,
    totalAmount: Number(formData.totalValue),
    durationMonths: Number(formData.duration),
    monthlyInstallment: Number(formData.monthly),
    totalMembers: Number(formData.members),
    status: formData.status?.toUpperCase(),
  });

  /* ================= CREATE / UPDATE ================= */
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const payload = mapToApiPayload();

  //   const action = editId
  //     ? updatePlan({ id: editId, data: payload })
  //     : createPlan(payload);

  //   dispatch(action)
  //     .unwrap()
  //     .then(() => {
  //       console.log(editId ? "✏️ Updated" : "✅ Created");
  //       dispatch(fetchPlans()); // refresh list
  //       closeModal();
  //     })
  //     .catch((err) => console.error("❌ Error:", err));
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (!validate()) {
  //     console.log("❌ Validation Failed");
  //     return;
  //   }

  //   const payload = mapToApiPayload();

  //   if (editId) {
  //     dispatch(updatePlan({ id: editId, data: payload }))
  //       .unwrap()
  //       .then(closeModal)
  //       .catch(console.error);
  //   } else {
  //     dispatch(createPlan(payload))
  //       .unwrap()
  //       .then(closeModal)
  //       .catch(console.error);
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix all required fields ❌");
      return;
    }

    const payload = mapToApiPayload();

    if (editId) {
      dispatch(updatePlan({ id: editId, data: payload }))
        .unwrap()
        .then(() => {
          closeModal();
          toast.success("Plan updated successfully ✏️");
          dispatch(fetchPlans());
        })
        .catch((err) => {
          toast.error(err?.message || "Plan update failed ❌");
          console.error(err);
        });
    } else {
      dispatch(createPlan(payload))
        .unwrap()
        .then(() => {
          closeModal();
          toast.success("Plan created successfully ✅");
          dispatch(fetchPlans());
        })
        .catch((err) => {
          toast.error(err?.message || "Plan creation failed ❌");
          console.error(err);
        });
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (item) => {
    setEditId(item.id);

    setFormData({
      title: item.planName,
      description: item.description,
      totalValue: item.totalAmount,
      duration: item.durationMonths,
      monthly: item.monthlyInstallment,
      members: item.totalMembers,
      status: item.status || "Active",
    });

    setShowModal(true);
  };

  /* ================= DELETE ================= */
  const handleDelete = (id) => {
    if (!window.confirm("Delete this plan?")) return;

    dispatch(deletePlan(id))
      .unwrap()
      .then(() => {
        // console.log("🗑️ Deleted");
        dispatch(fetchPlans());
        toast.success("Plan deleted successfully ✅");
      })
      .catch((err) => {
        console.error("❌ Delete Error:", err);
        toast.error("Plan delete failed ❌");
      });
  };

  const validate = (fieldValues = formData) => {
    let temp = { ...errors };

    if ("title" in fieldValues)
      temp.title = fieldValues.title ? "" : "Plan name is required";

    if ("description" in fieldValues)
      temp.description = fieldValues.description
        ? ""
        : "Description is required";

    if ("totalValue" in fieldValues)
      temp.totalValue = fieldValues.totalValue > 0 ? "" : "Enter valid amount";

    if ("duration" in fieldValues)
      temp.duration = fieldValues.duration > 0 ? "" : "Enter duration";

    if ("monthly" in fieldValues)
      temp.monthly = fieldValues.monthly > 0 ? "" : "Enter monthly amount";

    if ("members" in fieldValues)
      temp.members = fieldValues.members > 0 ? "" : "Enter members count";

    if ("status" in fieldValues)
      temp.status = fieldValues.status ? "" : "Select status";

    setErrors(temp);

    // return true if no errors
    return Object.values(temp).every((x) => x === "");
  };

  /* ================= HELPER ================= */
  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const colors = [
    "#16a34a",
    "#0ea5e9",
    "#7c3aed",
    "#f59e0b",
    "#ef4444",
    "#10b981",
    "#3b82f6",
    "#8b5cf6",
    "#f97316",
    "#ec4899",
    "#22c55e",
    "#06b6d4",
    "#6366f1",
    "#eab308",
    "#dc2626",
    "#14b8a6",
    "#2563eb",
    "#9333ea",
    "#ea580c",
    "#db2777",
  ];

  const getAvatarStyle = (name = "") => {
    const index = name.charCodeAt(0) % colors.length;
    const color = colors[index];

    return {
      background: color + "20", // light bg
      color: color, // text color
    };
  };

  return (
    <>
      <div className="chit-plan-list">
        <div className="wrapper_header">
          <div>
            <h5 className="header_title">Chit Plan</h5>
            <p className="header_text">
              Configure and Manage Financial Pool For Subscribers
            </p>
          </div>
          <div className="d-flex align-items-center gap-2">
            <div>
              <div className="view_toggle">
                <button
                  className={view === "grid" ? "active" : ""}
                  onClick={() => setView("grid")}
                >
                  <i class="bi bi-grid"></i> Grid
                </button>

                <button
                  className={view === "list" ? "active" : ""}
                  onClick={() => setView("list")}
                >
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
              {(Array.isArray(plans) ? plans : []).map((item) => (
                <div className="plan_card" key={item.id}>
                  <div className="plan_header">
                    {/* <div className="avatar">{getInitials(item.planName)}</div> */}

                    <div
                      className="avatar"
                      style={getAvatarStyle(item.planName)}
                    >
                      {getInitials(item.planName)}
                    </div>

                    <div>
                      <h5>{item.planName}</h5>
                      <small>{item.description}</small>
                    </div>

                    <span className={`status ${item.status?.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </div>

                  <div className="plan_value">
                    <span>Total Value</span>
                    <h3>₹{item.totalAmount}</h3>
                  </div>

                  <div className="plan_details">
                    <div>
                      <small>Duration (Months)</small>
                      <p>{item.durationMonths}</p>
                    </div>
                    <div>
                      <small>Monthly</small>
                      <p>{item.monthlyInstallment}</p>
                    </div>
                    <div>
                      <small>Members</small>
                      <p>{item.totalMembers}</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <button
                      className="_btn edit"
                      onClick={() => handleEdit(item)}
                    >
                      Edit Plan
                    </button>
                    <button
                      className="_btn delete"
                      style={{ width: "50px" }}
                      onClick={() => handleDelete(item.id)}
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="list_view">
              {(Array.isArray(plans) ? plans : []).map((plan) => (
                <div className="list_card" key={plan.id}>
                  <div className="list_left">
                    <div
                      className="list_avatar"
                      style={getAvatarStyle(plan.planName)}
                    >
                      {getInitials(plan.planName)}
                    </div>

                    <div>
                      <h5>{plan.planName}</h5>
                      <p>{plan.description}</p>
                    </div>
                  </div>

                  <div className="list_center">
                    <div>
                      <span>Total Value</span>
                      <strong>₹{plan.totalAmount}</strong>
                    </div>

                    <div>
                      <span>Duration (Months)</span>
                      <strong>{plan.durationMonths}</strong>
                    </div>

                    <div>
                      <span>Monthly</span>
                      <strong>{plan.monthlyInstallment}</strong>
                    </div>

                    <div>
                      <span>Members</span>
                      <strong>{plan.totalMembers}</strong>
                    </div>
                  </div>

                  <div className="list_right">
                    <span className={`status ${plan.status?.toLowerCase()}`}>
                      {plan.status}
                    </span>

                    <div class="text-end">
                      <button
                        class="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(plan)}
                      >
                        <i class="bi bi-pencil"></i>
                      </button>
                      <button
                        class="btn btn-sm btn-danger"
                        onClick={() => handleDelete(plan.id)}
                      >
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
                  <button
                    type="button"
                    class="btn-close"
                    onClick={closeModal}
                  ></button>
                </div>
                <div className="modal-body form_content">
                  <form className="" onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-4">
                        <label className="form-label">Plan Name</label>
                        <input
                          type="text"
                          className={`form-control ${errors.title ? "is-invalid" : ""}`}
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                        />
                        {errors.title && (
                          <small className="text-danger">{errors.title}</small>
                        )}
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">Plan Desc</label>
                        <input
                          type="text"
                          className={`form-control ${errors.description ? "is-invalid" : ""}`}
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                        />
                        {errors.description && (
                          <small className="text-danger">
                            {errors.description}
                          </small>
                        )}
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">Total Value</label>
                        <input
                          type="number"
                          className={`form-control ${errors.totalValue ? "is-invalid" : ""}`}
                          name="totalValue"
                          value={formData.totalValue}
                          onChange={handleChange}
                        />
                        {errors.totalValue && (
                          <small className="text-danger">
                            {errors.totalValue}
                          </small>
                        )}
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">Duration (Months)</label>
                        <input
                          type="number"
                          className={`form-control ${errors.duration ? "is-invalid" : ""}`}
                          name="duration"
                          value={formData.duration}
                          onChange={handleChange}
                        />
                        {errors.duration && (
                          <small className="text-danger">
                            {errors.duration}
                          </small>
                        )}
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">Monthly Amount</label>
                        <input
                          type="number"
                          className={`form-control ${errors.monthly ? "is-invalid" : ""}`}
                          name="monthly"
                          value={formData.monthly}
                          onChange={handleChange}
                        />
                        {errors.monthly && (
                          <small className="text-danger">
                            {errors.monthly}
                          </small>
                        )}
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">Members</label>
                        <input
                          type="number"
                          className={`form-control ${errors.members ? "is-invalid" : ""}`}
                          name="members"
                          value={formData.members}
                          onChange={handleChange}
                        />
                        {errors.members && (
                          <small className="text-danger">
                            {errors.members}
                          </small>
                        )}
                      </div>

                      {editId && (
                        <div className="col-md-4">
                          <label className="form-label">Status</label>
                          <select
                            className="form-select"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                          >
                            <option value="ACTIVE">Active</option>
                            <option value="INACTIVE">Inactive</option>
                          </select>
                        </div>
                      )}

                      <div className="col-12 text-end mt-3">
                        <button
                          type="button"
                          className="btn light-btn me-2"
                          onClick={closeModal}
                        >
                          Cancel
                        </button>
                        <button type="submit" className="btn main-btn">
                          {editId ? "Update Group" : "Create Group"}
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
