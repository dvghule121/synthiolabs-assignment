import GroupAvatar from "./GroupAvatar";

export default function ChatPanelItem({ chat, selected, onClick }) {
  const getDisplayName = () => {
    if (chat.isGroup) {
      return (
        chat.name ||
        chat.participants?.map((p) => p.name).join(", ") ||
        "Group Chat"
      );
    }
    return chat.name;
  };

  const getSubtitle = () => {
    // Always show last message for both individual and group chats
    return chat.lastMessage || "No messages yet";
  };

  return (
    <li
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-3 cursor-pointer rounded-lg w-full
        ${selected ? "bg-blue-100" : "hover:bg-gray-100"}`}
    >
      {chat.isGroup ? (
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
          <img src="/Users.svg" alt="Group" className="w-6 h-6 text-blue-600" />
        </div>
      ) : (
        <img
          src={chat.avatar}
          alt={chat.name}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />
      )}
      <div className="flex flex-col flex-1 min-w-0">
        <div className="font-semibold text-gray-900 truncate">
          {getDisplayName()}
        </div>
        <div className="text-xs text-gray-500 truncate">{getSubtitle()}</div>
      </div>
    </li>
  );
}
