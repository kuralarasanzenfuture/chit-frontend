// import React from "react";
// import "./AgentStaff.css";

// export const AgentDetail = () => {
//   return (
//     <>
//       <div className="row gy-4">
//         <div className="col-lg-3">
//           <div className="agent-card">
//             <div className="row gy-4">
//               <div className="col-lg-12">
//                 <div className="user_icon text-center">SR</div>
//               </div>
//               <div className="col-lg-12">
//                 <h5 className="user_name text-center">Subash Rohith</h5>
//                 <p className="user_id text-center">Agent ID :Cus-2026-001</p>
//               </div>
//               <div className="col-lg-12">
//                 <button className="btn light-btn w-100 d-block">
//                   <i className="fi fi-rs-pencil me-2"></i>Edit Profile
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="col-lg-9">
//           <div className="wrapper-table-outer">
//             <div className="table-header d-flex justify-content-between align-items-center">
//               <h6>
//                 <i className="fi fi-rs-users me-2"></i>Reference Customers
//               </h6>
//               <button className="light-btn">
//                 <i class="fi fi-tr-file-excel"></i>Export Excel
//               </button>
//             </div>
//             <table className="premium_table table-striped">
//               <thead>
//                 <tr>
//                   <th>Customer Detail</th>
//                   <th>Plan Detail</th>
//                   <th>Total Investment</th>
//                   <th>Status </th>
//                 </tr>
//               </thead>

//               <tbody>
//                 <tr>
//                   <td>
//                     Rajesh Kumar M
//                     <small className="w-100 d-block" style={{ color: "var(--main-color)" }}>
//                       (CH-2023-001)
//                     </small>
//                   </td>
//                   <td>
//                     <div class="user-cell">
//                       <div class="avatar green">GD</div> <span>Gold Plan - ₹1,00,000</span>
//                     </div>
//                   </td>
//                   <td className="text-success">₹ 500000</td>
//                   <td>
//                     <span className="badge rounded-pill bg-danger bg-opacity-25 text-danger">completed</span>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>
//                     Karthick P
//                     <small className="w-100 d-block" style={{ color: "var(--main-color)" }}>
//                       (CH-2023-015)
//                     </small>
//                   </td>
//                   <td>
//                     <div class="user-cell">
//                       <div class="avatar green">GD</div> <span>Gold Plan - ₹1,00,000</span>
//                     </div>
//                   </td>
//                   <td className="text-success">₹ 120000</td>
//                   <td>
//                     <span className="badge rounded-pill bg-success bg-opacity-25 text-success">active</span>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>
//                     Rahul Sharma
//                     <small className="w-100 d-block" style={{ color: "var(--main-color)" }}>
//                       (CH-2023-041)
//                     </small>
//                   </td>
//                   <td>
//                     <div class="user-cell">
//                       <div class="avatar green">GD</div> <span>Gold Plan - ₹1,00,000</span>
//                     </div>
//                   </td>
//                   <td className="text-success">₹ 800000</td>
//                   <td>
//                     <span className="badge rounded-pill bg-success bg-opacity-25 text-success">active</span>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>
//                     Suresh Kumar R
//                     <small className="w-100 d-block" style={{ color: "var(--main-color)" }}>
//                       (CH-2023-042)
//                     </small>
//                   </td>
//                   <td>
//                     <div class="user-cell">
//                       <div class="avatar green">GD</div> <span>Gold Plan - ₹1,00,000</span>
//                     </div>
//                   </td>
//                   <td className="text-success">₹ 2,20000</td>
//                   <td>
//                     <span className="badge rounded-pill bg-warning bg-opacity-25 text-warning">pending</span>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

import React, { useEffect } from "react";
import "./AgentStaff.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getStaffById } from "../../slices/agentAndStaff";

