import React, { useEffect, useRef, useState } from "react";
import ChatMessageMe from "./ChatMessageMe";
import ChatMessageUser from "./ChatMessageUser";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import VideoCall from "./VideoCall";
import { useChat } from "../context/ChatContext";

export default function ChatWindow({
  chat,
  isAudioOnly: initialAudioOnly = false,
}) {
  const { isLoading, isVideoCallActive, toggleVideoCall } = useChat();
  const [isAudioOnly, setIsAudioOnly] = useState(initialAudioOnly);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chat) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat?.messages, isLoading]);

  // Update isAudioOnly when prop changes
  useEffect(() => {
    setIsAudioOnly(initialAudioOnly);
  }, [initialAudioOnly]);

  if (!chat) return null;

  return (
    <section className="flex flex-col flex-1 bg-white md:rounded-xl overflow-hidden w-full min-h-0">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-gray-100 md:py-4 py-3 md:px-6 px-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          {chat.isGroup ? (
            <div className="flex items-center gap-3">
              <div>
                <div className="font-semibold text-gray-900 md:text-base text-sm">
                  {chat.name}
                </div>
              </div>
            </div>
          ) : (
            <>
              <img
                src={chat.avatar}
                alt={chat.name}
                className="md:w-12 md:h-12 w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold text-gray-900 md:text-base text-sm">
                  {chat.name}
                </div>
                <div className="text-xs text-gray-500">{chat.role}</div>
              </div>
            </>
          )}
        </div>

        <div className="flex md:gap-4 gap-2 items-center">
          <button
            onClick={() => {
              setIsAudioOnly(false);
              toggleVideoCall();
            }}
            className="border-1 border-gray-100 p-1 md:w-10 md:h-10 w-9 h-9 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
            title={chat.isGroup ? "Start group video call" : "Start video call"}
          >
            <img
              src="/VideoCamera.svg"
              alt="video-call-btn-icon"
              className="md:w-auto w-5 h-5"
            />
          </button>

          <button
            onClick={() => {
              setIsAudioOnly(true);
              toggleVideoCall();
            }}
            className="border-1 border-gray-100 p-1 md:w-10 md:h-10 w-9 h-9 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
            title={chat.isGroup ? "Start group audio call" : "Start audio call"}
          >
            <img
              src="/Phone.svg"
              alt="audio-call-btn-icon"
              className="md:w-auto w-5 h-5"
            />
          </button>
        </div>
      </div>

      {/* Gradient fade below header */}
      <div className="black md:hidden h-2 bg-gradient-to-b from-gray-200 via-gray-200/50 to-transparent"></div>

      {/* Video Call UI - Replaces messages and input when active */}
      {isVideoCallActive ? (
        <VideoCall
          key={`video-call-${chat.id}`}
          onClose={toggleVideoCall}
          chat={chat}
          isAudioOnly={isAudioOnly}
        />
      ) : (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-6 md:px-8 px-4 md:py-6 py-4 pb-16 bg-white w-full">
            {chat.messages.map((msg) =>
              msg.sender === "Me" ? (
                <ChatMessageMe
                  key={msg.id}
                  text={msg.text}
                  time={msg.timestamp}
                  attachments={msg.attachments}
                />
              ) : (
                <ChatMessageUser
                  key={msg.id}
                  text={msg.text}
                  time={msg.timestamp}
                  messageId={msg.id}
                  feedback={msg.feedback}
                  senderName={msg.senderName || msg.sender}
                  senderAvatar={msg.senderAvatar}
                  isGroup={chat.isGroup}
                />
              )
            )}

            {/* Typing indicator */}
            {isLoading && <TypingIndicator />}

            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area with Gradient Fade */}
          <div className="relative">
            <div className="absolute inset-x-0 -top-14 w-full h-15 bg-gradient-to-t from-white via-white/30 to-transparent pointer-events-none" />
            <ChatInput />
          </div>
        </>
      )}
    </section>
  );
}
