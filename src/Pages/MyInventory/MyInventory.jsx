import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import MyInventoryCard from "./MyInventoryCard";

const MyInventory = () => {
    const axiosSecure = useAxiosSecure();

    const { data: numbers = [], refetch } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/numbers/seller`);
            return data;
        },
    });


    return (
        <div className="min-h-screen bg-white text-black p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">আমার নাম্বার লিস্ট </h2>

            {numbers.length === 0 ? (
                <p className="text-center text-gray-500">কোনো ডাটা পাওয়া যায়নি।</p>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {numbers.map((number) => (
                        <MyInventoryCard key={number._id} number={number} refetch={refetch} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyInventory;
