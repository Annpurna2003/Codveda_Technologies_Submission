import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({
    master: false,
    itemMaster: false,
    supplierMaster: false,
    transactions: false,
    reports: false,
  });

  const navigate = useNavigate();

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-5">
      <h2 className="text-xl font-semibold mb-6 text-center">Menu</h2>

      {/* Master */}
      <div>
        <button
          onClick={() => toggleMenu("master")}
          className="w-full text-left px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg mb-2"
        >
          Master
        </button>

        {openMenus.master && (
          <div className="pl-4 space-y-2">
            {/* Item Master */}
            <button
              onClick={() => toggleMenu("itemMaster")}
              className="w-full text-left px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg"
            >
              Item Master
            </button>

            {openMenus.itemMaster && (
              <ul className="pl-6 list-disc space-y-1 text-gray-300">
              <li>
  <Link
    to="/add-item"
    className="cursor-pointer hover:text-white transition"
  >
    Add Item
  </Link>
</li>
                       <li>
  <Link
    to="/view-item"
    className="cursor-pointer hover:text-white transition"
  >
    View Item
  </Link>
</li>
</ul>
            )}

            {/* Supplier Master */}
            <button
              onClick={() => toggleMenu("supplierMaster")}
              className="w-full text-left px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg"
            >
              Supplier Master
            </button>

            {openMenus.supplierMaster && (
              <ul className="pl-6 list-disc space-y-1 text-gray-300">
                         <li>
  <Link
    to="/add-supplier"
    className="cursor-pointer hover:text-white transition"
  >
    Create Supplier
  </Link>
</li>
                      <li>
  <Link
    to="/view-supplier"
    className="cursor-pointer hover:text-white transition"
  >
    View Supplier
  </Link>
</li>
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Transactions */}
      <div className="mt-4">
        <button
          onClick={() => toggleMenu("transactions")}
          className="w-full text-left px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg mb-2"
        >
          Transactions
        </button>
        {openMenus.transactions && (
          <ul className="pl-6 list-disc space-y-1 text-gray-300">
                     <li>
  <Link
    to="/purchase"
    className="cursor-pointer hover:text-white transition"
  >
    Purchase
  </Link>
</li>
                   <li>
  <Link
    to="/issue"
    className="cursor-pointer hover:text-white transition"
  >
    Issue
  </Link>
</li>
          </ul>
        )}
      </div>

      {/* Reports */}
      <div className="mt-4">
        <button
          onClick={() => toggleMenu("reports")}
          className="w-full text-left px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg mb-2"
        >
          Reports
        </button>
        {openMenus.reports && (
          <ul className="pl-6 list-disc space-y-1 text-gray-300">
                     <li>
  <Link
    to="/stock-ledger"
    className="cursor-pointer hover:text-white transition"
  >
    stock Ledger
  </Link>
</li>
                   <li>
  <Link
    to="/ledger-status"
    className="cursor-pointer hover:text-white transition"
  >
    Ledger Status
  </Link>
</li>
                   
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
