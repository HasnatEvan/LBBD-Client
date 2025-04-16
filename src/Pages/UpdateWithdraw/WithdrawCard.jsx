import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";  // SweetAlert2 ইনপোর্ট করুন

const WithdrawCard = ({ addWithdraw, refetch }) => {
    const axiosSecure = useAxiosSecure();
    const { _id, numberName, image } = addWithdraw;

    const handleDelete = async () => {
        const confirmDelete = await Swal.fire({
            title: `${numberName} মুছে ফেলতে চান?`,
            text: "এই কাজটি পুনরায় করা যাবে না!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "হ্যাঁ, মুছে ফেলুন!",
            cancelButtonText: "না, রেখে দিন"
        });

        if (confirmDelete.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/addWithdraws/${_id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire("মুছে ফেলা হয়েছে!", `${numberName} সফলভাবে মুছে ফেলা হয়েছে।`, "success");
                    refetch(); // নতুন ডেটা আনবে
                } else {
                    Swal.fire("বিফল!", "মুছে ফেলা সম্ভব হয়নি। আবার চেষ্টা করুন!", "error");
                }
            } catch (error) {
                console.error(error);
                Swal.fire("ত্রুটি!", "Withdraw মুছতে গিয়ে সমস্যা হয়েছে!", "error");
            }
        }
    };

    return (
        <div className="flex items-center justify-between bg-white p-3 shadow-sm mb-3">
            <div className="flex items-center gap-3">
                <img
                    src={image}
                    alt={`${numberName} লোগো`}
                    className="w-14 h-14 object-contain"
                />
                <p className="font-semibold">{numberName}</p>
            </div>

            <button 
                onClick={handleDelete} 
                className="bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1 rounded transition"
            >
                ডিলিট
            </button>
        </div>
    );
};

export default WithdrawCard;
