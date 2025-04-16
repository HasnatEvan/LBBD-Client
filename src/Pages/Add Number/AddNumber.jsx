import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { imageUpload } from "../../Api/utils";
import { useState } from "react";
import Swal from 'sweetalert2';  // এখানে SweetAlert2 import

const AddNumber = () => {
    const { user } = useAuth();  // ইউজারের তথ্য আনছে
    const axiosSecure = useAxiosSecure(); // সিকিউর axios ইনস্ট্যান্স নিচ্ছে
    const [numberName, setNumberName] = useState(""); // নাম স্টেট
    const [number, setNumber] = useState(""); // নাম্বার স্টেট
    const [loading, setLoading] = useState(false); // লোডিং স্টেট

    // ফর্ম সাবমিট হ্যান্ডেল করার ফাংশন
    const handleSubmit = async (event) => {
        event.preventDefault(); // রিলোড বন্ধ
        setLoading(true); // লোডিং শুরু

        const form = event.target;
        const numberName = form.numberName.value;
        const number = form.number.value;
        const imageFile = form.image.files[0];

        try {
            const imageUrl = await imageUpload(imageFile);

            const admin = {
                name: user?.displayName,
                email: user?.email,
            };

            const numberData = {
                numberName,
                number,
                image: imageUrl,
                admin,
            };

            await axiosSecure.post('/numbers', numberData);
            console.log("নাম্বার যুক্ত হয়েছে:", numberData);

            // Success Alert দেখাও
            Swal.fire({
                icon: 'success',
                title: 'সফলভাবে যুক্ত হয়েছে!',
                text: `${numberName} নাম্বার সফলভাবে ডাটাবেজে যুক্ত হয়েছে।`,
                confirmButtonText: 'ঠিক আছে'
            });

            form.reset();
            setNumberName("");
            setNumber("");

        } catch (error) {
            console.error("আপলোড বা সাবমিট করতে ব্যর্থ:", error);
            
            // Error Alert দেখাও
            Swal.fire({
                icon: 'error',
                title: 'ওহো!',
                text: 'নাম্বার যোগ করতে সমস্যা হয়েছে, আবার চেষ্টা করুন।',
                confirmButtonText: 'ঠিক আছে'
            });

        } finally {
            setLoading(false); // কাজ শেষ হলে লোডিং বন্ধ
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white text-black">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 w-full max-w-md space-y-4"
            >
                <h2 className="text-2xl font-semibold text-center text-black">
                    নাম্বার যোগ করুন
                </h2>

                {/* নাম ইনপুট */}
                <div>
                    <label className="block text-gray-700 mb-1">নাম্বারের নাম</label>
                    <input
                        type="text"
                        name="numberName"
                        value={numberName}
                        onChange={(e) => setNumberName(e.target.value)}
                        placeholder="নাম্বারের নাম লিখুন"
                        className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* নাম্বার ইনপুট */}
                <div>
                    <label className="block text-gray-700 mb-1">নাম্বার</label>
                    <input
                        type="number"
                        name="number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        placeholder="নাম্বার লিখুন"
                        className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* ছবি আপলোড */}
                <div>
                    <label className="block text-gray-700 mb-1">ছবি আপলোড করুন</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#386E2B] text-white py-2 rounded transition flex items-center justify-center"
                    disabled={loading}
                >
                    {loading ? (
                        <span className="loading loading-dots loading-xl"></span>
                    ) : (
                        "সাবমিট করুন"
                    )}
                </button>
            </form>
        </div>
    );
};

export default AddNumber;
