import { Link } from "react-router-dom";

const AddWithdrawsCard = ({ addWithdraw }) => {
    const { image, numberName,_id } = addWithdraw;

    return (
        <Link to={`/confirm-withdraw/${_id}`}>
            <div className="flex items-center bg-white rounded-lg shadow p-3 gap-4 lg:mt-5 text-black">
                <div className="w-16 h-16 flex-shrink-0 bg-green-600 rounded overflow-hidden flex items-center justify-center">
                    <img src={image} alt={numberName} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1">
                    <h2 className="text-lg font-semibold">{numberName}</h2>
                    <p className="text-sm text-gray-600">সর্বনিম্ন: 200.00৳</p>
                    <p className="text-sm text-gray-600">সার্ভিস চার্জ: 0.00 %</p>
                </div>
            </div>
        </Link>
    );
};

export default AddWithdrawsCard;
