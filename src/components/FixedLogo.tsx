import { useApp } from "../contexts/AppContext";

export function FixedLogo() {
  const { state } = useApp();

  const handleLogoClick = () => {
    window.open("https://bolt.new", "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="fixed bottom-4 left-4 cursor-pointer group"
      style={{
        position: "fixed",
        bottom: "16px",
        left: "16px",
        zIndex: 999999,
      }}
      onClick={handleLogoClick}
    >
      <img
        src={state.theme === "dark" ? "/white.png" : "/black.png"}
        alt="Logo"
        className="w-16 h-16 object-contain transition-all duration-500 opacity-70 group-hover:opacity-100"
        style={{
          width: "64px",
          height: "64px",
          objectFit: "contain",
          transform: "rotate(0deg)",
          transition: "all 0.5s ease-in-out",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "rotate(360deg)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "rotate(0deg)";
        }}
      />
    </div>
  );
}
