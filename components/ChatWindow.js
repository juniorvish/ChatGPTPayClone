```jsx
import React, { useState, useEffect } from 'react';
import { initiateChat, sendMessage, receiveMessage } from '../utils/chatGPT';
import styles from '../styles/ChatWindow.module.css';

const ChatWindow = ({ userId }) => {
  const [chatSessionId, setChatSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    initiateChat(userId).then(sessionId => {
      setChatSessionId(sessionId);
    });
  }, [userId]);

  useEffect(() => {
    if (chatSessionId) {
      receiveMessage(chatSessionId).then(message => {
        setMessages(prevMessages => [...prevMessages, message]);
      });
    }
  }, [chatSessionId]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(chatSessionId, input).then(message => {
      setMessages(prevMessages => [...prevMessages, message]);
      setInput('');
    });
  };

  return (
    <div id="chatWindow" className={styles.chatWindow}>
      <div className={styles.messages}>
        {messages.map((message, index) => (
          <div key={index} className={styles.message}>
            {message}
          </div>
        ))}
      </div>
      <div className={styles.inputArea}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className={styles.input}
        />
        <button onClick={handleSendMessage} className={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
```