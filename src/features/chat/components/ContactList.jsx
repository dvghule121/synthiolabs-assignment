import React from "react";
import { availableContacts } from "../data/chat";

export default function ContactList({
  onParticipantSelect,
  selectedParticipants,
  searchTerm = "",
}) {
  // Always use the external search term passed from parent
  // Filter out already selected participants and apply search term
  const filteredContacts = availableContacts.filter((contact) => {
    // Exclude already selected participants
    const isAlreadySelected = selectedParticipants.some(
      (selected) => selected.id === contact.id
    );

    if (isAlreadySelected) return false;

    // Apply search filter
    return (
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-2">
      {/* Contact List */}
      <div className="max-h-48 overflow-y-auto space-y-1">
        {filteredContacts.map((contact) => {
          return (
            <div
              key={contact.id}
              onClick={() => onParticipantSelect(contact)}
              className="flex items-center gap-2 px-4 py-3 cursor-pointer rounded-lg transition-colors hover:bg-gray-50"
            >
              {/* Avatar */}
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />

              {/* Contact Info */}
              <div className="flex flex-col flex-1 min-w-0">
                <div className="font-semibold text-gray-900 truncate">
                  {contact.name}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {contact.role}
                </div>
              </div>
            </div>
          );
        })}

        {filteredContacts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <svg
              className="w-12 h-12 mx-auto mb-4 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <p className="text-lg font-medium mb-2">No contacts found</p>
            <p className="text-sm">
              {searchTerm
                ? "Try adjusting your search terms"
                : selectedParticipants.length > 0
                ? "All contacts have been selected"
                : "No contacts available"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
