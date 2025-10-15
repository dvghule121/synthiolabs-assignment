import { chats } from "./data/chat";
import ChatPanel from "./components/ChatPanel";
import ChatWindow from "./components/ChatWindow";
import { useState } from "react";

export default function ChatPage() {
  const [selectedId, setSelectedId] = useState(chats[0].id);

  return (
    <div className="flex flex-1 h-[calc(100vh-104px)] overflow-hidden px-4 pb-4 pt-4">
      <ChatPanel
        chats={chats}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
      <ChatWindow
        chat={chats.find((chat) => chat.id === selectedId)}
      />
    </div>
  );
}
