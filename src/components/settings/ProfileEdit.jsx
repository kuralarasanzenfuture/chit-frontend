import React, { useEffect, useState } from "react";
import "./ProfileEdit.css";
import api from "../../api/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useBranch } from "../BranchContext";

const AUDIT_ITEMS = [
  {
    id: 1,
    name: "Head Office",
    location: "Mumbai",
    manager: "Meera Joshi",
    agents: 42,
    branchId: "HO-001",
    isPrimary: true,
    icon: "fi fi-rs-building",
  },
  {
    id: 2,
    name: "North Zone",
    location: "Delhi",
    manager: "Rahul Sharma",
    agents: 18,
    branchId: "NZ-004",
    isPrimary: false,
    icon: "fi fi-rs-marker",
  },
  {
    id: 3,
    name: "South Zone",
    location: "Chennai",
    manager: "Kavita Reddy",
    agents: 29,
    branchId: "SZ-002",
    isPrimary: false,
    icon: "fi fi-rs-marker",
  },
];

export const ProfileEdit = () => {
  // const { activeBranch, setActiveBranch, BRANCHES } = useBranch();

  // const [branches, setBranches] = useState(BRANCHES);
  const [user, setUser] = useState({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newBranch, setNewBranch] = useState({
    name: "",
    location: "",
    manager: "",
    branchId: "",
  });
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const [errors, setErrors] = useState({});
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePassword = (e) => {
    let { name, value } = e.target;

    setPassword((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const validatePassword = () => {
    let errors = {};

    // OLD PASSWORD
    if (!password.oldPassword.trim()) {
      errors.oldPassword = "Old password is required";
    }

    // NEW PASSWORD
    if (!password.newPassword.trim()) {
      errors.newPassword = "New password is required";
    } else if (password.newPassword.length < 6) {
      errors.newPassword = "Password must be at least 6 characters";
    }

    // CONFIRM PASSWORD
    if (!password.confirmPassword.trim()) {
      errors.confirmPassword = "Please confirm your password";
    } else if (password.newPassword !== password.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword()) return;

    try {
      const payload = {
        oldPassword: password.oldPassword,
        newPassword: password.newPassword,
      };

      await api.put("/auth/change-password", payload);

      toast.success("Password updated successfully");

      setPassword({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update password");
    }
  };

  const handleCreateBranch = () => {
    if (!newBranch.name.trim()) {
      setFormError("Branch name is required.");
      return;
    }
    const created = {
      id: Date.now(),
      name: newBranch.name.trim(),
      location: newBranch.location.trim() || "—",
      manager: newBranch.manager.trim() || "—",
      agents: 0,
      branchId: newBranch.branchId.trim() || `BR-00${branches.length + 1}`,
      isPrimary: false,
      icon: "fi fi-rs-marker",
    };
    setBranches((prev) => [...prev, created]);
    setActiveBranch(created);
    setNewBranch({ name: "", location: "", manager: "", branchId: "" });
    setFormError("");
    setShowCreateModal(false);
  };

  const handleModalClose = () => {
    setShowCreateModal(false);
    setNewBranch({ name: "", location: "", manager: "", branchId: "" });
    setFormError("");
  };

  const loadData = async () => {
    try {
      const res = await api.get("/auth/getmyprofile");
      setUser(res.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getInitials = (name) => {
    if (!name) return ""; // 🛡️ prevent crash

    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <>
      {/* PAGE HEADER */}
      <div className="wrapper_header mb-3">
        <div>
          <h5 className="header_title">Admin Settings</h5>
          <p className="header_text">Manage your account details, security protocols, and branch hierarchy.</p>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row g-4 justify-content-center">
          {/* ── LEFT COLUMN ── */}
          <div className="col-lg-6">
            {/* Profile Card */}
            <div className="ps_profile_card mb-3">
              <div className="ps_profile_banner"></div>
              <div className="ps_profile_photo_wrap">
                <div className="ps_profile_photo">{getInitials(user.name)}</div>
              </div>
              <div className="ps_profile_body">
                <h5 className="ps_profile_name">{user.name}</h5>
                <span className="ps_master_badge">{user.role}</span>
              </div>
            </div>

            {/* Security Card */}
            <div className="pe_form_card">
              <div className="ps_sec_head mb-3">
                <div className="ps_sec_icon_wrap">
                  <i className="fi fi-rs-shield-check"></i>
                </div>
                <div>
                  <div className="ps_sec_title">Security &amp; Authentication</div>
                  <div className="ps_sec_sub">Update System Access Credentials</div>
                </div>
              </div>

              <form className="row g-3" onSubmit={handlePasswordSubmit}>
                <div className="col-12">
                  <label className="ps_field_label">Old Password</label>
                  <div className="pe_field">
                    <input
                      className="form-control ps_input"
                      type={showPassword.old ? "text" : "password"}
                      value={password.oldPassword}
                      onChange={handlePassword}
                      placeholder="Enter new password"
                      name="oldPassword"
                    />
                    <button
                      type="button"
                      className="ps_score_toggle"
                      onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          old: !prev.old,
                        }))
                      }>
                      <i className={`bi ${showPassword.old ? "bi-eye-slash" : "bi-eye"}`} />
                    </button>
                  </div>
                  {errors.oldPassword && <small className="text-danger">{errors.oldPassword}</small>}
                </div>
                <div className="col-12">
                  <label className="ps_field_label">New Password</label>
                  <div className="pe_field">
                    <input
                      className="form-control ps_input"
                      type={showPassword.new ? "text" : "password"}
                      value={password.newPassword}
                      onChange={handlePassword}
                      placeholder="Enter new password"
                      name="newPassword"
                    />
                    <button
                      type="button"
                      className="ps_score_toggle"
                      onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          new: !prev.new,
                        }))
                      }>
                      <i className={`bi ${showPassword.new ? "bi-eye-slash" : "bi-eye"}`} />
                    </button>
                  </div>
                  {errors.newPassword && <small className="text-danger">{errors.newPassword}</small>}
                </div>
                <div className="col-12">
                  <label className="ps_field_label">Confirm New Password</label>
                  <div className="pe_field">
                    <input
                      className="form-control ps_input"
                      type={showPassword.confirm ? "text" : "password"}
                      value={password.confirmPassword}
                      onChange={handlePassword}
                      placeholder="Repeat new password"
                      name="confirmPassword"
                    />
                    <button
                      type="button"
                      className="ps_score_toggle"
                      onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          confirm: !prev.confirm,
                        }))
                      }>
                      <i className={`bi ${showPassword.confirm ? "bi-eye-slash" : "bi-eye"}`} />
                    </button>
                  </div>
                  {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
                </div>
                <div className="col-12">
                  <div className="">
                    <button type="submit" className="btn main-btn">
                      Change Password
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          {/* <div className="col-lg-9 col-md-8">
          
            <div className="ps_active_branch_banner mb-3">
              <div className="ps_ab_left">
                <div className="ps_ab_icon">
                  <i className={activeBranch.isPrimary ? "fi fi-rs-building" : "fi fi-rs-marker"} />
                </div>
                <div>
                  <div className="ps_ab_label">Currently Active Branch</div>
                  <div className="ps_ab_name">{activeBranch.name}</div>
                  <div className="ps_ab_meta">
                    {activeBranch.location} · {activeBranch.branchId}
                  </div>
                </div>
              </div>
              <span className="ps_ab_badge">
                <span className="ps_ab_badge_dot" />
                Active
              </span>
            </div>

   
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <div className="ps_section_title">Institutional Structure</div>
                  <div className="ps_section_sub">Regional branch hierarchy and zone management</div>
                </div>
              </div>

              <div className="row g-3">
                {AUDIT_ITEMS.map((branch) => (
                  <div key={branch.id} className="col-lg-4 col-md-6 col-6">
                    <div
                      className={`ps_branch_card ${activeBranch.id === branch.id ? "ps_branch_card--active" : ""}`}
                      onClick={() => setActiveBranch(branch)}>
                      <div className="ps_bc_top">
                        <div className="ps_bc_icon_wrap">
                          <i className={branch.icon}></i>
                        </div>
                        <span className="ps_bc_name">{branch.name}</span>
                        {activeBranch.id === branch.id && <span className="ps_bc_check ms-auto">✓</span>}
                      </div>

                      <div className="ps_bc_manager_label">{branch.isPrimary ? "REGIONAL MANAGER" : "ZONE LEAD"}</div>
                      <div className="ps_bc_manager_name">{branch.manager}</div>

                      <div className="ps_bc_footer">
                        <div>
                          <span className="ps_bc_agents_val">{branch.agents}</span>
                          <span className="ps_bc_agents_lbl"> Active Customers</span>
                        </div>
                        {branch.isPrimary ? (
                          <span className="ps_bc_primary_tag">Primary Hub</span>
                        ) : (
                          <div className="text-end">
                            <span className="ps_bc_bid_lbl">Branch ID: </span>
                            <span className="ps_bc_bid_val">{branch.branchId}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

           
                <div className="col-lg-4 col-md-6 col-6">
                  <div className="ps_branch_card ps_branch_card--add" onClick={() => setShowCreateModal(true)}>
                    <div className="ps_bc_add_inner">
                      <div className="ps_bc_add_icon">+</div>
                      <div className="ps_bc_add_label">REGISTER NEW ZONE</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* {showCreateModal && (
        <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.45)" }} onClick={handleModalClose}>
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Register New Branch / Zone</h5>
                <button className="btn-close" onClick={handleModalClose} />
              </div>
              <div className="modal-body">
                {formError && (
                  <div className="alert alert-danger py-1 px-2 mb-3" style={{ fontSize: "13px" }}>
                    {formError}
                  </div>
                )}
                <div className="pe_field mb-3">
                  <label className="ps_field_label">
                    BRANCH NAME <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control ps_input"
                    type="text"
                    placeholder="e.g. East Zone"
                    value={newBranch.name}
                    onChange={(e) => setNewBranch((p) => ({ ...p, name: e.target.value }))}
                  />
                </div>
                <div className="pe_field mb-3">
                  <label className="ps_field_label">LOCATION</label>
                  <input
                    className="form-control ps_input"
                    type="text"
                    placeholder="e.g. Kolkata"
                    value={newBranch.location}
                    onChange={(e) => setNewBranch((p) => ({ ...p, location: e.target.value }))}
                  />
                </div>
                <div className="pe_field mb-3">
                  <label className="ps_field_label">ZONE LEAD / MANAGER</label>
                  <input
                    className="form-control ps_input"
                    type="text"
                    placeholder="e.g. Suresh M"
                    value={newBranch.manager}
                    onChange={(e) => setNewBranch((p) => ({ ...p, manager: e.target.value }))}
                  />
                </div>
                <div className="pe_field">
                  <label className="ps_field_label">BRANCH ID</label>
                  <input
                    className="form-control ps_input"
                    type="text"
                    placeholder="e.g. EZ-005"
                    value={newBranch.branchId}
                    onChange={(e) => setNewBranch((p) => ({ ...p, branchId: e.target.value }))}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn light-btn" onClick={handleModalClose}>
                  Cancel
                </button>
                <button className="btn main-btn" onClick={handleCreateBranch}>
                  Register Branch
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover theme="light" />
    </>
  );
};
