const MyTransactionCard = ({ deposit }) => {
    const { image, idNumber, trxId, status, createdAt, amount, platform } = deposit;

    // 🇧🇩 বাংলাদেশ টাইম ফরম্যাট (BN) + ১ দিন বাদ
    const bdTime = new Date(createdAt);
   
    const formattedTime = bdTime.toLocaleString("bn-BD", {
        timeZone: "Asia/Dhaka",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    // ✅ স্ট্যাটাস রঙ নির্ধারণ
    const statusColor =
        status === "সফল"
            ? "bg-green-100 text-green-700"
            : status === "বাতিল"
            ? "bg-red-100 text-red-700"
            : "bg-yellow-100 text-yellow-700";

    return (
        <div className="flex items-center justify-between bg-white shadow p-4 mb-3 rounded-md">
            <div className="flex items-center gap-3">
                <img
                    src={image}
                    alt="Transaction"
                    className="w-10 h-10 object-cover rounded-full"
                />
                <div>
                    <p className="font-semibold text-gray-800">{idNumber}</p>
                    <p className="text-xs text-gray-500">{formattedTime}</p>
                    <p className="text-xs text-gray-500">
                        TrxId: <span className="text-red-500">{trxId}</span>
                    </p>
                    <p className="text-xs text-gray-500">
                        Plat From: <span className="bg-green-500 text-white rounded-xl px-2">{platform}</span>
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <p className="font-bold text-gray-800">{amount} ৳</p>
                <p className={`text-xs px-2 py-1 rounded-full mt-1 ${statusColor}`}>
                    {status}
                </p>
            </div>
        </div>
    );
};

export default MyTransactionCard;
