import React, { useEffect, useState } from 'react';

// Counter Component
const Counter = ({ target, label, isPercent, hasPlus }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target);
    if (start === end) return;

    const duration = 2000;
    const incrementTime = 30;
    const step = Math.ceil((end - start) / (duration / incrementTime));

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-green-700">
        {count.toLocaleString()}{isPercent && '%'}{hasPlus && '+'}
      </h2>
      <p className="text-sm sm:text-base text-gray-600">{label}</p>
    </div>
  );
};

// NumberTicker Component
const NumberTicker = () => {
  return (
    <div className="bg-white py-8 px-4 md:px-12 shadow rounded-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
      <Counter target={100} label="Services" isPercent />
      <Counter target={2000} label="Total Users" hasPlus />
      <Counter target={500} label="Users Daily" hasPlus />
    </div>
  );
};

export default NumberTicker;
