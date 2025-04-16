import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import WithdrawCard from "./WithdrawCard";

const UpdateWithdraw = () => {
    const axiosSecure = useAxiosSecure();

    const { data: addWithdraws = [], refetch } = useQuery({
        queryKey: ["addWithdraws"],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/addWithdraws/seller`);
            return data;
        },
    });

    console.log(addWithdraws);

    return (
        <div className="min-h-screen bg-white text-black p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">আপনার উইথড্র লিস্ট</h2>

            {addWithdraws.length === 0 ? (
                <p className="text-center text-gray-500">কোনো Withdraw পাওয়া যায়নি।</p>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {addWithdraws.map(addWithdraw => (
                        <WithdrawCard
                            key={addWithdraw._id}
                            addWithdraw={addWithdraw}
                            refetch={refetch}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default UpdateWithdraw;
