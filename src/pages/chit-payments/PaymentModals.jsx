import React, { useState } from "react";
import "./ChitPayments.css";
import { ReceiptModal } from "./ReceiptModal"; // ✅ FIX 1: was missing, caused runtime crash

/* ── Constants ── */
const PENALTY_RATE = 1.5;
const GST_RATE = 18;
const TODAY = "2026-04-21";

/* ── Static agents ── */
const AGENTS = [
  { id: "AGT-01", name: "Murugan" },
  { id: "AGT-02", name: "Selvi" },
  { id: "AGT-03", name: "Ramesh" },
  { id: "AGT-04", name: "Priya" },
];

/* ── Default splits ── */
const DEFAULT_SPLITS = () => [
  { mode: "Cash",         label: "CASH",   icon: "fi fi-tr-money-bill-wave",             active: false, amount: "", ref: "", utr: "" },
  { mode: "UPI",          label: "UPI / QR", icon: "fi fi-tr-money-transfer-smartphone", active: false, amount: "", ref: "", utr: "" },
  { mode: "Bank Transfer",label: "BANK",   icon: "fi fi-tr-bank",                        active: false, amount: "", ref: "", utr: "" },
  { mode: "Cheque",       label: "CHEQUE", icon: "fi fi-tr-money-check-edit",            active: false, amount: "", ref: "", utr: "" },
];

/* ════════════════════════════════════════════════════════════
   SPLIT PAYMENT SECTION
════════════════════════════════════════════════════════════ */
const SplitPaymentSection = ({ splits, onChange }) => {
  const updateSplit = (mode, key, val) =>
    onChange(splits.map((s) => (s.mode === mode ? { ...s, [key]: val } : s)));

  const toggleMode = (mode) =>
    onChange(
      splits.map((s) =>
        s.mode === mode
          ? { ...s, active: !s.active, amount: !s.active ? s.amount : "", ref: "", utr: "" }
          : { ...s, active: false, amount: "", ref: "", utr: "" },
      ),
    );

  const activeSplit  = splits.find((s) => s.active);
  const activeSplits = splits.filter((s) => s.active && Number(s.amount) > 0);
  const splitTotal   = activeSplits.reduce((sum, s) => sum + Number(s.amount || 0), 0);

  return (
    <div className="pm_field_full">
      <label className="pm_label mb-2">Payment Mode</label>

      {/* Mode Cards Row */}
      <div className="pm_mode_cards_row">
        {splits.map((split) => (
          <div key={split.mode} className="pm_mode_col">
            <button
              type="button"
              className={`pm_mode_card_new ${split.active ? "pm_mode_card_selected" : ""}`}
              onClick={() => toggleMode(split.mode)}
            >
              <span className="pm_mode_card_icon">
                <i className={split.icon} />
              </span>
              <span className="pm_mode_card_label">{split.label}</span>
            </button>
          </div>
        ))}
      </div>

      {/* Amount + Ref inputs for active mode */}
      {activeSplit && (
        <div className="pm_mode_cards_row" style={{ marginTop: 8 }}>
          {splits.map((split) =>
            split.active ? (
              <div key={split.mode} className="pm_mode_col">
                <div className="pm_mode_input_box">
                  <input
                    className="pm_mode_amount_input"
                    type="number"
                    placeholder={`${activeSplit.mode} amount`}
                    value={activeSplit.amount}
                    onChange={(e) => updateSplit(activeSplit.mode, "amount", e.target.value)}
                  />
                  {activeSplit.mode === "UPI" && Number(activeSplit.amount) > 0 && (
                    <>
                      <input
                        className="pm_mode_ref_input"
                        type="text"
                        placeholder="UPI ID (e.g. name@upi)"
                        value={activeSplit.ref}
                        onChange={(e) => updateSplit(activeSplit.mode, "ref", e.target.value)}
                      />
                      <input
                        className="pm_mode_ref_input"
                        type="text"
                        placeholder="UTR / Reference No."
                        value={activeSplit.utr}
                        onChange={(e) => updateSplit(activeSplit.mode, "utr", e.target.value)}
                      />
                    </>
                  )}
                  {activeSplit.mode === "Bank Transfer" && Number(activeSplit.amount) > 0 && (
                    <input
                      className="pm_mode_ref_input"
                      type="text"
                      placeholder="Bank Reference No."
                      value={activeSplit.ref}
                      onChange={(e) => updateSplit(activeSplit.mode, "ref", e.target.value)}
                    />
                  )}
                  {activeSplit.mode === "Cheque" && Number(activeSplit.amount) > 0 && (
                    <input
                      className="pm_mode_ref_input"
                      type="text"
                      placeholder="Cheque Number"
                      value={activeSplit.ref}
                      onChange={(e) => updateSplit(activeSplit.mode, "ref", e.target.value)}
                    />
                  )}
                </div>
              </div>
            ) : (
              <div key={split.mode} className="pm_mode_col" />
            ),
          )}
        </div>
      )}

      {/* Summary bar */}
      {activeSplits.length > 0 && (
        <div className="pm_split_summary">
          <div className="pm_split_summary_modes">
            {activeSplits.map((s) => (
              <span key={s.mode} className="pm_split_tag">
                {s.mode}: ₹{Number(s.amount).toLocaleString("en-IN")}
              </span>
            ))}
          </div>
          <div className="pm_split_summary_total">
            Total: ₹{splitTotal.toLocaleString("en-IN")}
          </div>
        </div>
      )}
    </div>
  );
};

