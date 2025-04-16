import { useState } from "react";
import Swal from "sweetalert2";
import { imageUpload } from "../../Api/utils";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const WithdrawalControl = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const numberName = form.numberName.value;
        const photo = form.photo.files[0]; // প্রথম ইমেজ
        const withdrawImage = form.withdrawImage.files[0]; // দ্বিতীয় ইমেজ

        try {
            setLoading(true); // লোডিং শুরু
            const imageUrl = await imageUpload(photo);
            const withdrawImageUrl = await imageUpload(withdrawImage);

            const admin = {
                name: user?.displayName,
                email: user?.email,
            };

            const withdrawalData = {
                numberName,
                image: imageUrl,
                withdrawImage: withdrawImageUrl,
                admin,
            };

            await axiosSecure.post('/addWithdraws', withdrawalData);

            Swal.fire({
                title: 'সফলভাবে সাবমিট হয়েছে!',
                icon: 'success',
                confirmButtonText: 'ওকে',
                confirmButtonColor: '#16a34a'
            });

            form.reset();

        } catch (error) {
            console.error("Withdraw Submit Error:", error);
            Swal.fire({
                title: 'দুঃখিত!',
                text: 'কিছু একটা সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।',
                icon: 'error',
                confirmButtonText: 'ঠিক আছে'
            });
        } finally {
            setLoading(false); // লোডিং শেষ
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-white text-black">
            <div className="w-full max-w-md p-5 bg-white ">
                <h2 className="text-2xl font-bold text-center mb-5">উইথড্র যুক্ত করুন</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">নম্বরের নাম</label>
                        <input
                            type="text"
                            name="numberName"
                            className="w-full border px-3 py-2 rounded"
                            placeholder="নাম্বার লিখুন"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">নাম্বার ইমেজ আপলোড করুন</label>
                        <input
                            type="file"
                            name="photo"
                            accept="image/*"
                            className="w-full"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Withdraw Image আপলোড করুন</label>
                        <input
                            type="file"
                            name="withdrawImage"
                            accept="image/*"
                            className="w-full"
                            required
                        />
                    </div>

                    <div className="w-full flex justify-center">
                        {loading ? (
                            <span className="loading loading-dots loading-xl"></span>
                        ) : (
                            <button
                                type="submit"
                                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                            >
                                সাবমিট করুন
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WithdrawalControl;
