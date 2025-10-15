import React from "react";

export default function ChatMessageUser({ text, time }) {
  return (
    <div className="flex flex-col justify-start">
      <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-tl-none rounded-tr-3xl rounded-bl-3xl rounded-br-3xl relative">
        <p className="text-sm leading-relaxed whitespace-pre-line">{text}</p>
        <div className="text-[11px] text-gray-400 text-right mt-1">
          {new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>

      <div className="flex gap-3 mt-4">
          <button onClick={() => console.log("Edit clicked")}>
            <img src="/Copy.svg" alt="Edit" className="w-4 h-4" />
          </button>
          <button onClick={() => console.log("More options clicked")}>
            <img src="/SpeakerHigh.svg" alt="More" className="w-4 h-4" />
          </button>
          <button onClick={() => console.log("More options clicked")}>
            <img src="/ThumbsUp.svg" alt="More" className="w-4 h-4" />
          </button>
           <button onClick={() => console.log("More options clicked")}>
            <img src="/ThumbsDown.svg" alt="More" className="w-4 h-4" />
          </button>
          <button onClick={() => console.log("More options clicked")}>
            <img src="/Magic-Stick-4.svg" alt="More" className="w-4 h-4" />
          </button>
          <button onClick={() => console.log("More options clicked")}>
            <img src="/ArrowsClockwise.svg" alt="More" className="w-4 h-4" />
          </button>
        </div>
    </div>
  );
}
