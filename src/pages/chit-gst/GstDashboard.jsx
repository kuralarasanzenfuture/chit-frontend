import React, { useState } from "react";
import "./GstDashboard.css";

/* ── helpers ── */
const fmt = (n) => Number(n).toLocaleString("en-IN");

/* ── PDF Export ── */
const generatePDF = (invoice) => {
  const lines = invoice.lines || [];
  const lineRows = lines
    .map(
      (l) => `
      <tr>
        <td>${l.description}</td>
        <td class="num">₹${fmt(l.taxable)}</td>
        <td class="num">₹${fmt(l.cgst)}</td>
        <td class="num">₹${fmt(l.sgst)}</td>
        <td class="num">₹${fmt(l.total)}</td>
      </tr>`
    )
    .join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${invoice.invoiceNo}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    body { font-family: Arial, sans-serif; font-size: 13px; color: #111; padding: 40px; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; border-bottom: 2px solid #004b63; padding-bottom: 20px; }
    .company-name { font-size: 22px; font-weight: 700; color: #004b63; }
    .gstin { font-size: 12px; color: #555; margin-top: 4px; }
    .inv-no { font-size: 15px; font-weight: 700; color: #004b63; text-align: right; }
    .inv-date { font-size: 12px; color: #555; text-align: right; margin-top: 4px; }
    .meta { display: flex; gap: 40px; margin-bottom: 28px; }
    .meta-block label { font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 0.5px; }
    .meta-block p { font-size: 13px; font-weight: 600; margin-top: 3px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    th { background: #004b63 !important; color: #fff !important; padding: 9px 12px; text-align: left; font-size: 12px; }
    th.num, td.num { text-align: right; }
    td { padding: 9px 12px; border-bottom: 1px solid #e8e8e8; font-size: 13px; }
    tr:nth-child(even) td { background: #f5f7ff !important; }
    .total-row { display: flex; justify-content: flex-end; margin-top: 4px; }
    .total-box { background: #004b63 !important; color: #fff !important; padding: 12px 20px; border-radius: 6px; min-width: 220px; display: flex; justify-content: space-between; align-items: center; }
    .total-label { font-size: 13px; font-weight: 600; }
    .total-val { font-size: 16px; font-weight: 700; }
    .footer { margin-top: 48px; border-top: 1px solid #ddd; padding-top: 14px; font-size: 11px; color: #999; text-align: center; }
    @media print { body { padding: 20px; } @page { margin: 1cm; } }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="company-name">Sowbhagya Chit Fund</div>
      <div class="gstin">GSTIN: 33AAABC1234D1Z5</div>
    </div>
    <div>
      <div class="inv-no">${invoice.invoiceNo}</div>
      <div class="inv-date">${invoice.date}</div>
    </div>
  </div>

  <div class="meta">
    <div class="meta-block">
      <label>Member</label>
      <p>${invoice.member}</p>
    </div>
    <div class="meta-block">
      <label>Member ID</label>
      <p>${invoice.memberId || "—"}</p>
    </div>
    <div class="meta-block">
      <label>Group</label>
      <p>${invoice.group}</p>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Description</th>
        <th class="num">Taxable (₹)</th>
        <th class="num">CGST</th>
        <th class="num">SGST</th>
        <th class="num">Total</th>
      </tr>
    </thead>
    <tbody>${lineRows}</tbody>
  </table>

  <div class="total-row">
    <div class="total-box">
      <span class="total-label">Grand Total</span>
      <span class="total-val">₹${fmt(invoice.grandTotal)}</span>
    </div>
  </div>

  <div class="footer">
    This is a computer-generated invoice. No signature required. &nbsp;|&nbsp; Sowbhagya Chit Fund — GST Invoice
  </div>

  <script>window.onload = () => { window.focus(); window.print(); }<\/script>
</body>
</html>`;

  const iframe = document.createElement("iframe");
  iframe.style.cssText = "position:fixed;width:0;height:0;border:0;left:-9999px;top:-9999px;";
  document.body.appendChild(iframe);
  iframe.contentDocument.open();
  iframe.contentDocument.write(html);
  iframe.contentDocument.close();
  iframe.onload = () => {
    setTimeout(() => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      setTimeout(() => document.body.removeChild(iframe), 1000);
    }, 300);
  };
};

/* ── Static data ── */
const RETURNS = [
  { id: "GSTR-1",  period: "Mar 2026", taxable: 421500,  gst: 75870,  dueDate: "11 Apr 2026", status: "Filed"   },
  { id: "GSTR-3B", period: "Apr 2026", taxable: 318200,  gst: 57276,  dueDate: "20 May 2026", status: "Pending" },
  { id: "GSTR-9",  period: "FY 24-25", taxable: 3844800, gst: 692064, dueDate: "31 Dec 2025", status: "Overdue" },
];

const MEMBERS = [
  { id: "MEM0021", name: "Raj Kumar"   },
  { id: "MEM0022", name: "Arun Kumar"  },
  { id: "MEM0023", name: "Vijay Raj"   },
  { id: "MEM0024", name: "Mani Selvam" },
];

const GROUPS = ["GRP-2024-A", "GRP-2024-B", "GRP-2025-A", "GRP-2025-B"];

const STATIC_LINES = [
  { description: "Chit Installment", taxable: 25000, cgst: 2250, sgst: 2250, total: 29500 },
  { description: "Commission",        taxable: 2500,  cgst: 225,  sgst: 225,  total: 2950  },
];

const STATIC_PREVIEW = {
  invoiceNo: "INV-2026-0421",
  date:      "21 Apr 2026",
  member:    "Raj Kumar",
  memberId:  "MEM0021",
  group:     "GRP-2024-A",
  lines:     STATIC_LINES,
  grandTotal: STATIC_LINES.reduce((s, l) => s + l.total, 0),
};

const STATIC_INVOICES = [
  { invoiceNo: "INV-20260001", member: "Raj Kumar",  memberId: "MEM0021", group: "GRP-2024-A", date: "01 Apr 2026", grandTotal: 32450, lines: STATIC_LINES },
  { invoiceNo: "INV-20260002", member: "Arun Kumar", memberId: "MEM0022", group: "GRP-2024-B", date: "05 Apr 2026", grandTotal: 29500, lines: STATIC_LINES },
  { invoiceNo: "INV-20260003", member: "Vijay Raj",  memberId: "MEM0023", group: "GRP-2025-A", date: "10 Apr 2026", grandTotal: 32450, lines: STATIC_LINES },
];

function calcLine(item) {
  const cgst = Math.round((item.taxable * item.cgstPct) / 100);
  const sgst = Math.round((item.taxable * item.sgstPct) / 100);
  return { ...item, cgst, sgst, total: item.taxable + cgst + sgst };
}

/* ── Badge ── */
const StatusBadge = ({ status }) => {
  const map = { Filed: "gst-badge-filed", Pending: "gst-badge-pending", Overdue: "gst-badge-overdue" };
  return <span className={`gst-badge ${map[status] || ""}`}>{status}</span>;
};

/* ══════════════════════════════════════════════════════════
   NEW INVOICE MODAL
══════════════════════════════════════════════════════════ */
const NewInvoiceModal = ({ onClose, onSave }) => {
  const [form, setForm]   = useState({ member: MEMBERS[0].id, date: "2026-04-21", group: GROUPS[0], notes: "" });
  const [lines, setLines] = useState([{ description: "Chit Installment", taxable: "", cgstPct: 9, sgstPct: 9 }]);

  const set        = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const updateLine = (i, k, v) => setLines((prev) => prev.map((l, idx) => idx === i ? { ...l, [k]: v } : l));
  const addLine    = () => setLines((prev) => [...prev, { description: "", taxable: "", cgstPct: 9, sgstPct: 9 }]);
  const removeLine = (i) => setLines((prev) => prev.filter((_, idx) => idx !== i));

  const computed   = lines.map(calcLine);
  const grandTotal = computed.reduce((s, l) => s + (l.total || 0), 0);

  const handleSave = () => {
    const member = MEMBERS.find((m) => m.id === form.member);
    onSave?.({
      invoiceNo:  "INV-" + Date.now().toString().slice(-8),
      date:       new Date(form.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      member:     member?.name || "—",
      memberId:   form.member,
      group:      form.group,
      lines:      computed,
      grandTotal,
    });
    onClose();
  };

  return (
    <div className="gst-overlay">
      <div className="gst-modal gst-modal-lg">
        <div className="gst-modal-head">
          <div className="gst-modal-icon">+</div>
          <div>
            <h5 className="gst-modal-title">New GST Invoice</h5>
            <p className="gst-modal-sub">Auto CGST + SGST calculation at 9% each</p>
          </div>
          <button className="gst-modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="gst-modal-body">
          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <label className="form-label">Member *</label>
              <select className="form-select" value={form.member} onChange={(e) => set("member", e.target.value)}>
                {MEMBERS.map((m) => <option key={m.id} value={m.id}>{m.name} — {m.id}</option>)}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Invoice Date *</label>
              <input className="form-select" type="date" value={form.date} onChange={(e) => set("date", e.target.value)} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Group</label>
              <select className="form-select" value={form.group} onChange={(e) => set("group", e.target.value)}>
                {GROUPS.map((g) => <option key={g}>{g}</option>)}
              </select>
            </div>
          </div>

          <div className="gst-section-head">Line Items</div>
          <div className="gst-line-head">
            <span>Description</span><span>Taxable (₹)</span><span>CGST %</span><span>SGST %</span><span>Total</span><span />
          </div>

          {lines.map((line, i) => {
            const c = calcLine(line);
            return (
              <div className="gst-line-row" key={i}>
                <input className="form-control" placeholder="Description" value={line.description}
                  onChange={(e) => updateLine(i, "description", e.target.value)} />
                <input className="form-control" type="number" placeholder="0" value={line.taxable}
                  onChange={(e) => updateLine(i, "taxable", Number(e.target.value))} />
                <input className="form-control" type="number" value={line.cgstPct}
                  onChange={(e) => updateLine(i, "cgstPct", Number(e.target.value))} />
                <input className="form-control" type="number" value={line.sgstPct}
                  onChange={(e) => updateLine(i, "sgstPct", Number(e.target.value))} />
                <span className="gst-line-total">₹{fmt(c.total || 0)}</span>
                <button className="gst-line-del" onClick={() => removeLine(i)} disabled={lines.length === 1}>✕</button>
              </div>
            );
          })}

          <button className="gst-add-line-btn" onClick={addLine}>+ Add Line Item</button>

          <div className="gst-grand-total-row">
            <span>Grand Total</span>
            <span className="gst-grand-val">₹{fmt(grandTotal)}</span>
          </div>

          <div className="mt-3">
            <label className="form-label">Notes (optional)</label>
            <textarea className="form-control" rows={2} placeholder="Internal notes..."
              value={form.notes} onChange={(e) => set("notes", e.target.value)} />
          </div>
        </div>

        <div className="gst-modal-foot">
          <button className="btn light-btn" onClick={onClose}>Cancel</button>
          <button className="btn main-btn" onClick={handleSave}>
            <i className="bi bi-check2 me-1" /> Save Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════
   INVOICE SCREEN TAB
══════════════════════════════════════════════════════════ */
const InvoiceScreen = ({ invoices, onNew }) => {
  const [showNew, setShowNew] = useState(false);

  const allInvoices = [...(invoices || []), ...STATIC_INVOICES];

  return (
    <>
      <div className="wrapper_header mb-3">
        <div>
          <h5 className="header_title">Invoice Screen</h5>
          <p className="header_text">Auto GST calculation · PDF · JSON</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn main-btn" onClick={() => setShowNew(true)}>+ New</button>
          <button className="btn light-btn">
            <i className="bi bi-funnel me-1" /> Filter
          </button>
        </div>
      </div>

      <div className="filter-wrapper mb-3">
        <div className="d-flex gap-2 align-items-end">
          <div className="flex-fill">
            <label className="form-label">Member</label>
            <select className="form-select" defaultValue="MEM0021">
              {MEMBERS.map((m) => <option key={m.id} value={m.id}>{m.name} — {m.id}</option>)}
            </select>
          </div>
          <div className="flex-fill">
            <label className="form-label">Date</label>
            <input className="form-select" type="date" defaultValue="2026-04-21" />
          </div>
          <div className="flex-fill">
            <label className="form-label">Group</label>
            <select className="form-select" defaultValue="GRP-2024-A">
              {GROUPS.map((g) => <option key={g}>{g}</option>)}
            </select>
          </div>
          <div className="flex-shrink">
            <button className="btn filter-btn">Preview</button>
          </div>
        </div>
      </div>

      {/* Static Invoice Preview */}
      <div className="gst-card p-0 mb-3 overflow-hidden">
        <div className="gst-inv-header">
          <div>
            <div className="gst-inv-company">Sowbhagya Chit Fund</div>
            <div className="gst-inv-gstin">GSTIN: 33AAABC1234D1Z5</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="gst-inv-no">{STATIC_PREVIEW.invoiceNo}</div>
            <div className="gst-inv-date">{STATIC_PREVIEW.date}</div>
          </div>
        </div>

        <div className="wrapper-table-outer">
          <table className="premium_table">
            <thead>
              <tr>
                <th>Description</th><th>Taxable</th><th>CGST</th><th>SGST</th><th className="text-end">Total</th>
              </tr>
            </thead>
            <tbody>
              {STATIC_PREVIEW.lines.map((l, i) => (
                <tr key={i}>
                  <td>{l.description}</td>
                  <td>₹{fmt(l.taxable)}</td>
                  <td>₹{fmt(l.cgst)}</td>
                  <td>₹{fmt(l.sgst)}</td>
                  <td className="text-end">₹{fmt(l.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="gst-grand-total-display">
            <span>Grand Total :</span>
            <span className="gst-grand-display-val">₹{fmt(STATIC_PREVIEW.grandTotal)}</span>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-3">
            <button className="btn light-btn">
              <i className="bi bi-filetype-json me-1" /> JSON
            </button>
            <button className="btn main-btn" onClick={() => generatePDF(STATIC_PREVIEW)}>
              <i className="bi bi-printer me-1" /> PDF
            </button>
          </div>
        </div>
      </div>

      {/* Saved Invoices */}
      <div className="wrapper-table-outer">
        <div className="table-header d-flex justify-content-between align-items-center">
          <h6><i className="bi bi-receipt me-2" />Saved Invoices</h6>
        </div>
        <table className="premium_table">
          <thead>
            <tr>
              <th>Invoice No.</th><th>Member</th><th>Group</th><th>Date</th><th>Grand Total</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allInvoices.map((inv, i) => (
              <tr key={i}>
                <td className="fw-600 text-brand">{inv.invoiceNo}</td>
                <td>{inv.member}</td>
                <td>{inv.group}</td>
                <td>{inv.date}</td>
                <td className="text-success">₹{fmt(inv.grandTotal)}</td>
                <td>
                  <div className="d-flex gap-2">
                    <button className="btn light-btn">JSON</button>
                    <button className="btn main-btn" onClick={() => generatePDF(inv)}>PDF</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showNew && (
        <NewInvoiceModal
          onClose={() => setShowNew(false)}
          onSave={(inv) => { onNew?.(inv); setShowNew(false); }}
        />
      )}
    </>
  );
};

/* ══════════════════════════════════════════════════════════
   GST DASHBOARD TAB
══════════════════════════════════════════════════════════ */
const GSTDashboardTab = ({ onNewInvoice }) => (
  <>
    <div className="wrapper_header mb-3">
      <div>
        <h5 className="header_title">GST Dashboard</h5>
        <p className="header_text">April 2026 — Filing Period Overview</p>
      </div>
      <div className="d-flex gap-2">
        <button className="btn light-btn">
          <i className="bi bi-download me-1" /> Export
        </button>
        <button className="btn main-btn" onClick={onNewInvoice}>+ New Invoice</button>
      </div>
    </div>

    <div className="stack_list">
      <div className="row g-3 mb-3">
        {[
          { icon: "bi-receipt",         badge: "CGST+SGST", label: "TOTAL TAXABLE VALUE", value: "₹12,84,500", sub: "vs ₹17,36,000 target",             badgeCls: "gst-chip-blue"   },
          { icon: "bi-currency-rupee",  badge: "GST 18%",   label: "GST COLLECTED",        value: "₹2,31,210",  sub: "CGST ₹1,15,605 + SGST ₹1,15,605", badgeCls: "gst-chip-green"  },
          { icon: "bi-arrow-left-right",badge: "ITC",       label: "INPUT TAX CREDIT",     value: "₹48,320",    sub: "Eligible for offset",               badgeCls: "gst-chip-teal"   },
          { icon: "bi-bank",            badge: "NET",       label: "NET GST PAYABLE",       value: "₹1,82,890",  sub: "Due by 20 May 2026",                badgeCls: "gst-chip-orange" },
        ].map((c, i) => (
          <div className="col-lg-3 col-md-6" key={i}>
            <div className="stack_card">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="icon"><i className={`bi ${c.icon}`} /></div>
                <span className={`gst-chip ${c.badgeCls}`}>{c.badge}</span>
              </div>
              <div className="stack_title">{c.label}</div>
              <div className="stack_count">{c.value}</div>
              <div className="gst-stat-sub">{c.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="filter-wrapper mb-3">
      <div className="d-flex gap-2 align-items-end">
        <div className="flex-fill">
          <label className="form-label">PERIOD</label>
          <select className="form-select" defaultValue="April 2026">
            {["April 2026", "March 2026", "February 2026", "FY 24-25"].map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>
        <div className="flex-fill">
          <label className="form-label">STATUS</label>
          <select className="form-select" defaultValue="All">
            {["All", "Filed", "Pending", "Overdue"].map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="flex-fill">
          <label className="form-label">TYPE</label>
          <select className="form-select" defaultValue="All Types">
            {["All Types", "Monthly", "Annual"].map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div className="flex-shrink">
          <button className="btn main-btn">Apply Filter</button>
        </div>
      </div>
    </div>

    <div className="wrapper-table-outer">
      <div className="table-header d-flex justify-content-between align-items-center">
        <h6><i className="bi bi-table me-2" />GST Returns</h6>
        <small className="bg-warning-subtle text-dark border border-warning-subtle p-1 rounded-1"
          style={{ fontSize: "12px", fontWeight: "500" }}>
          {RETURNS.length} returns
        </small>
      </div>
      <div className="table-responsive">
        <table className="premium_table">
          <thead>
            <tr>
              <th>Return</th><th>Period</th><th>Taxable</th><th>GST</th><th>Due Date</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {RETURNS.map((r, i) => (
              <tr key={i}>
                <td className="fw-600 text-brand">{r.id}</td>
                <td>{r.period}</td>
                <td>₹{fmt(r.taxable)}</td>
                <td>₹{fmt(r.gst)}</td>
                <td className={r.status === "Overdue" ? "text-danger-gst" : ""}>{r.dueDate}</td>
                <td><StatusBadge status={r.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
);

/* ══════════════════════════════════════════════════════════
   ROOT COMPONENT
══════════════════════════════════════════════════════════ */
export const GSTDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [invoices,  setInvoices]  = useState([]);

  return (
    <>
      <div className="gst-tabs">
        <button
          className={`gst-tab ${activeTab === "dashboard" ? "gst-tab-active" : ""}`}
          onClick={() => setActiveTab("dashboard")}
        >
          <i className="bi bi-grid me-1" /> GST Dashboard
        </button>
        <button
          className={`gst-tab ${activeTab === "invoice" ? "gst-tab-active" : ""}`}
          onClick={() => setActiveTab("invoice")}
        >
          <i className="bi bi-file-earmark-text me-1" /> Invoice Screen
        </button>
      </div>

      {activeTab === "dashboard" ? (
        <GSTDashboardTab onNewInvoice={() => setActiveTab("invoice")} />
      ) : (
        <InvoiceScreen
          invoices={invoices}
          onNew={(inv) => setInvoices((prev) => [inv, ...prev])}
        />
      )}
    </>
  );
};