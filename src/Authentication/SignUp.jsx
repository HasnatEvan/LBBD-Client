import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";

const SignUp = () => {
    const { createUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);  // লোডিং স্টেট

    const handleSignUp = async (event) => {
        event.preventDefault();
        setLoading(true);  // বাটন ক্লিক করলে লোডিং শুরু

        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        try {
            const result = await createUser(email, password);
            console.log("নতুন ইউজার তৈরি:", result.user);

            await updateUserProfile(name, null);
            console.log("ইউজার প্রোফাইল আপডেট হয়েছে");

            const res = await axios.post(`https://lbbd-server.vercel.app/users/${email}`, { name, email });
            console.log("ডেটাবেজে ইউজার সেভ:", res.data);

            form.reset();

            Swal.fire({
                title: 'সফল!',
                text: 'আপনার অ্যাকাউন্ট তৈরি হয়েছে।',
                icon: 'success',
                confirmButtonColor: '#386E2B'
            }).then(() => {
                navigate("/"); 
            });

        } catch (error) {
            console.error("এরর:", error);
            Swal.fire({
                title: 'দুঃখিত!',
                text: error.message || "কিছু একটা সমস্যা হয়েছে।",
                icon: 'error',
                confirmButtonColor: '#386E2B'
            });
        } finally {
            setLoading(false);  // কাজ শেষ হলে লোডিং বন্ধ
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-white text-black">
            <div className="bg-white p-10 w-full max-w-md">

                {/* গাইডলাইন সেকশন */}
                <div className="mb-8 p-4 bg-green-50  rounded-md shadow-sm">
                    <h3 className="text-lg font-semibold text-[#386E2B] mb-2 text-center">
                        অ্যাকাউন্ট তৈরির নিয়মাবলী 💡
                    </h3>
                    <ul className="list-disc pl-5 text-gray-700 text-sm">
                        <li>আপনার সম্পূর্ণ নাম লিখুন।</li>
                        <li>একটি ভেরিফাইড ইমেইল ব্যবহার করুন।</li>
                        <li>ন্যূনতম ৬ অক্ষরের একটি শক্তিশালী পাসওয়ার্ড দিন।</li>
                    </ul>
                </div>

                {/* টাইটেল */}
                <h2 className="text-3xl font-bold mb-6 text-center text-[#386E2B]">
                    আপনার অ্যাকাউন্ট তৈরি করুন
                </h2>

                {/* ফর্ম */}
                <form onSubmit={handleSignUp} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-2">নাম</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="আপনার নাম লিখুন"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#386E2B]"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">ইমেইল</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="আপনার ইমেইল লিখুন"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#386E2B]"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">পাসওয়ার্ড</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="একটি পাসওয়ার্ড দিন"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#386E2B]"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#386E2B] hover:bg-green-800 text-white py-2 rounded-md transition duration-300 flex justify-center items-center"
                        disabled={loading} // লোডিং চলাকালীন বাটন ডিসেবল থাকবে
                    >
                        {loading ? (
                            <span className="loading loading-dots loading-xl"></span>
                        ) : (
                            "সাইন আপ"
                        )}
                    </button>
                </form>

                <p className="text-center text-sm mt-4 text-gray-600">
                    ইতিমধ্যেই একটি অ্যাকাউন্ট আছে?{" "}
                    <Link to="/login" className="text-[#386E2B] hover:underline">
                        লগইন করুন
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
