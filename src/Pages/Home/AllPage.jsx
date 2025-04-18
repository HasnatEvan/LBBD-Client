import {
    FaPlus,
    FaMinus,
    FaVideo,
    FaShare,
    FaComment,
    FaInfoCircle,
    FaPhone,
    FaClipboardList,
    FaUser,
    FaEye,
    FaHistory
} from "react-icons/fa";
import { Link } from "react-router-dom";
import useRole from "../../Hooks/useRole";
import { GrUpdate } from "react-icons/gr";
import Banner from "./Banner";

const iconClass = "text-green-600 text-4xl";

const AllPage = () => {
    const [role, isLoading] = useRole();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <span className="loading loading-bars loading-lg" style={{ color: '#386E2B' }}></span>
            </div>
        );
    }

    const customerFeatures = [
        { icon: <FaPlus className={iconClass} />, label: "ডিপোজিট করুন", path: "/deposit" },
        { icon: <FaMinus className={iconClass} />, label: "উইথড্র করুন", path: "/withdraw" },
        { icon: <FaEye className={iconClass} />, label: "আমার ডিপোজিট", path: "/my-deposit" },
        { icon: <FaEye className={iconClass} />, label: "আমার উইথড্র", path: "/my-withdraw" },
        { icon: <FaHistory className={iconClass} />, label: "সকল লেনদেন", path: "/all-transactions" },
        { icon: <FaVideo className={iconClass} />, label: "ভিডিও দেখুন", path: "/videos" },
        { icon: <FaComment className={iconClass} />, label: "যোগাযোগ", path: "https://t.me/firstdp", external: true },
        { icon: <FaInfoCircle className={iconClass} />, label: "শর্তাবলী", path: "/terms" },
    ];

    const adminFeatures = [
        { icon: <FaClipboardList className={iconClass} />, label: "ডিপোজিট ম্যানেজ করুন", path: "/manage-deposit" },
        { icon: <FaClipboardList className={iconClass} />, label: "উইথড্র ম্যানেজ করুন", path: "/manage-withdraw" },
        { icon: <FaPlus className={iconClass} />, label: "নাম্বার যুক্ত করুন", path: "/add-number" },
        { icon: <FaPlus className={iconClass} />, label: "উইথড্র  যুক্ত করুন", path: "/add-withdrawal" },
        { icon: <GrUpdate className={iconClass} />, label: "নাম্বার আপডেট করুন", path: "/update-number" },
        { icon: <GrUpdate className={iconClass} />, label: "উইথড্র আপডেট করুন", path: "/update-withdraw" },
        { icon: <FaHistory className={iconClass} />, label: "সকল লেনদেন", path: "/all-transactions" },
        { icon: <FaUser className={iconClass} />, label: "সব ইউজার", path: "/all-users" },
    ];

    const features = role === "admin" ? adminFeatures : customerFeatures;

    return (
        <div className="min-h-screen bg-green-50 px-4 pt-24 lg:pt-16">
          
            {/* 🟢 গ্রিড অংশ */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-5xl mx-auto">
                {features.map((item, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center h-40 sm:h-48 lg:h-56 hover:shadow-xl transition">
                        {item.external ? (
                            <a href={item.path} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center text-center">
                                {item.icon}
                                <p className="mt-4 text-lg font-semibold text-gray-800">{item.label}</p>
                            </a>
                        ) : (
                            <Link to={item.path} className="flex flex-col items-center justify-center text-center">
                                {item.icon}
                                <p className="mt-4 text-lg font-semibold text-gray-800">{item.label}</p>
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllPage;
