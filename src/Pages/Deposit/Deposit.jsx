import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DepositCard from "./DepositCard";
import { MdSync, MdError } from "react-icons/md"; // Importing react icons

const Deposit = () => {
    const { data: numbers = [], isLoading } = useQuery({
        queryKey: ["numbers"],
        queryFn: async () => {
            const { data } = await axios.get("https://lbbd-server.vercel.app/numbers");
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

    if (numbers.length === 0) {
        return (
            <div className="bg-white min-h-screen flex items-center justify-center">
                <div className="text-center text-xl font-semibold text-red-600">
                    <MdError className="inline-block mr-2 text-4xl" /> {/* Error icon */}
                    ডিপোজিট সার্ভিস বন্ধ আছে, পরবর্তীতে চেষ্টা করুন !
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {numbers.map((num, index) => (
                    <DepositCard key={index} number={num} />
                ))}
            </div>
        </div>
    );
};

export default Deposit;
