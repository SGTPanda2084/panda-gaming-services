import { useState } from "react";
import "./App.css";
import WatchStream from "./WatchStream";
import Chat from "./Chat";

function App() {
  // Stream status: live or offline
  const [isLive] = useState(true); // you can wire this later

  // Theme: 'dark' or 'neon'
  const [theme, setTheme] = useState("dark");

  function handleThemeToggle() {
    setTheme((prev) => (prev === "dark" ? "neon" : "dark"));
  }

  return (
    <div className={`app theme-${theme}`}>
      {/* Top bar */}
      <header className="top-bar">
        <div className="top-left">
          <h1 className="title">SGT Panda Streaming Services</h1>
          <p className="subtitle">Welcome to the Panda Barracks 🐼</p>
        </div>

        <div className="top-right">
          <span className={isLive ? "live-badge live" : "live-badge offline"}>
            {isLive ? "LIVE" : "OFFLINE"}
          </span>
          <span className="viewer-count">
            {isLive ? "12 viewers" : "Stream is resting"}
          </span>

          <button
            className="theme-toggle"
            type="button"
            onClick={handleThemeToggle}
          >
            {theme === "dark" ? "Switch to Neon" : "Switch to Dark"}
          </button>
        </div>
      </header>

      {/* Main content area */}
      <div className="main-layout">
        {/* Left: video */}
        <div className="video-area">
          <WatchStream />

          <p className="stream-title">
            {isLive
              ? "Chill Stream with SGT Panda"
              : "Stream is offline. Check back soon!"}
          </p>
        </div>

        {/* Right: IVS chat */}
       <aside className="chat-area">
  <h2 className="chat-title">Chat</h2>
  <Chat />
</aside>

      </div>
    </div>
  );
}

export default App;
