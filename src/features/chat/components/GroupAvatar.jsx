import React from "react";

export default function GroupAvatar({ participants, size = "w-10 h-10" }) {
  if (!participants || participants.length === 0) {
    return (
      <div
        className={`${size} rounded-full bg-gray-200 flex items-center justify-center`}
      >
        <svg
          className="w-6 h-6 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
        </svg>
      </div>
    );
  }

  if (participants.length === 1) {
    return (
      <img
        src={participants[0].avatar}
        alt={participants[0].name}
        className={`${size} rounded-full object-cover`}
      />
    );
  }

  if (participants.length === 2) {
    return (
      <div className={`${size} rounded-full relative`}>
        <img
          src={participants[0].avatar}
          alt={participants[0].name}
          className="w-6 h-6 rounded-full object-cover absolute -top-1 -left-1 border-2 border-white"
        />
        <img
          src={participants[1].avatar}
          alt={participants[1].name}
          className="w-6 h-6 rounded-full object-cover absolute -bottom-1 -right-1 border-2 border-white"
        />
      </div>
    );
  }

  // For 3+ participants, show first 3 in a cluster
  return (
    <div className={`${size} rounded-full relative`}>
      <img
        src={participants[0].avatar}
        alt={participants[0].name}
        className="w-5 h-5 rounded-full object-cover absolute top-0 left-0 border-2 border-white"
      />
      <img
        src={participants[1].avatar}
        alt={participants[1].name}
        className="w-5 h-5 rounded-full object-cover absolute top-0 right-0 border-2 border-white"
      />
      <img
        src={participants[2].avatar}
        alt={participants[2].name}
        className="w-5 h-5 rounded-full object-cover absolute bottom-0 left-1/2 transform -translate-x-1/2 border-2 border-white"
      />
      {participants.length > 3 && (
        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center border-2 border-white">
          +{participants.length - 3}
        </div>
      )}
    </div>
  );
}
