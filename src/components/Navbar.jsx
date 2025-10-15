import { NavLink } from "react-router-dom";
import GradientWrapper from "./GradientWrapper";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: "SquaresFour.svg" },
  { name: "Insights", path: "/insights", icon: "MagicWand.svg" },
  { name: "Transcript", path: "/transcript", icon: "Notebook.svg" },
  { name: "Chat", path: "/chat", icon: "ChatCircle.svg" },
];

export default function Navbar() {
  return (
    <nav className="relative flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-2 w-1/3">
        <img src="/Logo.png" alt="Synthio Labs" className="h-8" />
      </div>

      <div
        className="flex items-center justify-center gap-6 px-2 py-2 rounded-full border-2 border-white/60 backdrop-blur-lg w-1/3"
        style={{
          boxShadow: "-1px 3px 7px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(20px)",
          width: "fit-content",
          maxWidth: "calc(100% - 3rem)",
        }}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={"relative text-sm font-medium transition-all duration-200 px-2 py-2 rounded-full text-gray-600 hover:text-gray-800" }
          >
            {({ isActive }) =>
              isActive ? (
                <GradientWrapper className="px-8 py-2 text-white">
                  <span className="flex items-center justify-center gap-2 text-white">
                    <img src={item.icon} alt="" />
                    {item.name}
                  </span>
                </GradientWrapper>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <img src={item.icon} alt="" />
                  {item.name}
                </span>
              )
            }
          </NavLink>
        ))}
      </div>

      <div className="w-1/3" />
    </nav>
  );
}
