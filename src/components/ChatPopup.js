import React, { useState, useEffect } from 'react';
import './ChatPopup.css';

const ChatPopup = ({ professionalName, conversation, onClose, sendMessage }) => {
    const [inputValue, setInputValue] = useState('');
    const [showEmojiKeyboard, setShowEmojiKeyboard] = useState(false); 
    const handleSendMessage = () => {
      // Call sendMessage function with professionalName and inputValue
      sendMessage(professionalName, inputValue);
      // Clear the input field after sending the message
      setInputValue('');
    };
    const handleSelectEmoji = (emoji) => {
      setInputValue(inputValue + emoji);
    };
    
  return (
    <div className="user-account-popup">
    <div className="user-account-header">
      <span>Chat with {professionalName}</span>
      <button className="user-account-close-btn" onClick={onClose}>
        <i className="fa fa-times" aria-hidden="true"></i> Close
      </button>
    </div>
    <div className="user-account-conversation">
      {/* Render conversation messages here */}
      {conversation.length > 0 ? (
        conversation.map((message, index) => (
          <div
            key={index}
            className={`user-account-message ${
              message.way_of_msg === "u2p" ? "sent" : "received"
            }`}
          >
            <div className="user-account-message-content">{message.text}</div>
            <div className="user-account-message-time">
              {new Date(message.time).toLocaleString()}
            </div>
          </div>
        ))
      ) : (
        <div className="no-messages">No messages found. Start a conversation!</div>
      )}
       {showEmojiKeyboard && (
          <div className="user-emoji-keyboard">
            {/* EmojiKeyboard component */}
            <span onClick={() => handleSelectEmoji("😊")}>😊</span>
            <span onClick={() => handleSelectEmoji("😂")}>😂</span>
            <span onClick={() => handleSelectEmoji("😍")}>😍</span>
            <span onClick={() => handleSelectEmoji("😎")}>😎</span>
            <span onClick={() => handleSelectEmoji("👍")}>👍</span>
            <span onClick={() => handleSelectEmoji("👌")}>👌</span>
            <span onClick={() => handleSelectEmoji("❤️")}>❤️</span>
            <span onClick={() => handleSelectEmoji("🎉")}>🎉</span>
            <span onClick={() => handleSelectEmoji("😘")}>😘</span>
            <span onClick={() => handleSelectEmoji("😜")}>😜</span>
            <span onClick={() => handleSelectEmoji("😇")}>😇</span>
            <span onClick={() => handleSelectEmoji("🤣")}>🤣</span>
            <span onClick={() => handleSelectEmoji("😁")}>😁</span>
            <span onClick={() => handleSelectEmoji("😋")}>😋</span>
            <span onClick={() => handleSelectEmoji("😌")}>😌</span>
            {/* Add more emojis as needed */}
          </div>
        )}
    </div>
    <div className="user-account-input-area">
      <input
        type="text"
        placeholder="Type your message..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={() => setShowEmojiKeyboard(!showEmojiKeyboard)} style={{backgroundColor:'white',padding:'0px', fontSize:'20px'}}>😊</button> {/* Button to toggle EmojiKeyboard */}
      <button className="user-account-send-btn" onClick={handleSendMessage}>

        <i className="fa fa-paper-plane" aria-hidden="true"></i> Send
      </button>
    </div>
  </div>
  
  );
};

export default ChatPopup;
