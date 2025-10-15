import React from "react";

export default function TypingIndicator() {
  return (
    <div className="flex flex-col justify-start">
      <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-tl-none rounded-tr-3xl rounded-bl-3xl rounded-br-3xl relative max-w-fit">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
