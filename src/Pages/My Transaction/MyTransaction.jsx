import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import MyTransactionCard from "./MyTransactionCard";
import { MdSync } from "react-icons/md";

const MyTransaction = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const {
        data: deposits = [],
        isLoading,
    } = useQuery({
        queryKey: ["deposits", user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/customer-deposits/${user?.email}`);
            return data;
        },
    });

    // ডিপোজিটগুলোকে 'createdAt' এর ভিত্তিতে সাজানো
    const sortedDeposits = deposits.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (isLoading) {
        return (
            <div className="text-center text-base md:text-lg font-medium">
                <MdSync className="animate-spin inline-block mr-2 text-2xl" />
                লোড হচ্ছে...
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen p-4">
            {sortedDeposits.length === 0 ? (
                <p className="text-black text-center">আপনার কোনো ডিপোজিট রেকর্ড পাওয়া যায়নি।</p>
            ) : (
                sortedDeposits.map(deposit => (
                    <MyTransactionCard 
                        key={deposit._id}
                        deposit={deposit}
                    />
                ))
            )}
        </div>
    );
};

export default MyTransaction;
