import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import WithdrawCard from "./WithdrawCard";
import { MdSync } from "react-icons/md";

const MyWithdraw = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: withdraws = [], isLoading } = useQuery({
        queryKey: ["withdraws", user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/customer-withdraws/${user?.email}`);
            return data;
        },
    });

    if (isLoading) return<div className="text-center text-base md:text-lg font-medium">
                    <MdSync className="animate-spin inline-block mr-2 text-2xl" /> {/* Spinning icon */}
                    লোড হচ্ছে...
                </div>

    return (
        <div className="bg-white min-h-screen p-4">
            {
                withdraws.length > 0 ? (
                    withdraws.map(withdraw => (
                        <WithdrawCard
                            key={withdraw._id}  // 🗝️ Always use key in map!
                            withdraw={withdraw}
                        />
                    ))
                ) : (
                    <p>আপনার কোনো উইথড্র রেকর্ড পাওয়া যায়নি।</p>
                )
            }
        </div>
    );
};

export default MyWithdraw;
