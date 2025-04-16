import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdPerson, MdAttachMoney, MdSmartphone, MdReceiptLong, MdSync } from "react-icons/md";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ConfirmWithdraw = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [number, setNumber] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchNumberData = async () => {
            try {
                const { data } = await axios.get(`https://lbbd-server.vercel.app/addWithdraws/${id}`);
                setNumber(data);
            } catch (error) {
                console.error("Error fetching number data", error);
            }
        };

        fetchNumberData();
    }, [id]);

    if (!number) return <div className="text-center text-base md:text-lg font-medium">
                    <MdSync className="animate-spin inline-block mr-2 text-2xl" /> {/* Spinning icon */}
                    লোড হচ্ছে...
                </div>

    const { withdrawImage, numberName, image,admin } = number;

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.target;
        const idNumber = form.idNumber.value;
        const amount = form.amount.value;
        const walletNumber = form.walletNumber.value;
        const withdrawCode = form.withdrawCode.value;

        const withdrawData = {
            customer: {
                name: user?.displayName,
                email: user?.email,
            },
            numberId: id,
            idNumber,
            numberName,
            amount,
            walletNumber,
            withdrawCode,
            type: "উইথড্র",
            status: "বিচারাধীন",
            image,
            admin:admin?.email
        };

        setLoading(true);

        setTimeout(async () => {
            try {
                const res = await axiosSecure.post('/withdraws', withdrawData);
                if (res.data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: '✅ সফলভাবে জমা হয়েছে!',
                        text: 'আপনার উইথড্র রিকুয়েস্ট সফলভাবে জমা হয়েছে!',
                        confirmButtonText: 'ঠিক আছে'
                    }).then(() => {
                        form.reset();
                        navigate('/my-withdraw');
                    });
                }
            } catch (error) {
                console.error("উইথড্র রিকুয়েস্ট পাঠাতে সমস্যা হয়েছে:", error);
                Swal.fire({
                    icon: 'error',
                    title: '❌ সমস্যা হয়েছে!',
                    text: 'দুঃখিত, কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।',
                    confirmButtonText: 'ঠিক আছে'
                });
            } finally {
                setLoading(false);
            }
        }, 5000);
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4 text-black">
            <div className="max-w-md w-full bg-white p-5">
                <h2 className="text-2xl font-bold text-center mb-5">উইথড্র তথ্য</h2>

                <div className="flex justify-center mb-4">
                    <img src={withdrawImage} alt={numberName} className="h-64" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="flex items-center gap-2 text-gray-700">
                            <MdPerson className="text-xl" /> ID Number
                        </label>
                        <input
                            type="text"
                            name="idNumber"
                            placeholder="আপনার আইডি লিখুন"
                            className="w-full mt-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-gray-700">
                            <MdAttachMoney className="text-xl" /> Amount
                        </label>
                        <input
                            type="number"
                            name="amount"
                            placeholder="উইথড্র এমাউন্ট লিখুন"
                            min="1"
                            className="w-full mt-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-gray-700">
                            <MdSmartphone className="text-sm" /> Wallet Number(যে নাম্বারে টাকা গ্রহণ করবেন )
                        </label>
                        <input
                            type="number"
                            name="walletNumber"
                            placeholder={numberName}
                            className="w-full mt-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-gray-700">
                            <MdReceiptLong className="text-xl" /> Withdraw Code
                        </label>
                        <input
                            type="text"
                            name="withdrawCode"
                            placeholder="উইথড্র কোড দিন"
                            className="w-full mt-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-full transition"
                    >
                        {loading ? (
                            <span className="loading loading-dots loading-xl"></span>
                        ) : (
                            'রিকুয়েস্ট পাঠিয়ে দিন'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ConfirmWithdraw;
