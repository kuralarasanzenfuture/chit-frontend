import React from "react";
import "./ChitPayments.css";

/* ── PDF Print ── */
const printReceiptPDF = (receipt) => {
  const fmt = (n) => Number(n).toLocaleString("en-IN");

  const penaltyRow =
    receipt.penalty > 0
      ? `<div class="line"><span>Late Fee <small>(${receipt.penaltyRate}%/mo · ${receipt.overdueDays}d overdue)</small></span><span class="warn">₹${fmt(receipt.penalty)}</span></div>`
      : "";

  const gstRow =
    receipt.gstEnabled && receipt.gst > 0
      ? `<div class="line"><span>GST @ 18% <small>(on late fee)</small></span><span>₹${fmt(receipt.gst)}</span></div>`
      : "";

  // ✅ FIX 3: PDF also handles both splits array and mode string
  const modeRow = receipt.splits?.length
    ? receipt.splits
        .map(
          (s) =>
            `<div class="mode-row">
               <span>${s.mode}${s.ref ? ` · ${s.ref}` : ""}${s.utr ? ` / ${s.utr}` : ""}</span>
               <span>₹${fmt(Number(s.amount))}</span>
             </div>`,
        )
        .join("")
    : `<div class="mode-row">
         <span>${receipt.mode || "—"}${receipt.txnRef ? ` · Ref: ${receipt.txnRef}` : ""}</span>
         <span></span>
       </div>`;

  const installmentAmount = receipt.amount ?? receipt.splitTotal ?? 0;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Receipt ${receipt.receiptNo}</title>
  <style>
    *, *::before, *::after {
      box-sizing: border-box; margin: 0; padding: 0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    body { font-family: Arial, sans-serif; font-size: 13px; color: #111; padding: 36px; max-width: 620px; margin: auto; }

    .header { display: flex; justify-content: space-between; align-items: flex-start;
              background: #004b63 !important; color: #fff !important;
              padding: 16px 20px; border-radius: 8px; margin-bottom: 20px; }
    .company  { font-size: 18px; font-weight: 700; }
    .tagline  { font-size: 11px; opacity: .7; margin-top: 3px; }
    .rno      { text-align: right; font-size: 14px; font-weight: 700; }
    .rdate    { text-align: right; font-size: 11px; opacity: .7; margin-top: 3px; }

    .watermark { text-align: center; background: #e8f5e9 !important; color: #2e7d32 !important;
                 font-weight: 700; font-size: 13px; padding: 8px; border-radius: 6px;
                 border: 1px solid #a5d6a7; margin-bottom: 20px; letter-spacing: .5px; }

    .section-head { font-size: 10px; font-weight: 700; color: #004b63; text-transform: uppercase;
                    letter-spacing: .6px; border-left: 3px solid #004b63; padding-left: 8px;
                    margin: 16px 0 8px; }

    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px; }
    .kv-label  { font-size: 10px; color: #888; text-transform: uppercase; }
    .kv-val    { font-size: 13px; font-weight: 600; margin-top: 2px; }

    hr { border: none; border-top: 1px solid #e5e7eb; margin: 14px 0; }

    .line { display: flex; justify-content: space-between; padding: 5px 0;
            border-bottom: 1px solid #f3f4f6; font-size: 13px; }
    .warn { color: #b91c1c; font-weight: 600; }
    small { font-size: 11px; color: #9ca3af; }

    .total-row { display: flex; justify-content: space-between; align-items: center;
                 background: #004b63 !important; color: #fff !important;
                 font-size: 15px; font-weight: 700; padding: 10px 12px;
                 border-radius: 6px; margin-top: 10px; }

    .mode-row  { display: flex; justify-content: space-between; padding: 5px 0;
                 font-size: 13px; border-bottom: 1px solid #f3f4f6; }

    .footer-note { margin-top: 28px; font-size: 11px; color: #9ca3af; text-align: center; }

    @media print { body { padding: 20px; } @page { margin: 1cm; } }
  </style>
</head>
<body>

  <div class="header">
    <div>
      <div class="company">Chit Fund Manager</div>
      <div class="tagline">Anna Nagar, Madurai · GST IN: 33AAAA0000A1Z5</div>
    </div>
    <div>
      <div class="rno">Receipt No. ${receipt.receiptNo}</div>
      <div class="rdate">${receipt.date}</div>
    </div>
  </div>

  <div class="watermark">✓ &nbsp; PAYMENT RECEIVED</div>

  <div class="section-head">Customer Details</div>
  <div class="info-grid">
    <div><div class="kv-label">Name</div><div class="kv-val">${receipt.customer}</div></div>
    <div><div class="kv-label">Customer ID</div><div class="kv-val">${receipt.customerId}</div></div>
    <div><div class="kv-label">Phone</div><div class="kv-val">${receipt.phone}</div></div>
    <div><div class="kv-label">Address</div><div class="kv-val">${receipt.address || "—"}</div></div>
  </div>

  <div class="section-head">Group Details</div>
  <div class="info-grid">
    <div><div class="kv-label">Group Name</div><div class="kv-val">${receipt.group}</div></div>
    <div><div class="kv-label">Chit Value</div><div class="kv-val">${receipt.chitValue}</div></div>
    <div><div class="kv-label">Installment No.</div><div class="kv-val">${receipt.installmentNo}</div></div>
    <div><div class="kv-label">Progress</div><div class="kv-val">${receipt.installment}</div></div>
  </div>

  <hr/>

  <div class="section-head">Payment Breakdown</div>
  <div class="line">
    <span>Installment Amount</span>
    <span style="font-weight:600">₹${fmt(installmentAmount)}</span>
  </div>
  ${penaltyRow}
  ${gstRow}
  <div class="total-row"><span>Total Paid</span><span>₹${fmt(receipt.total)}</span></div>

  <div class="section-head">Payment Mode</div>
  ${modeRow}

  <div class="footer-note">
    This is a computer-generated receipt and does not require a physical signature.<br/>
    For queries contact: info@chitfund.com · +91 98765 00000
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

/* ════════════════════════════════════════════════════════════
   RECEIPT MODAL
════════════════════════════════════════════════════════════ */
export const ReceiptModal = ({ receipt, onClose }) => {
  // ✅ FIX 3: Safely resolve installment amount whether it comes from
  //    SinglePaymentModal (has `amount` field) or history view (has `amount` as number)
  const installmentAmount = receipt.amount ?? receipt.splitTotal ?? 0;

  const breakdown = [];
  if (receipt.penalty > 0) {
    breakdown.push(
      `₹${Number(installmentAmount).toLocaleString("en-IN")} installment` +
        ` + ₹${Number(receipt.penalty).toLocaleString("en-IN")} late fee`,
    );
  }
  if (receipt.gstEnabled && receipt.gst > 0) {
    breakdown.push(`+ ₹${Number(receipt.gst).toLocaleString("en-IN")} GST`);
  }

  return (
    <div className="pm_overlay">
      <div className="pm_modal receipt_modal">

        {/* ── Header ── */}
        <div className="receipt_header">
          <div>
            <div className="receipt_company">Chit Fund Manager</div>
            <div className="receipt_tagline">Anna Nagar, Madurai · GST IN: 33AAAA0000A1Z5</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="receipt_no_label">Receipt No.</div>
            <div className="receipt_no_val">{receipt.receiptNo}</div>
            <div className="receipt_date">{receipt.date}</div>
          </div>
        </div>

        {/* ── Watermark ── */}
        <div className="receipt_watermark">
          <div className="receipt_watermark_inner">
            <i className="bi bi-check-circle-fill" />&nbsp;PAYMENT RECEIVED
          </div>
        </div>

        <div className="receipt_body">

          {/* Customer Details */}
          <div className="receipt_section_head">Customer Details</div>
          <div className="receipt_info_grid">
            <div>
              <div className="receipt_kv_label">Name</div>
              <div className="receipt_kv_val">{receipt.customer}</div>
            </div>
            <div>
              <div className="receipt_kv_label">Customer ID</div>
              <div className="receipt_kv_val">{receipt.customerId}</div>
            </div>
            <div>
              <div className="receipt_kv_label">Phone</div>
              <div className="receipt_kv_val">{receipt.phone}</div>
            </div>
            <div>
              <div className="receipt_kv_label">Address</div>
              <div className="receipt_kv_val">{receipt.address || "—"}</div>
            </div>
          </div>

          {/* Group Details */}
          <div className="receipt_section_head">Group Details</div>
          <div className="receipt_info_grid" style={{ marginBottom: "1rem" }}>
            <div>
              <div className="receipt_kv_label">Group Name</div>
              <div className="receipt_kv_val">{receipt.group}</div>
            </div>
            <div>
              <div className="receipt_kv_label">Chit Value</div>
              <div className="receipt_kv_val">{receipt.chitValue}</div>
            </div>
            <div>
              <div className="receipt_kv_label">Installment No.</div>
              <div className="receipt_kv_val">{receipt.installmentNo}</div>
            </div>
            <div>
              <div className="receipt_kv_label">Progress</div>
              <div className="receipt_kv_val">{receipt.installment}</div>
            </div>
          </div>

          <hr className="receipt_divider" />

          {/* Payment Breakdown */}
          <div className="receipt_section_head">Payment Breakdown</div>

          <div className="receipt_line">
            <span className="receipt_line_label">Installment Amount</span>
            {/* ✅ FIX 2: uses resolved installmentAmount — no more NaN */}
            <span style={{ fontWeight: 600 }}>
              ₹{Number(installmentAmount).toLocaleString("en-IN")}
            </span>
          </div>

          {receipt.penalty > 0 && (
            <div className="receipt_line">
              <span className="receipt_line_label">
                Late Fee&nbsp;
                <span style={{ fontSize: ".72rem", color: "#9ca3af" }}>
                  ({receipt.penaltyRate}%/mo · {receipt.overdueDays}d overdue)
                </span>
              </span>
              <span className="receipt_line_warn">
                ₹{Number(receipt.penalty).toLocaleString("en-IN")}
              </span>
            </div>
          )}

          {receipt.gstEnabled && receipt.gst > 0 && (
            <div className="receipt_line">
              <span className="receipt_line_label">
                GST @ 18%&nbsp;
                <span style={{ fontSize: ".72rem", color: "#9ca3af" }}>(on late fee)</span>
              </span>
              <span style={{ fontWeight: 600 }}>
                ₹{Number(receipt.gst).toLocaleString("en-IN")}
              </span>
            </div>
          )}

          <div className="receipt_total_row">
            <span>Total Paid</span>
            <span>₹{Number(receipt.total).toLocaleString("en-IN")}</span>
          </div>

          {breakdown.length > 0 && (
            <div style={{ fontSize: ".72rem", color: "#9ca3af", textAlign: "right", marginTop: 4 }}>
              {breakdown.join(" ")}
            </div>
          )}

          {/* ✅ FIX 3: Payment mode — handles splits array (SinglePaymentModal)
                       AND mode string (history view in ChitPaymentList) */}
          <div className="receipt_section_head">Payment Mode</div>

          {receipt.splits?.length > 0 ? (
            /* From SinglePaymentModal — splits is an array */
            receipt.splits.map((s, i) => (
              <div key={i} className="receipt_mode_row">
                <span className="receipt_mode_label">
                  {s.mode}
                  {s.ref ? ` · ${s.ref}` : ""}
                  {s.utr ? ` / ${s.utr}` : ""}
                </span>
                <span className="receipt_mode_val">
                  ₹{Number(s.amount).toLocaleString("en-IN")}
                </span>
              </div>
            ))
          ) : (
            /* From payment history view — mode is a plain string */
            <div className="receipt_mode_row">
              <span className="receipt_mode_label">
                {receipt.mode || "—"}
                {receipt.txnRef ? ` · Ref: ${receipt.txnRef}` : ""}
              </span>
              <span className="receipt_mode_val" />
            </div>
          )}

          <div style={{ marginTop: "1rem", fontSize: ".72rem", color: "#9ca3af", textAlign: "center" }}>
            This is a computer-generated receipt and does not require a physical signature.
            <br />
            For queries contact: info@chitfund.com · +91 98765 00000
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="receipt_footer">
          <button className="btn_pdf" onClick={() => printReceiptPDF(receipt)}>
            <i className="bi bi-file-earmark-pdf-fill" /> Download / Print PDF
          </button>
          <button className="btn_whatsapp">
            <i className="bi bi-whatsapp" /> Send via WhatsApp
          </button>
          <button className="btn_print ms-auto" onClick={onClose}>
            <i className="bi bi-x" /> Close
          </button>
        </div>

      </div>
    </div>
  );
};