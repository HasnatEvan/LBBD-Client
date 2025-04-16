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

    if (isLoading) {
        return <div className="text-center text-base md:text-lg font-medium">
                        <MdSync className="animate-spin inline-block mr-2 text-2xl" /> {/* Spinning icon */}
                        লোড হচ্ছে...
                    </div>
    }

    return (
        <div className="bg-white min-h-screen p-4">
            {
                deposits.map(deposit => 
                    <MyTransactionCard 
                        key={deposit._id}
                        deposit={deposit}
                    />
                )
            }
        </div>
    );
};

export default MyTransaction;
