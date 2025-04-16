import { useState } from "react";
import { Link } from "react-router-dom";

const DepositCard = ({ number }) => {
    const { numberName, image, number: sendNumber ,_id} = number;
    const [showModal, setShowModal] = useState(false);

    const handleCardClick = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(sendNumber);
        alert("নম্বরটি কপি হয়েছে!");
    };

    return (
        <>
            {/* কার্ড */}
            <div
                className="flex flex-row items-center gap-3 sm:gap-4 p-4 rounded-lg shadow bg-white text-black hover:shadow-md transition duration-300 ease-in-out cursor-pointer"
                onClick={handleCardClick}
            >
                <img
                    src={image}
                    alt={numberName}
                    className="w-16 h-16 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded object-cover"
                />
                <div className="text-left">
                    <h2 className="text-base sm:text-lg md:text-xl font-semibold">{numberName}</h2>
                    <p className="text-gray-600 text-sm sm:text-base">সর্বনিম্নঃ 60.00 ৳</p>
                    <p className="text-gray-600 text-sm sm:text-base">সার্ভিস চার্জঃ 0.00 %</p>
                </div>
            </div>

            {/* মোডাল */}
            {showModal && (
                <div className="fixed inset-0  bg-opacity-50 z-50 flex justify-center items-end sm:items-center">
                    <div className="animate-fade-in-up bg-white sm:rounded-lg p-6 w-full sm:w-[90%] max-w-md text-center relative">
                        {/* Close Button */}
                        <button
                            className="absolute top-2 right-3 text-gray-600 text-xl"
                            onClick={handleClose}
                        >
                            &times;
                        </button>

                        {/* Image and Title */}
                        <img src={image} alt={numberName} className="w-14 mx-auto mb-2" />
                        <h2 className="text-xl font-semibold text-[#d40062] mb-2">{numberName}</h2>

                        {/* Info Text */}
                        <p className="text-gray-700 text-sm sm:text-base mb-2">
                            ডিপোজিট এর জন্য নিচের নম্বরে টাকা পাঠান (Send Money)
                        </p>

                        {/* Number */}
                        <div
                            className="text-lg font-bold bg-green-500 text-white py-2 px-5 rounded-full inline-block select-all cursor-pointer"
                            onClick={handleCopy}
                        >
                            {sendNumber}
                        </div>

                        {/* Copy Instruction */}
                        <p className="text-sm text-gray-600 mt-2">
                            নম্বরটি কপি করতে নম্বরের উপরে চাপ দিন (Long Press)
                        </p>

                        {/* Confirm Button */}
                        <Link to={`/confirm-Deposit/${_id}`} // এখানে তোমার কাঙ্ক্ষিত রাউট দিন
                            onClick={handleClose}
                            className="mt-4 inline-block text-[#5a189a] font-semibold hover:underline"
                        >
                            টাকা পাঠিয়েছি
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default DepositCard;
