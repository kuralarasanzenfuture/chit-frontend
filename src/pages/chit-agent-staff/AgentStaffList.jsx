// import React, { useState } from "react";
// import "./AgentStaff.css";
// import { AgentStaffTable } from "./table/AgentStaffTable";

// export const AgentStaffList = () => {
//   const [showModal, setShowModal] = useState(false);

//   const [formInputs, setFormInputs] = useState({
//     booking_role: "",
//     refrence_name: "",
//     refrence_phone_number: "",
//     terms_conditions: false,
//   });

//   const openModal = () => setShowModal(true);

//   const closeModal = () => {
//     setShowModal(false);
//     setFormInputs({
//       booking_role: "",
//       refrence_name: "",
//       refrence_phone_number: "",
//       terms_conditions: false,
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormInputs((prev) => ({ ...prev, [name]: value }));
//   };

//   return (
//     <div className="agent_staff">
//       {/* 🔹 Top Button */}
//       <div className="text-end">
//         <button className="btn main-btn" onClick={openModal}>
//           <i className="bi bi-person-plus"></i> Add Agent / Staff
//         </button>
//       </div>

//       {/* 🔹 Dummy Table (UI Only) */}
//       <AgentStaffTable />

//       {/* 🔹 Modal */}
//       {showModal && (
//         <>
//           <div className="modal-backdrop fade show"></div>

//           <div className="modal modal-form fade show d-block" tabIndex="-1">
//             <div className="modal-dialog modal_form modal-dialog-centered modal-lg">
//               <div className="modal-content">
//                 <div className="modal-header form_title ">
//                   <h1 className="title ">Add Agent / Staff</h1>
//                   <button type="button" className="btn-close btn-sm" onClick={closeModal}></button>
//                 </div>
//                 <div className="modal-body form_content">
//                   <form>
//                     {/* ROLE */}
//                     <div className="mb-3">
//                       <div className="form-check form-check-inline">
//                         <input
//                           type="radio"
//                           name="booking_role"
//                           value="AGENT"
//                           checked={formInputs.booking_role === "AGENT"}
//                           onChange={handleInputChange}
//                           className="form-check-input"
//                         />
//                         <label className="form-check-label">Agent</label>
//                       </div>

//                       <div className="form-check form-check-inline">
//                         <input
//                           type="radio"
//                           name="booking_role"
//                           value="STAFF"
//                           checked={formInputs.booking_role === "STAFF"}
//                           onChange={handleInputChange}
//                           className="form-check-input"
//                         />
//                         <label className="form-check-label">Staff</label>
//                       </div>
//                     </div>

//                     {/* INPUTS */}
//                     <div className="row g-3">
//                       <div className="col-md-6">
//                         <label className="form-label">Name</label>
//                         <input
//                           type="text"
//                           name="refrence_name"
//                           value={formInputs.refrence_name}
//                           onChange={handleInputChange}
//                           className="form-control"
//                           placeholder="Enter Name"
//                         />
//                       </div>

//                       <div className="col-md-6">
//                         <label className="form-label">Phone Number</label>
//                         <input
//                           type="text"
//                           name="refrence_phone_number"
//                           value={formInputs.refrence_phone_number}
//                           onChange={handleInputChange}
//                           className="form-control"
//                           placeholder="Enter Phone"
//                         />
//                       </div>
//                     </div>

//                     {/* FOOTER */}
//                     <div className="mt-4 border-top pt-3 d-flex justify-content-between align-items-center">
//                       <div className="form-check">
//                         <input
//                           type="checkbox"
//                           className="form-check-input"
//                           checked={formInputs.terms_conditions}
//                           onChange={(e) =>
//                             setFormInputs((prev) => ({
//                               ...prev,
//                               terms_conditions: e.target.checked,
//                             }))
//                           }
//                         />
//                         <label className="form-check-label">Accept Terms & Conditions</label>
//                       </div>

//                       <div className="d-flex gap-2">
//                         <button type="button" className="btn light-btn" onClick={closeModal}>
//                           Cancel
//                         </button>
//                         <button type="button" className="btn main-btn">
//                           Submit
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
//     </div>
//   );
// };

import React, { useState } from "react";
import "./AgentStaff.css";
import { AgentStaffTable } from "./table/AgentStaffTable";
import { useDispatch } from "react-redux";
import { createStaff, updateStaff, fetchStaff } from "../../slices/agentAndStaff";
import { toast } from "react-toastify";

