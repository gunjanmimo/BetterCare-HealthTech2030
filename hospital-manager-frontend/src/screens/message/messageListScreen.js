import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./messageScreen.css"; // Importing the CSS

const MessageListScreen = () => {
  const navigate = useNavigate();

  const handleNavigation = (pagePath) => {
    console.log("Navigating to:", pagePath);
    return () => navigate(pagePath);
  };

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/messages/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setMessages(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, []);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     const fetchMessages = async () => {
  //       try {
  //         const response = await fetch("http://localhost:8000/api/messages/");
  //         if (!response.ok) {
  //           throw new Error("Network response was not ok");
  //         }
  //         const data = await response.json();
  //         setMessages(data);
  //       } catch (error) {
  //         setError(error.message);
  //       }
  //     };

  //     fetchMessages();
  //   }, 1000);

  //   return () => clearInterval(intervalId);
  // }, []);

  // useEffect(() => {
  //   const sampleMessages = [
  //     {
  //       id: 1,
  //       patientName: "David Johnson",
  //       timestamp: "2023-10-01T10:00:00Z",
  //       message:
  //         "Hello! I understand how incredibly hard this must be for you. Your loved one ...",
  //     },
  //     {
  //       id: 2,
  //       patientName: "Jane Smith",
  //       timestamp: "2023-10-02T11:30:00Z",
  //       message: "I am bit concern with Oxygen level of my mom?",
  //     },
  //     {
  //       id: 3,
  //       patientName: "Alice Johnson",
  //       timestamp: "2023-10-03T14:45:00Z",
  //       message: "I have a question about current body temperature of my dad?",
  //     },
  //   ];

  //   setMessages(sampleMessages);
  //   setIsLoading(false);
  // }, []);
  const messageListCard = (message) => {
    return (
      <div
        key={message.id}
        className="message-card"
        onClick={handleNavigation(`/conversation-screen/${message.patient_id}`)}
      >
        <div className="message-card-header">
          <h3>{message.patientName}</h3>
          <p>{new Date(message.timestamp).toLocaleString()}</p>
        </div>
        <p>{message.message}</p>
      </div>
    );
  };

  return (
    <div className="control-panel">
      <header className="control-panel-header">
        <h1>Request Updates</h1>
      </header>
      <div className="message-list-view">
        {isLoading ? (
          <p>Loading messages...</p>
        ) : error ? (
          <p>Error loading messages: {error}</p>
        ) : messages.length > 0 ? (
          messages.map((message) => messageListCard(message))
        ) : (
          <p>No messages available.</p>
        )}
      </div>
    </div>
  );
};

export { MessageListScreen };
