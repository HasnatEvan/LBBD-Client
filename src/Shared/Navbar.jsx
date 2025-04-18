import { Link } from "react-router-dom";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { FaHome } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import logo from "../../src/assets/logo.jpg";

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
      cancelButtonText: "বাতিল",
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
            Swal.fire("ত্রুটি!", error.message, "error");
          });
      }
    });
  };

  const Links = (
    <Link
      to="/"
      className="flex items-center gap-1 text-white hover:text-yellow-300 font-medium text-sm sm:text-base"
    >
      <FaHome className="text-lg" />
      <span className="hidden sm:inline">Home</span>
    </Link>
  );

  return (
    <div className="bg-[#005440] shadow-md py-2 px-3 sm:px-6 flex flex-wrap justify-between items-center gap-y-2 font-primary">
      {/* Logo and Title */}
      <div className="flex items-center gap-2">
        <img
          src={logo}
          alt="Logo"
          className="h-8 w-8 sm:h-10 sm:w-10 rounded-full border-none outline-none shadow-none"
        />
        <h1 className="font-bold text-yellow-500 text-sm sm:text-lg">
        𝐅𝐈𝐑𝐒𝐓 𝐃𝐏 𝐇𝐎𝐔𝐒𝐄
        </h1>
      </div>

      {/* Navigation */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-6">
        {Links}

        {user ? (
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-white font-medium hidden sm:inline text-sm sm:text-base">
              {user.displayName || "User"}
            </span>
            <button
              onClick={handleLogOut}
              className="flex items-center gap-1 text-white hover:text-red-300 px-2 py-1 sm:px-3 sm:py-2 rounded transition duration-300 text-sm sm:text-base"
            >
              <FiLogOut className="text-lg" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-1 text-white hover:text-green-300 px-2 py-1 sm:px-3 sm:py-2 rounded transition duration-300 text-sm sm:text-base"
          >
            <FiLogIn className="text-lg" />
            <span className="hidden sm:inline">Login</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
