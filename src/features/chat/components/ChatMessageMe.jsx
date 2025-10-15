import React from "react";

// Helper function to get appropriate file icon
const getFileIcon = (fileType) => {
  if (fileType.startsWith("image/")) {
    return <img src="/doc.png" alt="image-icon" className="w-6 h-6" />;
  } else if (fileType === "application/pdf") {
    return <img src="/Pdf.svg" alt="pdf-icon" className="w-6 h-6" />;
  } else if (
    fileType.includes("word") ||
    fileType.includes("document") ||
    fileType.includes("text")
  ) {
    return <img src="/Notebook.svg" alt="doc-icon" className="w-6 h-6" />;
  } else if (
    fileType.includes("sheet") ||
    fileType.includes("excel") ||
    fileType.includes("spreadsheet")
  ) {
    return <img src="/SquaresFour.svg" alt="sheet-icon" className="w-6 h-6" />;
  } else {
    return <img src="/Notebook.svg" alt="file-icon" className="w-6 h-6" />;
  }
};

export default function ChatMessageMe({ text, time, attachments = [] }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[50%] bg-blue-600 text-white px-4 py-3 rounded-tl-3xl rounded-tr-none rounded-bl-3xl rounded-br-3xl">
        {/* Attachments */}
        {attachments && attachments.length > 0 && (
          <div className="mb-3 space-y-2">
            {attachments.map((attachment) => (
              <div key={attachment.id} className="bg-blue-500 rounded-lg p-2">
                {attachment.preview ? (
                  <img
                    src={attachment.preview}
                    alt={attachment.name}
                    className="w-32 h-32 object-cover rounded"
                  />
                ) : (
                  <div className="flex items-center gap-2 p-2 bg-blue-400 rounded">
                    {getFileIcon(attachment.type)}
                    <span className="text-sm truncate">{attachment.name}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Text content */}
        {text && <p className="text-sm leading-relaxed">{text}</p>}

        <div className="text-xs text-blue-100 text-right mt-1">
          {new Date(time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}
