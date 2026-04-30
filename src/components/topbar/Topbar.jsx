import { useState, useRef, useEffect } from "react";
import "./topbar.css";
import userImg from "../../assets/images/avatar-1.png";
import { Link } from "react-router-dom";
// import { useBranch } from "../BranchContext";
import "../BranchStyle.css";

export const Topbar = ({ collapsed, setCollapsed }) => {
  // const { activeBranch, setActiveBranch, BRANCHES } = useBranch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  /* close on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const switchBranch = (branch) => {
    setActiveBranch(branch);
    setDropdownOpen(false);
  };

  return (
    <div className="topbar">
      {/* ── LEFT ── */}
      <div className="topbar-left d-flex gap-2 align-items-center">
        <button className="collapse_btn" onClick={() => setCollapsed(!collapsed)}>
          <i className={`bi ${collapsed ? "bi-list" : "bi-x"}`}></i>
        </button>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <a href="#">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Dashboard
            </li>
          </ol>
        </nav>
      </div>

      {/* ── RIGHT ── */}
      <div className="topbar-right">
        {/* Search */}
        <div className="input-group search-group flex-nowrap">
          <input type="text" className="form-control" placeholder="Search..." aria-label="Search" aria-describedby="search-btn" />
          <span className="input-group-text search-btn" id="search-btn">
            <i className="fi fi-tc-search"></i>
          </span>
        </div>

        <div className="topbar-icons">
       
          {/* <div className="tb_branch_wrap" ref={dropdownRef}>
            <button className="tb_branch_btn" onClick={() => setDropdownOpen((o) => !o)} title="Switch Branch">
              <span className="tb_branch_dot" />
              <span className="tb_branch_name">{activeBranch.name}</span>
              <i className={`fi fi-rs-angle-small-down tb_branch_arrow ${dropdownOpen ? "open" : ""}`} />
            </button>

            {dropdownOpen && (
              <div className="tb_branch_dropdown">
            
                <div className="tb_branch_dropdown_header">
                  <i className="fi fi-rs-building me-2" />
                  Switch Branch
                </div>

              
                {BRANCHES.map((b) => (
                  <button
                    key={b.id}
                    className={`tb_branch_item ${activeBranch.id === b.id ? "tb_branch_item--active" : ""}`}
                    onClick={() => switchBranch(b)}>
                    <div className="tb_branch_item_icon">
                      <i className={b.isPrimary ? "fi fi-rs-building" : "fi fi-rs-marker"} />
                    </div>
                    <div className="tb_branch_item_info">
                      <span className="tb_branch_item_name">{b.name}</span>
                      <span className="tb_branch_item_loc">
                        {b.location} · {b.branchId}
                      </span>
                    </div>
                    {activeBranch.id === b.id && <i className="fi fi-rs-check tb_branch_item_check" />}
                  </button>
                ))}

               
                <div className="tb_branch_dropdown_footer">
                  <Link to="/settings" className="tb_branch_manage_link" onClick={() => setDropdownOpen(false)}>
                    <i className="fi fi-rs-settings me-1" />
                    Manage Branches
                  </Link>
                </div>
              </div>
            )}
          </div>  */}

          {/* Notifications */}
          <Link to="/notifications" className="icon-wrapper">
            <i className="bi bi-bell topbar-icon"></i>
            <span className="notification-badge">3</span>
          </Link>

          {/* Settings */}
          <Link to="/settings" className="icon-wrapper">
            <i className="bi bi-gear topbar-icon"></i>
          </Link>

          {/* Profile */}
          <div className="profile-bg">
            <div className="profile-section">
              <Link>
                <img src={userImg} alt="Profile" className="profile-pic" />
              </Link>
            </div>
            <div className="content">
              <p className="mb-0">Jhon Chart</p>
              <small>Admin</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
