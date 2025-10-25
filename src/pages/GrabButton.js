import React, { useState } from "react";

const GrabCodeButton = ({ code, link, type }) => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    if (type !== "offer" && code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 400000);
    }
    window.open(link, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${
        copied
          ? "bg-green-500 text-white"
          : "bg-primary-500 text-white hover:bg-primary-600"
      }`}
    >
      {type === "offer" ? (
        "Get Offer"
      ) : copied ? (
        <span>
          ✅ Code Copied:&nbsp;
          <span className="font-mono font-bold">{code}</span>
        </span>
      ) : (
        "Grab Code"
      )}
    </button>
  );
};

export default GrabCodeButton;
