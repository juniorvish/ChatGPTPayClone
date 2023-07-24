```javascript
import axios from 'axios';

// Function to initiate a new chat session
export const initiateChat = async (userId) => {
  try {
    const response = await axios.post('/api/chat', { userId });
    const { data } = response;
    if (data.success) {
      return data.chatSessionId;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Error initiating chat:', error);
    return null;
  }
};

// Function to send a message from the user to the chatbot
export const sendMessage = async (chatSessionId, message) => {
  try {
    const response = await axios.post('/api/chat', { chatSessionId, message });
    const { data } = response;
    if (data.success) {
      return data.message;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Error sending message:', error);
    return null;
  }
};

// Function to receive a message from the chatbot
export const receiveMessage = async (chatSessionId) => {
  try {
    const response = await axios.get(`/api/chat?chatSessionId=${chatSessionId}`);
    const { data } = response;
    if (data.success) {
      return data.message;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Error receiving message:', error);
    return null;
  }
};
```