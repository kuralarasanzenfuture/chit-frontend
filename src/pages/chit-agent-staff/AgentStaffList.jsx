import React, { useState } from "react";
import "./AgentStaff.css";
import { AgentStaffTable } from "./table/AgentStaffTable";

export const AgentStaffList = () => {
  const [showModal, setShowModal] = useState(false);

  const [formInputs, setFormInputs] = useState({
    booking_role: "",
    refrence_name: "",
    refrence_phone_number: "",
    terms_conditions: false,
  });

  const openModal = () => setShowModal(true);

  const closeModal = () => {
    setShowModal(false);
    setFormInputs({
      booking_role: "",
      refrence_name: "",
      refrence_phone_number: "",
      terms_conditions: false,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="agent_staff">
      {/* 🔹 Top Button */}
      <div className="text-end">
        <button className="btn main-btn" onClick={openModal}>
          <i className="bi bi-person-plus"></i> Add Agent / Staff
        </button>
      </div>

      {/* 🔹 Dummy Table (UI Only) */}
      <AgentStaffTable />

      {/* 🔹 Modal */}
      {showModal && (
        <>
          <div className="modal-backdrop fade show"></div>

          <div className="modal modal-form fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal_form modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header form_title ">
                  <h1 className="title ">Add Agent / Staff</h1>
                  <button type="button" className="btn-close btn-sm" onClick={closeModal}></button>
                </div>
                <div className="modal-body form_content">
                  <form>
                    {/* ROLE */}
                    <div className="mb-3">
                      <div className="form-check form-check-inline">
                        <input
                          type="radio"
                          name="booking_role"
                          value="AGENT"
                          checked={formInputs.booking_role === "AGENT"}
                          onChange={handleInputChange}
                          className="form-check-input"
                        />
                        <label className="form-check-label">Agent</label>
                      </div>

                      <div className="form-check form-check-inline">
                        <input
                          type="radio"
                          name="booking_role"
                          value="STAFF"
                          checked={formInputs.booking_role === "STAFF"}
                          onChange={handleInputChange}
                          className="form-check-input"
                        />
                        <label className="form-check-label">Staff</label>
                      </div>
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
                          className="form-control"
                          placeholder="Enter Name"
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Phone Number</label>
                        <input
                          type="text"
                          name="refrence_phone_number"
                          value={formInputs.refrence_phone_number}
                          onChange={handleInputChange}
                          className="form-control"
                          placeholder="Enter Phone"
                        />
                      </div>
                    </div>

                    {/* FOOTER */}
                    <div className="mt-4 border-top pt-3 d-flex justify-content-between align-items-center">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={formInputs.terms_conditions}
                          onChange={(e) =>
                            setFormInputs((prev) => ({
                              ...prev,
                              terms_conditions: e.target.checked,
                            }))
                          }
                        />
                        <label className="form-check-label">Accept Terms & Conditions</label>
                      </div>

                      <div className="d-flex gap-2">
                        <button type="button" className="btn light-btn" onClick={closeModal}>
                          Cancel
                        </button>
                        <button type="button" className="btn main-btn">
                          Submit
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
