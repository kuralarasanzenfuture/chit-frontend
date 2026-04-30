import React, { useState } from "react";
import "./ChitAuctionInvoice.css";

/* ================================
   MAIN PAGE
================================ */
export const ChitAuctionDetail = () => {
  const [showInvoice, setShowInvoice] = useState(false);

  return (
    <>
      <div className="wrapper_header mb-3">
        <div>
          <h5 className="header_title">Final Review & Manual Trigger</h5>
          <p className="header_text">
            Validate the winning and distribution calculations. This action is
            irreversible once confirmed and will update the financial ledger for
            all members.
          </p>
        </div>
      </div>

      <div className="settlement_wrapper">
        {/* TOP CARD */}
        <div className="winner_card">
          <div className="winner_left">
            <div className="avatar-big" style={{ background: "#93c5fd" }}>
              MS
            </div>
            <div>
              <small>AUCTION WINNER</small>
              <h2>Marcus V. Sterling</h2>
              <p>Member ID: CF-2024-0082</p>
            </div>
          </div>

          <div className="winner_bid">
            <small>WINNING BID</small>
            <h3>₹42,500.00</h3>
            <p>Auction Discount ₹7,500</p>
          </div>

          <div className="winner_stats">
            <small>Installment Step</small>
            <h4>8 of 20</h4>
            <span>Current Installment Stage</span>
          </div>
        </div>

        {/* TABLE */}
        <div className="ledger_card">
          <div className="ledger_head">
            <h6>SETTLEMENT PREVIEW LEDGER</h6>
          </div>

          <table className="ledger_table">
            <thead>
              <tr>
                <th>ALLOCATION DETAIL</th>
                <th>PERCENTAGE</th>
                <th className="text-end">CALCULATED AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Chit Value
                  <small>Total Chit Amount</small>
                </td>
                <td>100%</td>
                <td className="text-end">₹10,000</td>
              </tr>
              <tr>
                <td>
                  Bid Amount
                  <small>Winning Auction Bid</small>
                </td>
                <td>90%</td>
                <td className="text-end">₹9,000</td>
              </tr>
              <tr>
                <td>
                  Discount
                  <small>Chit Value - Bid Amount</small>
                </td>
                <td>10%</td>
                <td className="text-end">₹1,000</td>
              </tr>
              <tr>
                <td className="text-danger">
                  Commission (5%)
                  <small>Foreman Management Fee</small>
                </td>
                <td className="text-danger">5%</td>
                <td className="text-end text-danger">₹50</td>
              </tr>
              <tr>
                <td className="text-success">
                  Dividend per Member
                  <small>Discount shared among members</small>
                </td>
                <td className="text-success">--</td>
                <td className="text-end text-success">₹47.50</td>
              </tr>
              <tr>
                <td className="text-primary fw-bold">
                  Net to Winner
                  <small>Bid Amount - Commission</small>
                </td>
                <td className="text-primary fw-bold">--</td>
                <td className="text-end text-primary fw-bold">₹8,950</td>
              </tr>
            </tbody>
          </table>

          <div className="text-end mt-3">
            <button
              className="btn filter-btn"
              onClick={() => setShowInvoice(true)}
            >
              Invoice Generate
            </button>
          </div>
        </div>
      </div>

      {/* INVOICE MODAL */}
      {showInvoice && (
        <InvoiceModal onClose={() => setShowInvoice(false)} />
      )}
    </>
  );
};

