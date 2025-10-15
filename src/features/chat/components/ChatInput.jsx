import React, { useRef, useState, useEffect } from "react";
import GradientWrapper from "../../../components/GradientWrapper";
import { useChat } from "../context/ChatContext";

// ChatInput — refined so the *entire rounded bubble* is the input area.
// - Attachments render at the top inside the bubble (stacked vertically).
// - The text input area sits below attachments and provides 2-3 lines of space by default.
// - Paperclip and Send icons are inside the same bubble row (relative flow).
// - Clicking anywhere on the bubble focuses the textarea.

export default function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState([]);
  const fileRef = useRef(null);
  const textareaRef = useRef(null);
  const wrapperRef = useRef(null);
  const { sendMessage, isLoading } = useChat();

  useEffect(() => {
    // auto-resize textarea to its content
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    const newHeight = Math.min(Math.max(ta.scrollHeight, 72), 300); // ensure 2-3 lines min (~72px)
    ta.style.height = newHeight + "px";
  }, [message, attachments]);

  function handleFiles(e) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    const newItems = files.map((file) => ({
      id: Math.random().toString(36).slice(2, 9),
      file,
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
    }));
    setAttachments((prev) => [...prev, ...newItems]);
    e.target.value = "";
  }

  function removeAttachment(id) {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  }

  function openFileDialog() {
    fileRef.current?.click();
  }

  function sendMessageImpl() {
    if (!message.trim() && attachments.length === 0) return;

    // If onSendMessage prop is provided, use it (for NewMessageView)
    if (onSendMessage) {
      onSendMessage(
        message.trim(),
        attachments.map((a) => a.file)
      );
    } else {
      // Send message through context (for regular chat)
      sendMessage(
        message.trim(),
        attachments.map((a) => a.file)
      );
    }

    // Clean up preview URLs
    attachments.forEach((a) => a.preview && URL.revokeObjectURL(a.preview));
    setMessage("");
    setAttachments([]);
  }

  useEffect(() => {
    return () => {
      attachments.forEach((a) => a.preview && URL.revokeObjectURL(a.preview));
    };
  }, [attachments]);

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessageImpl();
    }
  }

  function focusTextarea() {
    textareaRef.current?.focus();
  }

  return (
    <div className="w-full px-6 pb-6">
      <div className="max-w-full">
        {/* Entire bubble is clickable/focusable */}
        <div
          ref={wrapperRef}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 cursor-text mt-3"
          onClick={focusTextarea}
          style={{
            boxShadow: "-1px 1px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Attachments stacked at the top, inside the bubble */}
          {attachments.length > 0 && (
            <div className="flex gap-2 mb-3">
              {attachments.map((att) => (
                <div
                  key={att.id}
                  className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-md px-1 py-1 relative"
                >
                  {att.preview ? (
                    <img
                      src={att.preview}
                      alt={att.file.name}
                      className="w-16 h-16 rounded-sm object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-sm flex items-center justify-center bg-red-200 p- text-xs font-medium">
                      <img
                        src="/Pdf.svg"
                        alt="pdf-icon"
                        className="h-full w-full"
                      />
                    </div>
                  )}

                  <button
                    onClick={() => removeAttachment(att.id)}
                    type="button"
                    className="text-black hover:text-gray-900 focus:outline-none absolute -top-2 -right-2 p-1 bg-gray-200 rounded-full"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M18 6L6 18M6 6l12 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Textarea fills remaining space and shows 2-3 lines by default */}
          <textarea
            ref={textareaRef}
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 resize-none bg-transparent border border-transparent rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-0"
            style={{ minHeight: 72, maxHeight: 300 }}
          />

          {/* Input row: icons and textarea. Textarea occupies the central area and has visible multi-line space. */}
          <div className="flex items-start justify-between gap-3">
            {/* paperclip inline, in normal flow */}
            <div className="flex-shrink-0">
              <button
                type="button"
                onClick={openFileDialog}
                className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shadow-sm hover:bg-gray-100"
                aria-label="attach file"
              >
                <img src="/Paperclip.svg" alt="attach-file" />
                <input
                  ref={fileRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFiles}
                />
              </button>
            </div>

            {/* Send button with gradient wrapper */}
            <div className="flex-shrink-0">
              <GradientWrapper className="w-10 h-10 cursor-pointer" active>
                <button
                  onClick={sendMessageImpl}
                  disabled={isLoading}
                  className="w-full h-full text-white flex items-center justify-center focus:outline-none rounded-full disabled:opacity-50"
                  title="Send"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <img src="/ArrowUp.svg" alt="send-message" />
                  )}
                </button>
              </GradientWrapper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
