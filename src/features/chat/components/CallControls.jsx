import React from "react";
import GlassmorphismContainer from "../../../components/GlassmorphismContainer";
import ControlButton from "../../../components/ControlButton";

export default function CallControls({
  isAudioEnabled,
  isVideoEnabled,
  onToggleAudio,
  onToggleVideo,
  onToggleChat,
  onHangup,
  showVideoToggle = false,
}) {
  return (
    <GlassmorphismContainer>
      {/* Microphone Toggle */}
      <ControlButton
        onClick={onToggleAudio}
        icon="/Microphone.svg"
        alt="Microphone"
        title={isAudioEnabled ? "Mute microphone" : "Unmute microphone"}
        isActive={isAudioEnabled}
        variant={!isAudioEnabled ? "muted" : "default"}
      />

      {/* Video Toggle - Only show in video calls */}
      {showVideoToggle && (
        <ControlButton
          onClick={onToggleVideo}
          icon="/VideoCamera.svg"
          alt="Video"
          title={isVideoEnabled ? "Turn off camera" : "Turn on camera"}
          isActive={isVideoEnabled}
          variant={!isVideoEnabled ? "muted" : "default"}
        />
      )}

      {/* Chat Toggle */}
      <ControlButton
        onClick={onToggleChat}
        icon="/ChatCircleBlack.svg"
        alt="Chat"
        title="Toggle chat"
        variant="default"
      />

      {/* Hang Up */}
      <ControlButton
        onClick={onHangup}
        icon="/HungUp.svg"
        alt="Hang up"
        title="End call"
        variant="danger"
      />
    </GlassmorphismContainer>
  );
}
