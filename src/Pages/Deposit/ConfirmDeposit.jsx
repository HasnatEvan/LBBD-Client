import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaWallet, FaIdCard, FaMoneyBillWave, FaExchangeAlt } from "react-icons/fa";
import { MdAttachMoney, MdSync } from "react-icons/md";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import axios from "axios";
import Swal from 'sweetalert2';
import meletImage from '../../assets/mel.jpg';
import onexImage from '../../assets/1x.jpg';

const ConfirmDeposit = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    const navigate = useNavigate();

    const [number, setNumber] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [idNumber, setIdNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [wallet, setWallet] = useState('');
    const [trxId, setTrxId] = useState('');
    const [platform, setPlatform] = useState('');

    useEffect(() => {
        const fetchNumberData = async () => {
            try {
                const { data } = await axios.get(`https://lbbd-server.vercel.app/numbers/${id}`);
                setNumber(data);
            } catch (error) {
                console.error("Error fetching number data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNumberData();
    }, [id]);

    if (loading) return <div className="text-center text-base md:text-lg font-medium">
        <MdSync className="animate-spin inline-block mr-2 text-2xl" /> লোড হচ্ছে...
    </div>;

    if (!number) return <p className="text-center mt-10 text-red-500">ডেটা পাওয়া যায়নি</p>;

    const { numberName, image, number: sendNumber, admin } = number;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(async () => {
            const depositData = {
                customer: {
                    name: user?.displayName,
                    email: user?.email,
                },
                idNumber,
                image,
                amount,
                wallet,
                trxId,
                sendNumber,
                numberName,
                type: "ডিপোজিট",
                status: "বিচারাধীন",
                admin: admin?.email,
                platform
            };

            try {
                await axiosSecure.post('/deposits', depositData);
                Swal.fire({
                    title: 'সফল!',
                    text: 'আপনার রিকুয়েস্ট সফলভাবে পাঠানো হয়েছে!',
                    icon: 'success',
                    confirmButtonText: 'ঠিক আছে'
                }).then(() => {
                    navigate('/my-deposit');
                });

                setIdNumber('');
                setAmount('');
                setWallet('');
                setTrxId('');
                setPlatform('');

            } catch (err) {
                Swal.fire({
                    title: 'ত্রুটি!',
                    text: 'সার্ভারে সমস্যা হয়েছে। আবার চেষ্টা করুন।',
                    icon: 'error',
                    confirmButtonText: 'ঠিক আছে'
                });
                console.error(err);
            } finally {
                setIsSubmitting(false);
            }
        }, 5000);
    };

    return (
        <div className="bg-white min-h-screen flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8 text-black">
            <div className="max-w-lg w-full bg-white p-6 sm:p-8">
                <h2 className="text-2xl font-semibold mb-5 text-center text-[#5a189a]">ডিপোজিট</h2>

                <div className="text-center mb-6">
                    <img src={image} alt={numberName} className="w-20 h-20 mx-auto mb-2 object-cover rounded-full" />
                    <h3 className="text-lg font-semibold">{numberName}</h3>
                    <p className="text-sm text-gray-600">
                        নাম্বারঃ <span className="font-medium">{sendNumber}</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block text-sm mb-1 flex items-center gap-1">
                            <FaIdCard className="text-purple-600" /> ID Number
                        </label>
                        <input
                            type="number"
                            value={idNumber}
                            placeholder="গেম অ্যাকাউন্ট নাম্বার"
                            onChange={(e) => setIdNumber(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1 flex items-center gap-1">
                            <MdAttachMoney className="text-green-600" /> Amount
                        </label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            placeholder="৳ টাকা"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1 flex items-center gap-1">
                            <FaWallet className="text-blue-600" /> Wallet Number
                        </label>
                        <input
                            type="number"
                            value={wallet}
                            onChange={(e) => setWallet(e.target.value)}
                            required
                            placeholder="যে নম্বর থেকে টাকা পাঠিয়েছেন"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1 flex items-center gap-1">
                            <FaExchangeAlt className="text-yellow-600" /> Transaction ID
                        </label>
                        <input
                            type="text"
                            value={trxId}
                            onChange={(e) => setTrxId(e.target.value)}
                            required
                            placeholder="TrxID"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>

                    {/* প্ল্যাটফর্ম সিলেক্ট - ছবিসহ */}
                    <div>
                        <label className="block text-sm mb-1 flex items-center gap-1">
                            <FaMoneyBillWave className="text-pink-600" /> Platform
                        </label>
                        <div className="relative">
                            <select
                                value={platform}
                                onChange={(e) => setPlatform(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400 appearance-none"
                            >
                                <option value="">প্ল্যাটফর্ম নির্বাচন করুন</option>
                                <option value="1x Bet">1x Bet</option>
                                <option value="Melbet">Melbet</option>
                            </select>

                            {platform && (
                                <div className="flex justify-center mt-3">
                                    {platform === '1x Bet' && (
                                        <img src={onexImage} alt="1x Bet" className="h-12 w-12 rounded-full object-cover" />
                                    )}
                                    {platform === 'Melbet' && (
                                        <img src={meletImage} alt="Melbet" className="h-12 w-12 rounded-full object-cover" />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-2 rounded text-white flex justify-center items-center ${isSubmitting ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
                    >
                        {isSubmitting ? (
                            <span className="loading loading-dots loading-xl"></span>
                        ) : (
                            "রিকুয়েস্ট পাঠিয়ে দিন"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ConfirmDeposit;
