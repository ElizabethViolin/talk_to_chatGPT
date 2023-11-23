import React from 'react';

const ChatDisplay = ({ chatHistory }) => {
  return (
    <div className="chat-display">
      {chatHistory.map((entry, index) => (
        <div key={index} className={`message ${entry.sender}`}>
          <strong>{entry.sender}: </strong><span>{entry.message}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatDisplay;
