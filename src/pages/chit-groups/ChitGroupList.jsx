import React from "react";

const activityData = [
  {
    id: 1,
    name: "Arun Kumar",
    phone: "9876543210",
    aadhar: "1234 5678 9012",
    pan: "ABCDE1234F",
    address: "12, Anna Nagar, Madurai",
    nomineeName: "Lakshmi",
    nomineePhone: "9876500001",
  },
  {
    id: 2,
    name: "Ravi Kumar",
    phone: "9876543211",
    aadhar: "2234 5678 9012",
    pan: "BCDEF2345G",
    address: "45, KK Nagar, Madurai",
    nomineeName: "Suresh",
    nomineePhone: "9876500002",
  },
  {
    id: 3,
    name: "Suresh Babu",
    phone: "9876543212",
    aadhar: "3234 5678 9012",
    pan: "CDEFG3456H",
    address: "78, Melur Road, Madurai",
    nomineeName: "Priya",
    nomineePhone: "9876500003",
  },
  {
    id: 4,
    name: "Vijay Raj",
    phone: "9876543213",
    aadhar: "4234 5678 9012",
    pan: "DEFGH4567I",
    address: "9, Thirunagar, Madurai",
    nomineeName: "Kavitha",
    nomineePhone: "9876500004",
  },
  {
    id: 5,
    name: "Mani Selvam",
    phone: "9876543214",
    aadhar: "5234 5678 9012",
    pan: "EFGHI5678J",
    address: "21, Villapuram, Madurai",
    nomineeName: "Selvi",
    nomineePhone: "9876500005",
  },
  {
    id: 6,
    name: "Karthik",
    phone: "9876543215",
    aadhar: "6234 5678 9012",
    pan: "FGHIJ6789K",
    address: "3, Alagarkoil Road, Madurai",
    nomineeName: "Ramesh",
    nomineePhone: "9876500006",
  },
  {
    id: 7,
    name: "Prakash",
    phone: "9876543216",
    aadhar: "7234 5678 9012",
    pan: "GHIJK7890L",
    address: "56, Teppakulam, Madurai",
    nomineeName: "Anitha",
    nomineePhone: "9876500007",
  },
  {
    id: 8,
    name: "Dinesh",
    phone: "9876543217",
    aadhar: "8234 5678 9012",
    pan: "HIJKL8901M",
    address: "11, Avaniyapuram, Madurai",
    nomineeName: "Deepa",
    nomineePhone: "9876500008",
  },
  {
    id: 9,
    name: "Gokul",
    phone: "9876543218",
    aadhar: "9234 5678 9012",
    pan: "IJKLM9012N",
    address: "88, Mattuthavani, Madurai",
    nomineeName: "Kumar",
    nomineePhone: "9876500009",
  },
  {
    id: 10,
    name: "Senthil",
    phone: "9876543219",
    aadhar: "1034 5678 9012",
    pan: "JKLMN0123O",
    address: "14, Pasumalai, Madurai",
    nomineeName: "Meena",
    nomineePhone: "9876500010",
  },
];
const colors = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#6366f1"];

const getColor = (index) => colors[index % colors.length];

const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

export const ChitGroupList = () => {
  return (
    <>
      <div class="filter-wrapper d-flex gap-2 align-items-center mb-3">
        <div class="filter-header">
          <i class="bi bi-funnel-fill"></i>&nbsp; Filters :
        </div>
        <div class="search-item">
          <div class="search-box ">
            <input class="search-input" placeholder="Search By Name or ID..." type="text" value="" />
            <i class="bi bi-search search-icon"></i>
          </div>
        </div>
        <div class="flex-fill">
          <select name="" id="" class="form-select">
            <option value="">ALL</option>
            <option value="WAITING">UPCOMING</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="CLOSED">CLOSED</option>
          </select>
        </div>
        <div class="flex-fill">
          <div class="d-flex align-items-center justify-content-md-end gap-2  filter-calender flex-wrap ">
            <div class="d-flex align-items-center gap-2">
              <label>
                From <span class="d-none d-md-inline-block">Date</span> :
              </label>
              <input class="form-control" type="date" value="" />
            </div>
            <div class="d-flex align-items-center gap-2">
              <label>
                To <span class="d-none d-md-inline-block">Date</span> :
              </label>
              <input class="form-control" type="date" value="" />
            </div>
          </div>
        </div>
      </div>
      <div className="wrapper-table-outer mt-4">
        <div className="table-header">
          <h6>
            <i class="fi fi-rs-users me-2"></i>Members List
          </h6>
        </div>

        <table className="premium_table table-striped">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Phone</th>
              <th>Aadhar </th>
              <th>PAN</th>
              <th>Address</th>
              <th>Nominee Name</th>
              <th>Nominee Phone Number</th>
            </tr>
          </thead>

          <tbody>
            {activityData.map((item, index) => (
              <tr key={index}>
                <td className="customer_cell">
                  <span className="name_badge" style={{ background: getColor(index) }}>
                    {getInitials(item.name)}
                  </span>
                  {item.name}
                </td>

                <td>{item.phone}</td>

                <td>{item.aadhar}</td>

                <td>{item.pan}</td>
                <td>{item.address}</td>
                <td>{item.nomineeName}</td>
                <td>{item.nomineePhone}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="table-footer">
            <tr>
              <td colSpan={3}>
                <div className="entry-count">Showing 1 to 10 of 60 entries</div>
              </td>
              <td colSpan={4}>
                <div className="pagination">
                  <span className="page-btn">«</span>

                  <span className="page-number active">1</span>
                  <span className="page-number">2</span>
                  <span className="page-number">3</span>
                  <span className="page-number">4</span>
                  <span className="page-number">5</span>
                  <span className="page-number">6</span>

                  <span className="page-btn">»</span>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};
