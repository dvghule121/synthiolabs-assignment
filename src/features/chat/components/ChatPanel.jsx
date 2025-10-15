import ChatPanelItem from "./ChatPanelItem";


export default function ChatPanel({ chats, selectedId, onSelect }) {
  return (
    <aside className="w-96 flex flex-col h-full max-h-[calc(100vh-90px)]">
      <div className="px-4 py-3 font-bold text-lg tracking-tight flex-shrink-0">
        Chats
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
