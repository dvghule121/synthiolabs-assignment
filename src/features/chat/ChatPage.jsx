import { chats } from "./data/chat";
import ChatPanel from "./components/ChatPanel";
import ChatWindow from "./components/ChatWindow";
import NewMessageView from "./components/NewMessageView";
import { useChat } from "./context/ChatContext";
import { useEffect, useState } from "react";

export default function ChatPage() {
  const {
    chats: contextChats,
    selectedChatId,
    selectChat,
    getSelectedChat,
    setChats,
    toggleVideoCall,
  } = useChat();

  const [showNewMessage, setShowNewMessage] = useState(false);
  const [pendingVideoCall, setPendingVideoCall] = useState(false);
  const [pendingAudioCall, setPendingAudioCall] = useState(false);
  const [isAudioOnly, setIsAudioOnly] = useState(false);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  // Listen for chat panel toggle from mobile navbar
  useEffect(() => {
    const handleToggleChat = () => {
      setIsMobileChatOpen((prev) => !prev);
    };

    window.addEventListener("toggleChatPanel", handleToggleChat);
    return () =>
      window.removeEventListener("toggleChatPanel", handleToggleChat);
  }, []);

  // Initialize chats on first load
  useEffect(() => {
    if (contextChats.length === 0) {
      setChats(chats);
    }
  }, [contextChats.length, setChats]);

  // Handle video call after group creation
  useEffect(() => {
    if (pendingVideoCall && selectedChatId) {
      const chat = getSelectedChat();
      if (chat && chat.isGroup) {
        // Use setTimeout to ensure state is fully updated
        setTimeout(() => {
          toggleVideoCall();
          setPendingVideoCall(false);
        }, 50);
      }
    }
  }, [selectedChatId, pendingVideoCall, getSelectedChat, toggleVideoCall]);

  // Handle audio call after group creation
  useEffect(() => {
    if (pendingAudioCall && selectedChatId) {
      const chat = getSelectedChat();
      if (chat && chat.isGroup) {
        // Use setTimeout to ensure state is fully updated
        setTimeout(() => {
          setIsAudioOnly(true);
          toggleVideoCall();
          setPendingAudioCall(false);
        }, 50);
      }
    }
  }, [selectedChatId, pendingAudioCall, getSelectedChat, toggleVideoCall]);

  const handleNewMessage = () => {
    setShowNewMessage(true);
    // Close mobile chat panel after opening new message
    setIsMobileChatOpen(false);
  };

  const handleCloseNewMessage = () => {
    setShowNewMessage(false);
  };

  const handleSelectChat = (chatId) => {
    selectChat(chatId);
    // Close new message view if it's open
    if (showNewMessage) {
      setShowNewMessage(false);
    }
    // Close mobile chat panel after selection
    setIsMobileChatOpen(false);
  };

  const handleStartVideoCall = () => {
    setIsAudioOnly(false);
    setPendingVideoCall(true);
  };

  const handleStartAudioCall = () => {
    setIsAudioOnly(true);
    setPendingAudioCall(true);
  };

  return (
    <div className="flex flex-col md:flex-row flex-1 md:h-[calc(100vh-104px)] h-[calc(100vh-80px)] overflow-hidden md:px-4 md:pb-4 md:pt-4">
      {/* Mobile Overlay */}
      {isMobileChatOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileChatOpen(false)}
        />
      )}

      {/* Chat Panel - Desktop: always visible, Mobile: slides from right */}
      <div
        className={`
          md:relative fixed inset-y-0 right-0 z-50
          md:translate-x-0 transition-transform duration-300 ease-in-out
          ${
            isMobileChatOpen
              ? "translate-x-0"
              : "translate-x-full md:translate-x-0"
          }
          bg-white md:bg-transparent
        `}
      >
        <ChatPanel
          chats={contextChats}
          selectedId={selectedChatId}
          onSelect={handleSelectChat}
          onNewMessage={handleNewMessage}
          onClose={() => setIsMobileChatOpen(false)}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 md:pl-0 flex flex-col min-h-0">
        {showNewMessage ? (
          <NewMessageView
            onClose={handleCloseNewMessage}
            onStartVideoCall={handleStartVideoCall}
            onStartAudioCall={handleStartAudioCall}
          />
        ) : (
          <ChatWindow chat={getSelectedChat()} isAudioOnly={isAudioOnly} />
        )}
      </div>
    </div>
  );
}
