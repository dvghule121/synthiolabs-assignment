export default function ChatPanelItem({ chat, selected, onClick }) {
  return (
    <li
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-3 cursor-pointer rounded-lg w-full
        ${selected ? "bg-blue-100" : "hover:bg-gray-100"}`}
    >
      <img
        src={chat.avatar}
        alt={chat.name}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
      />
      <div className="flex flex-col flex-1 min-w-0">
        <div className="font-semibold text-gray-900 truncate">{chat.name}</div>
        <div className="text-xs text-gray-500 truncate">{chat.lastMessage}</div>
      </div>
    </li>
  );
}
