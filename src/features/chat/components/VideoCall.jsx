import React, { useState } from "react";
import CallControls from "./CallControls";
import GlassmorphismContainer from "../../../components/GlassmorphismContainer";

export default function VideoCall({ onClose, chat, isAudioOnly = false }) {
  const [isVideoEnabled, setIsVideoEnabled] = useState(!isAudioOnly);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  const handleHangup = () => {
    onClose();
  };

  const handleChatToggle = () => {
    console.log("Toggle chat visibility");
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {isAudioOnly ? (
        /* Audio Call UI - Consistent with theme */
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          {/* Profile Section */}
          <div className="flex flex-col items-center mb-8">
            {/* Profile Image */}
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-gray-200">
              <img
                src="/doc.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Call Info */}
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
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
          <div className="flex items-center gap-1 mb-8">
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
        <div className="relative w-full mx-4 mt-4 max-h-[400px] mx-auto">
          <div
            className="relative h-full mx-auto"
            style={{ aspectRatio: "5/3" }}
          >
            <div className="absolute inset-0 border-4 border-green-500 rounded-3xl overflow-hidden bg-gray-800">
              {/* Remote Video Placeholder */}
              <div className="w-full h-full">
                <img
                  src="/doc.png"
                  alt="Remote User"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Remote User Info Overlay */}
              <div className="absolute bottom-4 left-4">
                <GlassmorphismContainer className="text-white px-3 py-1">
                  <span className="text-sm font-medium">
                    {chat?.name || "Dr. Ramakrishnan"}
                  </span>
                </GlassmorphismContainer>
              </div>

              {/* Audio Indicator */}
              <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full">
                <img src="/SpeakerHigh.svg" alt="Audio" className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Controls - Using reusable CallControls component */}
      {isAudioOnly ? (
        /* Audio Call Controls */
        <div className="flex justify-center items-center p-6">
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
        <div className="flex items-center justify-between p-6">
          {/* Left side - Empty for spacing */}
          <div className="w-32"></div>

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

          {/* Right side - Local Video */}
          <div className="relative w-48 h-28 bg-gray-800 rounded-xl overflow-hidden border-2 border-white shadow-lg">
            {isVideoEnabled ? (
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src="/doc.png"
                  alt="You"
                  className="w-16 h-16 rounded-full object-cover"
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
  );
}
