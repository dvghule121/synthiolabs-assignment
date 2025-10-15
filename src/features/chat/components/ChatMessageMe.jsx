import React from "react";

export default function ChatMessageMe({ text, time }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[50%] bg-blue-600 text-white px-4 py-3 rounded-tl-3xl rounded-tr-none rounded-bl-3xl rounded-br-3xl">
        <p className="text-sm leading-relaxed">{text}</p>
        <div className="text-xs text-blue-100 text-right mt-1">
          {new Date(time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}
