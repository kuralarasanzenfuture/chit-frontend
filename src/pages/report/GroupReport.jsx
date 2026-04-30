import React from "react";
import "./report.css";

export default function GroupReport() {
  const colors = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#6366f1"];
  const getColor = (index) => colors[index % colors.length];

  return (
    <div className="report-page">
      {/* HEADER */}
      <div className="wrapper_header mb-3">
        <div>
          <h2 className="header_title">Group Report</h2>
          <p className="header_text">Payment status per chit group — April 2026</p>
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

      {/* STATS */}
      <div className="stat-row">
        <div className="row gy-3">
          <div className="col-lg-3 col-md-3">
            <div className="stat-card">
              <span className="stat-icon blue">
                <i className="fi fi-tr-users-alt"></i>
              </span>
              <div>
                <div className="stat-label">Total Groups</div>
                <div className="stat-value">4</div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3">
            <div className="stat-card">
              <span className="stat-icon green">
                <i className="fi fi-tr-check-circle"></i>
              </span>
              <div>
                <div className="stat-label">Active</div>
                <div className="stat-value">3</div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3">
            <div className="stat-card">
              <span className="stat-icon amber">
                <i className="fi fi-tr-triangle-warning"></i>
              </span>
              <div>
                <div className="stat-label">At Risk</div>
                <div className="stat-value">1</div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3">
            <div className="stat-card">
              <span className="stat-icon blue">
                <i className="fi fi-tr-wallet"></i>
              </span>
              <div>
                <div className="stat-label">Total Collected</div>
                <div className="stat-value">₹1,20,000</div>
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

              <th>Group Name</th>

              <th>Installment</th>
              <th>Monthly</th>

              <th>Total Due</th>
              <th>Collected</th>
              <th>Pending Amt</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {/* ROW 1 */}
            <tr>
              <td>1</td>
              <td className="customer_cell">
                <span className="name_badge amber">
                  GP
                </span>
                Gold Premium
              </td>

              <td>32 / 50</td>
              <td>₹10,000</td>

              <td>₹5,00,000</td>
              <td>
                <div className="d-flex align-items-center gap-2">
                  <span>₹4,50,000</span>

                  <span className="per-badge">90%</span>
                </div>
              </td>
              <td className="pending-amt">₹30,000</td>
              <td>
                <span className="status-pill pill-success">
                  <span className="dot dot-g"></span>Active
                </span>
              </td>
            </tr>

            {/* ROW 2 */}
            <tr>
              <td>2</td>
              <td className="customer_cell">
                <span className="name_badge red">
                  ED
                </span>
                Elite Diamond Circle
              </td>

              <td>22 / 60 </td>
              <td>₹20,000</td>

              <td>₹12,00,000</td>
              <td>
                <div className="d-flex align-items-center gap-2">
                  <span>₹11,60,000</span>

                  <span className="per-badge">96%</span>
                </div>
              </td>
              <td className="pending-amt">₹40,000</td>
              <td>
                <span className="status-pill pill-success">
                  <span className="dot dot-g"></span>Active
                </span>
              </td>
            </tr>

            {/* ROW 3 */}
            <tr>
              <td>3</td>
              <td className="customer_cell">
                <span className="name_badge blue">
                  GP
                </span>
                Gold Premium
              </td>

              <td>10 / 30 </td>
              <td>₹5,000</td>

              <td>₹1,50,000</td>
              <td>
                <div className="d-flex align-items-center gap-2">
                  <span>₹1,00,000</span>
                  <span className="per-badge">67%</span>
                </div>
              </td>
              <td className="pending-amt">₹35,000</td>
              <td>
                <span className="status-pill pill-warning">
                  <span className="dot dot-y"></span>At Risk
                </span>
              </td>
            </tr>
          </tbody>

          {/* TOTAL ROW */}
          <tfoot style={{ background: "#f9fafb", fontSize: "14px" }}>
            <tr className="totals-row">
              <td colSpan={4}>
                <b>Grand Total</b>
              </td>

              <td>
                <b>₹18,50,000</b>
              </td>
              <td className="text-success">
                <b>₹17,10,000</b>
              </td>
              <td className="pending-amt text-danger">
                <b>₹1,40,000</b>
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
