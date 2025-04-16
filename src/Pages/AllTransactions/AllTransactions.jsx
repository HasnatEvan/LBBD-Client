import { useEffect, useState } from 'react';
import { MdSync } from 'react-icons/md';

const AllTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await fetch('https://lbbd-server.vercel.app/transactions');
                const data = await res.json();
                setTransactions(data.transactions);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    if (loading) return<div className="text-center text-base md:text-lg font-medium">
                    <MdSync className="animate-spin inline-block mr-2 text-2xl" /> {/* Spinning icon */}
                    লোড হচ্ছে...
                </div>

    return (
        <div className="bg-white min-h-screen p-4 text-black">
            <h2 className="text-2xl font-bold mb-4 text-center">লেনদেন হিস্টোরি</h2>
            <div className="space-y-4">
                {transactions.map((tx) => (
                    <div key={tx._id} className="flex justify-between items-center p-3 shadow-md rounded-lg">
                        <div className="flex items-center gap-3">
                            <img src={tx.image} alt="Logo" className="w-10 h-10 rounded-full" />
                            <div>
                                <p className="font-semibold text-gray-800">{tx.idNumber?.slice(0, 7)}***</p>
                                <p className="text-xs text-gray-500">
                                    {new Date(tx.createdAt).toLocaleString('bn-BD', { timeZone: 'Asia/Dhaka' })}
                                </p>
                                <p>{tx.type}</p>
                            </div>
                        </div>

                        <div className="text-right">
                            <p className="font-bold text-lg">{tx.amount} ৳</p>
                            {tx.status === 'সফল' && (
                                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-sm">সফল</span>
                            )}
                            {tx.status === 'বাতিল' && (
                                <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-sm">বাতিল</span>
                            )}
                            {tx.status !== 'সফল' && tx.status !== 'বাতিল' && (
                                <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-sm">{tx.status}</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllTransactions;
