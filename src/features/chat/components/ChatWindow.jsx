import React from "react";
import ChatMessageMe from "./ChatMessageMe";
import ChatMessageUser from "./ChatMessageUser";
import ChatInput from "./ChatInput";

export default function ChatWindow({ chat }) {
  if (!chat) return null;

  return (
    <section className="flex flex-col flex-1 h-full bg-white rounded-xl overflow-hidden w-full">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-gray-100 py-4 px-6 shrink-0">
        <div className="flex items-center gap-3">
          <img
            src={chat.avatar}
            alt={chat.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <div className="font-semibold text-gray-900">{chat.name}</div>
            <div className="text-xs text-gray-500">{chat.role}</div>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <div className="border-1 border-gray-100 p-1 w-10 h-10 rounded-full flex items-center justify-center shadow-sm">
            <img
              src="/VideoCamera.svg"
              alt="video-call-btn-icon"
              className=""
            />
          </div>

          <div className="border-1 border-gray-100 p-1 w-10 h-10 rounded-full flex items-center justify-center shadow-sm">
            <img
              src="/Phone.svg"
              alt="video-call-btn-icon"
              className=""
            />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-6 px-8 py-6 pb-16 bg-white w-full">
        {chat.messages.map((msg) =>
          msg.sender === "Me" ? (
            <ChatMessageMe key={msg.id} text={msg.text} time={msg.timestamp} />
          ) : (
            <ChatMessageUser
              key={msg.id}
              text={msg.text}
              time={msg.timestamp}
            />
          )
        )}
      </div>

      {/* Input Area with Gradient Fade */}
      <div className="relative">
        <div className="absolute inset-x-0 -top-16 w-full h-16 bg-gradient-to-t from-white via-white/30 to-transparent pointer-events-none" />
        <ChatInput />
      </div>
    </section>
  );
}
