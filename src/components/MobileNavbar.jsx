import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import GradientWrapper from "./GradientWrapper";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: "SquaresFour.svg" },
  { name: "Insights", path: "/insights", icon: "MagicWand.svg" },
  { name: "Transcript", path: "/transcript", icon: "Notebook.svg" },
  { name: "Chat", path: "/chat", icon: "ChatCircle.svg" },
];

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isChatRoute = location.pathname === "/chat";

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-lg border-b border-gray-200 flex-shrink-0 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <img src="/Logo.png" alt="Synthio Labs" className="h-7" />

        {isChatRoute && (
          <button
            onClick={() => {
              // This will be handled by ChatPage
              const event = new CustomEvent("toggleChatPanel");
              window.dispatchEvent(event);
            }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <img src="/ChatCircleBlack.svg" alt="chats" className="w-6 h-6" />
          </button>
        )}

        {!isChatRoute && <div className="w-10 h-10" />}
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Navigation Panel - Slides from left */}
      <div
        className={`
          md:hidden fixed inset-y-0 left-0 z-50 w-80
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          bg-white shadow-xl
        `}
      >
        <div className="h-full flex flex-col">
          <div className="px-4 py-4 border-b border-gray-200 flex-shrink-0">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Navigation
            </h3>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="block"
                >
                  {({ isActive }) =>
                    isActive ? (
                      <GradientWrapper className="px-4 py-2.5 text-white">
                        <div className="flex items-center gap-3 text-white">
                          <img
                            src={item.icon}
                            alt=""
                            className="w-5 h-5 brightness-0 invert"
                          />
                          <span className="font-medium">{item.name}</span>
                        </div>
                      </GradientWrapper>
                    ) : (
                      <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                        <img
                          src={item.icon}
                          alt=""
                          className="w-5 h-5 brightness-0"
                        />
                        <span className="font-medium">{item.name}</span>
                      </div>
                    )
                  }
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
