import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import ManageWithdrawCard from "./ManageWithdrawCard";

const ManageWithdraw = () => {
    const axiosSecure = useAxiosSecure();

    const { data: withdraws = [], refetch } = useQuery({
        queryKey: ["withdraws"],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/admin-withdraw`);
            return data;
        },
    });

    return (
        <div className="min-h-screen bg-white">
            {
                withdraws.map(withdraw => (
                    <ManageWithdrawCard 
                        key={withdraw._id} 
                        withdraw={withdraw} 
                        refetch={refetch} 
                    />
                ))
            }
        </div>
    );
};

export default ManageWithdraw;
