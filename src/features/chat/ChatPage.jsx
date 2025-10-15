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
    <div className="flex flex-1 h-[calc(100vh-104px)] overflow-hidden px-4 pb-4 pt-4">
      <ChatPanel
        chats={contextChats}
        selectedId={selectedChatId}
        onSelect={handleSelectChat}
        onNewMessage={handleNewMessage}
      />
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
  );
}
