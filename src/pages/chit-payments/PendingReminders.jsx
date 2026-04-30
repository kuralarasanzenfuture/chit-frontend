import React, { useState } from "react";
import "./ChitPayments.css";
import { SinglePaymentModal } from "./PaymentModals";

/* ── helpers ── */
const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#6366f1", "#8b5cf6"];
const getColor    = (i) => COLORS[i % COLORS.length];
const getInitials = (n) => n.split(" ").map((x) => x[0]).join("").toUpperCase();

const PENALTY_RATE = 1.5; // % per month

function calcPenalty(pendingAmt, days) {
  if (days <= 0 || pendingAmt <= 0) return 0;
  return Math.round(pendingAmt * (PENALTY_RATE / 100) * (days / 30));
}

/* ── Data ── */
const overdueData = [
  {
    id         : 1,
    name       : "Arun Kumar",
    phone      : "9876543210",
    customerId : "CUS-1001",
    address    : "12, Anna Nagar, Madurai",
    group      : "Gold Savings",
    chitValue  : "₹5,00,000",
    installment: "14 / 20",
    monthly    : "₹25,000",
    pending    : 18000,
    overdueDays: 12,
    status     : "Running",
    lastPaid   : "10 Mar 2026",
  },
  {
    id         : 2,
    name       : "Ravi Kumar",
    phone      : "9876543211",
    customerId : "CUS-1002",
    address    : "45, KK Nagar, Madurai",
    group      : "Family Plan",
    chitValue  : "₹2,00,000",
    installment: "08 / 12",
    monthly    : "₹16,500",
    pending    : 25000,
    overdueDays: 5,
    status     : "Running",
    lastPaid   : "15 Mar 2026",
  },
  {
    id         : 4,
    name       : "Vijay Raj",
    phone      : "9876543213",
    customerId : "CUS-1004",
    address    : "9, Thirunagar, Madurai",
    group      : "Gold Savings",
    chitValue  : "₹5,00,000",
    installment: "06 / 20",
    monthly    : "₹25,000",
    pending    : 16500,
    overdueDays: 21,
    status     : "Running",
    lastPaid   : "18 Feb 2026",
  },
  {
    id         : 5,
    name       : "Mani Selvam",
    phone      : "9876543214",
    customerId : "CUS-1005",
    address    : "21, Villapuram, Madurai",
    group      : "Silver Growth",
    chitValue  : "₹1,50,000",
    installment: "09 / 12",
    monthly    : "₹12,500",
    pending    : 33000,
    overdueDays: 3,
    status     : "Running",
    lastPaid   : "05 Apr 2026",
  },
  {
    id         : 7,
    name       : "Prakash",
    phone      : "9876543216",
    customerId : "CUS-1007",
    address    : "56, Teppakulam, Madurai",
    group      : "Family Plan",
    chitValue  : "₹2,00,000",
    installment: "10 / 12",
    monthly    : "₹16,500",
    pending    : 12500,
    overdueDays: 7,
    status     : "Running",
    lastPaid   : "20 Mar 2026",
  },
  {
    id         : 9,
    name       : "Gokul",
    phone      : "9876543218",
    customerId : "CUS-1009",
    address    : "88, Mattuthavani, Madurai",
    group      : "Gold Savings",
    chitValue  : "₹5,00,000",
    installment: "13 / 20",
    monthly    : "₹25,000",
    pending    : 8250,
    overdueDays: 14,
    status     : "Running",
    lastPaid   : "02 Mar 2026",
  },
];