/* ════════════════════════════════════════════════════════════
   SINGLE PAYMENT MODAL
════════════════════════════════════════════════════════════ */
export const SinglePaymentModal = ({ group, customer, onClose, onSubmit }) => {
  const [form, setForm]       = useState({ installmentNo: "", date: TODAY, agent: AGENTS[0].id });
  const [splits, setSplits]   = useState(DEFAULT_SPLITS());
  const [gstEnabled, setGst]  = useState(false);
  const [receiptData, setReceipt] = useState(null);

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const penalty      = customer?.overdueDays > 0 ? 90 : 0;
  const gstAmount    = gstEnabled ? 16 : 0;
  const activeSplits = splits.filter((s) => s.active && Number(s.amount) > 0);
  const splitTotal   = activeSplits.reduce((s, p) => s + Number(p.amount || 0), 0);
  const totalAmount  = splitTotal + penalty + gstAmount;

  const handleConfirm = () => {
    if (!form.installmentNo) {
      alert("Please enter installment number.");
      return;
    }
    if (splitTotal === 0) {
      alert("Please select a payment mode and enter amount.");
      return;
    }

    setReceipt({
      receiptNo    : "RCP-" + Math.floor(Math.random() * 90000 + 10000),
      date         : "21 Apr 2026",
      customer     : customer?.name       || "—",
      customerId   : customer?.customerId || "—",
      phone        : customer?.phone      || "—",
      address      : customer?.address    || "—",
      group        : group?.group,
      chitValue    : group?.chitValue,
      installmentNo: form.installmentNo,
      installment  : group?.installment,
      splits       : activeSplits,
      splitTotal,
      amount       : splitTotal,          // ✅ FIX 2: was missing → caused NaN in ReceiptModal
      penalty,
      gst          : gstAmount,
      total        : totalAmount,
      gstEnabled,
      penaltyRate  : PENALTY_RATE,
      overdueDays  : customer?.overdueDays || 0,
    });

    onSubmit?.({});
  };

  // ✅ ReceiptModal is now properly imported above — no crash
  if (receiptData) return <ReceiptModal receipt={receiptData} onClose={onClose} />;

  return (
    <div className="pm_overlay">
      <div className="pm_modal">

        {/* ── Header ── */}
        <div className="pm_header">
          <div className="pm_header_icon">₹</div>
          <div>
            <h4 className="pm_title">Payment Information</h4>
            <p className="pm_subtitle">Single installment entry</p>
          </div>
          <button className="pm_close" onClick={onClose}>✕</button>
        </div>

        {/* ── Group Banner ── */}
        <div className="pm_body" style={{ paddingBottom: 0 }}>
          <div className="pm_group_banner">
            <div className="pm_group_banner_left">
              <span className="pm_group_banner_label">Group</span>
              <span className="pm_group_banner_name">{group?.group}</span>
            </div>
            <div className="pm_group_banner_stats">
              <div className="pm_gs">
                <span className="pm_gs_label">Chit Value</span>
                <span className="pm_gs_val">{group?.chitValue}</span>
              </div>
              <div className="pm_gs">
                <span className="pm_gs_label">Installment</span>
                <span className="pm_gs_val">{group?.installment}</span>
              </div>
              <div className="pm_gs">
                <span className="pm_gs_label">Pending</span>
                <span className="pm_gs_val pm_gs_danger">{group?.pending}</span>
              </div>
            </div>
          </div>

          {/* Late Fee Alert */}
          {customer?.overdueDays > 0 && (
            <div className="pm_penalty_alert">
              <div>
                <div className="pm_penalty_text">
                  <i className="bi bi-exclamation-triangle-fill me-1" />
                  Late Fee Applicable
                </div>
                <div className="pm_penalty_sub">
                  {customer.overdueDays} days overdue · {PENALTY_RATE}% per month on outstanding amount
                </div>
              </div>
              <div className="pm_penalty_amount">+₹{penalty.toLocaleString("en-IN")}</div>
            </div>
          )}
        </div>

        {/* ── Body ── */}
        <div className="pm_body">

          {/* Installment / Date / Agent */}
          <div className="pm_row_3">
            <div className="pm_field">
              <label className="pm_label">Installment No. *</label>
              <input
                className="pm_input"
                type="number"
                placeholder="e.g. 15"
                value={form.installmentNo}
                onChange={(e) => set("installmentNo", e.target.value)}
              />
            </div>
            <div className="pm_field">
              <label className="pm_label">Payment Date</label>
              <input
                className="pm_input"
                type="date"
                value={form.date}
                onChange={(e) => set("date", e.target.value)}
              />
            </div>
            <div className="pm_field">
              <label className="pm_label">Collection Agent</label>
              <select
                className="pm_input"
                value={form.agent}
                onChange={(e) => set("agent", e.target.value)}
              >
                {AGENTS.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} — {a.id}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Split Payment */}
          <SplitPaymentSection splits={splits} onChange={setSplits} />

          {/* GST Toggle */}
          <div className="pm_gst_row">
            <div>
              <div className="pm_gst_label">Apply GST ({GST_RATE}%) on charges</div>
              <div className="pm_gst_sub">Applicable on late fee &amp; service charges</div>
            </div>
            <div className="form-check form-switch mb-0">
              <input
                className="form-check-input"
                type="checkbox"
                id="gstSwitch"
                checked={gstEnabled}
                onChange={(e) => setGst(e.target.checked)}
                style={{ cursor: "pointer", width: "2.5em" }}
              />
            </div>
          </div>

          {/* Total Band */}
          <div className="pm_total_band">
            <div>
              <div className="pm_total_label">Total Payable</div>
              <div className="pm_total_breakdown">
                ₹{splitTotal.toLocaleString("en-IN")} collected
                {penalty > 0 ? ` + ₹${penalty.toLocaleString("en-IN")} late fee` : ""}
                {gstEnabled && gstAmount > 0 ? ` + ₹${gstAmount.toLocaleString("en-IN")} GST` : ""}
              </div>
            </div>
            <div className="pm_total_val">₹{totalAmount.toLocaleString("en-IN")}</div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="pm_footer">
          <button className="light-btn" onClick={onClose}>Discard Draft</button>
          <button className="main-btn" onClick={handleConfirm}>
            Confirm &amp; Generate Receipt
          </button>
        </div>

      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════
   BULK PAYMENT MODAL
════════════════════════════════════════════════════════════ */
export const BulkPaymentModal = ({ groupData, customer, onClose }) => {
  const running = groupData.filter((x) => x.status === "Running");

  const [selected,   setSelected] = useState([]);
  const [splits,     setSplits]   = useState(DEFAULT_SPLITS());
  const [notes,      setNotes]    = useState("");
  const [agent,      setAgent]    = useState(AGENTS[0].id);
  const [gstEnabled, setGst]      = useState(false);
  const [submitted,  setSubmitted]= useState(false);

  const toggle = (item) =>
    setSelected((prev) =>
      prev.find((p) => p.group === item.group)
        ? prev.filter((p) => p.group !== item.group)
        : [...prev, { ...item, amount: Number(String(item.monthly).replace(/[₹,\s]/g, "")) }],
    );

  const changeAmt = (group, val) =>
    setSelected((prev) =>
      prev.map((p) => (p.group === group ? { ...p, amount: Number(val) } : p)),
    );

  const activeSplits = splits.filter((s) => s.active && Number(s.amount) > 0);
  const splitTotal   = activeSplits.reduce((s, p) => s + Number(p.amount || 0), 0);
  const gstAmt       = gstEnabled ? Math.round(splitTotal * (GST_RATE / 100)) : 0;
  const grandTotal   = splitTotal + gstAmt;

  if (submitted)
    return (
      <div className="pm_overlay">
        <div className="pm_modal" style={{ textAlign: "center", padding: "2rem" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
          <h5>Bulk Payment Submitted!</h5>
          <p className="text-muted fs-13">
            {selected.length} group{selected.length !== 1 ? "s" : ""} · ₹{grandTotal.toLocaleString("en-IN")}
            {activeSplits.length > 0 && <> via {activeSplits.map((s) => s.mode).join(" + ")}</>}
          </p>
          <button className="pm_btn_discard mt-3" onClick={onClose}>Close</button>
        </div>
      </div>
    );

  return (
    <div className="pm_overlay">
      <div className="pm_modal pm_modal_bulk">

        {/* ── Header ── */}
        <div className="pm_header">
          <div className="pm_header_icon" style={{ fontSize: "1.2rem" }}>≡</div>
          <div>
            <h4 className="pm_title">Bulk Payment Entry</h4>
            <p className="pm_subtitle">{running.length} active groups identified</p>
          </div>
          <button className="pm_close" onClick={onClose}>✕</button>
        </div>

        <div className="pm_body">

          {/* Group List */}
          <div className="bulk_list_wrapper">
            <div className="bulk_col_head">
              <span />
              <span>Group</span>
              <span>Outstanding</span>
              <span className="bulk_col_right">Amount (₹)</span>
            </div>
            {running.map((item, i) => {
              const sel = selected.find((p) => p.group === item.group);
              return (
                <div key={i} className={`bulk_row ${sel ? "bulk_row_active" : ""}`}>
                  <label className="bulk_checkbox_wrap">
                    <input
                      type="checkbox"
                      className="bulk_checkbox"
                      checked={!!sel}
                      onChange={() => toggle(item)}
                    />
                  </label>
                  <div className="bulk_group_info">
                    <span className="bulk_group_name">{item.group}</span>
                    <span className="bulk_group_sub">
                      Monthly {item.monthly} · Inst {item.installment}
                    </span>
                  </div>
                  <div className="bulk_outstanding">
                    <span className="bulk_out_label">Outstanding</span>
                    <span className="bulk_out_val">{item.pending}</span>
                  </div>
                  <div className="bulk_amt_cell">
                    {sel ? (
                      <input
                        type="number"
                        className="bulk_amt_input"
                        value={sel.amount}
                        onChange={(e) => changeAmt(item.group, e.target.value)}
                      />
                    ) : (
                      <span className="bulk_amt_placeholder">{item.monthly}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* GST Row */}
          <div className="pm_gst_row mb-3">
            <div>
              <div className="pm_gst_label">Apply GST ({GST_RATE}%) on total</div>
              <div className="pm_gst_sub">Toggle to include GST on payment</div>
            </div>
            <div className="form-check form-switch mb-0">
              <input
                className="form-check-input"
                type="checkbox"
                checked={gstEnabled}
                onChange={(e) => setGst(e.target.checked)}
                style={{ cursor: "pointer", width: "2.5em" }}
              />
            </div>
          </div>

          {/* Total Band */}
          <div className="bulk_total_band">
            <div>
              <p className="bulk_total_label">Total Payment Amount</p>
              <p className="bulk_total_val">
                ₹{grandTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </p>
            </div>
            <p className="bulk_total_note">
              {selected.length} group{selected.length !== 1 ? "s" : ""} selected
              {gstEnabled && gstAmt > 0 && <> · GST ₹{gstAmt.toLocaleString("en-IN")}</>}
            </p>
          </div>

          {/* Agent + Notes */}
          <div className="bulk_bottom_grid">
            <div>
              <label className="pm_label">Collection Agent</label>
              <select
                className="pm_input mb-3"
                value={agent}
                onChange={(e) => setAgent(e.target.value)}
              >
                {AGENTS.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} — {a.id}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="pm_label">Notes &amp; Confirmation</label>
              <textarea
                className="bulk_notes"
                placeholder="Add internal transaction notes…"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </div>
          </div>

          {/* Split Payment */}
          <SplitPaymentSection splits={splits} onChange={setSplits} />
        </div>

        {/* ── Footer ── */}
        <div className="pm_footer">
          <div className="pm_footer_left">
            {selected.length} plan{selected.length !== 1 ? "s" : ""} selected
          </div>
          <button className="light-btn" onClick={onClose}>Cancel</button>
          <button
            className="main-btn"
            disabled={selected.length === 0 || splitTotal === 0}
            onClick={() => setSubmitted(true)}
          >
            Confirm &amp; Submit Payment
          </button>
        </div>

      </div>
    </div>
  );
};