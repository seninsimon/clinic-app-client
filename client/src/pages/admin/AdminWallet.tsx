// src/pages/admin/AdminWallet.tsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInterceptor";

interface Transaction {
  _id: string;
  fromUser: string;
  amount: number;
  date: string;
  appointmentId: string;
  type: "credit" | "debit";
}

const AdminWallet: React.FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const walletRes = await axiosInstance.get("/admin/wallet-balance");
        setBalance(walletRes.data.balance);

        const transactionRes = await axiosInstance.get("/admin/transaction-history");
        setTransactions(transactionRes.data.transactions);
      } catch (error) {
        console.error("Error fetching wallet or transactions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWallet();
  }, []);

  if (loading) {
    return <div className="text-center p-10">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Wallet</h1>

      <div className="bg-white shadow rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-2">Current Balance</h2>
        <p className="text-3xl text-green-600 font-bold">₹{balance}</p>
      </div>

      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
        {transactions.length === 0 ? (
          <p className="text-gray-500">No transactions yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="text-xs uppercase bg-gray-100 text-gray-600">
                <tr>
                  <th className="px-4 py-2">From</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Appointment ID</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{tx.fromUser}</td>
                    <td className="px-4 py-2 capitalize">
                      {tx.type === "credit" ? (
                        <span className="text-green-600 font-medium">Credit</span>
                      ) : (
                        <span className="text-red-600 font-medium">Debit</span>
                      )}
                    </td>
                    <td
                      className={`px-4 py-2 font-medium ${
                        tx.type === "credit" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {tx.type === "credit" ? "+" : "-"}₹{tx.amount}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(tx.date).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="px-4 py-2">{tx.appointmentId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminWallet;
