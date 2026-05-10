import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Register from "./pages/register.jsx";
import Login from "./pages/login.jsx";
import Welcome from "./pages/welcome.jsx";
import Navbar from "./components/navbar.jsx";
import Sidebar from "./components/sidebar.jsx";
import Footer from "./components/footer.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddItem from "./pages/AddItem.jsx";
import ViewItem from "./pages/viewItem.jsx";
import AddSupplier from "./pages/addsupplier.jsx";
import ViewSupplier from "./pages/viewsupplier.jsx";
import PurchaseDashboard from "./pages/purchasedashboard.jsx";
import IssueDashboard from "./pages/issuedashboard.jsx";
import StockLedger from "./pages/stockledger.jsx";
import LedgerStatus from "./pages/ledgerstatus.jsx";
const Layout = ({ children }) => {
  const location = useLocation();
  const hideLayoutPaths = ["/", "/register", "/login"];
  const shouldHideLayout = hideLayoutPaths.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!shouldHideLayout && <Navbar />}
      <div className="flex flex-1">
        {!shouldHideLayout && <Sidebar />}
        <div className="flex-grow p-4 bg-gray-100">{children}</div>
      </div>
      {!shouldHideLayout && <Footer />}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/view-item" element={<ViewItem />} />
          <Route path="/add-supplier" element={<AddSupplier />} />
           <Route path="/view-supplier" element={<ViewSupplier />} />
        <Route path="/purchase" element={<PurchaseDashboard />} />
        <Route path="/issue" element={<IssueDashboard />} />
        <Route path="/stock-ledger" element={<StockLedger />} />
        <Route path="/ledger-status" element={<LedgerStatus />} />  
      </Routes>
    </Layout>
  );
};

export default App;
