import React, { useState } from "react";
import "./ChitPayments.css";

/* ── helpers ── */
const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#6366f1", "#8b5cf6"];
const getColor    = (i) => COLORS[i % COLORS.length];
const getInitials = (n) => n.split(" ").map((x) => x[0]).join("").toUpperCase();

const TODAY = new Date("2026-04-21").toISOString().split("T")[0];

/* ── Data ── */
const agents = [
  { id: 1, name: "Senthil Kumar", zone: "North Madurai",  target: 30, collected: 24, color: "#3b82f6" },
  { id: 2, name: "Murugan",       zone: "South Madurai",  target: 25, collected: 18, color: "#22c55e" },
  { id: 3, name: "Priya",         zone: "East Madurai",   target: 35, collected: 31, color: "#f59e0b" },
  { id: 4, name: "Ramesh",        zone: "West Madurai",   target: 28, collected: 22, color: "#6366f1" },
];

const customers = [
  { id: 1,  name: "Arun Kumar",   phone: "9876543210", group: "Gold Savings",  monthly: 25000, overdueDays: 12 },
  { id: 2,  name: "Ravi Kumar",   phone: "9876543211", group: "Family Plan",   monthly: 16500, overdueDays: 5  },
  { id: 3,  name: "Suresh Babu",  phone: "9876543212", group: "Silver Growth", monthly: 12500, overdueDays: 0  },
  { id: 4,  name: "Vijay Raj",    phone: "9876543213", group: "Gold Savings",  monthly: 25000, overdueDays: 21 },
  { id: 5,  name: "Mani Selvam",  phone: "9876543214", group: "Family Plan",   monthly: 16500, overdueDays: 3  },
  { id: 6,  name: "Karthik",      phone: "9876543215", group: "Silver Growth", monthly: 12500, overdueDays: 0  },
];

const MODES = ["Cash", "UPI", "Bank Transfer"];

