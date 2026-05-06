// import React from "react";
// import { Link } from "react-router-dom";

// const customers = [
//   {
//     agentId: "AGT-001",
//     noOfRefral: 3,
//     refrence_detail: "Agent",
//     lastRefral: "12-01-2026",
//     agentName: "Karthik R",
//     agentPhone: "9887766554",
//     status: "inactive",
//     color: "danger",
//   },
//   {
//     agentId: "AGT-002",
//     noOfRefral: 5,
//     refrence_detail: "Staff",
//     lastRefral: "21-12-2025",
//     agentName: "Priya Nair",
//     agentPhone: "9090909090",
//     status: "active",
//     color: "success",
//   },
// ];

// export const AgentStaffTable = () => {
//   return (
//     <div className="wrapper-table-outer mt-4">
//       <table className="premium_table table-striped">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Refrence Detail</th>
//             <th>Phone Number</th>
//             <th>No Of Refral</th>
//             <th>Last Refral</th>

//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {customers.map((item, index) => (
//             <React.Fragment key={index}>
//               {/* MAIN ROW */}

//               <tr key={index}>
//                 <td>
//                   {item.agentName} <br /> <small style={{ color: "var(--main-color)" }}>({item.agentId})</small>
//                 </td>
//                 <td>{item.refrence_detail}</td>
//                 <td>{item.agentPhone}</td>
//                 <td>{item.noOfRefral}</td>
//                 <td>{item.lastRefral}</td>

//                 <td className="hours-cell">
//                   <span className={`badge rounded-pill bg-${item.color} bg-opacity-25 text-${item.color}`}>{item.status}</span>
//                 </td>

//                 <td class="d-flex">
//                   <Link to="agent-detail">
//                     <i class="bi btn btn-sm bg-primary-subtle text-primary border border-primary-subtle me-2 bi-box-arrow-in-up-right"></i>
//                   </Link>
//                   <button class="btn btn-sm bg-warning-subtle text-warning me-2 border border-warning-subtle">
//                     <i class="bi bi-pencil"></i>
//                   </button>
//                   <button class="btn btn-sm bg-danger-subtle text-danger border border-danger-subtle">
//                     <i class="bi bi-trash"></i>
//                   </button>
//                 </td>
//               </tr>
//             </React.Fragment>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStaff, deleteStaff } from "../../../slices/agentAndStaff";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const AgentStaffTable = ({ onEdit }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const { staff = [] } = useSelector((state) => state.agentAndStaff || {});

  const filteredData = staff.filter((item) => {
    const term = searchTerm.toLowerCase();

    return item.name?.toLowerCase().includes(term) || item.phoneNumber?.includes(term) || item.referenceDetail?.includes(term);
  });

  useEffect(() => {
    dispatch(fetchStaff());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (!window.confirm("Delete this staff?")) return;

    dispatch(deleteStaff(id))
      .unwrap()
      .then(() => {
        dispatch(fetchStaff());
        toast.success("Staff deleted successfully ✅");
      })
      .catch((err) => {
        console.error("❌ Delete Error:", err);
        toast.error("Staff delete failed ❌");
      });
  };

  const getStatusColor = (status) => {
    if (status === "ACTIVE") return "success";
    if (status === "INACTIVE") return "danger";
    return "secondary";
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN");
  };

  const colors = [
    "#16a34a",
    "#0ea5e9",
    "#7c3aed",
    "#f59e0b",
    "#ef4444",
    "#10b981",
    "#3b82f6",
    "#8b5cf6",
    "#f97316",
    "#ec4899",
    "#22c55e",
    "#06b6d4",
    "#6366f1",
    "#eab308",
    "#dc2626",
    "#14b8a6",
    "#2563eb",
    "#9333ea",
    "#ea580c",
    "#db2777",
  ];

  const getAvatarStyle = (name = "") => {
    const index = name.charCodeAt(0) % colors.length;
    const color = colors[index];

    return {
      background: color + "20",
      color: color,
    };
  };

  return (
    <div className="wrapper-table-outer mt-4">
      <div className="table-header d-flex justify-content-between align-items-center">
        <h6>
          <i className="fi fi-rs-users me-2"></i>Agent List
        </h6>

        <div className="d-flex align-items-center gap-3">
          <div className="search-item">
            <div className="search-box ">
              <input
                className="search-input"
                placeholder="Search By Name or ID..."
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
              <i className="bi bi-search search-icon"></i>
            </div>
          </div>
        </div>
      </div>
      <table className="premium_table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Refrence Detail</th>
            <th>Phone Number</th>
            <th>No Of Referal</th>
            <th>Last Referal</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {(Array.isArray(filteredData) ? filteredData : []).map((item, index) => (
            <tr key={item.id || index}>
              <td>{index + 1}</td>

              <td className="d-flex align-items-center gap-2">
                <span className="avatar" style={getAvatarStyle(item.name)}>
                  {item.name?.charAt(0)}
                </span>
                {item.name}
              </td>

              <td>{item.referenceDetail}</td>
              <td>{item.phoneNumber}</td>
              <td>{item.noOfReferal}</td>
              <td>{formatDate(item.lastReferal)}</td>

              <td className="hours-cell">
                <span className={`badge rounded-pill bg-${getStatusColor(item.status)} bg-opacity-25 text-${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </td>

              <td className="d-flex">
                <Link to={`/agent-staff/agent-detail/${item.id}`}>
                  <i className="bi btn btn-sm bg-primary-subtle text-primary border border-primary-subtle me-2 bi-box-arrow-in-up-right"></i>
                </Link>

                {/* ✅ EDIT BUTTON FIX */}
                <button className="btn btn-sm bg-warning-subtle text-warning me-2 border border-warning-subtle" onClick={() => onEdit(item)}>
                  <i className="bi bi-pencil"></i>
                </button>

                <button className="btn btn-sm bg-danger-subtle text-danger border border-danger-subtle" onClick={() => handleDelete(item.id)}>
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
