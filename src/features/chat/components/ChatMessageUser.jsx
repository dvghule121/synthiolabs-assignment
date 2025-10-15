import React, { useState } from "react";
import { useChat } from "../context/ChatContext";

export default function ChatMessageUser({ text, time, messageId, feedback }) {
  const { selectedChatId, updateMessageFeedback, regenerateMessage } =
    useChat();
  const [isCopied, setIsCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // Text-to-speech
  const handleSpeak = () => {
    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  // Thumbs up/down feedback
  const handleFeedback = (type) => {
    updateMessageFeedback(selectedChatId, messageId, type);
  };

  // Regenerate message
  const handleRegenerate = () => {
    regenerateMessage(selectedChatId, messageId);
    // In a real app, this would trigger a new AI response
    console.log("Regenerating message:", messageId);
  };

  return (
    <div className="flex flex-col justify-start">
      <div className="max-w-[70%] w-fit bg-gray-100 text-gray-900 px-4 py-3 rounded-tl-none rounded-tr-3xl rounded-bl-3xl rounded-br-3xl relative">
        <p className="text-sm leading-relaxed whitespace-pre-line">{text}</p>
        <div className="text-[11px] text-gray-400 text-right mt-1">
          {new Date(time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className={`p-1 rounded hover:bg-gray-200 transition-colors ${
            isCopied ? "bg-green-100" : ""
          }`}
          title={isCopied ? "Copied!" : "Copy message"}
        >
          <img
            src="/Copy.svg"
            alt="Copy"
            className={`w-4 h-4 ${isCopied ? "opacity-50" : ""}`}
          />
        </button>

        {/* Text-to-Speech Button */}
        <button
          onClick={handleSpeak}
          className={`p-1 rounded hover:bg-gray-200 transition-colors ${
            isPlaying ? "bg-blue-100" : ""
          }`}
          title={isPlaying ? "Stop speaking" : "Read aloud"}
        >
          <img
            src="/SpeakerHigh.svg"
            alt="Speak"
            className={`w-4 h-4 ${isPlaying ? "opacity-50" : ""}`}
          />
        </button>

        {/* Thumbs Up Button */}
        <button
          onClick={() => handleFeedback("thumbs_up")}
          className={`p-1 rounded hover:bg-gray-200 transition-colors ${
            feedback === "thumbs_up" ? "bg-green-100" : ""
          }`}
          title="Good response"
        >
          <img
            src="/ThumbsUp.svg"
            alt="Thumbs up"
            className={`w-4 h-4 ${
              feedback === "thumbs_up" ? "opacity-50" : ""
            }`}
          />
        </button>

        {/* Thumbs Down Button */}
        <button
          onClick={() => handleFeedback("thumbs_down")}
          className={`p-1 rounded hover:bg-gray-200 transition-colors ${
            feedback === "thumbs_down" ? "bg-red-100" : ""
          }`}
          title="Poor response"
        >
          <img
            src="/ThumbsDown.svg"
            alt="Thumbs down"
            className={`w-4 h-4 ${
              feedback === "thumbs_down" ? "opacity-50" : ""
            }`}
          />
        </button>

        {/* Improve/Edit Button */}
        <button
          onClick={() => console.log("Improve message")}
          className="p-1 rounded hover:bg-gray-200 transition-colors"
          title="Improve this response"
        >
          <img src="/Magic-Stick-4.svg" alt="Improve" className="w-4 h-4" />
        </button>

        {/* Regenerate Button */}
        <button
          onClick={handleRegenerate}
          className="p-1 rounded hover:bg-gray-200 transition-colors"
          title="Generate new response"
        >
          <img
            src="/ArrowsClockwise.svg"
            alt="Regenerate"
            className="w-4 h-4"
          />
        </button>
      </div>
    </div>
  );
}
