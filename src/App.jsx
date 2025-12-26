import { useState, useRef, useEffect } from 'react'
import './App.css'

const streamUrl =
  'https://02c77d52de9b.us-east-1.playback.live-video.net/api/video/v1/us-east-1.016230494190.channel.PVsOZSvpaX54.m3u8'

function App() {
  // Chat state
  const [messages, setMessages] = useState([
    { id: 1, author: 'System', text: 'Chat coming soon… this is where viewers will talk.' }
  ])
  const [chatInput, setChatInput] = useState('')

  // Stream status: live or offline
  const [isLive, setIsLive] = useState(true) // set to false to see OFFLINE state

  // Theme: 'dark' or 'neon'
  const [theme, setTheme] = useState('dark')

  // Emotes you can send with one click
  const emotes = [
    'Panda Hype 🐼',
    'GG 🎮',
    'Let’s go!!! 🚀',
    'Lurking 👀'
  ]

  // Auto‑scroll setup
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  // Helper: add a message from text
  function addMessage(text) {
    const trimmed = text.trim()
    if (!trimmed) return

    const newMessage = {
      id: Date.now(),
      author: 'You',
      text: trimmed
    }

    setMessages((prev) => [...prev, newMessage])
  }

  // When you type in the box
  function handleInputChange(event) {
    setChatInput(event.target.value)
  }

  // When you click Send or press Enter
  function handleSend(event) {
    event.preventDefault()
    addMessage(chatInput)
    setChatInput('')
  }

  // Send with Enter key
  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      handleSend(event)
    }
  }

  // When you click an emote button
  function handleEmoteClick(emoteText) {
    addMessage(emoteText)
  }

  // Toggle theme between dark and neon
  function handleThemeToggle() {
    setTheme((prev) => (prev === 'dark' ? 'neon' : 'dark'))
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
          <span className={isLive ? 'live-badge live' : 'live-badge offline'}>
            {isLive ? 'LIVE' : 'OFFLINE'}
          </span>
          <span className="viewer-count">
            {isLive ? '12 viewers' : 'Stream is resting'}
          </span>

          <button
            className="theme-toggle"
            type="button"
            onClick={handleThemeToggle}
          >
            {theme === 'dark' ? 'Switch to Neon' : 'Switch to Dark'}
          </button>
        </div>
      </header>

      {/* Main content area */}
      <div className="main-layout">
        {/* Left: video */}
        <div className="video-area">
          <video
            controls
            autoPlay
            playsInline
            className="video-player"
          >
            <source src={streamUrl} type="application/x-mpegURL" />
            Your browser does not support the video tag.
          </video>

          <p className="stream-title">
            {isLive
              ? 'Chill Stream with SGT Panda'
              : 'Stream is offline. Check back soon!'}
          </p>
        </div>

        {/* Right: chat with messages */}
        <aside className="chat-area">
          <h2 className="chat-title">Chat</h2>

          <div className="chat-box">
            {messages.map((msg) => (
              <p
                key={msg.id}
                className={
                  msg.author === 'System' ? 'chat-message system' : 'chat-message user'
                }
              >
                <span className="chat-author">{msg.author}:</span> {msg.text}
              </p>
            ))}

            {/* Bottom marker for auto‑scroll */}
            <div ref={messagesEndRef} />
          </div>

          {/* Emote buttons bar */}
          <div className="emote-bar">
            {emotes.map((emote) => (
              <button
                key={emote}
                type="button"
                className="emote-button"
                onClick={() => handleEmoteClick(emote)}
              >
                {emote}
              </button>
            ))}
          </div>

          {/* Input + Send */}
          <form className="chat-input-row" onSubmit={handleSend}>
            <input
              className="chat-input"
              type="text"
              placeholder="Type a message and press Enter…"
              value={chatInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <button className="chat-send" type="submit">
              Send
            </button>
          </form>
        </aside>
      </div>
    </div>
  )
}

export default App
