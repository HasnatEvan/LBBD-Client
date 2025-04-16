import { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Trash2 } from "lucide-react"; // ✅ এই লাইনে Trash2 Icon import করতে ভুললে error দিবে

const ManageWithdrawCard = ({ withdraw, refetch }) => {
    const axiosSecure = useAxiosSecure();
    const {
        _id,
        customer,
        idNumber,
        amount,
        walletNumber,
        withdrawCode,
        status,
        createdAt,
        image
    } = withdraw;

    const [currentStatus, setCurrentStatus] = useState(status);

    // 🔄 স্ট্যাটাস আপডেট ফাংশন
    const handleLocalStatusChange = async (newStatus) => {
        setCurrentStatus(newStatus);
        try {
            const response = await axiosSecure.patch(`/update-withdraw-status/${_id}`, { status: newStatus });
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

    // ❌ ডিলিট হ্যান্ডলার (Demo PopUp)
    const handleDelete = () => {
        Swal.fire({
            title: 'আপনি কি নিশ্চিত?',
            text: "এই উইথড্র রিকোয়েস্ট মুছে ফেলা হবে!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'হ্যাঁ, ডিলিট করুন!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/delete-withdraw/${_id}`);
                    if (res.data.deletedCount > 0) {
                        Swal.fire('ডিলিটেড!', 'ডাটা সফলভাবে ডিলিট হয়েছে।', 'success');
                        refetch();
                    } else {
                        Swal.fire('ব্যর্থ!', 'ডিলিট করা যায়নি।', 'error');
                    }
                } catch (err) {
                    Swal.fire('ত্রুটি!', err.message, 'error');
                }
            }
        });
    };

    // 📅 তারিখ ফরম্যাটিং
    const date = new Date(createdAt).toLocaleString("bn-BD", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Dhaka"
    });

    return (
        <div className="flex justify-between items-center bg-white  shadow p-4 mb-3">
            {/* Wallet Icon Part */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full font-bold overflow-hidden">
                    <img src={image} alt="Wallet" className="w-full h-full object-cover" />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-800">{customer?.email}</h3>
                    <p className="text-xs text-gray-500">{walletNumber}</p>
                    <p className="text-xs text-gray-400">ID: {idNumber}</p>
                    <p className="text-xs text-gray-600">Code: {withdrawCode}</p>
                    <p className="text-xs text-gray-500">{date}</p>
                </div>
            </div>

            {/* Amount & Status Part */}
            <div className="text-right space-y-1">
                <p className="text-base font-bold text-gray-800">{amount}৳</p>

                {currentStatus === "সফল" ? (
                    <span className="text-green-600 bg-green-100 text-xs px-2 py-1 rounded-full">সফল</span>
                ) : currentStatus === "বাতিল" ? (
                    <span className="text-red-600 bg-red-100 text-xs px-2 py-1 rounded-full">বাতিল</span>
                ) : (
                    <span className="text-yellow-600 bg-yellow-100 text-xs px-2 py-1 rounded-full">{currentStatus}</span>
                )}

                {/* স্ট্যাটাস সিলেক্ট বক্স */}
                <div>
                    <select
                        className={`text-xs mt-2 px-2 py-1 rounded outline-none border
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
                </div>

                {/* ডিলিট বাটন */}
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

export default ManageWithdrawCard;
