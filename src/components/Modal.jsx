import React from "react";

export default function Modal({
  isOpen,
  onClose,
  children,
  className = "",
  backdropClassName = "bg-black bg-opacity-30",
  position = "center", // "center", "right", "left", "top", "bottom"
  container = "viewport", // "viewport" or "relative"
}) {
  if (!isOpen) return null;

  const getPositionClasses = () => {
    switch (position) {
      case "right":
        return "flex items-end justify-end";
      case "left":
        return "flex items-start justify-start";
      case "top":
        return "flex items-start justify-center";
      case "bottom":
        return "flex items-end justify-center";
      default:
        return "flex items-center justify-center";
    }
  };

  const getModalSpacing = () => {
    switch (position) {
      case "right":
        return "mr-4 mb-4";
      case "left":
        return "ml-4 mb-4";
      case "top":
        return "mt-4";
      case "bottom":
        return "mb-4";
      default:
        return "";
    }
  };

  const getContainerClasses = () => {
    return container === "relative"
      ? "absolute inset-0 z-50"
      : "fixed inset-0 z-50";
  };

  return (
    <div className={`${getContainerClasses()} ${getPositionClasses()}`}>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 ${backdropClassName}`}
        onClick={onClose}
      />

      {/* Modal */}
      <div className={`relative ${getModalSpacing()} ${className}`}>
        {children}
      </div>
    </div>
  );
}
