import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const LedgerStatus = () => {
  const [ledgerStatus, setLedgerStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const printRef = useRef();

  useEffect(() => {
    const fetchLedger = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/stock/calculateledgerstatus");
        if (res.data.success) {
          setLedgerStatus(res.data.data);
        }
      } catch (err) {
        console.error(err);
        alert("❌ Failed to fetch ledger status!");
      } finally {
        setLoading(false);
      }
    };
    fetchLedger();
  }, []);

  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <head>
          <title>SMARTSTORE - Ledger Status</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #000; padding: 8px; text-align: center; }
            th { background-color: #f0f0f0; }
          </style>
        </head>
        <body>
          <h1>SMARTSTORE</h1>
          ${printContent}
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
  };

  if (loading) return <p>Loading ledger status...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Stock Ledger</h2>
      
      <button
        onClick={handlePrint}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
      >
        🖨 Ledger Status
      </button>

      <div ref={printRef}>
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th>Item Code</th>
              <th>Item Name</th>
              <th>Opening Stock</th>
              <th>Purchase Qty</th>
              <th>Issue Qty</th>
              <th>Closing Stock</th>
              <th>Min Level</th>
              <th>Reorder Level</th>
              <th>Max Level</th>
              <th>Ledger Status</th>
            </tr>
          </thead>
          <tbody>
            {ledgerStatus.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center p-4">
                  No items found.
                </td>
              </tr>
            ) : (
              ledgerStatus.map((item, index) => (
                <tr key={index}>
                  <td>{item.itemCode}</td>
                  <td>{item.itemName}</td>
                  <td>{item.openingStock}</td>
                  <td>{item.purchaseQty}</td>
                  <td>{item.issueQty}</td>
                  <td>{item.closingStock}</td>
                  <td>{item.minLevel}</td>
                  <td>{item.reorderLevel}</td>
                  <td>{item.maxLevel}</td>
                  <td>{item.ledgerStatus}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LedgerStatus;