export const AgentDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  // ✅ include loading + error
  const { selectedStaff, loading, error } = useSelector(
    (state) => state.agentAndStaff,
  );

  console.log("🔥 selectedStaff:", selectedStaff);

  /* ================= LOAD ================= */
  useEffect(() => {
    if (id) {
      dispatch(getStaffById(id));
    }
  }, [dispatch, id]);

  /* ================= HELPER ================= */
  const getInitials = (name = "") =>
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <div className="row gy-4">
      {/* LEFT CARD */}
      <div className="col-lg-3">
        <div className="agent-card">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p className="text-danger text-center">
              {error?.message || error || "Something went wrong"}
            </p>
          ) : (
            <div className="row gy-4">
              <div className="col-lg-12">
                <div className="user_icon text-center">
                  {getInitials(selectedStaff?.name || "")}
                </div>
              </div>

              <div className="col-lg-12">
                <h5 className="user_name text-center">
                  {selectedStaff?.name || "-"}
                </h5>

                <p className="user_id text-center">
                  Agent ID : {selectedStaff?.id || "-"}
                </p>

                <p className="text-center text-muted">
                  {selectedStaff?.phoneNumber || "-"}
                </p>

                <p className="text-center">
                  <span
                    className={`badge rounded-pill ${
                      selectedStaff?.status === "ACTIVE"
                        ? "bg-success bg-opacity-25 text-success"
                        : "bg-danger bg-opacity-25 text-danger"
                    }`}
                  >
                    {selectedStaff?.status || "-"}
                  </span>
                </p>
              </div>

              <div className="col-lg-12">
                <button className="btn light-btn w-100 d-block">
                  <i className="fi fi-rs-pencil me-2"></i>Edit Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="col-lg-9">
        <div className="wrapper-table-outer">
          <div className="table-header d-flex justify-content-between align-items-center">
            <h6>
              <i className="fi fi-rs-users me-2"></i>Reference Customers
            </h6>
            <button className="light-btn">
              <i className="fi fi-tr-file-excel"></i>Export Excel
            </button>
          </div>

          {/* KEEP YOUR STATIC TABLE */}
          <table className="premium_table table-striped mt-3">
            <thead>
              <tr>
                <th>Customer Detail</th>
                <th>Plan Detail</th>
                <th>Total Investment</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  Rajesh Kumar M
                  <small
                    className="w-100 d-block"
                    style={{ color: "var(--main-color)" }}
                  >
                    (CH-2023-001)
                  </small>
                </td>
                <td>
                  <div className="user-cell">
                    <div className="avatar green">GD</div>
                    <span>Gold Plan - ₹1,00,000</span>
                  </div>
                </td>
                <td className="text-success">₹ 500000</td>
                <td>
                  <span className="badge rounded-pill bg-danger bg-opacity-25 text-danger">
                    completed
                  </span>
                </td>
              </tr>

              <tr>
                <td>
                  Karthick P
                  <small
                    className="w-100 d-block"
                    style={{ color: "var(--main-color)" }}
                  >
                    (CH-2023-015)
                  </small>
                </td>
                <td>
                  <div className="user-cell">
                    <div className="avatar green">GD</div>
                    <span>Gold Plan - ₹1,00,000</span>
                  </div>
                </td>
                <td className="text-success">₹ 120000</td>
                <td>
                  <span className="badge rounded-pill bg-success bg-opacity-25 text-success">
                    active
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// export const AgentDetail = () => {
//   const { id } = useParams();

//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchStaff = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const res = await axios.get(
//           `http://localhost:8080/api/agent/getStaff/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         console.log("✅ DIRECT API RESPONSE:", res.data);
//         setData(res.data);
//       } catch (err) {
//         console.error("❌ DIRECT API ERROR:", err);
//         console.error("❌ STATUS:", err?.response?.status);
//         console.error("❌ DATA:", err?.response?.data);

//         setError(err?.response?.data || err.message);
//       }
//     };

//     fetchStaff();
//   }, [id]);

//   return (
//     <div>
//       <h3>Agent Detail</h3>

//       {error && (
//         <p style={{ color: "red" }}>
//           {typeof error === "object" ? JSON.stringify(error) : error}
//         </p>
//       )}

//       {data && (
//         <div>
//           <p>Name: {data.name}</p>
//           <p>Phone: {data.phoneNumber}</p>
//           <p>Status: {data.status}</p>
//         </div>
//       )}
//     </div>
//   );
// };