export const DailyCollection = () => {
  const [selectedAgent, setAgent]   = useState(null);
  const [collDate,      setDate]    = useState(TODAY);
  const [entries, setEntries]       = useState(
    customers.map((c) => ({ ...c, amount: "", mode: "Cash", include: true, txnRef: "" }))
  );
  const [submitted, setSubmitted]   = useState(false);
  const [submitSummary, setSummary] = useState(null);

  const agent = agents.find((a) => a.id === selectedAgent);

  const update = (i, key, val) =>
    setEntries((prev) => prev.map((e, idx) => (idx === i ? { ...e, [key]: val } : e)));

  const included   = entries.filter((e) => e.include && e.amount);
  const totalAmt   = included.reduce((s, e) => s + Number(e.amount || 0), 0);
  const cashCount  = included.filter((e) => e.mode === "Cash").length;
  const upiCount   = included.filter((e) => e.mode === "UPI").length;
  const bankCount  = included.filter((e) => e.mode === "Bank Transfer").length;

  const handleSubmit = () => {
    if (!selectedAgent) { alert("Please select a collection agent."); return; }
    if (included.length === 0) { alert("No entries selected or amounts entered."); return; }
    setSummary({
      agent      : agent.name,
      zone       : agent.zone,
      date       : collDate,
      count      : included.length,
      total      : totalAmt,
      cashCount, upiCount, bankCount,
    });
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setSummary(null);
    setEntries(customers.map((c) => ({ ...c, amount: "", mode: "Cash", include: true, txnRef: "" })));
  };

  /* ── Success Screen ── */
  if (submitted && submitSummary) {
    return (
      <>
        <div className="wrapper_header">
          <h5 className="header_title">Daily Collection Entry</h5>
          <p className="header_text">Agent-wise cash and digital payment collection</p>
        </div>

        <div className="wrapper-table-outer">
          <div style={{ padding: "2.5rem", textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: ".75rem" }}>✅</div>
            <h5>Collection Submitted Successfully!</h5>
            <p className="text-muted fs-13 mb-3">
              {submitSummary.date} · Agent: <strong>{submitSummary.agent}</strong> ({submitSummary.zone})
            </p>
            <div className="row justify-content-center gy-2 mb-4" style={{ maxWidth: 500, margin: "auto" }}>
              {[
                { label: "Entries",       val: submitSummary.count },
                { label: "Total Collected", val: "₹" + submitSummary.total.toLocaleString("en-IN") },
                { label: "Cash",           val: submitSummary.cashCount + " entries" },
                { label: "UPI",            val: submitSummary.upiCount  + " entries" },
              ].map((s, i) => (
                <div className="col-6" key={i}>
                  <div className="metric" style={{ background: "#f9fafb", border: "1px solid #e5e7eb" }}>
                    <div style={{ fontSize: ".72rem", color: "#9ca3af", textTransform: "uppercase", letterSpacing: ".4px" }}>{s.label}</div>
                    <div style={{ fontSize: "1.2rem", fontWeight: 700 }}>{s.val}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="filter-btn me-2" onClick={handleReset}>+ New Collection</button>
            <button
              className="btn_whatsapp"
              onClick={() => {
                const msg = encodeURIComponent(
                  `*Daily Collection Report*\nDate: ${submitSummary.date}\nAgent: ${submitSummary.agent}\nZone: ${submitSummary.zone}\nEntries: ${submitSummary.count}\nTotal: ₹${submitSummary.total.toLocaleString("en-IN")}\nCash: ${submitSummary.cashCount} | UPI: ${submitSummary.upiCount} | Bank: ${submitSummary.bankCount}`
                );
                window.open(`https://wa.me/?text=${msg}`, "_blank");
              }}
            >
              <i className="bi bi-whatsapp" /> Share Report
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* ── Header ── */}
      <div className="wrapper_header">
        <div>
          <h5 className="header_title">Daily Collection Entry</h5>
          <p className="header_text">Agent-wise cash and digital payment collection</p>
        </div>
      </div>

      {/* ── Agent Stats ── */}
      <div className="row gy-3 mb-3">
        {agents.map((a) => (
          <div className="col-lg-3 col-md-6" key={a.id}>
            <div
              className={`stack_card agent_card ${selectedAgent === a.id ? "selected" : ""}`}
              style={{ cursor: "pointer" }}
              onClick={() => setAgent(a.id === selectedAgent ? null : a.id)}
            >
              <div className="d-flex align-items-center gap-2 mb-2">
                <div className="agent_avatar" style={{ background: a.color }}>
                  {getInitials(a.name)}
                </div>
                <div>
                  <div className="agent_name">{a.name}</div>
                  <div className="agent_zone">{a.zone}</div>
                </div>
                {selectedAgent === a.id && (
                  <span className="badge ms-auto" style={{ background: "#eef2ff", color: "#4f46e5", fontSize: ".68rem" }}>
                    Selected
                  </span>
                )}
              </div>
              <div className="d-flex justify-content-between fs-12 text-muted">
                <span>Target: {a.target}</span>
                <span>Done: <strong style={{ color: "#16a34a" }}>{a.collected}</strong></span>
              </div>
              <div style={{ marginTop: 6, height: 4, background: "#e5e7eb", borderRadius: 2 }}>
                <div style={{
                  height: "100%", borderRadius: 2,
                  background: a.color,
                  width: Math.round((a.collected / a.target) * 100) + "%",
                  transition: "width .3s",
                }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Collection Form ── */}
      <div className="wrapper-table-outer">
        <div className="table-header d-flex justify-content-between align-items-center flex-wrap gap-2">
          <h6>
            <i className="bi bi-collection me-2" />
            Collection Entries
            {agent && <span className="badge ms-2" style={{ background: "#eef2ff", color: "#4f46e5", fontSize: ".72rem" }}>
              Agent: {agent.name}
            </span>}
          </h6>
          <div className="d-flex align-items-center gap-2">
            <label className="fs-12 text-muted mb-0">Date:</label>
            <input
              className="form-control form-control-sm"
              type="date"
              value={collDate}
              onChange={(e) => setDate(e.target.value)}
              style={{ width: 150 }}
            />
          </div>
        </div>

        {!selectedAgent ? (
          <div style={{ padding: "2rem", textAlign: "center", color: "#9ca3af" }}>
            <i className="bi bi-person-badge" style={{ fontSize: "2rem", display: "block", marginBottom: ".5rem" }} />
            Select a collection agent above to begin entering collections.
          </div>
        ) : (
          <>
            {/* Column Headers */}
            <div style={{ padding: "0 1rem" }}>
              <div className="coll_table_head">
                <span>Customer &amp; Group</span>
                <span>Amount (₹)</span>
                <span>Mode</span>
                <span>Overdue</span>
                <span style={{ textAlign: "center" }}>✓</span>
              </div>

              {entries.map((entry, i) => (
                <div className="coll_row" key={entry.id}>
                  {/* Customer Info */}
                  <div className="customer_cell">
                    <span className="name_badge" style={{ background: getColor(i), width: 26, height: 26, fontSize: ".65rem" }}>
                      {getInitials(entry.name)}
                    </span>
                    <div>
                      <div className="fs-13 fw-700">{entry.name}</div>
                      <div className="fs-12 text-muted">{entry.group} · {entry.phone}</div>
                    </div>
                  </div>

                  {/* Amount Input */}
                  <input
                    type="number"
                    className="pm_input"
                    placeholder={entry.monthly.toLocaleString("en-IN")}
                    value={entry.amount}
                    onChange={(e) => update(i, "amount", e.target.value)}
                    style={{ fontSize: ".82rem" }}
                  />

                  {/* Mode Select */}
                  <select
                    className="pm_input"
                    value={entry.mode}
                    onChange={(e) => update(i, "mode", e.target.value)}
                    style={{ fontSize: ".8rem" }}
                  >
                    {MODES.map((m) => <option key={m}>{m}</option>)}
                  </select>

                  {/* Overdue */}
                  <div>
                    {entry.overdueDays > 0 ? (
                      <span className="overdue-badge">
                        <i className="bi bi-exclamation-circle" /> {entry.overdueDays}d
                      </span>
                    ) : (
                      <span className="ontime-badge">On time</span>
                    )}
                  </div>

                  {/* Include Checkbox */}
                  <div style={{ textAlign: "center" }}>
                    <input
                      type="checkbox"
                      checked={entry.include}
                      onChange={(e) => update(i, "include", e.target.checked)}
                      style={{ width: 15, height: 15, cursor: "pointer", accentColor: "#4f46e5" }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Bar */}
            <div style={{ padding: "0 1rem 1rem" }}>
              <div className="coll_total_bar">
                <div className="d-flex gap-3 fs-12" style={{ color: "rgba(255,255,255,.7)" }}>
                  <span><strong style={{ color: "#fff" }}>{included.length}</strong> entries</span>
                  <span>Cash: <strong style={{ color: "#fff" }}>{cashCount}</strong></span>
                  <span>UPI: <strong style={{ color: "#fff" }}>{upiCount}</strong></span>
                  <span>Bank: <strong style={{ color: "#fff" }}>{bankCount}</strong></span>
                </div>
                <div>
                  <span style={{ fontSize: ".75rem", opacity: .7 }}>Total Collection:&nbsp;</span>
                  <span style={{ fontSize: "1.1rem", fontWeight: 700 }}>
                    ₹{totalAmt.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="d-flex gap-2 justify-content-end mt-3">
                <button className="pm_btn_discard" onClick={handleReset}>Reset</button>
                <button
                  className="pm_btn_confirm"
                  disabled={included.length === 0}
                  onClick={handleSubmit}
                >
                  <i className="bi bi-check2-circle me-1" />
                  Submit Collection (₹{totalAmt.toLocaleString("en-IN")})
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};