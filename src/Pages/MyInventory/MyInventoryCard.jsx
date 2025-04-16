import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MyInventoryCard = ({ number, refetch }) => {
  const { numberName, number: simNumber, image, _id } = number;
  const axiosSecure = useAxiosSecure();

  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(numberName);
  const [editedNumber, setEditedNumber] = useState(simNumber);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosSecure.patch(`/numbers/${_id}`, {
        numberName: editedName,
        number: editedNumber,
      });

      if (res.data?.modifiedCount > 0) {
        Swal.fire("সফল!", "নাম্বার আপডেট হয়েছে।", "success");
        setEditMode(false);
        refetch();
      } else {
        Swal.fire("ব্যর্থ!", "নাম্বার আপডেট করা যায়নি।", "error");
      }
    } catch (err) {
      Swal.fire("ত্রুটি!", `সমস্যা হয়েছে: ${err.message}`, "error");
    }
  };

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "এই নাম্বারটি ডিলিট হয়ে যাবে!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "হ্যাঁ, ডিলিট করুন",
      cancelButtonText: "না, রাখুন",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/numbers/${_id}`);
        if (res.data?.deletedCount > 0) {
          Swal.fire("ডিলিট হয়েছে!", "নাম্বার সফলভাবে ডিলিট হয়েছে।", "success");
          refetch();
        } else {
          Swal.fire("ব্যর্থ!", "নাম্বার ডিলিট করা যায়নি।", "error");
        }
      } catch (err) {
        Swal.fire("ত্রুটি!", `সমস্যা হয়েছে: ${err.message}`, "error");
      }
    }
  };

  return (
    <div className="p-4 shadow-md mb-4 ">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <img
            src={image}
            alt="Sim"
            className="w-14 h-14 object-cover rounded"
          />

          {editMode ? (
            <form
              onSubmit={handleUpdate}
              className="flex flex-col sm:flex-row sm:items-center gap-2 w-full"
            >
              <input
                type="text"
                className="border rounded px-2 py-1 text-sm w-full sm:w-40"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
              <input
                type="text"
                className="border rounded px-2 py-1 text-sm w-full sm:w-40"
                value={editedNumber}
                onChange={(e) => setEditedNumber(e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm hover:bg-green-200"
                >
                  সেভ
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm hover:bg-gray-200"
                >
                  বাতিল
                </button>
              </div>
            </form>
          ) : (
            <div>
              <p className="font-bold text-lg">{numberName}</p>
              <p className="text-gray-600">{simNumber}</p>
            </div>
          )}
        </div>

        {!editMode && (
          <div className="flex gap-2 justify-end w-full md:w-auto">
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-100 text-blue-600 hover:bg-blue-200 px-2 py-1 rounded text-sm"
            >
              এডিট
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-100 text-red-600 hover:bg-red-200 transition px-2 py-1 rounded text-sm"
            >
              ডিলিট
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyInventoryCard;