/* ================================
   INVOICE MODAL
================================ */
const InvoiceModal = ({ onClose }) => {
  const handlePrint = () => window.print();

  return (
    <div className="invoice_overlay">
      <div className="invoice_modal" id="invoicePrint">

        {/* ── HEADER BAND ── */}
        <div className="inv_header_band">
          <div className="inv_watermark">INVOICE</div>

          <div className="inv_header_grid">
            {/* Left: Brand */}
            <div className="inv_brand">
              <div className="inv_badge">
                <span className="inv_badge_dot" />
                <span className="inv_badge_text">Chit Fund Settlement</span>
              </div>
              <h1 className="inv_brand_name">Zenfuture Chit Pro</h1>
              <p className="inv_brand_sub">Certified Financial Management System</p>
            </div>

            {/* Right: Meta */}
            <div className="inv_meta">
              <p className="inv_meta_label">Invoice Number</p>
              <p className="inv_meta_num">#CF-INV-2024-0082</p>
              <div className="inv_meta_grid">
                <span className="inv_ml">Issue Date</span>
                <span className="inv_mv">17 April 2026</span>
                <span className="inv_ml">Chit Group</span>
                <span className="inv_mv">PREMIUM-20</span>
                <span className="inv_ml">Installment</span>
                <span className="inv_mv">8 of 20</span>
                <span className="inv_ml">Status</span>
                <span className="inv_mv inv_status">CONFIRMED</span>
              </div>
            </div>
          </div>
        </div>

        {/* gold rule */}
        <div className="inv_gold_rule" />

        {/* ── BODY ── */}
        <div className="inv_body">

          {/* Section: Winner */}
          <div className="inv_section_header">
            <span className="inv_section_label">Auction Winner</span>
            <div className="inv_section_line" />
          </div>

          <div className="inv_winner_card">
            <div className="inv_winner_accent" />
            <div className="inv_winner_content">
              <div className="inv_winner_left">
                <div className="inv_avatar">MS</div>
                <div>
                  <p className="inv_winner_label">Member</p>
                  <p className="inv_winner_name">Marcus V. Sterling</p>
                  <p className="inv_winner_id">Member ID: CF-2024-0082</p>
                </div>
              </div>
              <div className="inv_winner_stats">
                <div className="inv_stat">
                  <p className="inv_stat_label">Winning Bid</p>
                  <p className="inv_stat_val">₹42,500</p>
                  <p className="inv_stat_note">Auction discount ₹7,500</p>
                </div>
                <div className="inv_stat">
                  <p className="inv_stat_label">Net Disbursement</p>
                  <p className="inv_stat_val inv_stat_primary">₹8,950</p>
                  <p className="inv_stat_note">After foreman commission</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Ledger */}
          <div className="inv_section_header">
            <span className="inv_section_label">Settlement Ledger</span>
            <div className="inv_section_line" />
          </div>

          <table className="inv_table">
            <thead>
              <tr>
                <th className="inv_th">Allocation Detail</th>
                <th className="inv_th inv_th_center">Percentage</th>
                <th className="inv_th inv_th_right">Calculated Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="inv_row_even">
                <td className="inv_td_main">
                  Chit Value
                  <small className="inv_td_sub">Total Chit Amount</small>
                </td>
                <td className="inv_td_pct">100%</td>
                <td className="inv_td_amt">₹10,000</td>
              </tr>
              <tr>
                <td className="inv_td_main">
                  Bid Amount
                  <small className="inv_td_sub">Winning Auction Bid</small>
                </td>
                <td className="inv_td_pct">90%</td>
                <td className="inv_td_amt">₹9,000</td>
              </tr>
              <tr className="inv_row_even">
                <td className="inv_td_main">
                  Discount
                  <small className="inv_td_sub">Chit Value − Bid Amount</small>
                </td>
                <td className="inv_td_pct">10%</td>
                <td className="inv_td_amt">₹1,000</td>
              </tr>
              <tr>
                <td className="inv_td_main inv_td_danger">
                  Commission (5%)
                  <small className="inv_td_sub">Foreman Management Fee</small>
                </td>
                <td className="inv_td_pct inv_td_danger">5%</td>
                <td className="inv_td_amt inv_td_danger">₹50</td>
              </tr>
              <tr className="inv_row_even">
                <td className="inv_td_main inv_td_success">
                  Dividend per Member
                  <small className="inv_td_sub">Discount shared among members</small>
                </td>
                <td className="inv_td_pct inv_td_success">—</td>
                <td className="inv_td_amt inv_td_success">₹47.50</td>
              </tr>
              <tr>
                <td className="inv_td_main inv_td_primary inv_td_bold">
                  Net to Winner
                  <small className="inv_td_sub">Bid Amount − Commission</small>
                </td>
                <td className="inv_td_pct inv_td_primary inv_td_bold">—</td>
                <td className="inv_td_amt inv_td_primary inv_td_bold">₹8,950</td>
              </tr>
            </tbody>
          </table>

          {/* Totals */}
          {/* <div className="inv_totals_wrap">
            <div className="inv_totals">
              <div className="inv_total_row">
                <span className="inv_total_label">Gross Chit Value</span>
                <span className="inv_total_val">₹10,000.00</span>
              </div>
              <div className="inv_total_row">
                <span className="inv_total_label">Foreman Commission</span>
                <span className="inv_total_val inv_td_danger">− ₹50.00</span>
              </div>
              <div className="inv_total_row">
                <span className="inv_total_label">Member Dividend</span>
                <span className="inv_total_val inv_td_success">+ ₹47.50</span>
              </div>
              <div className="inv_grand_row">
                <span className="inv_grand_label">Net to Winner</span>
                <span className="inv_grand_val">₹8,950.00</span>
              </div>
            </div>
          </div> */}

         
        </div>

        {/* thin divider */}
        <div className="inv_thin_rule" />

        {/* ── FOOTER ── */}
        <div className="inv_footer_band">
          <div className="inv_footer_text">
            <p>This document is computer-generated and legally binding upon confirmation.</p>
            <p>ChitFund Pro · Registered under Chit Funds Act, 1982 · GSTIN: 33AABCC1234D1ZX</p>
          </div>
         
        </div>

        {/* ── ACTION BAR (hidden on print) ── */}
        <div className="inv_action_bar no_print">
          <button className="inv_btn_close" onClick={onClose}>
            ✕ Close
          </button>
          <button className="inv_btn_print" onClick={handlePrint}>
            ⎙ Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
};