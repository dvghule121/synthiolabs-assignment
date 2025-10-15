import React from "react";

export default function GradientWrapper({
  children,
  className = "",
  hover = true,
  ...props
}) {
  return (
    <div
      {...props}
      className={`relative inline-flex items-center justify-center rounded-full transition-all duration-300 ${className}`}
      style={{
        background:
          "linear-gradient(180deg, #013BDB 0%, #2C62F7 100%), url('/btn-bg-pattern.png')",
        backgroundBlendMode: "soft-light",
        backgroundSize: "200% auto",
        backgroundPosition: "center",
        boxShadow: `
          -2px 2px 3px rgba(1, 32, 60, 0.34),
          inset 0px 1px 9px 2px rgba(210, 234, 255, 0.3)
        `,
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        if (!hover) return;
        e.currentTarget.style.filter = "brightness(1.5)";
      }}
      onMouseLeave={(e) => {
        if (!hover) return;
        e.currentTarget.style.filter = "brightness(1)";
      }}
    >
      {/* Gradient Ring Border */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          padding: "1px", // thickness of the ring
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,255,255,0.15))",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      ></div>

      {/* Actual button content */}
      <div className="relative z-10 flex items-center justify-center w-full h-full rounded-full">
        {children}
      </div>
    </div>
  );
}
