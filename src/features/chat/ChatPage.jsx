import { chats } from "./data/chat";
import ChatPanel from "./components/ChatPanel";
import ChatWindow from "./components/ChatWindow";
import { useChat } from "./context/ChatContext";
import { useEffect } from "react";

export default function ChatPage() {
  const {
    chats: contextChats,
    selectedChatId,
    selectChat,
    getSelectedChat,
    setChats,
  } = useChat();

  // Initialize chats on first load
  useEffect(() => {
    if (contextChats.length === 0) {
      setChats(chats);
    }
  }, [contextChats.length, setChats]);

  return (
    <div className="flex flex-1 h-[calc(100vh-104px)] overflow-hidden px-4 pb-4 pt-4">
      <ChatPanel
        chats={contextChats}
        selectedId={selectedChatId}
        onSelect={selectChat}
      />
      <ChatWindow chat={getSelectedChat()} />
    </div>
  );
}