export const AgentStaffList = () => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formInputs, setFormInputs] = useState({
    booking_role: "",
    refrence_name: "",
    refrence_phone_number: "",
    status: "ACTIVE",
    terms_conditions: false,
  });

  const [errors, setErrors] = useState({});

  /* ================= MODAL ================= */
  const openModal = () => setShowModal(true);

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    setErrors({});
    setFormInputs({
      booking_role: "",
      refrence_name: "",
      refrence_phone_number: "",
      terms_conditions: false,
    });
  };

  /* ================= EDIT ================= */
  const handleEdit = (item) => {
    setEditId(item.id);

    setFormInputs({
      booking_role: item.referenceDetail || "",
      refrence_name: item.name || "",
      refrence_phone_number: item.phoneNumber || "",
      status: item.status || "ACTIVE",
      terms_conditions: true,
    });

    setShowModal(true);
  };

  /* ================= INPUT ================= */
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormInputs((prev) => ({
      ...prev,
      [name]: value,
    }));

    // remove error while typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  /* ================= VALIDATION ================= */
  const validate = () => {
    let newErrors = {};

    if (!formInputs.booking_role) newErrors.booking_role = "Role is required";

    if (!formInputs.refrence_name) newErrors.refrence_name = "Name is required";

    if (!formInputs.refrence_phone_number) newErrors.refrence_phone_number = "Phone is required";
    else if (!/^\d{10}$/.test(formInputs.refrence_phone_number)) newErrors.refrence_phone_number = "Enter valid 10-digit phone";

    if (!formInputs.terms_conditions) newErrors.terms_conditions = "Accept terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= PAYLOAD ================= */
  const mapPayload = () => ({
    referenceDetail: formInputs.booking_role,
    name: formInputs.refrence_name,
    phoneNumber: formInputs.refrence_phone_number,
    noOfReferal: 0,
    status: formInputs.status,
  });

  /* ================= SUBMIT ================= */
  const handleSubmit = () => {
    if (!validate()) return;

    const payload = mapPayload();

    if (editId) {
      dispatch(updateStaff({ id: editId, data: payload }))
        .unwrap()
        .then(() => {
          toast.success("Updated successfully ✏️");
          dispatch(fetchStaff());
          closeModal();
        })
        .catch((err) => {
          console.error("❌ Full Error edit:", err);
          const errorMessage = err || err?.response?.data?.message || err?.data?.message || err?.message || "Update failed ❌";

          toast.error(errorMessage);
        });
    } else {
      dispatch(createStaff(payload))
        .unwrap()
        .then(() => {
          toast.success("Created successfully ✅");
          dispatch(fetchStaff());
          closeModal();
        })
        .catch((err) => {
          console.error("❌ Full Error create:", err);
          const errorMessage = err || err?.response?.data?.message || err?.data?.message || err?.message || "Create failed ❌";

          toast.error(errorMessage);
        });
    }
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value;

    // remove non-numeric characters
    value = value.replace(/\D/g, "");

    // limit to 10 digits
    if (value.length > 10) return;

    setFormInputs((prev) => ({
      ...prev,
      refrence_phone_number: value,
    }));

    // remove error while typing
    setErrors((prev) => ({
      ...prev,
      refrence_phone_number: "",
    }));
  };

  return (
    <div className="agent_staff">
      {/* BUTTON */}
      <div className="wrapper_header">
        <div>
          <h5 className="header_title">Agent / Staff</h5>
          <p className="header_text">Manage agents and staff, track performance, and streamline daily operations.</p>
        </div>
        <button className="btn main-btn" onClick={openModal}>
          <i className="bi bi-person-plus"></i> Add Agent / Staff
        </button>
      </div>

      {/* TABLE */}
      <AgentStaffTable onEdit={handleEdit} />

      {/* MODAL */}
      {showModal && (
        <>
          <div className="modal-backdrop fade show"></div>

          <div className="modal modal-form fade show d-block">
            <div className="modal-dialog modal_form modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header form_title ">
                  <h1 className="title ">{editId ? "Update Agent / Staff" : "Add Agent / Staff"}</h1>
                  <button className="btn-close" onClick={closeModal}></button>
                </div>

                <div className="modal-body form_content">
                  <form>
                    {/* ROLE */}
                    <div className="mb-3">
                      <input
                        type="radio"
                        name="booking_role"
                        value="AGENT"
                        checked={formInputs.booking_role === "AGENT"}
                        onChange={handleInputChange}
                      />{" "}
                      Agent
                      <input
                        type="radio"
                        name="booking_role"
                        value="STAFF"
                        checked={formInputs.booking_role === "STAFF"}
                        onChange={handleInputChange}
                        className="ms-3"
                      />{" "}
                      Staff
                      {errors.booking_role && <div className="text-danger">{errors.booking_role}</div>}
                    </div>

                    {/* INPUTS */}
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          name="refrence_name"
                          value={formInputs.refrence_name}
                          onChange={handleInputChange}
                          className={`form-control ${errors.refrence_name ? "is-invalid" : ""}`}
                          placeholder="Enter Name"
                        />
                        {errors.refrence_name && <small className="text-danger">{errors.refrence_name}</small>}
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Phone Number</label>
                        <input
                          type="text"
                          name="refrence_phone_number"
                          value={formInputs.refrence_phone_number}
                          onChange={handlePhoneChange}
                          maxLength={10}
                          inputMode="numeric"
                          className={`form-control ${errors.refrence_phone_number ? "is-invalid" : ""}`}
                          placeholder="Enter Phone"
                        />
                        {errors.refrence_phone_number && <small className="text-danger">{errors.refrence_phone_number}</small>}
                      </div>
                      {editId && (
                        <div className="col-md-6">
                          <label className="form-label">Status</label>
                          <select className="form-select" name="status" value={formInputs.status} onChange={handleInputChange}>
                            <option value="ACTIVE">Active</option>
                            <option value="INACTIVE">Inactive</option>
                          </select>
                        </div>
                      )}
                    </div>

                    {/* FOOTER */}
                    <div className="mt-4 border-top pt-3 d-flex justify-content-between">
                      <div>
                        <input
                          type="checkbox"
                          checked={formInputs.terms_conditions}
                          onChange={(e) => {
                            setFormInputs((prev) => ({
                              ...prev,
                              terms_conditions: e.target.checked,
                            }));

                            setErrors((prev) => ({
                              ...prev,
                              terms_conditions: "",
                            }));
                          }}
                        />{" "}
                        Accept Terms
                        {errors.terms_conditions && <div className="text-danger">{errors.terms_conditions}</div>}
                      </div>

                      <div>
                        <button type="button" className="btn light-btn me-2" onClick={closeModal}>
                          Cancel
                        </button>

                        <button type="button" className="btn main-btn" onClick={handleSubmit}>
                          {editId ? "Update" : "Submit"}
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
    </div>
  );
};
