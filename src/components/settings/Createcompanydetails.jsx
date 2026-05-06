import React, { useState } from "react";
import "./Createcompanydetails.css";

const STATIC_DATA = [
  {
    id: 1,
    company_name: "Zenfuture Technologies Pvt Ltd",
    company_address: "Registered Office: No. 12, Tech Park Avenue, Chennai",
    district: "Chennai",
    state: "Tamil Nadu",
    pincode: "600001",
    phone: "9876543210",
    email: "info@zenfuture.in",
    website: "https://www.zenfuture.in",
    gst: "33AXPPT5859E1ZW",
    account_number: "50200092427777",
    ifsc_code: "HDFC0001006",
  },
];

const FIELD_META = [
  { key: "company_address", label: "Registered Address" },
  { key: "district", label: "District" },
  { key: "state", label: "State" },
  { key: "pincode", label: "Pincode" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "website", label: "Website" },
  { key: "gst", label: "GST Number" },
  { key: "account_number", label: "Account Number" },
  { key: "ifsc_code", label: "IFSC Code" },
];

export const CreateCompanyDetails = () => {
  const [companies] = useState(STATIC_DATA);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* HEADER */}
      <div className="wrapper_header mb-3">
        <div>
          <h5 className="header_title">Company Details</h5>
          <p className="header_text">Manage your company profile, bank details, and GST information.</p>
        </div>
        {/* ADD BUTTON */}
        <div className="text-end">
          <button className="btn main-btn" onClick={() => setShowModal(true)}>
            <i className="bi bi-plus-lg me-1" />
            Add Address
          </button>
        </div>
      </div>

      <div className="container-fluid px-0">
        {/* CARD */}
        <div className="row g-4">
          <div className="col-12">
            <div className="pe_form_card ccd_detail_card">
              {/* HEADER */}
              <div className="ccd_card_header d-flex justify-content-between align-items-center gap-3">
                <span className="ccd_company_name">{companies[0].company_name}</span>
                <div className="d-flex">
                  <button className="btn btn-sm bg-warning-subtle text-warning me-2 border border-warning-subtle">
                    <i className="bi bi-pencil" />
                  </button>
                  <button className="btn btn-sm bg-danger-subtle text-danger border border-danger-subtle">
                    <i className="bi bi-trash" />
                  </button>
                </div>
              </div>

              {/* FIELD ROWS */}
              {FIELD_META.map(({ key, label }) => (
                <div className="ccd_field_row" key={key}>
                  <div className="ccd_field_grid">
                    <span className="ccd_field_label">{label}</span>
                    <span className="ccd_field_value">{companies[0][key]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal fade modal-form show d-block" style={{ background: "rgba(0,0,0,0.45)" }} onClick={() => setShowModal(false)}>
          <div className="modal-dialog modal-lg modal_form modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header form_title">
                <h5 className="title">Add Company Details</h5>
                <button className="btn-close btn-sm" onClick={() => setShowModal(false)} />
              </div>

              <div className="modal-body form_content">
                <form className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Company Name</label>
                    <input className="form-control" placeholder="Enter company name (e.g. Zenfuture Technologies)" />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Contact Number</label>
                    <input className="form-control" placeholder="Enter official phone number" />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Company Tagline</label>
                    <textarea className="form-control" placeholder="Enter company vision / tagline" />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Registered Office Address</label>
                    <input className="form-control" placeholder="Enter complete registered address" />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">City / District</label>
                    <input className="form-control" placeholder="Enter district or city" />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">State</label>
                    <input className="form-control" placeholder="Enter state" />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Pincode</label>
                    <input className="form-control" placeholder="Enter pincode" />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Official Email</label>
                    <input className="form-control" placeholder="Enter company email" />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Website URL</label>
                    <input className="form-control" placeholder="Enter website (e.g. https://www.zenfuture.in)" />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Business Description</label>
                    <textarea className="form-control" placeholder="Describe company services" />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Terms & Conditions</label>
                    <textarea className="form-control" placeholder="Enter company terms, policies, or disclaimers" />
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                <button className="btn light-btn" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn main-btn">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
