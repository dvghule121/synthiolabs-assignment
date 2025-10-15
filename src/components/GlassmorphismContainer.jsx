import React from "react";

export default function GlassmorphismContainer({
  children,
  className = "",
  style = {},
  ...props
}) {
  return (
    <div
      className={`flex items-center justify-center gap-3 px-3 py-3 rounded-full border-1 border-black/1 backdrop-blur-lg bg-black/3 ${className}`}
      style={{
        backdropFilter: "blur(20px)",
        width: "fit-content",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
