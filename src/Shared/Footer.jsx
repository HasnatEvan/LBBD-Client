import { FaTelegramPlane } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#005440] text-white py-6 px-4 mt-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 items-center">
        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-center sm:text-left">Contact Us</h3>
          <ul className="space-y-1 text-sm">
            <li className="flex items-center gap-2 justify-center sm:justify-start">
              <a
                href="https://t.me/firstdp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-2xl hover:text-blue-300 mt-2"
              >
                <FaTelegramPlane />
              </a>
            </li>
          </ul>
        </div>

        {/* Copyright Section */}
        <div className="text-sm text-center sm:text-right">
        <p>Deposit & Withdraw Service</p>
          <p>
            Copyright © 2025 All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
