import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const StockLedger = () => {
  const [ledger, setLedger] = useState([]);
  const [loading, setLoading] = useState(true);
  const printRef = useRef();

  useEffect(() => {
    const fetchLedger = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/transaction/getheader");
        if (res.data.success) {
          setLedger(res.data.data);
        }
      } catch (err) {
        console.error(err);
        alert("❌ Failed to fetch stock ledger!");
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
          <title>SMARTSTORE - Stock Ledger</title>
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

  if (loading) return <p>Loading stock ledger...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Stock Ledger</h2>
      
      <button
        onClick={handlePrint}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
      >
        🖨 Print Ledger
      </button>

      <div ref={printRef}>
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Doc Number</th>
              <th className="p-2 border">Transaction Type</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Rate</th>
              <th className="p-2 border">Supplier Code</th>
              <th className="p-2 border">Department Code </th>
              <th className="p-2 border">Item Id</th>
          
            </tr>
          </thead>
          <tbody>
            {ledger.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No items found.
                </td>
              </tr>
            ) : (
              ledger.map((entry, index) => (
                <tr key={index}>
                  <td className="border p-2">{entry.docNumber}</td>
                  <td className="border p-2">{entry.transactionType}</td>
                  <td className="border p-2">{entry.date}</td>
                  <td className="border p-2">{entry.quantity}</td>
                  <td className="border p-2">{entry.rate}</td>
                  <td className="border p-2">{entry.supplierCode}</td>
                  <td className="border p-2">{entry.departmentCode}</td>
                  <td className="border p-2">{entry.itemId}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockLedger;
