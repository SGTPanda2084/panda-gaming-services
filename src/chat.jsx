// Chat.jsx

import React, { useEffect, useState } from "react";
import { getChatCredentials } from "./chat/getChatCredentials";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [ws, setWs] = useState(null);

  useEffect(() => {
    let socket;

    async function connect() {
      try {
        const { endpoint, token } = await getChatCredentials();
        if (!endpoint || !token) throw new Error("Missing chat credentials");

        // Connect to IVS Chat WebSocket
        socket = new WebSocket(endpoint, token);

        // Receive messages from the room
        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);

          // Message payloads have Type === "MESSAGE"
          if (data.Type === "MESSAGE") {
            setMessages((prev) => [...prev, data]);
          }
        };

        socket.onerror = (err) => {
          console.error("Chat WebSocket error", err);
        };

        socket.onclose = (evt) => {
          console.log("Chat WebSocket closed", evt.code, evt.reason);
        };

        setWs(socket);
      } catch (e) {
        console.error("Failed to connect chat", e);
      }
    }

    connect();

    return () => {
      if (socket) socket.close();
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!ws || ws.readyState !== WebSocket.OPEN || !input.trim()) return;

    // IVS SendMessage (Publish) format
    // { "Action": "SEND_MESSAGE", "Content": "text", "Attributes": { ... } }
    ws.send(
      JSON.stringify({
        Action: "SEND_MESSAGE",
        Content: input.trim()
      })
    );

    // Clear input after sending
    setInput("");
  };

  return (
    <>
      <div className="chat-box">
        {messages.map((m, i) => (
          <p key={i} className="chat-message user">
            <span className="chat-author">
              {m.Sender?.Attributes?.username || m.Sender?.UserId}:
            </span>{" "}
            {m.Content}
          </p>
        ))}
      </div>

      <form className="chat-input-row" onSubmit={sendMessage}>
        <input
          className="chat-input"
          type="text"
          placeholder="Type your message…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="chat-send" type="submit">
          Send
        </button>
      </form>
    </>
  );
}

export default Chat;
