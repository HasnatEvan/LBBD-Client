// যদি তোমার কাছে tailwind.config.js না থাকে, নিচের মতো একটা তৈরি করো
// অথবা বিদ্যমান ফাইলে `extend` এর মধ্যে এটুকু যোগ করো

/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        animation: {
          'fade-in-up': 'fadeInUp 0.3s ease-out forwards',
        },
        keyframes: {
          fadeInUp: {
            '0%': {
              opacity: 0,
              transform: 'translateY(40px)',
            },
            '100%': {
              opacity: 1,
              transform: 'translateY(0)',
            },
          },
        },
      },
    },
    plugins: [],
  }
  