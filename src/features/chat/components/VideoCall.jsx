import React, { useState } from "react";
import CallControls from "./CallControls";
import ParticipantCard from "./ParticipantCard";
import GlassmorphismContainer from "../../../components/GlassmorphismContainer";
import TranscriptionModal from "./TranscriptionModal";

export default function VideoCall({ onClose, chat, isAudioOnly = false }) {
  const [isVideoEnabled, setIsVideoEnabled] = useState(!isAudioOnly);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isGroupCall, setIsGroupCall] = useState(chat?.isGroup || false);
  const [isTranscriptionOpen, setIsTranscriptionOpen] = useState(false);

  const handleHangup = () => {
    onClose();
  };

  const handleChatToggle = () => {
    setIsTranscriptionOpen(!isTranscriptionOpen);
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
  };

  // Dummy transcription data based on chat messages
  const getTranscriptionData = () => {
    if (!chat?.messages) return [];

    // Use existing chat messages as transcription data
    return chat.messages.map((message, index) => ({
      ...message,
      id: `transcript-${message.id}`,
      // Add some transcription-specific properties
      isTranscription: true,
    }));
  };

  // Group audio call layout
  const renderGroupAudioCall = () => {
    const participants = chat?.participants || [];

    return (
      <div className="flex-1 flex flex-col bg-white md:p-8 p-4">
        {/* Group Call Header */}
        <div className="text-center md:mb-8 mb-6">
          <h2 className="text-gray-900 md:text-2xl text-xl font-semibold mb-2">
            {chat?.name || "Group Call"}
          </h2>
          <p className="text-gray-500 md:text-lg text-base">
            {participants.length} participant
            {participants.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Participants Grid */}
        <div className="flex-1 flex items-center justify-center">
          <div className="grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-4 max-w-2xl w-full">
            {participants.map((participant, index) => (
              <ParticipantCard
                key={participant.id}
                participant={participant}
                isVideoCall={false}
                isSpeaking={index === 0}
              />
            ))}

            {/* "You" placeholder */}
            <ParticipantCard
              participant={{
                id: "you",
                name: "You",
                role: "Connected",
                avatar: "/doc.png",
              }}
              isYou={true}
              isVideoCall={false}
              isSpeaking={true}
            />
          </div>
        </div>
      </div>
    );
  };

  // Group video call layout
  const renderGroupVideoCall = () => {
    const participants = chat?.participants || [];
    const gridCols = participants.length <= 4 ? 2 : 3;
    const gridRows = Math.ceil(participants.length / gridCols);

    return (
      <div className="flex-1 flex flex-col bg-white md:p-4 p-2">
        {/* Video Grid */}
        <div
          className={`flex-1 grid md:gap-4 gap-2 max-w-[800px] mx-auto ${
            gridCols <= 4
              ? "md:grid-cols-2 grid-cols-1"
              : "md:grid-cols-3 grid-cols-1"
          }`}
        >
          {participants.map((participant, index) => (
            <ParticipantCard
              key={participant.id}
              participant={participant}
              isVideoCall={true}
              isSpeaking={index === 0}
            />
          ))}

          {/* "You" placeholder */}
          <ParticipantCard
            participant={{
              id: "you",
              name: "You",
              role: "Connected",
              avatar: "/doc.png",
            }}
            isYou={true}
            isVideoCall={true}
            isSpeaking={false}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-white relative overflow-hidden">
      {isGroupCall ? (
        isAudioOnly ? (
          renderGroupAudioCall()
        ) : (
          renderGroupVideoCall()
        )
      ) : isAudioOnly ? (
        /* Audio Call UI - Consistent with theme */
        <div className="flex-1 flex flex-col items-center justify-center md:p-8 p-6">
          {/* Profile Section */}
          <div className="flex flex-col items-center md:mb-8 mb-6">
            {/* Profile Image */}
            <div className="md:w-24 md:h-24 w-20 h-20 rounded-full overflow-hidden mb-4 border-4 border-gray-200">
              <img
                src="/doc.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Call Info */}
            <div className="text-center">
              <h2 className="md:text-xl text-lg font-semibold text-gray-900 mb-1">
                {chat?.name || "Dr. Ramakrishnan"}
              </h2>
              <p className="text-sm text-gray-500 mb-3">
                {chat?.role || "Medical Oncologist"}
              </p>
              <div className="flex items-center justify-center gap-2 text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Connected</span>
              </div>
            </div>
          </div>

          {/* Audio Waveform Animation - Subtle */}
          <div className="flex items-center gap-1 md:mb-8 mb-6">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-gray-400 rounded-full animate-pulse"
                style={{
                  height: `${12 + Math.random() * 20}px`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${0.8 + Math.random() * 0.4}s`,
                }}
              ></div>
            ))}
          </div>
        </div>
      ) : (
        /* Video Call UI */
        <div className="relative w-full md:mx-4 mx-4 md:mt-4 mt-2 md:max-h-[400px] max-h-[80%] mx-auto">
          <div
            className="relative h-full mx-auto"
            style={{ aspectRatio: window.innerWidth >= 768 ? "16/9" : "9/16" }}
          >
            <div className="absolute inset-0 md:border-4 border-2 border-green-500 md:rounded-3xl rounded-2xl overflow-hidden bg-gray-800">
              {/* Remote Video Placeholder */}
              <div className="w-full h-full">
                <img
                  src="/doc.png"
                  alt="Remote User"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Remote User Info Overlay */}
              <div className="absolute md:bottom-4 md:left-4 bottom-2 left-2">
                <GlassmorphismContainer className="text-white md:px-3 md:py-1 px-2 py-0.5">
                  <span className="md:text-sm text-xs font-medium">
                    {chat?.name || "Dr. Ramakrishnan"}
                  </span>
                </GlassmorphismContainer>
              </div>

              {/* Audio Indicator */}
              <div className="absolute md:top-4 md:right-4 top-2 right-2 bg-white text-white md:p-2 p-1.5 rounded-full">
                <img
                  src="/SpeakerHigh.svg"
                  alt="Audio"
                  className="md:w-5 md:h-5 w-4 h-4"
                />
              </div>

              {/* Local Video Overlay - Only on mobile */}
              <div className="md:hidden absolute bottom-2 right-2 w-24 h-36 bg-gray-800 rounded-lg overflow-hidden border-2 border-white shadow-lg">
                {isVideoEnabled ? (
                  <div className="w-full h-full">
                    <img
                      src="/doc.png"
                      alt="You"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                    <div className="text-center text-white">
                      <img
                        src="/VideoCamera.svg"
                        alt="Video Off"
                        className="w-2 h-2 mx-auto mb-0.5 opacity-50"
                      />
                      <p className="text-[8px]">Off</p>
                    </div>
                  </div>
                )}

                {/* Local User Info Overlay */}
                <div className="absolute bottom-0 left-0">
                  <GlassmorphismContainer className="text-white px-1 py-0 rounded text-[8px]">
                    <span>Me</span>
                  </GlassmorphismContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Controls - Absolutely positioned */}
      <div className="absolute md:bottom-2 bottom-1 left-0 right-0 flex justify-center items-center z-10 md:px-0 px-2">
        {isGroupCall ? (
          <CallControls
            isAudioEnabled={isAudioEnabled}
            onToggleAudio={toggleAudio}
            onToggleChat={handleChatToggle}
            onHangup={handleHangup}
            showVideoToggle={!isAudioOnly}
            isVideoEnabled={isVideoEnabled}
            onToggleVideo={toggleVideo}
          />
        ) : isAudioOnly ? (
          /* Audio Call Controls */
          <div className="bg-white/90 backdrop-blur-sm md:rounded-2xl rounded-xl md:px-6 px-4 md:py-4 py-3 shadow-lg border border-gray-200">
            <CallControls
              isAudioEnabled={isAudioEnabled}
              onToggleAudio={toggleAudio}
              onToggleChat={handleChatToggle}
              onHangup={handleHangup}
              showVideoToggle={false}
            />
          </div>
        ) : (
          /* Video Call Controls - Using reusable CallControls component */
          <div className="flex items-center md:justify-between justify-center md:gap-8 gap-2 w-full">
            {/* Left side - Empty for spacing (desktop only) */}
            <div className="md:w-32 hidden md:block"></div>

            {/* Center - Control Buttons */}
            <CallControls
              isAudioEnabled={isAudioEnabled}
              isVideoEnabled={isVideoEnabled}
              onToggleAudio={toggleAudio}
              onToggleVideo={toggleVideo}
              onToggleChat={handleChatToggle}
              onHangup={handleHangup}
              showVideoToggle={true}
            />

            {/* Right side - Local Video (Desktop only) */}
            <div className="hidden md:block absolute right-24 md:block relative w-48 h-28 bg-gray-800 rounded-xl overflow-hidden border-2 border-white shadow-lg">
              {isVideoEnabled ? (
                <div className="w-full h-full">
                  <img
                    src="/doc.png"
                    alt="You"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                  <div className="text-center text-white">
                    <img
                      src="/VideoCamera.svg"
                      alt="Video Off"
                      className="w-4 h-4 mx-auto mb-1 opacity-50"
                    />
                    <p className="text-xs">Off</p>
                  </div>
                </div>
              )}

              {/* Local User Info Overlay */}
              <div className="absolute bottom-1 left-1">
                <GlassmorphismContainer className="text-white px-2 py-1 rounded text-xs">
                  <span>Me</span>
                </GlassmorphismContainer>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Transcription Modal */}
      <TranscriptionModal
        isOpen={isTranscriptionOpen}
        onClose={() => setIsTranscriptionOpen(false)}
        messages={getTranscriptionData()}
        chatName={chat?.name || "Call Transcription"}
      />
    </div>
  );
}
