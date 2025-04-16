import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users`);
      return data;
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "ইউজারটি ডিলিট হয়ে যাবে!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "হ্যাঁ, ডিলিট করুন",
      cancelButtonText: "না, বাতিল",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/users/${id}`);
        if (res.data?.deletedCount > 0) {
          Swal.fire("ডিলিট হয়েছে!", "ইউজার সফলভাবে ডিলিট হয়েছে।", "success");
          refetch();
        } else {
          Swal.fire("ব্যর্থ!", "ইউজার ডিলিট করা যায়নি।", "error");
        }
      } catch (error) {
        Swal.fire("ত্রুটি!", error.message, "error");
      }
    }
  };

  return (
    <div className="bg-white min-h-screen text-black">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4 text-center">সকল ইউজার</h2>

        {/* Display Total Users Count */}
        <div className="text-center mb-4 text-gray-700">
          <p>মোট ইউজার: {users.length}</p>
        </div>

        <div className="overflow-x-auto">
          {/* Table layout for larger screens */}
          <div className="hidden lg:block">
            <table className="min-w-full bg-white border border-gray-200 rounded">
              <thead>
                <tr className="bg-gray-100 text-left text-sm">
                  <th className="px-4 py-2 border-b">নাম</th>
                  <th className="px-4 py-2 border-b">ইমেইল</th>
                  <th className="px-4 py-2 border-b">ভূমিকা</th>
                  <th className="px-4 py-2 border-b">যোগদানের সময়</th>
                  <th className="px-4 py-2 border-b">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  const formattedTime = user.timestamp
                    ? new Date(user.timestamp).toLocaleString("bn-BD", {
                        timeZone: "Asia/Dhaka",
                      })
                    : "N/A";

                  return (
                    <tr key={user._id} className="hover:bg-gray-50 text-sm">
                      <td className="px-4 py-2 border-b">{user.name}</td>
                      <td className="px-4 py-2 border-b">{user.email}</td>
                      <td className="px-4 py-2 border-b capitalize">
                        <span
                          className={`px-2 py-1 rounded text-sm 
                            ${user.role === "admin" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-2 border-b">{formattedTime}</td>
                      <td className="px-4 py-2 border-b">
                        {user.role !== "admin" && (
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1 rounded text-xs"
                          >
                            ডিলিট
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Card layout for mobile screens */}
          <div className="lg:hidden">
            {users.map((user) => {
              const formattedTime = user.timestamp
                ? new Date(user.timestamp).toLocaleString("bn-BD", {
                    timeZone: "Asia/Dhaka",
                  })
                : "N/A";

              return (
                <div
                  key={user._id}
                  className="bg-white border border-gray-200 rounded p-4 mb-4 flex flex-col shadow-md text-black"
                >
                  <div className="font-bold text-lg">{user.name}</div>
                  <div className="text-sm text-gray-600">{user.email}</div>
                  <div
                    className={`text-sm mt-2 px-2 py-1 rounded ${
                      user.role === "admin" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                    }`}
                  >
                    {user.role}
                  </div>
                  <div className="text-sm mt-2 text-gray-500">{formattedTime}</div>
                  {user.role !== "admin" && (
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="mt-3 bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1 rounded text-xs"
                    >
                      ডিলিট
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {users.length === 0 && (
            <p className="text-center text-gray-500 mt-4">কোনো ইউজার পাওয়া যায়নি।</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
