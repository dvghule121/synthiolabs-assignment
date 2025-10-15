import React from "react";
import ChatPanelItem from "./ChatPanelItem";

export default function ChatPanel({
  chats,
  selectedId,
  onSelect,
  onNewMessage,
  onClose,
}) {
  return (
    <aside className="md:w-96 w-80 flex flex-col md:h-full h-screen md:max-h-[calc(100vh-90px)] max-h-screen shadow-xl md:shadow-none bg-white md:bg-transparent">
      {/* Chats Section */}
      <div className="px-4 py-3 font-bold text-lg tracking-tight flex-shrink-0 flex items-center justify-between bg-white md:bg-transparent sticky top-0 z-10 border-b md:border-0 border-gray-200">
        <span>Chats</span>
        <button
          onClick={() => {
            onNewMessage();
            onClose?.();
          }}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          title="New Message"
        >
          <img src="/NotePencil.svg" alt="new-chat" />
        </button>
      </div>
      <ul className="flex-1 overflow-y-auto px-4 bg-white md:bg-transparent">
        {chats.map((chat) => (
          <ChatPanelItem
            key={chat.id}
            chat={chat}
            selected={chat.id === selectedId}
            onClick={() => {
              onSelect(chat.id);
              onClose?.();
            }}
          />
        ))}
      </ul>
    </aside>
  );
}
