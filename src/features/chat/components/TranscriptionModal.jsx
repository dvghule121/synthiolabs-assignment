import React from "react";
import Modal from "../../../components/Modal";
import ChatMessageMe from "./ChatMessageMe";
import ChatMessageUser from "./ChatMessageUser";

export default function TranscriptionModal({
  isOpen,
  onClose,
  messages = [],
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      position="right"
      container="relative"
      backdropClassName=""
      className="bg-white rounded-2xl shadow-2xl w-1/2 h-[500px] flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Transcription</h2>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>No transcription available</p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id}>
              {message.sender === "Me" ? (
                <ChatMessageMe
                  text={message.text}
                  time={message.timestamp}
                  attachments={message.attachments}
                />
              ) : (
                <ChatMessageUser
                  text={message.text}
                  time={message.timestamp}
                  messageId={message.id}
                  feedback={message.feedback}
                  senderName={message.senderName || message.sender}
                  senderAvatar={message.senderAvatar}
                  isGroup={false}
                />
              )}
            </div>
          ))
        )}
      </div>
    </Modal>
  );
}
