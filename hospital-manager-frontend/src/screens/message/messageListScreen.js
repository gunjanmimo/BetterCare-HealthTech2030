import React from "react";
import { useNavigate } from "react-router-dom";

import "./messageScreen.css"; // Importing the CSS

const MessageListScreen = () => {
  const navigate = useNavigate();

  const handleNavigation = (pagePath) => {
    return () => navigate(pagePath);
  };

  const sampleMessages = [
    {
      id: 1,
      patientName: "John Doe",
      message: "Patient is stable",
      timestamp: "2021-08-01T12:00:00Z",
    },
    {
      id: 2,
      patientName: "Jane Doe",
      message: "Patient needs oxygen support",
      timestamp: "2021-08-01T12:00:00Z",
    },
    {
      id: 3,
      patientName: "Alice",
      message: "Patient is critical",
      timestamp: "2021-08-01T12:00:00Z",
    },
    {
      id: 4,
      patientName: "Bob",
      message: "Patient is recovering",
      timestamp: "2021-08-01T12:00:00Z",
    },
    {
      id: 5,
      patientName: "Charlie",
      message: "Patient needs surgery",
      timestamp: "2021-08-01T12:00:00Z",
    },
    {
      id: 6,
      patientName: "David",
      message: "Patient is stable",
      timestamp: "2021-08-01T12:00:00Z",
    },
    {
      id: 7,
      patientName: "Eve",
      message: "Patient is in ICU",
      timestamp: "2021-08-01T12:00:00Z",
    },
    {
      id: 8,
      patientName: "Frank",
      message: "Patient is discharged",
      timestamp: "2021-08-01T12:00:00Z",
    },
    {
      id: 9,
      patientName: "Grace",
      message: "Patient needs medication",
      timestamp: "2021-08-01T12:00:00Z",
    },
    {
      id: 10,
      patientName: "Hank",
      message: "Patient is stable",
      timestamp: "2021-08-01T12:00:00Z",
    },
    {
      id: 11,
      patientName: "Ivy",
      message: "Patient is critical",
      timestamp: "2021-08-01T12:00:00Z",
    },
    {
      id: 12,
      patientName: "Jack",
      message: "Patient needs observation",
      timestamp: "2021-08-01T12:00:00Z",
    },
    {
      id: 13,
      patientName: "Kathy",
      message: "Patient is stable",
      timestamp: "2021-08-01T12:00:00Z",
    },
    {
      id: 14,
      patientName: "Leo",
      message: "Patient needs surgery",
      timestamp: "2021-08-01T12:00:00Z",
    },
    {
      id: 15,
      patientName: "Mona",
      message: "Patient is recovering",
      timestamp: "2021-08-01T12:00:00Z",
    },
    {
      id: 16,
      patientName: "Nina",
      message: "Patient is in ICU",
      timestamp: "2021-08-01T12:00:00Z",
    },
    {
      id: 17,
      patientName: "Oscar",
      message: "Patient is stable",
      timestamp: "2021-08-01T12:00:00Z",
    },
    {
      id: 18,
      patientName: "Paul",
      message: "Patient needs medication",
      timestamp: "2021-08-01T12:00:00Z",
    },
    {
      id: 19,
      patientName: "Quincy",
      message: "Patient is critical",
      timestamp: "2021-08-01T12:00:00Z",
    },
    {
      id: 20,
      patientName: "Rachel",
      message: "Patient is stable",
      timestamp: "2021-08-01T12:00:00Z",
    },
    {
      id: 21,
      patientName: "Sam",
      message: "Patient needs surgery",
      timestamp: "2021-08-01T12:00:00Z",
    },
    {
      id: 22,
      patientName: "Tina",
      message: "Patient is recovering",
      timestamp: "2021-08-01T12:00:00Z",
    },
    {
      id: 23,
      patientName: "Uma",
      message: "Patient is in ICU",
      timestamp: "2021-08-01T12:00:00Z",
    },
    {
      id: 24,
      patientName: "Victor",
      message: "Patient is stable",
      timestamp: "2021-08-01T12:00:00Z",
    },
    {
      id: 25,
      patientName: "Wendy",
      message: "Patient needs medication",
      timestamp: "2021-08-01T12:00:00Z",
    },
    {
      id: 26,
      patientName: "Xander",
      message: "Patient is critical",
      timestamp: "2021-08-01T12:00:00Z",
    },
    {
      id: 27,
      patientName: "Yara",
      message: "Patient is stable",
      timestamp: "2021-08-01T12:00:00Z",
    },
    {
      id: 28,
      patientName: "Zane",
      message: "Patient needs surgery",
      timestamp: "2021-08-01T12:00:00Z",
    },
    {
      id: 29,
      patientName: "Amy",
      message: "Patient is recovering",
      timestamp: "2021-08-01T12:00:00Z",
    },
    {
      id: 30,
      patientName: "Brian",
      message: "Patient is in ICU",
      timestamp: "2021-08-01T12:00:00Z",
    },
    {
      id: 31,
      patientName: "Cathy",
      message: "Patient is stable",
      timestamp: "2021-08-01T12:00:00Z",
    },
    {
      id: 32,
      patientName: "Derek",
      message: "Patient needs medication",
      timestamp: "2021-08-01T12:00:00Z",
    },
    {
      id: 33,
      patientName: "Ella",
      message: "Patient is critical",
      timestamp: "2021-08-01T12:00:00Z",
    },
  ];

  const messageListCard = (message) => {
    return (
      <div
        key={message.id}
        className="message-card"
        onClick={handleNavigation(`/conversation-screen/${message.id}`)}
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
        {sampleMessages.map((message) => messageListCard(message))}
      </div>
    </div>
  );
};

export { MessageListScreen };
