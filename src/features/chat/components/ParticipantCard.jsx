import React from "react";
import GlassmorphismContainer from "../../../components/GlassmorphismContainer";

export default function ParticipantCard({
  participant,
  isYou = false,
  isVideoCall = false,
  isSpeaking = false,
  className = "",
}) {
  if (isVideoCall) {
    return (
      <div
        className={`relative bg-gray-800 rounded-3xl overflow-hidden border-4 max-h-[400px] aspect-video ${
          isYou ? "border-gray-300" : "border-green-500"
        } ${className}`}
      >
        <div className="w-full h-full">
          <img
            src={participant.avatar}
            alt={participant.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Participant Info Overlay */}
        <div className="absolute bottom-2 left-2">
          <GlassmorphismContainer className="text-white px-2 py-1">
            <span className="text-sm font-medium">{participant.name}</span>
          </GlassmorphismContainer>
        </div>

        {/* Speaking Indicator */}
        {isSpeaking && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
            Speaking
          </div>
        )}
      </div>
    );
  }

  // Audio call layout
  return (
    <div
      className={`flex flex-col items-center p-6 rounded-2xl border-2 ${
        isYou ? "bg-gray-50 border-gray-300" : "bg-gray-100 border-gray-200"
      } ${className}`}
    >
      <div
        className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 border-4 ${
          isYou ? "bg-gray-300 border-gray-400" : "bg-gray-200 border-gray-300"
        }`}
      >
        <img
          src={participant.avatar}
          alt={participant.name}
          className="w-16 h-16 rounded-full object-cover"
        />
      </div>
      <div className="text-center">
        <div className="text-gray-900 font-semibold text-lg mb-1">
          {participant.name}
        </div>
        <div className="text-gray-500 text-sm mb-2">{participant.role}</div>
        <div className="flex items-center justify-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-600 text-sm font-medium">
            {isSpeaking ? "Speaking" : "Connected"}
          </span>
        </div>
      </div>
    </div>
  );
}
