import React, { useState } from "react";
import { useParams } from "react-router-dom";

import "./conversationScreen.css";

const ConversationScreen = () => {
  const { id } = useParams();

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "John",
      content:
        "Hi, I want to know about my patient status.\
        What is the current condition of my loved one?\
        How serious is their situation?\
        Are they stable, improving, or declining?\
        Can you explain what’s happening in terms we can understand?",
      timestamp: "10:30 AM",
    },

    {
      id: 3,
      sender: "You",
      content:
        "Your loved one is in critical condition. Their blood pressure is unstable, and we’re managing their breathing with a ventilator. Blood counts and other vitals are being monitored closely. We’re doing everything we can, but there’s no guarantee of improvement. We’ll inform you of any major changes, but right now, it’s a waiting game, and asking for constant updates won’t change the outcome. Please prepare for any possibility.",
      timestamp: "10:35 AM",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const newMessageData = {
        id: messages.length + 1,
        sender: "You",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMessageData]);
      setNewMessage(""); // Clear input after sending
    }
  };

  return (
    <div className="conversation-container">
      <div className="conversation-header">
        <h2>Chat with John</h2>
      </div>

      <div className="message-list">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message-item ${
              message.sender === "You" ? "sent" : "received"
            }`}
          >
            <div className="message-content">
              <p>{message.content}</p>
              <span className="message-timestamp">{message.timestamp}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="message-input-area">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export { ConversationScreen };
