import React, { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../../assets/images/avatar-1.png";
import { toast } from "react-toastify";
import api from "../../api/api";

const activityData = [
  {
    id: 1,
    name: "Arun Kumar",
    phone: "9876543210",
    aadhar: "1234 5678 9012",
    pan: "ABCDE1234F",
    address: "12, Anna Nagar, Madurai",
    nomineeName: "Lakshmi",
    nomineePhone: "9876500001",
    kycStatus: "Verified",
  },
  {
    id: 2,
    name: "Ravi Kumar",
    phone: "9876543211",
    aadhar: "2234 5678 9012",
    pan: "BCDEF2345G",
    address: "45, KK Nagar, Madurai",
    nomineeName: "Suresh",
    nomineePhone: "9876500002",
  },
  {
    id: 3,
    name: "Suresh Babu",
    phone: "9876543212",
    aadhar: "3234 5678 9012",
    pan: "CDEFG3456H",
    address: "78, Melur Road, Madurai",
    nomineeName: "Priya",
    nomineePhone: "9876500003",
  },
  {
    id: 4,
    name: "Vijay Raj",
    phone: "9876543213",
    aadhar: "4234 5678 9012",
    pan: "DEFGH4567I",
    address: "9, Thirunagar, Madurai",
    nomineeName: "Kavitha",
    nomineePhone: "9876500004",
  },
  {
    id: 5,
    name: "Mani Selvam",
    phone: "9876543214",
    aadhar: "5234 5678 9012",
    pan: "EFGHI5678J",
    address: "21, Villapuram, Madurai",
    nomineeName: "Selvi",
    nomineePhone: "9876500005",
  },
  {
    id: 6,
    name: "Karthik",
    phone: "9876543215",
    aadhar: "6234 5678 9012",
    pan: "FGHIJ6789K",
    address: "3, Alagarkoil Road, Madurai",
    nomineeName: "Ramesh",
    nomineePhone: "9876500006",
  },
  {
    id: 7,
    name: "Prakash",
    phone: "9876543216",
    aadhar: "7234 5678 9012",
    pan: "GHIJK7890L",
    address: "56, Teppakulam, Madurai",
    nomineeName: "Anitha",
    nomineePhone: "9876500007",
  },
  {
    id: 8,
    name: "Dinesh",
    phone: "9876543217",
    aadhar: "8234 5678 9012",
    pan: "HIJKL8901M",
    address: "11, Avaniyapuram, Madurai",
    nomineeName: "Deepa",
    nomineePhone: "9876500008",
  },
  {
    id: 9,
    name: "Gokul",
    phone: "9876543218",
    aadhar: "9234 5678 9012",
    pan: "IJKLM9012N",
    address: "88, Mattuthavani, Madurai",
    nomineeName: "Kumar",
    nomineePhone: "9876500009",
  },
  {
    id: 10,
    name: "Senthil",
    phone: "9876543219",
    aadhar: "1034 5678 9012",
    pan: "JKLMN0123O",
    address: "14, Pasumalai, Madurai",
    nomineeName: "Meena",
    nomineePhone: "9876500010",
  },
];
const colors = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#6366f1"];

const getColor = (index) => colors[index % colors.length];

const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const initialValue = {
  customerEmail: "",
  customerName: "",
  customerPhone: "",
  district: "",
  doorNumber: "",
  pincode: "",
  place: "",
  state: "",
  address: "",
  aadharNumber: "",
  panNumber: "",
  idProofNumber: "",
  idProofType: "",
  addressProofType: "",
};

export const ChitCustomer = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(initialValue);
  const [errors, setErrors] = useState({});

  const [files, setFiles] = useState({
    photoFile: null,
    idProofFile: null,
    addressProofFile: null,
  });

  const [preview, setPreview] = useState(null);

  // ================= VALIDATION =================
  const validate = () => {
    let newErrors = {};

    // Full Name
    if (!formData.customerName) {
      newErrors.full_name = "Please Enter the Name";
    }

    // Phone
    if (!formData.customerPhone) {
      newErrors.phone = "Please Enter Your Phone Number";
    } else if (!/^[6-9]\d{9}$/.test(formData.customerPhone)) {
      newErrors.phone = "Enter valid 10 digit phone";
    }

    // PAN
    if (!formData.panNumber) {
      newErrors.pan_number = "Please Enter PAN Number";
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formData.panNumber)) {
      newErrors.pan_number = "PAN format: ABCDE1234F";
    }

    // Aadhar
    if (!formData.aadharNumber) {
      newErrors.aadhar_number = "Please Enter Aadhar Number";
    } else if (!/^\d{12}$/.test(formData.aadharNumber)) {
      newErrors.aadhar_number = "Aadhaar must be 12 digits";
    }

    // Files
    // Files (only required for CREATE)
    // if (!editPlanId) {
    //   if (!formData.aadhar_front_image) {
    //     newErrors.aadhar_front_image = "Please Upload Aadhar Front";
    //   }
    //   if (!formData.aadhar_back_image) {
    //     newErrors.aadhar_back_image = "Please Upload Aadhar Back";
    //   }
    //   if (!formData.pan_card_image) {
    //     newErrors.pan_card_image = "Please Upload PAN Card";
    //   }
    //   if (!formData.bank_passbook_image) {
    //     newErrors.bank_passbook_image = "Please Upload Passbook";
    //   }
    // }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;

    if (!file) return;

    let allowedTypes = [];
    let maxSize = 5 * 1024 * 1024; // 5MB

    // ✅ Profile → ONLY images
    if (name === "photoFile") {
      allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    }

    // ✅ KYC → Images + PDF
    if (name === "idProofFile" || name === "addressProofFile") {
      allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
    }

    // ❌ Type validation
    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, PNG or PDF allowed");
      return;
    }

    // ❌ Size validation
    if (file.size > maxSize) {
      alert("Max file size is 5MB");
      return;
    }

    // ✅ Preview only for image profile
    if (name === "photoFile") {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }

    // ✅ Save file
    setFiles((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  const handleInput = (e) => {
    let { name, value } = e.target;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    // append text
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    // append files
    Object.keys(files).forEach((key) => {
      if (files[key]) {
        data.append(key, files[key]);
      }
    });

    try {
      await api.post("/api/customer", data); // ✅ FIXED URL

      toast.success("Customer Added Successfully");

      setFormData(initialValue);
      setFiles({
        photoFile: null,
        idProofFile: null,
        addressProofFile: null,
      });
      setPreview(null);

      closeModal();
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  // ================= CLOSE MODAL =================
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <div className="filter-wrapper d-flex gap-2 align-items-center mb-3">
        <div className="filter-header">
          <i className="bi bi-funnel-fill"></i>&nbsp; Filters :
        </div>
        <div className="search-item">
          <div className="search-box ">
            <input className="search-input" placeholder="Search By Name or ID..." type="text" value="" />
            <i className="bi bi-search search-icon"></i>
          </div>
        </div>
        <div className="flex-fill">
          <select name="" id="" className="form-select">
            <option value="">ALL</option>
            <option value="WAITING">UPCOMING</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="CLOSED">CLOSED</option>
          </select>
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
      </div>
      <div className="wrapper-table-outer mt-4">
        <div className="table-header d-flex justify-content-between align-items-center">
          <h6>
            <i className="fi fi-rs-users me-2"></i>Members List
          </h6>
          <div>
            <button className="btn main-btn" onClick={openModal}>
              <i className="bi bi-plus"></i> Add Customer
            </button>
          </div>
        </div>

        <table className="premium_table table-striped">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Phone</th>
              <th>Aadhar </th>
              <th>PAN</th>
              <th>Address</th>

              <th>KYC Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {activityData.map((item, index) => (
              <tr key={index}>
                <td className="customer_cell">
                  <span className="name_badge" style={{ background: getColor(index) }}>
                    {getInitials(item.name)}
                  </span>
                  {item.name}
                </td>

                <td>{item.phone}</td>

                <td>{item.aadhar}</td>

                <td>{item.pan}</td>
                <td>{item.address}</td>

                <td>
                  <small
                    className={`py-1 px-2 rounded-pill ${item.kycStatus === "Verified" ? "bg-success-subtle text-success" : item.kycStatus === "Rejected" ? "bg-danger-subtle text-danger" : "bg-warning-subtle text-warning"}`}>
                    {item.kycStatus || "Pending"}
                  </small>
                </td>
                <td class="d-flex">
                  <Link to="/chit-customers/chit-customers-detail">
                    <i class="bi btn btn-sm bg-primary-subtle text-primary border border-primary-subtle me-2 bi-box-arrow-in-up-right"></i>
                  </Link>
                  <button class="btn btn-sm bg-warning-subtle text-warning me-2 border border-warning-subtle">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button class="btn btn-sm bg-danger-subtle text-danger border border-danger-subtle">
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          {/* ================= Pagination Design Only ================= */}
          <tfoot className="table-footer">
            <tr>
              <td colSpan={4}>
                <div className="entry-count">Showing 1 to 10 of 60 entries</div>
              </td>
              <td colSpan={4}>
                <div className="pagination">
                  <span className="page-btn">«</span>

                  <span className="page-number active">1</span>
                  <span className="page-number">2</span>
                  <span className="page-number">3</span>
                  <span className="page-number">4</span>
                  <span className="page-number">5</span>
                  <span className="page-number">6</span>

                  <span className="page-btn">»</span>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <>
          <div className="modal-backdrop fade show"></div>

          <div className="modal modal-form fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal_form modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header form_title ">
                  <h1 className="title ">Add Customer</h1>
                  <button type="button" className="btn-close btn-sm" onClick={closeModal}></button>
                </div>
                <div className="modal-body form_content">
                  <form className="" onSubmit={handleSubmit}>
                    <div className="row gy-4">
                      <div className="col-lg-12">
                        <div className="profile-upload-container">
                          <div className="upload-left">
                            <label htmlFor="uploadFile" className="upload-circle">
                              {preview ? (
                                <img src={preview} alt="profile" className="preview-img" />
                              ) : (
                                <div className="upload-placeholder">
                                  <i className="bi bi-person-fill user-icon"></i>
                                  <i className="bi bi-arrow-up upload-icon"></i>
                                </div>
                              )}
                            </label>

                            <input type="file" id="uploadFile" name="photoFile" hidden accept="image/*" onChange={handleFileChange} />
                          </div>

                          <div className="upload-right">
                            <h2>Profile Photo</h2>
                            <p>Please upload a professional headshot, JPEG or PNG, m ax 5MB</p>
                            <label htmlFor="uploadFile" className="upload-link">
                              Choose file from local Storage
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <label for="" className="form-label">
                          Customer Name
                        </label>
                        <input
                          className="form-control"
                          placeholder="Customer Name"
                          type="text"
                          value={formData.customerName}
                          onChange={handleInput}
                          name="customerName"
                        />
                        <small className="text-danger"></small>
                      </div>
                      <div className="col-lg-4">
                        <label for="" className="form-label">
                          Phone Number
                        </label>
                        <input
                          className="form-control"
                          placeholder="Phone Number"
                          type="text"
                          value={formData.customerPhone}
                          onChange={handleInput}
                          name="customerPhone"
                        />
                        <small className="text-danger"></small>
                      </div>
                      <div className="col-lg-4">
                        <label for="" className="form-label">
                          Email
                        </label>
                        <input
                          className="form-control"
                          placeholder="Email Address"
                          type="text"
                          value={formData.customerEmail}
                          onChange={handleInput}
                          name="customerEmail"
                        />
                        <small className="text-danger"></small>
                      </div>
                      <div className="col-lg-4">
                        <label for="" className="form-label">
                          Place
                        </label>
                        <input className="form-control" placeholder="Place" type="text" value={formData.place} onChange={handleInput} name="place" />
                        <small className="text-danger"></small>
                      </div>
                      <div className="col-lg-4">
                        <label for="" className="form-label">
                          Aadhar Number
                        </label>
                        <input
                          maxlength="12"
                          className="form-control"
                          placeholder="Aadhar Number"
                          value={formData.aadharNumber}
                          onChange={handleInput}
                          name="aadharNumber"
                        />
                        <small className="text-danger"></small>
                      </div>
                      <div className="col-lg-4">
                        <label for="" className="form-label">
                          PAN Number
                        </label>
                        <input
                          className="form-control"
                          placeholder="PAN Number"
                          type="text"
                          onChange={handleInput}
                          value={formData.panNumber}
                          name="panNumber"
                        />
                        <small className="text-danger"></small>
                      </div>
                      <div className="col-lg-2">
                        <label for="" className="form-label">
                          Door no
                        </label>
                        <input
                          className="form-control"
                          placeholder="ex: 12/3 B"
                          type="text"
                          onChange={handleInput}
                          value={formData.doorNumber}
                          name="doorNumber"
                        />
                        <small className="text-danger"></small>
                      </div>

                      <div className="col-lg-4">
                        <label for="" className="form-label">
                          State
                        </label>
                        <input className="form-control" placeholder="State" type="text" onChange={handleInput} value={formData.state} name="state" />
                        <small className="text-danger"></small>
                      </div>
                      <div className="col-lg-4">
                        <label for="" className="form-label">
                          District
                        </label>
                        <input
                          className="form-control"
                          placeholder="District"
                          type="text"
                          onChange={handleInput}
                          value={formData.district}
                          name="district"
                        />
                        <small className="text-danger"></small>
                      </div>
                      <div className="col-lg-2">
                        <label for="" className="form-label">
                          Pincode
                        </label>
                        <input
                          className="form-control"
                          placeholder="Pincode"
                          type="number"
                          onChange={handleInput}
                          value={formData.pincode}
                          name="pincode"
                        />
                        <small className="text-danger"></small>
                      </div>
                      <div className="col-lg-12">
                        <label for="" className="form-label">
                          Address
                        </label>
                        <textarea
                          name="address"
                          id=""
                          className="form-control"
                          onChange={handleInput}
                          value={formData.address}
                          placeholder="Address"
                          rows="2"></textarea>
                        <small className="text-danger"></small>
                      </div>
                      {/* ================= KYC DETAILS ================= */}
                      <div className="col-12">
                        <h6 className="mt-3 border-bottom pb-2">KYC Details</h6>
                      </div>

                      <div className="col-lg-4">
                        <label className="form-label">ID Proof Type</label>
                        <select className="form-select" name="idProofType" value={formData.idProofType} onChange={handleInput}>
                          <option value="">Select</option>
                          <option value="AADHAR">Aadhar</option>
                          <option value="PAN">PAN</option>
                          <option value="VOTER_ID">Voter ID</option>
                          <option value="DL">Driving License</option>
                        </select>
                      </div>

                      <div className="col-lg-4">
                        <label className="form-label">ID Proof Number</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter ID Number"
                          value={formData.idProofNumber}
                          onChange={handleInput}
                          name="idProofNumber"
                        />
                      </div>

                      <div className="col-lg-4">
                        <label className="form-label">Upload ID Proof</label>
                        <input type="file" className="form-control" name="idProofFile" accept="image/*,application/pdf" onChange={handleFileChange} />
                      </div>

                      <div className="col-lg-4">
                        <label className="form-label">Address Proof Type</label>
                        <select className="form-select" name="addressProofType" onChange={handleInput} value={formData.addressProofType}>
                          <option value="">Select</option>
                          <option value="AADHAR">Aadhar</option>
                          <option value="UTILITY">Utility Bill</option>
                          <option value="RENT_AGREEMENT">Rent Agreement</option>
                        </select>
                      </div>

                      <div className="col-lg-4">
                        <label className="form-label">Upload Address Proof</label>
                        <input
                          type="file"
                          className="form-control"
                          name="addressProofFile"
                          accept="image/*,application/pdf"
                          onChange={handleFileChange}
                        />
                      </div>

                      {/* BUTTON */}
                      <div className="col-12 text-end mt-3 border-top pt-3">
                        <button type="button" className="btn light-btn me-2" onClick={closeModal}>
                          Cancel
                        </button>
                        <button type="submit" className="btn main-btn">
                          Add Customer
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
