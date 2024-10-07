import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./conversationScreen.css";

const ConversationScreen = () => {
  const { patient_id } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/messages/${patient_id}`
        );
        const data = await response.json();
        // Ensure the data is an array
        if (Array.isArray(data)) {
          setMessages(data);
        } else {
          console.error("Data fetched is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 1000); // Refresh every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, [patient_id]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const newMessageData = {
        id: messages.length + 1,
        sender_name: "You",
        message: newMessage,
        timestamp: new Date().toISOString(),
      };
      setMessages([...messages, newMessageData]);
      setNewMessage(""); // Clear input after sending
    }
  };

  return (
    <div className="conversation-container">
      <div className="conversation-header">
        <h2>Chat with David's Family</h2>
      </div>

      <div className="message-list">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message.id}
              className={`message-item ${
                message.sender_name === "AI Interpreter" ||
                message.sender_name === "You"
                  ? "sent"
                  : "received"
              }`}
            >
              <div className="message-content">
                <p>
                  <strong>{message.sender_name}:</strong> {message.message}
                </p>
                <span className="message-timestamp">
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>No messages yet.</p>
        )}
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
