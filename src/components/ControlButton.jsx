import React from "react";

export default function ControlButton({
  onClick,
  icon,
  alt,
  title,
  isActive = true,
  variant = "default",
  className = "",
  ...props
}) {
  const getButtonStyles = () => {
    const baseStyles =
      "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm";

    switch (variant) {
      case "muted":
        return `${baseStyles} bg-red-500/80 hover:bg-red-600/80 text-white border border-red-400/60`;
      case "danger":
        return `${baseStyles} bg-red-600/90 hover:bg-red-700/90 text-white border border-red-500/60`;
      default:
        return isActive
          ? `${baseStyles} bg-white hover:bg-white/30 text-gray-700 border border-white/40`
          : `${baseStyles} bg-red-500/80 hover:bg-red-600/80 text-white border border-red-400/60`;
    }
  };

  return (
    <button
      onClick={onClick}
      className={`${getButtonStyles()} ${className}`}
      title={title}
      {...props}
    >
      <img src={icon} alt={alt} className="w-5 h-5" />
    </button>
  );
}
