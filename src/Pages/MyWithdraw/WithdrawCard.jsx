import React from 'react';

const WithdrawCard = ({ withdraw }) => {
    const { customer, idNumber, amount, walletNumber, withdrawCode, status, createdAt, image, platform } = withdraw;

    // 🇧🇩 বাংলাদেশ টাইম ফরম্যাট (BN) - বাংলাদেশ সময় (GMT+6)
   
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
            {/* Wallet Icon Part */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full font-bold overflow-hidden">
                    <img src={image} alt="Wallet" className="w-full h-full object-cover" />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-800">{customer?.email}</h3>
                    <p className="text-xs text-gray-500">Plat From: <span className="bg-green-500 text-white rounded-xl px-2">{platform}</span></p>
                    <p className="text-xs text-gray-500">{walletNumber}</p>
                    <p className="text-xs text-gray-400">ID: {idNumber}</p>
                    <p className="text-xs text-gray-600">Code: {withdrawCode}</p>
                    <p className="text-xs text-gray-500">{formattedTime}</p>  {/* Display formatted time */}
                </div>
            </div>

            {/* Amount & Status Part */}
            <div className="text-right space-y-1">
                <p className="text-base font-bold text-gray-800">{amount}৳</p>
                {status === "সফল" ? (
                    <span className="text-green-600 bg-green-100 text-xs px-2 py-1 rounded-full">সফল</span>
                ) : status === "বাতিল" ? (
                    <span className="text-red-600 bg-red-100 text-xs px-2 py-1 rounded-full">বাতিল</span>
                ) : (
                    <span className="text-yellow-600 bg-yellow-100 text-xs px-2 py-1 rounded-full">{status}</span>
                )}
            </div>
        </div>
    );
};

export default WithdrawCard;
