import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-[#171717] py-6 text-white">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm text-gray-400 md:text-left">
          Ushbu loyiha{" "}
          <a
            href="https://json-api.uz/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-400 underline transition-colors hover:text-blue-300"
          >
            JSON API.UZ
          </a>{" "}
          sayti yordamida qurilgan.
        </p>
        <p className="text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Barcha huquqlar himoyalangan.
        </p>
        <p className="text-center text-sm text-gray-400">
          Loyiha haqida batafsil{" "}
          <a
            href="https://github.com/abdulvokhidjon/guldasta-market.git"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-400 underline transition-colors hover:text-blue-300"
          >
            GitHub
          </a>{" "}
          orqali kuzatishingiz mumkin.
        </p>
      </div>
    </footer>
  );
}
