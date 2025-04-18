import React, { useState, useEffect } from 'react';

const Banner = () => {
  const messages = [
    "মিনিমাম ডিপোজিট: ৫০ টাকা",
    "মিনিমাম উইথড্র: ৩০০ টাকা",
    "বিকাশ/নগদ-এ উইথড্র করলে ১০ টাকা কম পাবেন (কোম্পানির চার্জ ফি)।",
    "প্রোমো কোড ব্যবহার করলে ডিপোজিটের উপর ৩% বোনাস পাবেন।",
    "মোবাইল নম্বর ও আইডি কার্ড ছাড়া 1xBet / Melbet একাউন্ট খুলতে চাইলে আমাদের টেলিগ্রামে যোগাযোগ করুন।",
    "ফেইক / মিথ্যা তথ্য দিলে একাউন্ট ব্লক করা হবে।",
    "টাকা পাঠানোর আগে অনলাইনে দেওয়া নাম্বার ভালো করে চেক করে নিন।",
    "প্রতি ১৫ মিনিট পরপর নাম্বার পরিবর্তন হয়, ভুল করলে দায়ভার গ্রাহকের।",
    "যদি ভুলে কোন ইনফরমেশন মিসিং হয়, তাহলে দ্রুত আমাদের সাথে যোগাযোগ করুন। যোগাযোগ করুন।"
  ];

  const [currentMessage, setCurrentMessage] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentMessage((prevMessage) => (prevMessage + 1) % messages.length);
        setFade(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-green-100  text-black   overflow-hidden w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center min-h-[60px]">
        <p
          className={`text-sm sm:text-base md:text-lg lg:text-xl font-medium transition-opacity duration-500 leading-snug ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          {messages[currentMessage]}
        </p>
      </div>
    </div>
  );
};

export default Banner;
