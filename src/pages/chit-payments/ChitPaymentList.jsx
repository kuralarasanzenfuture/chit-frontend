import React, { useState } from "react";
import "./ChitPayments.css";
import { SinglePaymentModal, BulkPaymentModal } from "./PaymentModals";
import { ReceiptModal } from "./ReceiptModal";

/* ── helpers ── */
const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#6366f1"];
const getColor    = (i) => COLORS[i % COLORS.length];
const getInitials = (g) => g.split(" ").map((n) => n[0]).join("").toUpperCase();

const PENALTY_RATE = 1.5;

/* ── Static customer data ── */
const customer = {
  name      : "Arun Kumar",
  customerId: "CUS-1001",
  phone     : "9876543210",
  address   : "12, Anna Nagar, Madurai",
  joinedDate: "12 Jan 2024",
  totalPaid : "₹1,25,000",
  pending   : "₹18,000",
  groups    : 3,
};

/* ── Group data ─────────────────────────────────────────────────
   overdueDays added per group — the penalty shown in
   SinglePaymentModal is now calculated from THIS group's
   overdueDays, not a single customer-level value.
────────────────────────────────────────────────────────────────── */
const groupData = [
  {
    group      : "Gold Savings",
    chitValue  : "₹5,00,000",
    installment: "14 / 20",
    monthly    : "₹25,000",
    paid       : "₹3,50,000",
    pending    : "₹1,50,000",
    pendingAmt : 150000,
    status     : "Running",
    dueDate    : "2026-03-10",
    overdueDays: 12,          // ← overdue by 12 days
  },
  {
    group      : "Family Plan",
    chitValue  : "₹2,00,000",
    installment: "08 / 12",
    monthly    : "₹16,500",
    paid       : "₹1,32,000",
    pending    : "₹68,000",
    pendingAmt : 68000,
    status     : "Running",
    dueDate    : "2026-04-20",
    overdueDays: 1,           // ← just 1 day overdue
  },
  {
    group      : "Silver Growth",
    chitValue  : "₹1,50,000",
    installment: "12 / 12",
    monthly    : "₹12,500",
    paid       : "₹1,50,000",
    pending    : "₹0",
    pendingAmt : 0,
    status     : "Completed",
    dueDate    : null,
    overdueDays: 0,           // ← completed, no overdue
  },
];

const payments = [
  { date: "10 Apr 2026", group: "Gold Savings",  amount: "₹25,000", mode: "Cash", type: "Single", receiptNo: "RCP-11001" },
  { date: "10 Apr 2026", group: "Bulk Payment",  amount: "₹41,500", mode: "UPI",  type: "Bulk",   receiptNo: "RCP-11002" },
  { date: "10 Mar 2026", group: "Family Plan",   amount: "₹16,500", mode: "Bank", type: "Single", receiptNo: "RCP-10991" },
];

