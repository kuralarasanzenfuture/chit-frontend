import React, { useState } from "react";
import { Link } from "react-router-dom";

const activityData = [
  {
    id: "#AUC-2024-089",
    chitGroup: "Premium Growth VIII",
    cycle: "Cycle 12/24 • Monthly",
    fundValue: "₹1,20,000",
    winnerBidAmount: "--",
    date: "Oct 24, 2023",
    time: "14:30 PM",
    status: "pending",
    winner: "--",
  },
  {
    id: "#AUC-2024-088",
    chitGroup: "Strategic Equity Alpha",
    cycle: "Cycle 04/12 • Monthly",
    fundValue: "₹4,50,000",
    winnerBidAmount: "₹3,95,000",
    date: "Oct 24, 2023",
    time: "16:00 PM",
    status: "completed",
    winner: "Ravi Kumar",
  },
  {
    id: "#AUC-2024-087",
    chitGroup: "Capital Reserve Alpha",
    cycle: "Cycle 24/24 • Monthly",
    fundValue: "₹75,000",
    winnerBidAmount: "₹68,000",
    date: "Oct 23, 2023",
    time: "10:00 AM",
    status: "completed",
    winner: "Robert Wood",
  },
  {
    id: "#AUC-2024-086",
    chitGroup: "Global Ventures Plus",
    cycle: "Cycle 01/36 • Monthly",
    fundValue: "₹12,00,000",
    winnerBidAmount: "--",
    date: "Oct 22, 2023",
    time: "15:00 PM",
    status: "pending",
    winner: "--",
  },
  {
    id: "#AUC-2024-085",
    chitGroup: "Secure Future Gold",
    cycle: "Cycle 08/20 • Monthly",
    fundValue: "₹2,25,000",
    winnerBidAmount: "₹2,01,000",
    date: "Oct 21, 2023",
    time: "11:30 AM",
    status: "completed",
    winner: "Arun Kumar",
  },
  {
    id: "#AUC-2024-084",
    chitGroup: "Elite Wealth Prime",
    cycle: "Cycle 06/18 • Monthly",
    fundValue: "₹3,75,000",
    winnerBidAmount: "--",
    date: "Oct 20, 2023",
    time: "09:45 AM",
    status: "pending",
    winner: "--",
  },
  {
    id: "#AUC-2024-083",
    chitGroup: "Smart Savings Max",
    cycle: "Cycle 18/24 • Monthly",
    fundValue: "₹1,80,000",
    winnerBidAmount: "₹1,62,500",
    date: "Oct 19, 2023",
    time: "13:15 PM",
    status: "completed",
    winner: "Anitha Raj",
  },
  {
    id: "#AUC-2024-082",
    chitGroup: "Royal Income Plus",
    cycle: "Cycle 10/30 • Monthly",
    fundValue: "₹5,00,000",
    winnerBidAmount: "--",
    date: "Oct 18, 2023",
    time: "12:00 PM",
    status: "pending",
    winner: "--",
  },
  {
    id: "#AUC-2024-081",
    chitGroup: "Future Secure Pro",
    cycle: "Cycle 14/24 • Monthly",
    fundValue: "₹2,90,000",
    winnerBidAmount: "₹2,54,000",
    date: "Oct 17, 2023",
    time: "17:10 PM",
    status: "completed",
    winner: "Kumaravel",
  },
  {
    id: "#AUC-2024-080",
    chitGroup: "Victory Returns XI",
    cycle: "Cycle 02/12 • Monthly",
    fundValue: "₹95,000",
    winnerBidAmount: "--",
    date: "Oct 16, 2023",
    time: "08:30 AM",
    status: "pending",
    winner: "--",
  },
];
const colors = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#6366f1"];

