import { Link } from "react-router-dom";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import { FaHome } from "react-icons/fa";

const Navbar = () => {
    const { user, logOut } = useAuth();

    const handleLogOut = () => {
        Swal.fire({
            title: "আপনি কি নিশ্চিত?",
            text: "আপনি সিস্টেম থেকে লগআউট হতে যাচ্ছেন!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "হ্যাঁ, লগআউট করুন!",
            cancelButtonText: "বাতিল"
        }).then((result) => {
            if (result.isConfirmed) {
                logOut()
                    .then(() => {
                        Swal.fire(
                            "লগআউট সম্পন্ন!",
                            "আপনি সফলভাবে লগআউট হয়েছেন।",
                            "success"
                        );
                    })
                    .catch((error) => {
                        Swal.fire(
                            "ত্রুটি!",
                            error.message,
                            "error"
                        );
                    });
            }
        });
    };

    const Links = (
        <>
            <Link to="/" className="flex items-center gap-1 text-white hover:text-yellow-300 font-medium">
                <FaHome className="text-lg" />
            </Link>
        </>
    );

    return (
        <div className="bg-[#386E2B] shadow-md py-4 px-6 flex justify-between items-center">
            {/* Logo */}
            <div className="text-2xl font-bold text-white">
                <Link to="/">LBBD</Link>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4 md:gap-6">
                {Links}

                {user ? (
                    <div className="flex items-center gap-2 md:gap-4">
                        <span className="text-white font-medium hidden sm:inline">
                            {user.displayName || "User"}
                        </span>
                        <button
                            onClick={handleLogOut}
                            className="flex items-center gap-2  text-white px-3 py-2 rounded transition duration-300"
                        >
                            <FiLogOut className="text-lg" />
                        </button>
                    </div>
                ) : (
                    <Link
                        to="/login"
                        className="flex items-center gap-2  text-white px-3 py-2 rounded  transition duration-300"
                    >
                        <FiLogIn className="text-lg" />
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
