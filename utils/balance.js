```javascript
import axios from 'axios';

// Function to get the current balance of the user
export const getUserBalance = async (userId) => {
  try {
    const response = await axios.get(`/api/balance?userId=${userId}`);
    return response.data.userBalance;
  } catch (error) {
    console.error('Error fetching user balance:', error);
    return null;
  }
};

// Function to update the balance of the user
export const updateUserBalance = async (userId, newBalance) => {
  try {
    const response = await axios.post('/api/balance', {
      userId,
      userBalance: newBalance,
    });
    return response.data.success;
  } catch (error) {
    console.error('Error updating user balance:', error);
    return false;
  }
};
```