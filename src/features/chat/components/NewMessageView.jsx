import React, { useState } from "react";
import { useChat } from "../context/ChatContext";
import ContactList from "./ContactList";
import ChatInput from "./ChatInput";

export default function NewMessageView({
  onClose,
  onStartVideoCall,
  onStartAudioCall,
}) {
  const { createGroupChat, sendMessage } = useChat();
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showContactList, setShowContactList] = useState(false);

  const handleParticipantSelect = (participant) => {
    const isSelected = selectedParticipants.find(
      (p) => p.id === participant.id
    );
    if (isSelected) {
      setSelectedParticipants((prev) =>
        prev.filter((p) => p.id !== participant.id)
      );
    } else {
      setSelectedParticipants((prev) => [...prev, participant]);
    }
    // Clear search term after selection
    setSearchTerm("");
    setShowContactList(false);
  };

  const handleRemoveParticipant = (participantId) => {
    setSelectedParticipants((prev) =>
      prev.filter((p) => p.id !== participantId)
    );
  };

  const handleStartVideoCall = () => {
    if (selectedParticipants.length === 0) {
      alert("Please select at least one participant");
      return;
    }

    // Create group chat first
    const groupName = selectedParticipants.map((p) => p.name).join(", ");
    createGroupChat(selectedParticipants, groupName);

    // Trigger video call
    onStartVideoCall();

    // Close this view
    onClose();
  };

  const handleStartAudioCall = () => {
    if (selectedParticipants.length === 0) {
      alert("Please select at least one participant");
      return;
    }

    // Create group chat first
    const groupName = selectedParticipants.map((p) => p.name).join(", ");
    createGroupChat(selectedParticipants, groupName);

    // Trigger audio call
    onStartAudioCall();

    // Close this view
    onClose();
  };

  const handleSendMessage = async (text, attachments) => {
    if (selectedParticipants.length < 1) {
      alert("Please select at least 1 participant");
      return;
    }

    // Create group chat with concatenated names and initial message
    const groupName = selectedParticipants.map((p) => p.name).join(", ");

    // Create the group with initial message
    createGroupChat(selectedParticipants, groupName, text, attachments || []);

    // Close this view
    onClose();
  };

  return (
    <section className="flex flex-col flex-1 bg-white md:rounded-xl overflow-hidden w-full min-h-0">
      {/* Header */}
      <div className="md:px-6 px-4 md:py-4 py-3 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div className="font-semibold text-gray-900 md:text-base text-sm">
            New Message
          </div>

          <div className="flex md:gap-4 gap-2 items-center">
            <button
              onClick={handleStartVideoCall}
              disabled={selectedParticipants.length === 0}
              className="border-1 border-gray-100 md:p-2 p-1.5 bg-white md:gap-2 gap-1 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Start video call"
            >
              <img
                src="/VideoCamera.svg"
                alt="video-call-btn-icon"
                className="md:w-auto w-5 h-5"
              />
              <span className="md:inline hidden text-sm font-medium text-black">
                Start video call
              </span>
            </button>

            <button
              onClick={handleStartAudioCall}
              disabled={selectedParticipants.length === 0}
              className="border-1 border-gray-100 md:p-2 p-1.5 bg-white md:gap-2 gap-1 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Start audio call"
            >
              <img
                src="/Phone.svg"
                alt="audio-call-btn-icon"
                className="md:w-auto w-5 h-5"
              />
              <span className="md:inline hidden text-sm font-medium text-black">
                Start audio call
              </span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">To:</span>
          <div className="relative flex-1 md:max-w-[600px]">
            <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border border-gray-200 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
              {selectedParticipants.map((participant) => (
                <div
                  key={participant.id}
                  className="flex items-center gap-2 bg-blue-100 text-blue-800 md:px-3 px-2 md:py-1 py-0.5 rounded-full md:text-sm text-xs"
                >
                  <img
                    src={participant.avatar}
                    alt={participant.name}
                    className="md:w-5 md:h-5 w-4 h-4 rounded-full object-cover"
                  />
                  <span>{participant.name}</span>
                  <button
                    onClick={() => handleRemoveParticipant(participant.id)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M18 6L6 18M6 6l12 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              ))}
              <input
                type="text"
                placeholder="Search or select contacts..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowContactList(true);
                }}
                onFocus={() => setShowContactList(true)}
                className="flex-1 md:min-w-[200px] min-w-[120px] border-none outline-none text-sm"
              />
            </div>

            {/* Contact List Dropdown - Full width */}
            {showContactList && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                <ContactList
                  onParticipantSelect={handleParticipantSelect}
                  selectedParticipants={selectedParticipants}
                  searchTerm={searchTerm}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Message Area - Empty state */}
      <div className="flex-1 flex items-center justify-center text-gray-500">
        <div className="text-center">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <p className="text-lg font-medium mb-2">Start a conversation</p>
          <p className="text-sm">
            Select participants and send your first message below
          </p>
        </div>
      </div>

      {/* Input Area with Gradient Fade - Reuse ChatInput */}
      <div className="relative">
        <div className="absolute inset-x-0 -top-16 w-full h-16 bg-gradient-to-t from-white via-white/30 to-transparent pointer-events-none" />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </section>
  );
}