export const PendingReminders = () => {
  const [sortBy,        setSort]      = useState("days");   // days | amount | penalty
  const [filterDays,    setFilter]    = useState("all");    // all | 1-7 | 8-15 | 15+
  const [selected,      setSelected]  = useState([]);
  const [toastMsg,      setToast]     = useState("");
  const [payModal,      setPayModal]  = useState(null);     // { customer, group }
  const [sentList,      setSent]      = useState([]);

  /* Computed penalty for each row */
  const withPenalty = overdueData.map((c) => ({
    ...c,
    penalty  : calcPenalty(c.pending, c.overdueDays),
    totalDue : c.pending + calcPenalty(c.pending, c.overdueDays),
  }));

  /* Filter */
  const filtered = withPenalty.filter((c) => {
    if (filterDays === "1-7")  return c.overdueDays >= 1  && c.overdueDays <= 7;
    if (filterDays === "8-15") return c.overdueDays >= 8  && c.overdueDays <= 15;
    if (filterDays === "15+")  return c.overdueDays > 15;
    return true;
  });

  /* Sort */
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "days")    return b.overdueDays - a.overdueDays;
    if (sortBy === "amount")  return b.totalDue    - a.totalDue;
    if (sortBy === "penalty") return b.penalty     - a.penalty;
    return 0;
  });

  /* Toast helper */
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  /* Toggle select */
  const toggleSelect = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  const toggleAll = () =>
    setSelected(selected.length === sorted.length ? [] : sorted.map((c) => c.id));

  /* WhatsApp single */
  const sendWhatsApp = (c) => {
    const msg = encodeURIComponent(
      `*Payment Reminder*\n` +
      `Dear ${c.name},\n\n` +
      `This is a reminder that your chit fund installment for *${c.group}* is overdue by *${c.overdueDays} days*.\n\n` +
      `Outstanding Amount: ₹${c.pending.toLocaleString("en-IN")}\n` +
      (c.penalty > 0 ? `Late Fee (${PENALTY_RATE}%/month): ₹${c.penalty.toLocaleString("en-IN")}\n` : "") +
      `*Total Due: ₹${c.totalDue.toLocaleString("en-IN")}*\n\n` +
      `Please pay at the earliest to avoid further charges.\n` +
      `Contact: +91 98765 00000`
    );
    window.open(`https://wa.me/91${c.phone}?text=${msg}`, "_blank");
    setSent((prev) => [...prev, c.id]);
    showToast(`Reminder sent to ${c.name}`);
  };

  /* WhatsApp bulk */
  const sendBulk = () => {
    const targets = sorted.filter((c) => selected.includes(c.id));
    targets.forEach((c) => sendWhatsApp(c));
    showToast(`${targets.length} reminder${targets.length !== 1 ? "s" : ""} sent via WhatsApp`);
    setSelected([]);
  };

  /* Summary stats */
  const totalPending  = withPenalty.reduce((s, c) => s + c.pending,  0);
  const totalPenalty  = withPenalty.reduce((s, c) => s + c.penalty,  0);
  const totalDue      = withPenalty.reduce((s, c) => s + c.totalDue, 0);
  const criticalCount = withPenalty.filter((c) => c.overdueDays > 15).length;

  return (
    <>
      {/* ── Toast ── */}
      {toastMsg && (
        <div
          style={{
            position: "fixed", bottom: 24, right: 24,
            background: "#1f2937", color: "#fff",
            padding: "10px 20px", borderRadius: 8,
            fontSize: ".82rem", zIndex: 2000,
            animation: "none",
            boxShadow: "0 4px 16px rgba(0,0,0,.2)",
          }}
        >
          <i className="bi bi-check-circle-fill me-2" style={{ color: "#4ade80" }} />
          {toastMsg}
        </div>
      )}

      {/* ── Header ── */}
      <div className="wrapper_header">
        <div>
          <h5 className="header_title">Pending &amp; Reminders</h5>
          <p className="header_text">Overdue installments, late fee calculation and WhatsApp reminders</p>
        </div>
      </div>

      {/* ── Summary Stats ── */}
      <div className="row gy-3 mb-3">
        {[
          { label: "Overdue Customers",   val: withPenalty.length,                          cls: "",       icon: "bi-people-fill" },
          { label: "Total Pending",        val: "₹" + totalPending.toLocaleString("en-IN"), cls: "danger", icon: "bi-exclamation-circle-fill" },
          { label: `Late Fees (${PENALTY_RATE}%/mo)`, val: "₹" + totalPenalty.toLocaleString("en-IN"), cls: "warn", icon: "bi-clock-history" },
          { label: "Total Recoverable",   val: "₹" + totalDue.toLocaleString("en-IN"),     cls: "",       icon: "bi-cash-stack" },
          { label: "Critical (>15 days)", val: criticalCount,                               cls: "danger", icon: "bi-fire" },
        ].map((s, i) => (
          <div className="col-lg col-md-4 col-6" key={i}>
            <div className="summary_stat_card">
              <div className="stat_label">
                <i className={`bi ${s.icon} me-1`} />
                {s.label}
              </div>
              <div className={`stat_value ${s.cls}`}>{s.val}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Info Banner: Penalty Rule ── */}
      <div className="d-flex align-items-start gap-2 mb-3 p-3 rounded"
        style={{ background: "#fef3c7", border: "1px solid #fcd34d", fontSize: ".8rem", color: "#78350f" }}>
        <i className="bi bi-info-circle-fill mt-1 flex-shrink-0" />
        <div>
          <strong>Late Fee Policy:</strong> A penalty of <strong>{PENALTY_RATE}% per month</strong> is levied on
          outstanding installment amounts. GST at 18% is applicable on late fee charges where relevant.
          Customers overdue beyond 15 days are flagged as <strong>Critical</strong>.
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className="d-flex gap-2 align-items-center flex-wrap mb-2">
        <span className="fs-12 text-muted">Filter:</span>
        {[
          { k: "all",  label: "All" },
          { k: "1-7",  label: "1–7 days" },
          { k: "8-15", label: "8–15 days" },
          { k: "15+",  label: "15+ days" },
        ].map((f) => (
          <button
            key={f.k}
            className="btn btn-sm"
            style={{
              fontSize: ".75rem",
              background : filterDays === f.k ? "#4f46e5" : "#fff",
              color      : filterDays === f.k ? "#fff"    : "#374151",
              border     : "1px solid " + (filterDays === f.k ? "#4f46e5" : "#e5e7eb"),
            }}
            onClick={() => setFilter(f.k)}
          >
            {f.label}
          </button>
        ))}

        <span className="ms-2 fs-12 text-muted">Sort:</span>
        <select
          className="form-select form-select-sm"
          style={{ width: 140 }}
          value={sortBy}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="days">By Overdue Days</option>
          <option value="amount">By Amount</option>
          <option value="penalty">By Penalty</option>
        </select>

        <div className="ms-auto d-flex gap-2">
          {selected.length > 0 && (
            <button className="btn_whatsapp" onClick={sendBulk}>
              <i className="bi bi-whatsapp me-1" />
              Send {selected.length} Reminder{selected.length !== 1 ? "s" : ""}
            </button>
          )}
          <button
            className="btn_whatsapp"
            onClick={() => {
              sorted.forEach((c) => sendWhatsApp(c));
              showToast(`All ${sorted.length} reminders sent`);
            }}
          >
            <i className="bi bi-send-fill me-1" />
            Send All Reminders
          </button>
        </div>
      </div>

      {/* ── Pending Table ── */}
      <div className="wrapper-table-outer">
        <div className="table-header d-flex justify-content-between align-items-center">
          <h6>
            <i className="bi bi-exclamation-triangle-fill me-2 text-warning" />
            Overdue List &nbsp;
            <span className="badge bg-danger">{sorted.length}</span>
          </h6>
          {selected.length > 0 && (
            <span className="fs-12 text-muted">{selected.length} selected</span>
          )}
        </div>

        <div className="table-responsive">
          <table className="premium_table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selected.length === sorted.length && sorted.length > 0}
                    onChange={toggleAll}
                    style={{ cursor: "pointer", accentColor: "#4f46e5" }}
                  />
                </th>
                <th>Customer</th>
                <th>Group</th>
                <th>Last Paid</th>
                <th>Overdue</th>
                <th>Outstanding</th>
                <th>Late Fee</th>
                <th>Total Due</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center py-4 text-muted">
                    No overdue records found for this filter.
                  </td>
                </tr>
              )}
              {sorted.map((c, i) => (
                <tr
                  key={c.id}
                  style={{ background: c.overdueDays > 15 ? "#fff5f5" : undefined }}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={selected.includes(c.id)}
                      onChange={() => toggleSelect(c.id)}
                      style={{ cursor: "pointer", accentColor: "#4f46e5" }}
                    />
                  </td>

                  <td>
                    <div className="customer_cell">
                      <span className="name_badge" style={{ background: getColor(i) }}>
                        {getInitials(c.name)}
                      </span>
                      <div>
                        <div className="fs-13 fw-700">{c.name}</div>
                        <div className="fs-12 text-muted">{c.customerId} · {c.phone}</div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="fs-13">{c.group}</div>
                    <div className="fs-12 text-muted">{c.installment}</div>
                  </td>

                  <td className="fs-12">{c.lastPaid}</td>

                  <td>
                    <span className={c.overdueDays > 15 ? "overdue-badge" : "penalty-badge"}>
                      <i className="bi bi-clock me-1" />
                      {c.overdueDays} days
                    </span>
                  </td>

                  <td className="text-danger-custom fw-700">
                    ₹{c.pending.toLocaleString("en-IN")}
                  </td>

                  <td>
                    {c.penalty > 0 ? (
                      <span className="penalty-badge">
                        +₹{c.penalty.toLocaleString("en-IN")}
                      </span>
                    ) : (
                      <span className="text-muted fs-12">—</span>
                    )}
                  </td>

                  <td className="fw-700" style={{ color: "#1f2937" }}>
                    ₹{c.totalDue.toLocaleString("en-IN")}
                  </td>

                  <td>
                    <div className="d-flex gap-1 flex-wrap">
                      <button
                        className="btn_whatsapp"
                        style={{ fontSize: ".72rem", padding: "3px 10px" }}
                        onClick={() => sendWhatsApp(c)}
                      >
                        <i className="bi bi-whatsapp" />
                        {sentList.includes(c.id) ? " Sent" : " Remind"}
                      </button>
                      <button
                        className="row_pay_btn"
                        style={{ fontSize: ".72rem" }}
                        onClick={() =>
                          setPayModal({
                            customer: {
                              name        : c.name,
                              customerId  : c.customerId,
                              phone       : c.phone,
                              address     : c.address,
                              overdueDays : c.overdueDays,
                            },
                            group: {
                              group       : c.group,
                              chitValue   : c.chitValue,
                              installment : c.installment,
                              monthly     : c.monthly,
                              pending     : "₹" + c.pending.toLocaleString("en-IN"),
                              status      : c.status,
                            },
                          })
                        }
                      >
                        Collect
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="table-footer">
              <tr>
                <td colSpan={5}>
                  <div className="entry-count">
                    Showing {sorted.length} of {withPenalty.length} overdue accounts
                  </div>
                </td>
                <td>
                  <strong className="text-danger-custom">
                    ₹{filtered.reduce((s, c) => s + c.pending, 0).toLocaleString("en-IN")}
                  </strong>
                </td>
                <td>
                  <strong className="text-warn-custom">
                    ₹{filtered.reduce((s, c) => s + c.penalty, 0).toLocaleString("en-IN")}
                  </strong>
                </td>
                <td>
                  <strong>₹{filtered.reduce((s, c) => s + c.totalDue, 0).toLocaleString("en-IN")}</strong>
                </td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* ── Penalty Rate Card ── */}
      <div className="summary_stat_card mt-3">
        <div className="row gy-3 align-items-center">
          <div className="col-md-6">
            <h6 className="fw-700 mb-1">Late Fee Calculation</h6>
            <p className="text-muted fs-12 mb-0">
              Formula: <code>Outstanding × {PENALTY_RATE}% × (Overdue Days / 30)</code>
            </p>
            <p className="text-muted fs-12 mb-0 mt-1">
              GST of 18% is applicable on late fee where service tax is collected.
            </p>
          </div>
          <div className="col-md-6">
            <div className="row gy-2">
              {[
                { label: "Rate",        val: `${PENALTY_RATE}% / month` },
                { label: "Total Fees",  val: "₹" + totalPenalty.toLocaleString("en-IN"), cls: "text-warn-custom" },
                { label: "Critical",   val: `${criticalCount} customers`, cls: "text-danger-custom" },
              ].map((s, i) => (
                <div className="col-4" key={i} style={{ textAlign: "center" }}>
                  <div className="stat_label">{s.label}</div>
                  <div className={`stat_value fs-13 ${s.cls || ""}`} style={{ fontSize: "1rem" }}>{s.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Collect Modal ── */}
      {payModal && (
        <SinglePaymentModal
          group={payModal.group}
          customer={payModal.customer}
          onClose={() => setPayModal(null)}
        />
      )}
    </>
  );
};