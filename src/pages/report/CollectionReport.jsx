import React from "react";
import "./report.css";

export default function CollectionReport() {
  return (
    <div className="report-page">
      {/* HEADER */}

      <div className="wrapper_header mb-3">
        <div>
          <h5 className="header_title">Collection Report</h5>
          <p className="header_text">Customer-wise chit collection tracking — April 2026</p>
        </div>
        <div className="export-btns">
          <button className="btn-outline">
            <i className="fi fi-tr-file-spreadsheet"></i> Export Excel
          </button>
          <button className="btn-primary">
            <i className="fi fi-tr-file-pdf"></i> Export PDF
          </button>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="stat-row">
        <div className="row gy-3">
          <div className="col-lg-3 col-md-3">
            <div className="stat-card">
              <span className="stat-icon blue">
                <i className="fi fi-tr-wallet"></i>
              </span>
              <div>
                <div className="stat-label">Total Collected</div>
                <div className="stat-value">₹8,25,000</div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-3">
            <div className="stat-card">
              <span className="stat-icon green">
                <i className="fi fi-tr-user-check"></i>
              </span>
              <div>
                <div className="stat-label">Paid</div>
                <div className="stat-value">5</div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-3">
            <div className="stat-card">
              <span className="stat-icon amber">
                <i className="fi fi-tr-clock"></i>
              </span>
              <div>
                <div className="stat-label">Pending</div>
                <div className="stat-value">2</div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-3">
            <div className="stat-card">
              <span className="stat-icon red">
                <i className="fi fi-tr-triangle-warning"></i>
              </span>
              <div>
                <div className="stat-label">Defaulted</div>
                <div className="stat-value">1</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER BAR (STATIC) */}

      <div class="filter-wrapper d-flex gap-2 align-items-center mb-3">
        <div class="filter-header">
          <i class="bi bi-funnel-fill"></i>&nbsp; Filters :
        </div>
        <div class="search-item">
          <div class="search-box ">
            <input class="search-input" placeholder="Search By Name or ID..." type="text" value="" />
            <i class="bi bi-search search-icon"></i>
          </div>
        </div>
        <div class="flex-fill">
          <select name="" id="" class="form-select">
            <option value="">ALL</option>
            <option value="WAITING">UPCOMING</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="CLOSED">CLOSED</option>
          </select>
        </div>
        <div class="flex-fill">
          <div class="d-flex align-items-center justify-content-md-end gap-2  filter-calender flex-wrap ">
            <div class="d-flex align-items-center gap-2">
              <label>
                From <span class="d-none d-md-inline-block">Date</span> :
              </label>
              <input class="form-control" type="date" value="" />
            </div>
            <div class="d-flex align-items-center gap-2">
              <label>
                To <span class="d-none d-md-inline-block">Date</span> :
              </label>
              <input class="form-control" type="date" value="" />
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="wrapper-table-outer">
        <table className="premium_table">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Plan</th>
              <th>Group</th>
              <th>Monthly</th>
              <th>Paid / Total</th>
              <th>Collected</th>
              <th>Last Paid</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>
                <div className="customer-cell">
                  <div className="avatar av-blue">RK</div>
                  <div>
                    <div className="customer-name">Ravi Kumar</div>
                    <div className="customer-sub">C-001 · +91 98765 43210</div>
                  </div>
                </div>
              </td>
              <td>
                <span className="plan-tag">Gold Premium</span>
              </td>
              <td>GRP-001</td>
              <td>₹10,000</td>
              <td>
                <div className="paid-cell">
                  <div className="prog-bar">
                    <div className="prog-fill" style={{ width: "64%" }}></div>
                  </div>
                  <span className="prog-label">32/50</span>
                </div>
              </td>
              <td>₹3,20,000</td>
              <td>10 Apr 2026</td>
              <td>
                <span className="status-pill pill-success">
                  <span className="dot dot-g"></span> Paid
                </span>
              </td>
            </tr>

            <tr>
              <td>2</td>
              <td>
                <div className="customer-cell">
                  <div className="avatar av-green">PM</div>
                  <div>
                    <div className="customer-name">Priya Meena</div>
                    <div className="customer-sub">C-002 · +91 87654 32109</div>
                  </div>
                </div>
              </td>
              <td>
                <span className="plan-tag">Elite Diamond</span>
              </td>
              <td>GRP-002</td>
              <td>₹20,000</td>
              <td>
                <div className="paid-cell">
                  <div className="prog-bar">
                    <div className="prog-fill" style={{ width: "30%" }}></div>
                  </div>
                  <span className="prog-label">18/60</span>
                </div>
              </td>
              <td>₹3,60,000</td>
              <td>08 Apr 2026</td>
              <td>
                <span className="status-pill pill-success">
                  <span className="dot dot-g"></span> Paid
                </span>
              </td>
            </tr>

            <tr>
              <td>3</td>
              <td>
                <div className="customer-cell">
                  <div className="avatar av-amber">SK</div>
                  <div>
                    <div className="customer-name">Suresh Kannan</div>
                    <div className="customer-sub">C-003 · +91 76543 21098</div>
                  </div>
                </div>
              </td>
              <td>
                <span className="plan-tag">Silver Saver</span>
              </td>
              <td>GRP-003</td>
              <td>₹5,000</td>
              <td>
                <div className="paid-cell">
                  <div className="prog-bar">
                    <div className="prog-fill" style={{ width: "33%" }}></div>
                  </div>
                  <span className="prog-label">10/30</span>
                </div>
              </td>
              <td>₹50,000</td>
              <td>01 Mar 2026</td>
              <td>
                <span className="status-pill pill-warning">
                  <span className="dot dot-y"></span> Pending
                </span>
              </td>
            </tr>

            <tr>
              <td>4</td>
              <td>
                <div className="customer-cell">
                  <div className="avatar av-coral">AL</div>
                  <div>
                    <div className="customer-name">Anitha Lakshmi</div>
                    <div className="customer-sub">C-004 · +91 65432 10987</div>
                  </div>
                </div>
              </td>
              <td>
                <span className="plan-tag">Gold Premium</span>
              </td>
              <td>GRP-001</td>
              <td>₹10,000</td>
              <td>
                <div className="paid-cell">
                  <div className="prog-bar">
                    <div className="prog-fill" style={{ width: "10%" }}></div>
                  </div>
                  <span className="prog-label">5/50</span>
                </div>
              </td>
              <td>₹50,000</td>
              <td>15 Jan 2026</td>
              <td>
                <span className="status-pill pill-danger">
                  <span className="dot dot-r"></span> Defaulted
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
