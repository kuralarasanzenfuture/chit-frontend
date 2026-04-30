// import { createContext, useContext, useState } from "react";

// const BranchContext = createContext();

// export const BranchProvider = ({ children }) => {
//   const BRANCHES = [
//     { id: 1, name: "Main Branch", location: "Chennai", branchId: "BR001", isPrimary: true },
//     { id: 2, name: "Coimbatore", location: "Coimbatore", branchId: "BR002" },
//     { id: 3, name: "Madurai", location: "Madurai", branchId: "BR003" },
//   ];

//   const [activeBranch, setActiveBranch] = useState(BRANCHES[0]);

//   return (
//     <BranchContext.Provider value={{ activeBranch, setActiveBranch, BRANCHES }}>
//       {children}
//     </BranchContext.Provider>
//   );
// };

// export const useBranch = () => {
//   const context = useContext(BranchContext);

//   if (!context) {
//     throw new Error("useBranch must be used inside BranchProvider");
//   }

//   return context;
// };