import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Trash2 } from "lucide-react"; // Optional delete icon
import { FiCopy } from "react-icons/fi"; // Copy icon

const ManageDepositsCard = ({ deposit, refetch }) => {
  const { idNumber, image, amount, trxId, status, createdAt, wallet, customer, sendNumber, _id } = deposit;

  const [currentStatus, setCurrentStatus] = useState(status);
  const axiosSecure = useAxiosSecure();

  // বাংলাদেশ টাইম ফরম্যাট
  const bdTime = new Date(createdAt).toLocaleString("bn-BD", { timeZone: "Asia/Dhaka" });

  // ✅ কপি হ্যান্ডলার
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    Swal.fire("কপি হয়েছে!", `"${text}" ক্লিপবোর্ডে কপি হয়েছে।`, "success");
  };

  // 🔄 স্ট্যাটাস চেঞ্জ হ্যান্ডলার
  const handleLocalStatusChange = async (newStatus) => {
    setCurrentStatus(newStatus);
    try {
      const response = await axiosSecure.patch(`/update-deposits-status/${_id}`, { status: newStatus });
      if (response.status === 200) {
        Swal.fire("সফল!", "অবস্থা সফলভাবে আপডেট হয়েছে।", "success");
        refetch();
      } else {
        Swal.fire("ব্যর্থ!", "স্ট্যাটাস আপডেট করা যায়নি।", "error");
      }
    } catch (error) {
      Swal.fire("ত্রুটি!", `স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে: ${error.message}`, "error");
    }
  };

  // 🗑️ ডিলিট হ্যান্ডলার
  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "এই জমা ডেটা ডিলিট হয়ে যাবে!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "হ্যাঁ, ডিলিট করুন",
      cancelButtonText: "না, বাতিল করুন"
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/delete-deposit/${_id}`);
        if (res.data?.deletedCount > 0) {
          Swal.fire("ডিলিট হয়েছে!", "জমা ডেটা সফলভাবে ডিলিট হয়েছে।", "success");
          refetch();
        } else {
          Swal.fire("ব্যর্থ!", "ডিলিট করা যায়নি।", "error");
        }
      } catch (error) {
        Swal.fire("ত্রুটি!", `ডিলিট করতে সমস্যা হয়েছে: ${error.message}`, "error");
      }
    }
  };

  return (
    <div className="flex justify-between items-center border-b border-gray-300 py-3">
      <div className="flex items-center gap-3">
        <img src={image} alt="Logo" className="w-8 h-8 object-cover rounded-full" />
        <div>
          <p className="text-xs text-gray-500">
            <span className="font-bold">Customer:</span> {customer?.email}
          </p>

          {/* 🧾 Id এবং কপি বাটন */}
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <span className="font-bold">Id:</span> <span className="text-green-500">{idNumber}</span>
            <button 
              onClick={() => handleCopy(idNumber)} 
              className="text-gray-500 hover:text-blue-600 transition"
            >
              <FiCopy size={14} />
            </button>
          </p>

          <p className="text-xs text-red-500">TrxId: {trxId}</p>
          <p className="text-xs text-gray-500">যে নাম্বারে টাকা পাঠিয়েছে: {sendNumber}</p>
          <p className="text-xs text-gray-500">যে নাম্বার থেকে টাকা পাঠিয়েছে: {wallet}</p>
          <p className="text-xs text-gray-500">{bdTime}</p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <p className="font-semibold text-gray-800">{amount} ৳</p>

        <span
          className={`text-xs mt-1 px-2 py-1 rounded-full
            ${status === "সফল"
              ? "bg-green-100 text-green-700"
              : status === "বাতিল"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"}`}
        >
          {status}
        </span>

        <select
          className={`text-xs mt-2 px-2 py-1 rounded
            ${currentStatus === "অপেক্ষমান"
              ? "bg-yellow-100 text-yellow-800"
              : currentStatus === "প্রক্রিয়াধীন"
              ? "bg-blue-100 text-blue-800"
              : currentStatus === "সফল"
              ? "bg-green-100 text-green-800"
              : currentStatus === "বাতিল"
              ? "bg-red-100 text-red-800"
              : "bg-gray-100 text-gray-800"}`}
          value={currentStatus}
          onChange={(e) => handleLocalStatusChange(e.target.value)}
        >
          <option value="অপেক্ষমান">অপেক্ষমান</option>
          <option value="প্রক্রিয়াধীন">প্রক্রিয়াধীন</option>
          <option value="সফল">সফল</option>
          <option value="বাতিল">বাতিল</option>
        </select>

        {status !== "সফল" && (
          <button
            onClick={handleDelete}
            className="text-xs mt-2 px-2 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 transition"
          >
            <Trash2 size={14} className="inline-block mr-1" /> ডিলিট করুন
          </button>
        )}
      </div>
    </div>
  );
};

export default ManageDepositsCard;
