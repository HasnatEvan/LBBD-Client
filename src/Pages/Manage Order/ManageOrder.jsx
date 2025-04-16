import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import ManageDepositsCard from "./ManageDepositsCard";

const ManageOrder = () => {
    const axiosSecure = useAxiosSecure();

    const { data: deposits = [], refetch, isLoading } = useQuery({
        queryKey: ["deposits"],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/admin-deposits`);
            return data;
        },
    });

    if (isLoading) {
        return <div className="min-h-screen bg-white"></div>;
    }

    return (
        <div className="min-h-screen bg-white p-4">
            {
                deposits.length === 0 ? (
                    <div className="text-center text-gray-500">No Deposits Found.</div>
                ) : (
                    deposits.map(deposit => 
                        <ManageDepositsCard 
                            key={deposit._id}  
                            deposit={deposit}
                            refetch={refetch}
                        />
                    )
                )
            }
        </div>
    );
};

export default ManageOrder;
