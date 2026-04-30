import React, { useState } from "react";
import "./ChitAuction.css";
import { Link } from "react-router-dom";

const members = [
  {
    id: 1,
    name: "Robert Fox",
    code: "CID-90210",
    months: 14,
    initials: "RF",
  },
  {
    id: 2,
    name: "Arun Kumar",
    code: "CID-12345",
    months: 10,
    initials: "AK",
  },
  {
    id: 3,
    name: "Ravi Kumar",
    code: "CID-56789",
    months: 8,
    initials: "RK",
  },
];

export const ChitAuction = () => {
  const [selectedId, setSelectedId] = useState(1);
  return (
    <>
      <div className="auction-container">
        <div className="row g-3">
          <div className="col-lg-8">
            <div className="auction-box">
              <div class="auction_header">
                <div class="avatar" style={{ background: "rgb(236, 253, 245)", color: "rgb(22, 163, 74)" }}>
                  GP
                </div>
                <div>
                  <h5>Gold Premium</h5>
                  <small>Institutional Growth Fund</small>
                </div>
                <span class="status active">AUCTION - #1</span>
              </div>
              <div className="auction-body">
                <div className="row gy-4">
                  <div className="col-lg-4">
                    <p className="text">Total Value</p>
                    <h6 className="title">₹ 1,00,000</h6>
                  </div>
                  <div className="col-lg-4">
                    <p className="text">Member Installment</p>
                    <h6 className="title">₹ 1,00,000</h6>
                  </div>
                  <div className="col-lg-4">
                    <p className="text">Participents</p>
                    <h6 className="title">20 Members</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="commission-box">
              <i class="fi fi-rs-bank icon"></i>
              <p className="text">Foreman Commision</p>
              <h6 className="title">₹ 5000</h6>
              <small className="subtext">Commision is Calculated at 5% of the total pool value as per the standard ledger bylaws</small>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="auction-enter-box">
              <div className="header">
                <h5>
                  <i class="fi fi-rs-member-search"></i>Winner Selection
                </h5>
              </div>
              <div className="body">
                <div className="form-content">
                  <label htmlFor="" className="form-label">
                    Search Member Name Or Id
                  </label>
                  <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">
                      <i class="fi fi-tc-search"></i>
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Start Typing name (e.g Robert Fox)"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </div>

                  <div className="members-list">
                    {members.map((m) => (
                      <div key={m.id} className={`member-card ${selectedId === m.id ? "active" : ""}`} onClick={() => setSelectedId(m.id)}>
                        <div className="avatar-icon">{m.initials}</div>

                        <div className="member-info">
                          <h4>{m.name}</h4>
                          <p>
                            ID: {m.code} • {m.months} Months Paid
                          </p>
                        </div>

                        {selectedId === m.id && <div className="check">✔</div>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="auction-enter-box">
              <div className="header">
                <h5>
                  <i class="fi fi-rs-member-search"></i>Winner Bid Details
                </h5>
              </div>
              <div className="body">
                <div className="form-content">
                  <div className="row gy-3">
                    <div className="col-lg-6">
                      <label htmlFor="" className="form-label">
                        Final Bid Amount
                      </label>
                      <div class="input-group ">
                        <span class="input-group-text" id="basic-addon1">
                          ₹
                        </span>
                        <input type="text" class="form-control" placeholder="(e.g 10000)" aria-label="Username" aria-describedby="basic-addon1" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <label htmlFor="" className="form-label">
                        Member Dividend
                      </label>
                      <div class="input-group ">
                        <span class="input-group-text" id="basic-addon1">
                          ₹
                        </span>
                        <input type="text" class="form-control" placeholder="(e.g 10000)" aria-label="Username" aria-describedby="basic-addon1" />
                      </div>
                    </div>
                  </div>
                  <div class="calc-card">
                    <div class="divide ">
                      <span>Chit Value:</span>
                      <span class="value">₹10,000</span>
                    </div>

                    <div class="divide ">
                      <span>Bid Amount:</span>
                      <span class="value">₹9000</span>
                    </div>

                    <div class="divide ">
                      <span>Discount:</span>
                      <span class="value">₹1000</span>
                    </div>

                    <div class="divide  red-color">
                      <span>Commission (5%):</span>
                      <span class="value">₹50</span>
                    </div>

                    <hr />

                    <div class="divide  green-color">
                      <span>Dividend per Member:</span>
                      <span class="value">₹47.5</span>
                    </div>

                    <div class="divide  blue-color">
                      <span>Net to Winner:</span>
                      <span class="value">₹8950</span>
                    </div>
                  </div>
                  <div class="info-box">
                    <div>
                      <div class="icon">i</div>
                    </div>

                    <div class="info-text">
                      <strong>Automatic Calculation:</strong>
                      Based on the pool of $50k and a bid of $42k, the dividend per member is $400.00 after foreman commission adjustments.
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-end">
                <button type="button" className="btn light-btn me-2">
                  Cancel
                </button>

                <Link to="/chit-auctions-list/chit-auctions/chit-auctions-detail" className="btn main-btn">
                  Confirm Record
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