export const ChitPaymentList = () => {
  const [showSingleModal, setShowSingleModal] = useState(false);
  const [showBulkModal,   setShowBulkModal]   = useState(false);
  const [activeGroup,     setActiveGroup]     = useState(null);
  const [viewReceipt,     setViewReceipt]     = useState(null);

  /* ── Reminder state ── */
  const [reminderModal,   setReminderModal]   = useState(null);
  const [reminderChannel, setReminderChannel] = useState("whatsapp");
  const [reminderMsg,     setReminderMsg]     = useState("");
  const [reminderSending, setReminderSending] = useState(false);
  const [reminderSent,    setReminderSent]    = useState(false);

  const openReminder = (group = null, type = "single") => {
    const defaultMsg =
      type === "bulk"
        ? `Dear ${customer.name}, you have pending payments across multiple chit groups. Kindly clear your dues at the earliest. — Dheeran Traders`
        : `Dear ${customer.name}, your payment of ${group?.monthly} for "${group?.group}" is due. Pending: ${group?.pending}. Please pay at the earliest. — Dheeran Traders`;
    setReminderMsg(defaultMsg);
    setReminderChannel("whatsapp");
    setReminderSent(false);
    setReminderModal({ group, type });
  };

  const closeReminder = () => { setReminderModal(null); setReminderSent(false); };

  const sendReminder = () => {
    setReminderSending(true);
    setTimeout(() => { setReminderSending(false); setReminderSent(true); }, 1500);
  };

  /* ── Pass group-specific overdueDays into SinglePaymentModal ──
     The modal calculates penalty from customer.overdueDays.
     We override it with the specific group's overdueDays so the
     late fee shown is correct for THAT group, not the global value. */
  const openSingle = (item) => {
    setActiveGroup(item);
    setShowSingleModal(true);
  };
  const closeSingle = () => { setShowSingleModal(false); setActiveGroup(null); };

  /* Customer object merged with the active group's overdueDays */
  const customerForModal = activeGroup
    ? { ...customer, overdueDays: activeGroup.overdueDays }
    : customer;

  return (
    <>
      {/* ── Page Header ── */}
      <div className="wrapper_header mb-3">
        <div>
          <h5 className="header_title">Customer Payment Detail</h5>
          <p className="header_text">Joined groups, installment status, payment history and payment actions.</p>
        </div>
      </div>

      {/* ── Profile Card ── */}
      <div className="stack_box_list mb-3">
        <div className="row gy-4">
          <div className="col-lg-3">
            <div className="customer_detail_card">
              <div className="avatar_circle">AK</div>
              <div>
                <h3>{customer.name}</h3>
                <p>ID: {customer.customerId}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="stack_box blue">
              <span className="stack_icon"><i className="fi fi-rs-chart-mixed-up-circle-dollar" /></span>
              <div className="d-flex justify-content-between gap-2">
                <div className="content">
                  <h5 className="box_text">Total Paid</h5>
                  <h4 className="box_title">₹1,25,000</h4>
                </div>
                <div className="box_icon">
                  <div className="ico icon_batch"><i className="fi fi-rs-plan" /></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="stack_box green">
              <span className="stack_icon"><i className="fi fi-rs-coworking" /></span>
              <div className="d-flex justify-content-between gap-2">
                <div className="content">
                  <h5 className="box_text">Total Pending</h5>
                  <h4 className="box_title">₹18,000</h4>
                </div>
                <div className="box_icon">
                  <div className="ico icon_group"><i className="fi fi-rs-users-alt" /></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="stack_box violet">
              <span className="stack_icon"><i className="fi fi-rs-auction-paddle" /></span>
              <div className="d-flex justify-content-between gap-2">
                <div className="content">
                  <h5 className="box_text">Active Groups</h5>
                  <h4 className="box_title">3</h4>
                </div>
                <div className="box_icon">
                  <div className="ico icon_plan"><i className="fi fi-rs-calendar" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Groups Table ── */}
      <div className="wrapper-table-outer mb-4">
        <div className="table-header d-flex justify-content-between align-items-center">
          <h6>
            <i className="fi fi-rs-wallet-money me-2" />
            Payment List
          </h6>
          <div className="d-flex gap-2">
            <button className="btn reminder-bulk-btn" onClick={() => openReminder(null, "bulk")}>
              <i className="bi bi-bell me-1" /> Send Reminder
            </button>
            <button className="btn filter-btn" onClick={() => setShowBulkModal(true)}>
              <i className="bi bi-stack me-1" /> Bulk Payment
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="premium_table">
            <thead>
              <tr>
                <th>Group Name</th>
                <th>Chit Value</th>
                <th>Installment</th>
                <th>Monthly</th>
                <th>Paid</th>
                <th>Pending</th>
                {/* ── NEW column: per-group overdue + due date ── */}
                <th>Overdue</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {groupData.map((item, i) => (
                <tr key={i}>
                  <td className="customer_cell">
                    <span className="name_badge" style={{ background: getColor(i) }}>
                      {getInitials(item.group)}
                    </span>
                    {item.group}
                  </td>
                  <td>{item.chitValue}</td>
                  <td>
                    <div style={{ fontSize: ".8rem" }}>
                      {item.installment}
                      <div className="mt-1" style={{ height: 4, borderRadius: 2, background: "#e5e7eb", width: 80 }}>
                        <div
                          style={{
                            height: "100%", borderRadius: 2,
                            background: getColor(i),
                            width:
                              (parseInt(item.installment.split("/")[0]) /
                                parseInt(item.installment.split("/")[1])) * 100 + "%",
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td>{item.monthly}</td>
                  <td className="text-success fw-700">{item.paid}</td>
                  <td className={item.pending === "₹0" ? "text-success-custom" : "text-danger-custom fw-700"}>
                    {item.pending}
                  </td>

                  {/* ── Per-group overdue column ─────────────────────────
                      Shows exactly which group is overdue and by how many
                      days, plus the due date. Completed groups show "—".
                  ──────────────────────────────────────────────────────── */}
                  <td>
                    {item.status === "Completed" ? (
                      <span className="text-muted fs-12">—</span>
                    ) : item.overdueDays > 0 ? (
                      <div>
                        <span className="overdue-badge">
                          <i className="bi bi-exclamation-circle" /> {item.overdueDays}d overdue
                        </span>
                        {item.dueDate && (
                          <div className="fs-12 text-muted mt-1">
                            Due: {item.dueDate}
                          </div>
                        )}
                        <div className="fs-12 mt-1" style={{ color: "#b91c1c" }}>
                          Late fee: ₹{Math.round(
                            item.pendingAmt * (PENALTY_RATE / 100) * (item.overdueDays / 30)
                          ).toLocaleString("en-IN")}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <span className="ontime-badge">
                          <i className="bi bi-check-circle" /> On time
                        </span>
                        {item.dueDate && (
                          <div className="fs-12 text-muted mt-1">
                            Due: {item.dueDate}
                          </div>
                        )}
                      </div>
                    )}
                  </td>

                  <td>
                    <span className={`status ${item.status.toLowerCase()}`}>{item.status}</span>
                  </td>

                  <td>
                    {item.status === "Running" ? (
                      <div className="d-flex gap-2 align-items-center">
                        <button className="light-btn" onClick={() => openSingle(item)}>
                          + Add Payment
                        </button>
                        <button
                          className="reminder-icon-btn"
                          title={`Send reminder for ${item.group}`}
                          onClick={() => openReminder(item, "single")}
                        >
                          <i className="bi bi-bell" />
                        </button>
                      </div>
                    ) : (
                      <span className="row_pay_disabled">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Payment History ── */}
      <div className="wrapper-table-outer">
        <div className="table-header d-flex justify-content-between align-items-center">
          <h6>
            <i className="fi fi-rs-rectangle-history-circle-plus me-2" />
            Payment History
          </h6>
          <small
            className="bg-warning-subtle text-dark border border-warning-subtle p-1 rounded-1"
            style={{ fontSize: "12px", fontWeight: "500" }}>
            {payments.length} records
          </small>
        </div>

        <div className="table-responsive">
          <table className="premium_table">
            <thead>
              <tr>
                <th>Receipt No.</th>
                <th>Date</th>
                <th>Group</th>
                <th>Amount</th>
                <th>Mode</th>
                <th>Type</th>
                <th>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((item, i) => (
                <tr key={i}>
                  <td className="fs-12 text-muted">{item.receiptNo}</td>
                  <td>{item.date}</td>
                  <td className="customer_cell">
                    <span className="name_badge" style={{ background: getColor(i) }}>
                      {getInitials(item.group)}
                    </span>
                    {item.group}
                  </td>
                  <td className="text-success fw-700">{item.amount}</td>
                  <td>
                    <span
                      className="badge"
                      style={{
                        background:
                          item.mode === "UPI"  ? "#eef2ff" :
                          item.mode === "Cash" ? "#dcfce7" : "#f0fdf4",
                        color:
                          item.mode === "UPI"  ? "#4f46e5" :
                          item.mode === "Cash" ? "#16a34a" : "#0891b2",
                        fontSize: ".72rem",
                      }}>
                      {item.mode}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${item.type === "Bulk" ? "bg-warning text-dark" : "bg-info text-dark"}`}
                      style={{ fontSize: ".72rem" }}>
                      {item.type}
                    </span>
                  </td>
                  <td>
                    <button
                      className="bi btn btn-sm bg-primary-subtle text-primary border border-primary-subtle"
                      style={{ fontSize: ".75rem", padding: "3px 10px" }}
                      onClick={() =>
                        setViewReceipt({
                          receiptNo    : item.receiptNo,
                          date         : item.date,
                          customer     : customer.name,
                          customerId   : customer.customerId,
                          phone        : customer.phone,
                          address      : customer.address,
                          group        : item.group,
                          chitValue    : "—",
                          installmentNo: "—",
                          installment  : "—",
                          amount       : Number(String(item.amount).replace(/[₹,\s]/g, "")),
                          penalty      : 0,
                          gst          : 0,
                          total        : Number(String(item.amount).replace(/[₹,\s]/g, "")),
                          mode         : item.mode,
                          txnRef       : "",
                          gstEnabled   : false,
                          penaltyRate  : 1.5,
                          overdueDays  : 0,
                        })
                      }>
                      <i className="bi bi-file-earmark-text" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ══════════════════════════════════════
          REMINDER MODAL
      ══════════════════════════════════════ */}
      {reminderModal && (
        <>
          <div className="modal-backdrop fade show" onClick={closeReminder} />
          <div className="modal fade show d-block reminder_modal_wrap" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered reminder_modal_dialog">
              <div className="modal-content reminder_modal_content">

                <div className="reminder_modal_head">
                  <div className="reminder_head_left">
                    <div className="reminder_bell_icon">
                      <i className="bi bi-bell-fill" />
                    </div>
                    <div>
                      <h5 className="reminder_modal_title">
                        {reminderModal.type === "bulk"
                          ? "Bulk Reminder"
                          : `Reminder — ${reminderModal.group?.group}`}
                      </h5>
                      <p className="reminder_modal_sub">
                        {reminderModal.type === "bulk"
                          ? `Notify ${customer.name} for all pending groups`
                          : `Pending: ${reminderModal.group?.pending} · Due: ${reminderModal.group?.dueDate} · Overdue: ${reminderModal.group?.overdueDays}d`}
                      </p>
                    </div>
                  </div>
                  <button className="reminder_close_btn" onClick={closeReminder}>✕</button>
                </div>

                <div className="reminder_modal_body">
                  <div className="reminder_section_label">Send Via</div>
                  <div className="reminder_channels">
                    {[
                      { key: "whatsapp", icon: "bi-whatsapp",  label: "WhatsApp", color: "#25d366" },
                      { key: "sms",      icon: "bi-chat-dots", label: "SMS",       color: "#3b82f6" },
                      { key: "email",    icon: "bi-envelope",  label: "Email",     color: "#6366f1" },
                    ].map((ch) => (
                      <button
                        key={ch.key}
                        className={`reminder_channel_btn ${reminderChannel === ch.key ? "active" : ""}`}
                        style={
                          reminderChannel === ch.key
                            ? { borderColor: ch.color, background: ch.color + "12", color: ch.color }
                            : {}
                        }
                        onClick={() => setReminderChannel(ch.key)}
                      >
                        <i className={`bi ${ch.icon}`} />
                        {ch.label}
                      </button>
                    ))}
                  </div>

                  <div className="reminder_customer_strip">
                    <div className="reminder_cust_avatar">AK</div>
                    <div>
                      <div className="reminder_cust_name">{customer.name}</div>
                      <div className="reminder_cust_phone">
                        <i className="bi bi-telephone me-1" />{customer.phone}
                      </div>
                    </div>
                    {reminderModal.type === "bulk" && (
                      <div className="reminder_cust_badge ms-auto">
                        {groupData.filter(g => g.status === "Running" && g.pending !== "₹0").length} groups pending
                      </div>
                    )}
                  </div>

                  <div className="reminder_section_label">Message</div>
                  <textarea
                    className="reminder_textarea"
                    value={reminderMsg}
                    onChange={(e) => setReminderMsg(e.target.value)}
                    rows={5}
                    placeholder="Type your reminder message..."
                  />
                  <div className="reminder_char_count">{reminderMsg.length} characters</div>
                </div>

                <div className="reminder_modal_footer">
                  <button className="reminder_cancel_btn" onClick={closeReminder}>Cancel</button>
                  {reminderSent ? (
                    <div className="reminder_sent_badge">
                      <i className="bi bi-check-circle-fill me-2" /> Reminder Sent!
                    </div>
                  ) : (
                    <button
                      className="reminder_send_btn"
                      onClick={sendReminder}
                      disabled={reminderSending || !reminderMsg.trim()}
                    >
                      {reminderSending ? (
                        <><span className="reminder_spinner" /> Sending...</>
                      ) : (
                        <>
                          <i className="bi bi-send-fill me-2" />
                          Send {reminderChannel === "whatsapp" ? "WhatsApp" : reminderChannel === "sms" ? "SMS" : "Email"}
                        </>
                      )}
                    </button>
                  )}
                </div>

              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Modals ── */}
      {showSingleModal && (
        <SinglePaymentModal
          group={activeGroup}
          customer={customerForModal}   // ← group-specific overdueDays injected here
          onClose={closeSingle}
          onSubmit={() => {}}
        />
      )}
      {showBulkModal && (
        <BulkPaymentModal
          groupData={groupData}
          customer={customer}
          onClose={() => setShowBulkModal(false)}
        />
      )}
      {viewReceipt && (
        <ReceiptModal receipt={viewReceipt} onClose={() => setViewReceipt(null)} />
      )}
    </>
  );
};