import { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Trash2 } from "lucide-react";
import { FiCopy } from "react-icons/fi";

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
        image,
        platform
    } = withdraw;

    const [currentStatus, setCurrentStatus] = useState(status);

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

   
  // 🇧🇩 বাংলাদেশ টাইম ফরম্যাট (BN) - বাংলাদেশ সময় (GMT+6)
  const formatBDTime = (isoTime) => {
    const date = new Date(isoTime);

 

    return date.toLocaleString('bn-BD', {
        timeZone: 'Asia/Dhaka',
        hour12: true,
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });
  };

  const formattedTime = formatBDTime(createdAt);

    return (
        <div className="flex justify-between items-center bg-white shadow p-4 mb-3">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full font-bold overflow-hidden">
                    <img src={image} alt="Wallet" className="w-full h-full object-cover" />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-800">{customer?.email}</h3>
                    <p className="text-xs text-gray-500">
                        Plat Form : <span className="bg-green-500 text-white rounded-xl px-2">{platform}</span>
                    </p>
                    <p className="text-xs text-gray-500">
                        যে নাম্বারে টাকা গ্রহণ করবে : 
                        <span className="text-green-500 ml-1">{walletNumber}</span>
                        <button 
                            onClick={() => {
                                navigator.clipboard.writeText(walletNumber);
                                Swal.fire('কপি হয়েছে!', `Wallet নাম্বার কপি হয়েছে: ${walletNumber}`, 'success');
                            }}
                            className="ml-2 px-2 py-0.5 text-xs rounded transition"
                        >
                            <FiCopy />
                        </button>
                    </p>
                    <p className="text-xs text-gray-400">ID: {idNumber}</p>
                    <p className="text-xs text-gray-600">Code: {withdrawCode}</p>
                    <p className="text-xs text-gray-500">{formattedTime}</p> {/* Display formatted time */}
                </div>
            </div>

            <div className="text-right space-y-1">
                <p className="text-base font-bold text-gray-800">{amount}৳</p>

                {currentStatus === "সফল" ? (
                    <span className="text-green-600 bg-green-100 text-xs px-2 py-1 rounded-full">সফল</span>
                ) : currentStatus === "বাতিল" ? (
                    <span className="text-red-600 bg-red-100 text-xs px-2 py-1 rounded-full">বাতিল</span>
                ) : (
                    <span className="text-yellow-600 bg-yellow-100 text-xs px-2 py-1 rounded-full">{currentStatus}</span>
                )}

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

                {status !== "সফল" && (
                    <button
                        onClick={handleDelete}
                        className="text-xs mt-2 px-2 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 transition"
                    >
                        <Trash2 size={14} className="inline-block mr-1" /> ডিলিট
                    </button>
                )}
            </div>
        </div>
    );
};

export default ManageWithdrawCard;