export const ChitAuctionList = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [view, setView] = useState("grid");

  const filteredData = activityData.filter((item) => item.status === activeTab);

  return (
    <>
      <div class="wrapper_header mb-3">
        <div>
          <h5 class="header_title">Auctions Mangement</h5> <p class="header_text">Oversee fund Disbursements and participant bidding history</p>
        </div>
      </div>
      <div class="stack_list">
        <div class="row gy-4">
          <div class="col-lg-3 col-md-3">
            <div class="stack_card">
              <h5 class="stack_title">Total Auctions this month</h5> <p class="stack_count">12</p>
              <small>
                <span class="text-success">+12%</span> vs last Month
              </small>
            </div>
          </div>
          <div class="col-lg-3 col-md-3">
            <div class="stack_card">
              <h5 class="stack_title">Total Fund Value</h5> <p class="stack_count">₹8.4M</p> <small>Assets Under Management</small>
            </div>
          </div>
          <div class="col-lg-3 col-md-3">
            <div class="stack_card">
              <h5 class="stack_title">Total Dividend Distributed</h5> <p class="stack_count">₹1.2M</p>
              <small class="p-1 bg-warning-subtle text-dark rounded-1">Action Required</small>
            </div>
          </div>
          <div class="col-lg-3 col-md-3">
            <div class="stack_card">
              <h5 class="stack_title">Average Bit Rate</h5> <p class="stack_count">4.2%</p> <small>Across All Chit Cycles</small>
            </div>
          </div>
        </div>
      </div>
      <div className="auction_wrapper mt-3">
        {/* TOP BAR */}
        <div className="auction_topbar">
          <div className="auction_tabs">
            <button className={activeTab === "pending" ? "active" : ""} onClick={() => setActiveTab("pending")}>
              Pending
            </button>

            <button className={activeTab === "completed" ? "active" : ""} onClick={() => setActiveTab("completed")}>
              Completed
            </button>
          </div>

          <div className="view_toggle">
            <button className={view === "grid" ? "active" : ""} onClick={() => setView("grid")}>
              <i className="bi bi-grid"></i> Grid
            </button>

            <button className={view === "list" ? "active" : ""} onClick={() => setView("list")}>
              <i className="bi bi-list-task"></i> List
            </button>
          </div>
        </div>

        {/* LIST VIEW */}
        {view === "list" && (
          <div className="table_responsive">
            <table className="auction_table">
              <thead>
                <tr>
                  <th>AUCTION ID</th>
                  <th>CHIT GROUP NAME</th>
                  <th>FUND VALUE</th>
                  <th>DATE / TIME</th>
                  <th>STATUS</th>
                  <th>WINNER BID</th>
                  <th>WINNER</th>
                  {activeTab === "pending" && <th></th>}
                </tr>
              </thead>

              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>

                    <td>
                      <h6>{item.chitGroup}</h6>
                      <small>{item.cycle}</small>
                    </td>

                    <td>{item.fundValue}</td>

                    <td>
                      <h6>{item.date}</h6>
                      <small>{item.time}</small>
                    </td>

                    <td>
                      <span className={`status ${item.status}`}>{item.status}</span>
                    </td>

                    <td>{item.winnerBidAmount}</td>

                    <td>{item.winner}</td>

                    {activeTab === "pending" && (
                      <td>
                        <Link to="/chit-auctions" className="btn main-btn">
                          Record Auction
                        </Link>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* GRID VIEW */}
        {view === "grid" && (
          <div className="row g-4 mt-1">
            {filteredData.map((item, index) => (
              <div className="col-lg-4 col-md-6" key={index}>
                <div className="auction_grid_card">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <small className="text-muted">{item.id}</small>
                      <h5>{item.chitGroup}</h5>
                      <p>{item.cycle}</p>
                    </div>

                    <span className={`status ${item.status}`}>{item.status}</span>
                  </div>

                  <div className="grid_info">
                    <div>
                      <small>Fund Value</small>
                      <h6>{item.fundValue}</h6>
                    </div>

                    <div>
                      <small>Winner Bid</small>
                      <h6>{item.winnerBidAmount}</h6>
                    </div>

                    <div>
                      <small>Date</small>
                      <h6>{item.date}</h6>
                    </div>

                    <div>
                      <small>Winner</small>
                      <h6>{item.winner}</h6>
                    </div>
                  </div>

                  {activeTab === "pending" && (
                    <Link to="/chit-auctions-list/chit-auctions" className="btn main-btn w-100 mt-3">
                      Record Auction
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
