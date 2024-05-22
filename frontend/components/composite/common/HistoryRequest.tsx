import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserInfo } from "@/slices/redux";

const HistoryRequest = () => {
  const userInfo = useSelector(getUserInfo);
  const [historyRequests, setHistoryRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const email = userInfo.email;

  useEffect(() => {
    const fetchHistoryRequests = async () => {
      try {
        const response = await fetch(`http://localhost:4000/users/history-requests/${email}`);
        if (!response.ok) {
          throw new Error("Failed to fetch history requests");
        }
        const data = await response.json();
        // Định dạng ngày phê duyệt
        const formattedRequests = data.map((request) => ({
          ...request,
          approvalDate: new Date(request.approvalDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }),
        }));
        setHistoryRequests(formattedRequests);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching history requests:", error);
      }
    };

    fetchHistoryRequests();
  }, [email]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto bg-white mt-8 p-4 rounded-xl w-full h-[85vh] justify-center">
      <h2 className="text-center text-bold text-[20px] my-5">Lịch sử mượn/ trả tài sản của {userInfo.name}</h2>
      <table className="mx-auto border-collapse w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Request ID</th>
            <th className="px-4 py-2">Loại</th>
            <th className="px-4 py-2">Tên tài sản</th>
            <th className="px-4 py-2">Số lượng</th>
            <th className="px-4 py-2">Ngày được phê duyệt</th>
                      <th className="px-4 py-2">Người phê duyệt</th>
                      <th className="px-4 py-2">Email phê duyệt</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {historyRequests.map((request) => (
            <tr key={request._id}>
              <td className="px-4 py-4 border-b border-gray-300">{request._id}</td>
              <td className="px-4 py-4 border-b border-gray-300">{request.type}</td>
              <td className="px-4 py-4 border-b border-gray-300">{request.assetName}</td>
              <td className="px-4 py-4 border-b border-gray-300">{request.quantity}</td>
              <td className="px-4 py-4 border-b border-gray-300">{request.approvalDate}</td>
                  <td className="px-4 py-4 border-b border-gray-300">{request.approver}</td>
                  <td className="px-4 py-4 border-b border-gray-300">{request.approverEmail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryRequest;
