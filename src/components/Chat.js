import React, { useState } from 'react';
import './Chat.css';

const Chat = ({}) => {
  const [message, setMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [chats] = useState([
    { id: 1, user: "John Doe", message: "Hey, can you help me with my bike?" },
    { id: 2, user: "Jane Smith", message: "Sure, what seems to be the problem?" },
    { id: 3, user: "John Doe", message: "I think I have a flat tire." },
    { id: 4, user: "Jane Smith", message: "No worries, I can fix that for you." },
  ]);
  const [userConversations, setUserConversations] = useState({
    "John Doe": [
      { id: 1, user: "John Doe", message: "Hey, how's it going?", time: generateRandomTime() },
      { id: 2, user: "You", message: "Hey! Not bad, you?", time: generateRandomTime() },
      { id: 3, user: "John Doe", message: "Pretty good. By the way, did you watch the game last night?", time: generateRandomTime() }
    ],
    "Jane Smith": [
      { id: 1, user: "Jane Smith", message: "Hi there!", time: generateRandomTime() },
      { id: 2, user: "You", message: "Hey Jane! How are you?", time: generateRandomTime() },
      { id: 3, user: "Jane Smith", message: "I'm doing great, thanks for asking.", time: generateRandomTime() }
    ],
    "Alice Johnson": [
      { id: 1, user: "Alice Johnson", message: "Hello!", time: generateRandomTime() },
      { id: 2, user: "You", message: "Hi Alice! How's your day going?", time: generateRandomTime() },
      { id: 3, user: "Alice Johnson", message: "It's been busy, but good overall.", time: generateRandomTime() }
    ]
  });
  
  // Function to handle sending message
  const handleSendMessage = () => {
    if (message.trim() !== '') {
      const conversation = userConversations[selectedUser] || [];
      const newMessage = { id: conversation.length + 1, user: 'You', message, time: generateRandomTime() };
      setUserConversations({
        ...userConversations,
        [selectedUser]: [...conversation, newMessage],
      });
      setMessage('');
    }
  };

  // Function to generate random time
  function generateRandomTime() {
    const date = new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000); // Generate random date within the last 7 days
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`; // Format date as DD/MM/YYYY
    const hours = String(Math.floor(Math.random() * 12)).padStart(2, '0');
    const minutes = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    const ampm = Math.random() < 0.5 ? 'AM' : 'PM';
    return `${formattedDate} ${hours}:${minutes} ${ampm}`;
  }

  return (
    <div className="chat-container">
      <div className="user-selection">
        <h2><u>Users</u></h2>
        <div className="user-list">
          {/* Assuming you have a list of users */}
          {/* Replace the buttons with your actual user selection mechanism */}
          <div className='user-name'>
            <button className={selectedUser === "John Doe" ? 'active' : ''} onClick={() => setSelectedUser("John Doe")}> <i className="fa fa-user-circle " aria-hidden="true"></i> &nbsp;John Doe</button>
          </div>
          <div className='user-name'>
          <button className={selectedUser === "Jane Smith" ? 'active' : ''} onClick={() => setSelectedUser("Jane Smith")}><i className="fa fa-user-circle " aria-hidden="true"></i>&nbsp;Jane Smith</button>
          </div>
          <div className='user-name'>
          <button className={selectedUser === "Alice Johnson" ? 'active' : ''} onClick={() => setSelectedUser("Alice Johnson")}><i className="fa fa-user-circle " aria-hidden="true"></i>&nbsp;Alice Johnson</button>
          </div>
        </div>
      </div>
      <div className="conversation">
        <h2>Conversation with {selectedUser || '...'}</h2>
        <div className="message-container">
          {/* Render conversation messages */}
          {userConversations[selectedUser] && userConversations[selectedUser].map(message => (
            <div key={message.id} className={`chat ${message.user === 'You' ? 'sent' : 'received'}`}>
              <div>{message.message}</div>
              <div className="time">{message.time}</div>
            </div>
          ))}
        </div>
        <div className="bottom-bar">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <button  onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
