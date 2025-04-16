import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AddWithdrawsCard from "./AddWithdrawsCard";
import { MdSync, MdError } from "react-icons/md"; // Importing react icons

const Withdraw = () => {
    const { data: addWithdraws = [], isLoading } = useQuery({
        queryKey: ["addWithdraws"],
        queryFn: async () => {
            const { data } = await axios.get("https://lbbd-server.vercel.app/addWithdraws");
            return data;
        },
    });

    if (isLoading) {
        return (
            <div className="text-center text-base md:text-lg font-medium">
            <MdSync className="animate-spin inline-block mr-2 text-2xl" /> {/* Spinning icon */}
            লোড হচ্ছে...
        </div>
        );
    }

    if (addWithdraws.length === 0) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center text-xl font-semibold text-red-600">
                    <MdError className="inline-block mr-2 text-4xl" />
                    উইথড্র সার্ভিস বন্ধ আছে, পরবর্তীতে চেষ্টা করুন !
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {addWithdraws.map(addWithdraw => (
                    <AddWithdrawsCard
                        key={addWithdraw._id} // unique key
                        addWithdraw={addWithdraw} // pass data to the card
                    />
                ))}
            </div>
        </div>
    );
};

export default Withdraw;
