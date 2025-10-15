import React, { useState } from "react";
import ChatPanelItem from "./ChatPanelItem";
import NewMessageView from "./NewMessageView";

export default function ChatPanel({
  chats,
  selectedId,
  onSelect,
  onNewMessage,
}) {
  return (
    <aside className="w-96 flex flex-col h-full max-h-[calc(100vh-90px)]">
      <div className="px-4 py-3 font-bold text-lg tracking-tight flex-shrink-0 flex items-center justify-between">
        <span>Chats</span>
        <button
          onClick={onNewMessage}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          title="New Message"
        >
          <img src="/NotePencil.svg" alt="new-chat" />
        </button>
      </div>
      <ul className="flex-1 overflow-y-auto px-4">
        {chats.map((chat) => (
          <ChatPanelItem
            key={chat.id}
            chat={chat}
            selected={chat.id === selectedId}
            onClick={() => onSelect(chat.id)}
          />
        ))}
      </ul>
    </aside>
  );
}
