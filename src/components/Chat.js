import React, { useState, useEffect } from "react";
import "./Chat.css";

const Chat = ({ repairRequests, ProUser }) => {
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [SelectedCustomer, setSelectedCustomer] = useState(null);
  const [userConversations, setUserConversations] = useState({});
  const [showEmojiKeyboard, setShowEmojiKeyboard] = useState(false); 
  useEffect(() => {
    const fetchConversations = async () => {
      if (SelectedCustomer) {
        try {
          console.log(ProUser);
          const response = await fetch(
            `https://quicklocalfixapi.pythonanywhere.com//fetch-messages/?customer_id=${SelectedCustomer.id}&repair_person_id=${ProUser.ProUser.user_name}`
          );
          const data = await response.json();
          setUserConversations(data);
          console.log(data);
        } catch (error) {
          console.error("Error fetching conversations:", error);
        }
      }
    };
    fetchConversations();
  }, [SelectedCustomer]);
  const handleSelectEmoji = (emoji) => {
    setMessage(message + emoji);
  };
  useEffect(() => {
    const fetchConversationsPeriodically = () => {
      if (SelectedCustomer && ProUser) {
        const intervalId = setInterval(() => {
          fetch(`https://quicklocalfixapi.pythonanywhere.com//fetch-messages/?customer_id=${SelectedCustomer.id}&repair_person_id=${ProUser.ProUser.user_name}`)
            .then(response => {
              if (!response.ok) {
                throw new Error('Failed to fetch conversation');
              }
              return response.json();
            })
            .then(data => {
              setUserConversations(data);
              console.log(data);
            })
            .catch(error => {
              console.error('Error fetching conversation:', error);
            });
        }, 3000);
        return () => clearInterval(intervalId);
      }
    };
    const intervalId = fetchConversationsPeriodically();
    return () => clearInterval(intervalId);

  }, [SelectedCustomer, ProUser]);


  
  useEffect(() => {
    const fetchUserId = async () => {
      if (selectedUser) {
        try {
          const response = await fetch(
            `https://quicklocalfixapi.pythonanywhere.com//get_user_by_name/?user_name=${selectedUser}`
          );
          const data = await response.json();
          if (data.status === "200") {
            setSelectedCustomer(data.customer);
          } else {
            console.error("Error fetching user ID:", data.error);
          }
        } catch (error) {
          console.error("Error fetching user ID:", error);
        }
      }
    };
    fetchUserId();
  }, [selectedUser]);

  useEffect(() => {
    if (repairRequests) {
      // Filter repair requests based on status
      const filteredRequests = repairRequests.filter(request => request.status !== "Completed" && request.status !== "Cancelled");
      // Extract unique customer IDs from filtered repair requests
      const uniqueCustomerIds = Array.from(new Set(filteredRequests.map(request => request.customer_id)));
      setUsers(uniqueCustomerIds);
    } else {
      setUsers([]);
    }
  }, [repairRequests]);
  

  const sendMessage = async (input_message) => {
    try {
      const message = { customer_id: SelectedCustomer.id, repair_person_id: ProUser.ProUser.user_name, text: input_message, way_of_msg: "p2u" }
      const response = await fetch(`https://quicklocalfixapi.pythonanywhere.com//send-message/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message), // Send the edited request data
      });
      const data = await response.json();
      fetch(`https://quicklocalfixapi.pythonanywhere.com//fetch-messages/?customer_id=${SelectedCustomer.id}&repair_person_id=${ProUser.ProUser.user_name}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch conversation');
          }
          return response.json();
        })
        .then(data => {
          setUserConversations(data);
          console.log(data);
        })
        .catch(error => {
          console.error('Error fetching conversation:', error);
        });
      console.log('message sent successfully:', data);
    } catch (error) {
      console.error('Error updating request:', error);
    }
  };

  // Function to handle sending message
  const handleSendMessage = () => {
    if (message.trim() !== "") {
      sendMessage(message);
    };
    setMessage("");
  };


  return (
    <div className="chat-container">
      <div className="user-selection">
        <h2>
          <u>Users</u>
        </h2>
        <div className="user-list">
          {/* Render user cards */}
          {users &&
            users.map((user) => (
              <div className="user-name" key={user}>
                <button
                  className={selectedUser === user ? "active" : ""}
                  onClick={() => setSelectedUser(user)}
                >
                  <i className="fa fa-user-circle " aria-hidden="true"></i>{" "}
                  &nbsp;{user}
                </button>
              </div>
            ))}
        </div>
      </div>

      <div className="conversation">
      <h2> {selectedUser ? "Conversation with " + selectedUser : "Select a user to start conversation"}</h2>

        <div className="message-container">
          {/* Render conversation messages */}
          {selectedUser && userConversations && userConversations.length > 0 ? (
            userConversations.map((message) => (
              <div
                key={message.id}
                className={`chat ${message.way_of_msg === "p2u" ? "sent" : "received"
                  }`}
              >
                <div>{message.text}</div>
                <div className="time">{message.time}</div>
              </div>
            ))
          ) : (
            selectedUser && (
              <div className="no-messages">No messages found. Start a conversation!</div>
            )
          )}
           {showEmojiKeyboard && (
          <div className="emoji-keyboard">
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
        {selectedUser && (<div className="bottom-bar">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={() => setShowEmojiKeyboard(!showEmojiKeyboard)}style={{backgroundColor:'white',padding:'0px', fontSize:'25px'}}>😊</button> {/* Button to toggle EmojiKeyboard */}
          <button onClick={handleSendMessage}>Send</button>
          
        </div>)}
       
      </div>
    </div>
  );
};

export default Chat;
