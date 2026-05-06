import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../../assets/images/avatar-1.png";
import { toast } from "react-toastify";
import api from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser, setExsistingUser, setLoading, setUser, updateUser } from "../../slices/CustomerSlice";

const colors = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#6366f1"];

const getColor = (index) => colors[index % colors.length];

const BASE_URL = `http://localhost:8080`;

const getInitials = (name) => {
  if (!name) return ""; // 🛡️ prevent crash

  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

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

  const dispatch = useDispatch();
  const activityData = useSelector((state) => state.customer.user);
  const exsistingUser = useSelector((state) => state.customer.exsistingUser);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const loadData = async () => {
    try {
      const res = await api.get("/getallcustomers");
      dispatch(setUser(res.data));
    } catch (err) {
      const setErr = err?.response?.data?.message || err.message || "Customer Add Failed";
      toast.error(setErr);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const [files, setFiles] = useState({
    photoFile: null,
    idProofFile: null,
    addressProofFile: null,
  });

  const [existingFiles, setExistingFiles] = useState({
    photoFile: null,
    idProofFile: null,
    addressProofFile: null,
  });

  const [preview, setPreview] = useState(null);

  const sortedData = [...activityData].sort((a, b) => b.id - a.id);
  // OR use createdAt if available
  // const sortedData = [...activityData].sort(
  //   (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  // );

  // ================= SEARCH =================
  const filteredData = sortedData.filter((item) => {
    const term = searchTerm.toLowerCase();

    return item.customerName?.toLowerCase().includes(term) || item.customerPhone?.includes(term) || item.id?.toString().includes(term);
  });

  // ================= PAGINATION =================
  const totalRecords = filteredData.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;

  const paginatedData = filteredData.slice(startIndex, endIndex);

  // ================= HANDLE PAGE =================
  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // ================= VALIDATION =================
  const validate = () => {
    let newErrors = {};

    // NAME (required)
    if (!formData.customerName.trim()) {
      newErrors.customerName = "Please enter the name";
    }

    // PHONE (required)
    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = "Please enter phone number";
    } else if (!/^[6-9]\d{9}$/.test(formData.customerPhone.trim())) {
      newErrors.customerPhone = "Enter valid 10 digit mobile number";
    }

    // EMAIL (required)
    if (formData.customerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail.trim())) {
      newErrors.customerEmail = "Invalid email address";
    }

    // ✅ PINCODE (optional)
    if (formData.pincode && !/^[1-9][0-9]{5}$/.test(formData.pincode.trim())) {
      newErrors.pincode = "Enter valid 6 digit pincode";
    }

    // ✅ PAN (optional)
    if (formData.panNumber && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formData.panNumber.trim().toUpperCase())) {
      newErrors.panNumber = "PAN format: ABCDE1234F";
    }

    // ✅ AADHAR (optional)
    if (formData.aadharNumber && !/^\d{12}$/.test(formData.aadharNumber.trim())) {
      newErrors.aadharNumber = "Aadhaar must be 12 digits";
    }

    // ID PROOF (optional)
    // ✅ ID PROOF (optional but conditional validation)
    if (formData.idProofNumber.trim()) {
      const value = formData.idProofNumber.trim();

      // ❗ Type must be selected if number entered
      if (!formData.idProofType) {
        newErrors.idProofNumber = "Please select ID proof type";
      } else {
        switch (formData.idProofType) {
          case "AADHAR":
            if (!/^\d{12}$/.test(value)) {
              newErrors.idProofNumber = "Aadhaar must be 12 digits";
            }
            break;

          case "PAN":
            if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value.toUpperCase())) {
              newErrors.idProofNumber = "PAN format: ABCDE1234F";
            }
            break;

          case "VOTER_ID":
            if (!/^[A-Z]{3}[0-9]{7}$/.test(value.toUpperCase())) {
              newErrors.idProofNumber = "Voter ID format: ABC1234567";
            }
            break;

          case "DL":
            if (value.length < 8) {
              newErrors.idProofNumber = "Enter valid Driving License number";
            }
            break;

          default:
            break;
        }
      }
    }

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
    setFiles((prev) => {
      const updated = { ...prev, [name]: file };
      console.log("FILES STATE:", updated);
      return updated;
    });
  };

  const handleInput = (e) => {
    let { name, value } = e.target;

    // Reset ID number when type changes
    if (name === "idProofType") {
      setFormData((prev) => ({
        ...prev,
        idProofType: value,
        idProofNumber: "", // reset
      }));
      return;
    }

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    dispatch(setLoading());

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== "" && formData[key] !== null) {
        data.append(key, formData[key]);
      }
    });

    if (files.photoFile instanceof File) {
      data.append("photoFile", files.photoFile);
    }

    if (files.idProofFile instanceof File) {
      data.append("idProofFile", files.idProofFile);
    }

    if (files.addressProofFile instanceof File) {
      data.append("addressProofFile", files.addressProofFile);
    }

    try {
      let response;

      if (exsistingUser) {
        response = await api.put(`/customer-id/${exsistingUser.id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        dispatch(
          updateUser({
            ...formData,
            id: exsistingUser.id,
            photoFile: preview,
          }),
        );

        toast.success("User Updated");
        dispatch(setExsistingUser(null));
      } else {
        response = await api.post("/customer", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        dispatch(addUser(response.data));
        toast.success("User Added");
      }

      setFormData(initialValue);
      setFiles({
        photoFile: null,
        idProofFile: null,
        addressProofFile: null,
      });
      setPreview(null);
      loadData();
      closeModal();
    } catch (err) {
      console.log("ERROR FULL:", err.response);
      toast.error(err?.response?.data?.message || "Operation Failed");
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  // ================= CLOSE MODAL =================
  const closeModal = () => {
    setShowModal(false);
    setErrors({});
    setFormData(initialValue);
    setPreview(null);
    dispatch(setExsistingUser(null)); // 🔥 IMPORTANT

    setFiles({
      photoFile: null,
      idProofFile: null,
      addressProofFile: null,
    });
  };

  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Delete this customer?")) return;
      await api.delete(`/customer-id/${id}`);

      dispatch(deleteUser(id)); // ✅ correct
      toast.success("Customer Deleted Successfully");

      loadData(); // optional (you already updated state)
    } catch (err) {
      console.log("DELETE ERROR FULL:", err.response);
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const handleUpdate = (user) => {
    // ✅ store in redux (optional but good)
    dispatch(setExsistingUser(user));

    // ✅ open modal
    setShowModal(true);

    // ✅ preview image (if backend gives URL)
    if (user.photoFile) {
      const fixedPath = user.photoFile.replace(/\\/g, "/");
      setPreview(`${BASE_URL}/${fixedPath}`);
    } else {
      setPreview(null);
    }
  };

  useEffect(() => {
    if (exsistingUser) {
      setFormData({
        customerEmail: exsistingUser.customerEmail || "",
        customerName: exsistingUser.customerName || "",
        customerPhone: exsistingUser.customerPhone || "",
        district: exsistingUser.district || "",
        doorNumber: exsistingUser.doorNumber || "",
        pincode: exsistingUser.pincode || "",
        place: exsistingUser.place || "",
        state: exsistingUser.state || "",
        address: exsistingUser.address || "",
        aadharNumber: exsistingUser.aadharNumber || "",
        panNumber: exsistingUser.panNumber || "",
        idProofNumber: exsistingUser.idProofNumber || "",
        idProofType: exsistingUser.idProofType || "",
        addressProofType: exsistingUser.addressProofType || "",
      });

      setPreview(exsistingUser.photoFile ? `${BASE_URL}/${exsistingUser.photoFile.replace(/\\/g, "/")}` : null);

      setExistingFiles({
        idProofFile: exsistingUser.idProofFile || null,
        addressProofFile: exsistingUser.addressProofFile || null,
      });
    }
  }, [exsistingUser]);

  return (
    <>
      {/* ── Header ── */}
      <div className="wrapper_header">
        <div>
          <h5 className="header_title">Chit Customers</h5>
          <p className="header_text">Handle customer details, KYC, and chit fund participation in one place.</p>
        </div>
      </div>
      <div className="wrapper-table-outer mt-4">
        <div className="table-header d-flex justify-content-between align-items-center">
          <h6>
            <i className="fi fi-rs-users me-2"></i>Members List
          </h6>

          <div className="d-flex align-items-center gap-3">
            <div className="search-item">
              <div className="search-box ">
                <input
                  className="search-input"
                  placeholder="Search By Name or ID..."
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // reset page on search
                  }}
                />
                <i className="bi bi-search search-icon"></i>
              </div>
            </div>
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
            {filteredData.map((item, index) => (
              <tr key={item.id}>
                <td className="customer_cell">
                  <span className="name_badge" style={{ background: getColor(index) }}>
                    {getInitials(item.customerName)}
                  </span>
                  {item.customerName}
                </td>

                <td>{item.customerPhone}</td>

                <td>{item.aadharNumber}</td>

                <td>{item.panNumber}</td>
                <td>{item.address}</td>

                <td>
                  <small
                    className={`py-1 px-2 rounded-pill  ${item.kycStatus === "VERIFIED" ? "bg-success-subtle text-success" : item.kycStatus === "PENDING" ? "bg-warning-subtle text-warning" : "bg-warning-subtle text-warning"}`} style={{fontSize:"10px"}}>
                    {item.kycStatus || "Pending"}
                  </small>
                </td>
                <td class="d-flex">
                  <Link to={`/chit-customers/chit-customers-detail/${item.id}`}>
                    <i class="bi btn btn-sm bg-primary-subtle text-primary border border-primary-subtle me-2 bi-box-arrow-in-up-right"></i>
                  </Link>
                  <button onClick={() => handleUpdate(item)} class="btn btn-sm bg-warning-subtle text-warning me-2 border border-warning-subtle">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button onClick={() => handleDelete(item.id)} class="btn btn-sm bg-danger-subtle text-danger border border-danger-subtle">
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
                <div className="entry-count">
                  Showing {totalRecords === 0 ? 0 : startIndex + 1} to {Math.min(endIndex, totalRecords)} of {totalRecords} entries
                </div>
              </td>

              <td colSpan={4}>
                <div className="pagination">
                  {/* PREV */}
                  <span className={`page-btn ${currentPage === 1 ? "disabled" : ""}`} onClick={() => goToPage(currentPage - 1)}>
                    «
                  </span>

                  {/* PAGE NUMBERS */}
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNumber = totalPages - i;

                    return (
                      <span
                        key={pageNumber}
                        className={`page-number ${currentPage === pageNumber ? "active" : ""}`}
                        onClick={() => goToPage(pageNumber)}>
                        {pageNumber}
                      </span>
                    );
                  })}

                  {/* NEXT */}
                  <span className={`page-btn ${currentPage === totalPages ? "disabled" : ""}`} onClick={() => goToPage(currentPage + 1)}>
                    »
                  </span>
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
                  <h1 className="title ">{exsistingUser ? "Update Customer" : "Add Customer"}</h1>
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
                        {errors.customerName && <small className="text-danger">{errors.customerName}</small>}
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
                        {errors.customerPhone && <small className="text-danger">{errors.customerPhone}</small>}
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
                        <small className="text-danger">{errors.customerEmail}</small>
                      </div>
                      <div className="col-lg-4">
                        <label for="" className="form-label">
                          Place
                        </label>
                        <input className="form-control" placeholder="Place" type="text" value={formData.place} onChange={handleInput} name="place" />
                      </div>
                      <div className="col-lg-4">
                        <label for="" className="form-label">
                          Aadhar Number
                        </label>
                        <input
                          className="form-control"
                          placeholder="Aadhar Number"
                          value={formData.aadharNumber}
                          onChange={handleInput}
                          name="aadharNumber"
                        />
                        <small className="text-danger">{errors.aadharNumber}</small>
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
                        <small className="text-danger">{errors.panNumber}</small>
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
                      </div>

                      <div className="col-lg-4">
                        <label for="" className="form-label">
                          State
                        </label>
                        <input className="form-control" placeholder="State" type="text" onChange={handleInput} value={formData.state} name="state" />
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
                        <small className="text-danger">{errors.pincode}</small>
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
                          disabled={!formData.idProofType}
                        />
                        <small className="text-danger">{errors.idProofNumber}</small>
                      </div>

                      <div className="col-lg-4">
                        <label className="form-label">Upload ID Proof</label>
                        <input
                          type="file"
                          className="form-control"
                          name="idProofFile"
                          accept="image/*,application/pdf"
                          onChange={handleFileChange}
                          disabled={!formData.idProofType}
                        />
                        {existingFiles.idProofFile?.match(/\.(jpg|jpeg|png)$/i) && (
                          <img src={`${BASE_URL}/${existingFiles.idProofFile.replace(/\\/g, "/")}`} width="60" className="mt-1" alt="ID Proof" />
                        )}
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
                          disabled={!formData.addressProofType}
                        />
                        {existingFiles.addressProofFile?.match(/\.(jpg|jpeg|png)$/i) && (
                          <img src={`${BASE_URL}/${existingFiles.addressProofFile.replace(/\\/g, "/")}`} width="60" className="mt-1" alt="ID Proof" />
                        )}
                      </div>

                      {/* BUTTON */}
                      <div className="col-12 text-end mt-3 border-top pt-3">
                        <button type="button" className="btn light-btn me-2" onClick={closeModal}>
                          Cancel
                        </button>
                        <button type="submit" className="btn main-btn">
                          {exsistingUser ? "Update Customer" : "Add Customer"}
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