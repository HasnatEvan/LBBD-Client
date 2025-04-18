import { AiFillInfoCircle } from "react-icons/ai";

const Terms = () => {
  const terms = [
    "আমরা ডিপোজিট এর উপর কোন ধরনের খরচ রাখি না, যা টাকা পাঠাবেন তা-ই ডিপোজিট পাবেন।",
    <>
      🔸 মিনিমাম ডিপোজিট: <span className="font-semibold">৫০ টাকা</span>
    </>,
    <>
      🔸 মিনিমাম উইথড্র: <span className="font-semibold">৩০০ টাকা</span>
    </>,
    <>
      বিকাশ/নগদ-এ উইথড্র করলে{" "}
      <span className="text-red-600 font-medium">১০ টাকা</span> কম পাবেন (কোম্পানির চার্জ ফি)।
    </>,
    <>
      আমাদের সার্ভিস টাইম: <span className="font-semibold">সকাল ১০টা - রাত ১২টা</span>
    </>,
    <>
      প্রোমো কোড ব্যবহার করলে ডিপোজিটের উপর{" "}
      <span className="text-green-600 font-semibold">৩% বোনাস</span> পাবেন।
    </>,
    <>
      মোবাইল নম্বর ও আইডি কার্ড ছাড়া{" "}
      <span className="font-semibold">1xBet / Melbet</span> একাউন্ট খুলতে চাইলে আমাদের টেলিগ্রামে যোগাযোগ করুন।
    </>,
    <>
      <span className="text-red-500">
        ❗ ফেইক / মিথ্যা তথ্য দিলে একাউন্ট ব্লক করা হবে।
      </span>
    </>,
    "টাকা পাঠানোর আগে অনলাইনে দেওয়া নাম্বার ভালো করে চেক করে নিন।",
    <>
      প্রতি <span className="font-semibold">১৫ মিনিট</span> পরপর নাম্বার পরিবর্তন হয়, ভুল করলে দায়ভার গ্রাহকের।
    </>,
    "যদি ভুলে কোন ইনফরমেশন মিসিং হয়, তাহলে দ্রুত আমাদের সাথে যোগাযোগ করুন।",
    <>
      যোগাযোগ করুনঃ{" "}
      <a
        href="https://t.me/nextsation247"
        className="text-blue-600 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        t.me/nextsation247
      </a>
    </>,
  ];

  return (
    <div className="bg-white min-h-screen px-4 py-8 sm:px-6 lg:px-20 text-gray-800">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-[#005440]">
        ★ শর্ত ও নিয়মাবলী
      </h2>

      <ul className="space-y-4 text-base sm:text-lg">
        {terms.map((item, i) => (
          <li
            key={i}
            className={`flex items-start gap-3 p-4 shadow rounded-lg transition-colors duration-200 hover:text-[#005440] ${
              i === 7 ? "bg-red-50 text-red-500 hover:text-[#005440]" : "bg-gray-50"
            }`}
          >
            <AiFillInfoCircle className="text-blue-500 mt-1 min-w-[20px]" />
            <div className="leading-relaxed">{item}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Terms;
