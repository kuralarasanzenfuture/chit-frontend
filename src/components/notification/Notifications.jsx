import React from "react";
import "./Notifications.css";

export const Notifications = () => {
  return (
    <>
      {/* HEADER */}
      <div className="wrapper_header mb-3">
        <div>
          <h5 className="header_title">Notifications</h5>
          <p className="header_text">
            Stay updated with payments, auctions and system alerts.
          </p>
        </div>
      </div>

      {/* 🔥 Bootstrap Layout */}
      <div className="container-fluid">
        <div className="row g-3">

          {/* LEFT — SIDEBAR */}
          <div className="col-lg-3 col-md-4">
            <div className="notif_sidebar">

              <div className="notif_sidebar_card">
                <p className="notif_sidebar_head">Filter by Type</p>

                <button className="notif_filter_btn notif_filter_active">
                  <span>All</span>
                  <span className="notif_filter_badge">3</span>
                </button>

                <button className="notif_filter_btn">
                  <span>Payment</span>
                  <span className="notif_filter_badge">1</span>
                </button>

                <button className="notif_filter_btn">
                  <span>Auction</span>
                  <span className="notif_filter_badge">1</span>
                </button>

                <button className="notif_filter_btn">
                  <span>Alert</span>
                  <span className="notif_filter_badge">1</span>
                </button>
              </div>

              <div className="notif_sidebar_card mt-3">
                <p className="notif_sidebar_head">Quick Actions</p>

                <button className="notif_quick_btn">
                  ✓ Mark all as read
                </button>

                <button className="notif_quick_btn">
                  ◉ Unread only
                </button>
              </div>

              {/* Stats */}
              <div className="row mt-3 g-2">
                <div className="col-6">
                  <div className="notif_stat_card">
                    <span className="notif_stat_val">3</span>
                    <span className="notif_stat_label">Unread</span>
                  </div>
                </div>

                <div className="col-6">
                  <div className="notif_stat_card">
                    <span className="notif_stat_val">8</span>
                    <span className="notif_stat_label">Total</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT — MAIN */}
          <div className="col-lg-9 col-md-8">
            <div className="notif_main">

              {/* Topbar */}
              <div className="notif_topbar mb-3">
                <div className="notif_topbar_left">
                  <h6 className="notif_topbar_title mb-0">
                    All Notifications
                  </h6>
                  <span className="notif_unread_pill">3 unread</span>
                </div>

                <button className="btn main-btn">
                  Mark All Read
                </button>
              </div>

              {/* GROUP */}
              <div className="notif_group">
                <div className="notif_date_sep">
                  <div className="notif_sep_line" />
                  <span className="notif_sep_label">Today</span>
                  <div className="notif_sep_line" />
                </div>

                {/* ITEM */}
                <div className="notif_item notif_item_unread">
                  <div
                    className="notif_icon_wrap"
                    style={{ background: "#f0fdf4", color: "#22c55e" }}
                  >
                    <i className="fi fi-rs-indian-rupee-sign"></i>
                  </div>

                  <div className="notif_content">
                    <div className="notif_content_top">
                      <span className="notif_item_title">
                        Payment Received
                      </span>
                      <span className="notif_type_badge">
                        Payment
                      </span>
                    </div>

                    <p className="notif_item_msg">
                      Arun Kumar paid ₹25,000 for Gold Savings.
                    </p>

                    <span className="notif_item_time">
                      2 mins ago
                    </span>
                  </div>

                  <div className="notif_actions">
                    <button className="notif_act_btn">✓</button>
                    <button className="notif_act_btn">✕</button>
                  </div>
                </div>

                {/* ITEM */}
                <div className="notif_item notif_item_unread">
                  <div
                    className="notif_icon_wrap"
                    style={{ background: "#eff6ff", color: "#3b82f6" }}
                  >
                    <i className="fi fi-rs-auction"></i>
                  </div>

                  <div className="notif_content">
                    <div className="notif_content_top">
                      <span className="notif_item_title">
                        Auction Completed
                      </span>
                      <span className="notif_type_badge">
                        Auction
                      </span>
                    </div>

                    <p className="notif_item_msg">
                      Auction completed successfully.
                    </p>

                    <span className="notif_item_time">
                      18 mins ago
                    </span>
                  </div>

                  <div className="notif_actions">
                    <button className="notif_act_btn">✓</button>
                    <button className="notif_act_btn">✕</button>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
};