import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import useAuth from "../Hooks/useAuth";
import { useState } from "react";

const Login = () => {
    const { signIn, resetPassword } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogin = (event) => {
        event.preventDefault();
        setLoading(true);

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then((result) => {
                const loggedUser = result.user;
                console.log("লগইন ইউজার:", loggedUser);
                form.reset();

                Swal.fire({
                    title: 'সফলভাবে লগইন হয়েছে!',
                    text: 'আপনি সফলভাবে আপনার অ্যাকাউন্টে প্রবেশ করেছেন।',
                    icon: 'success',
                    confirmButtonText: 'ঠিক আছে'
                }).then(() => {
                    navigate('/');
                });
            })
            .catch((error) => {
                console.error("লগইন এরর:", error.message);
                Swal.fire({
                    title: 'লগইন ব্যর্থ হয়েছে!',
                    text: 'আপনার ইমেইল অথবা পাসওয়ার্ড ভুল হয়েছে।',
                    icon: 'error',
                    confirmButtonText: 'আবার চেষ্টা করুন'
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleForgotPassword = async () => {
        const { value: email } = await Swal.fire({
            title: 'পাসওয়ার্ড রিসেট করুন',
            input: 'email',
            inputLabel: 'আপনার রেজিস্টার্ড ইমেইল দিন',
            inputPlaceholder: 'example@email.com',
            confirmButtonText: 'রিসেট লিংক পাঠান',
            showCancelButton: true,
            cancelButtonText: 'বাতিল করুন'
        });

        if (email) {
            try {
                await resetPassword(email);
                Swal.fire({
                    icon: 'success',
                    title: 'রিসেট লিংক পাঠানো হয়েছে!',
                    text: 'আপনার ইমেইলে রিসেট লিংক পাঠানো হয়েছে।'
                });
            } catch  {
                Swal.fire({
                    icon: 'error',
                    title: 'এরর!',
                    text: 'রিসেট করতে সমস্যা হয়েছে। ইমেইলটি সঠিক কিনা দেখুন।'
                });
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-white text-black">
            <div className="bg-white p-10 w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-[#386E2B]">লগইন করুন</h2>

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">ইমেইল</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="আপনার ইমেইল লিখুন"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#386E2B]"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">পাসওয়ার্ড</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="আপনার পাসওয়ার্ড লিখুন"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#386E2B]"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#386E2B] hover:bg-green-800 text-white py-2 rounded-md transition duration-300 flex justify-center items-center"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="loading loading-dots loading-xl"></span>
                        ) : (
                            "লগইন"
                        )}
                    </button>
                </form>

                <div className="text-center mt-4">
                    <button
                        onClick={handleForgotPassword}
                        className="text-sm text-[#386E2B] hover:underline"
                    >
                        পাসওয়ার্ড ভুলে গেছেন?
                    </button>
                </div>

                <p className="text-center text-sm mt-4 text-gray-600">
                    আপনার অ্যাকাউন্ট নেই?{" "}
                    <Link to="/signup" className="text-[#386E2B] hover:underline">
                        সাইন আপ করুন
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
