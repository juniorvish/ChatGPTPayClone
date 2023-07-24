```javascript
import React, { useEffect, useState } from 'react';
import ChatWindow from '../components/ChatWindow';
import PaymentForm from '../components/PaymentForm';
import BalanceDisplay from '../components/BalanceDisplay';
import TopUpForm from '../components/TopUpForm';
import { initiateChat } from '../utils/chatGPT';
import { topUpBalance } from '../utils/topup';
import { getBalance } from '../utils/balance';

export default function Home() {
  const [userId, setUserId] = useState(null);
  const [chatSessionId, setChatSessionId] = useState(null);
  const [userBalance, setUserBalance] = useState(0);

  useEffect(() => {
    // Initialize chat and set user ID and chat session ID
    const chatInit = async () => {
      const { userId, chatSessionId } = await initiateChat();
      setUserId(userId);
      setChatSessionId(chatSessionId);
    };

    // Fetch user balance
    const fetchBalance = async () => {
      const balance = await getBalance(userId);
      setUserBalance(balance);
    };

    chatInit();
    fetchBalance();
  }, []);

  const handleTopUp = async (amount) => {
    const newBalance = await topUpBalance(userId, amount);
    setUserBalance(newBalance);
  };

  return (
    <div>
      <h1>Welcome to ChatGPTPayClone</h1>
      <BalanceDisplay balance={userBalance} />
      <TopUpForm onTopUp={handleTopUp} />
      <ChatWindow userId={userId} chatSessionId={chatSessionId} />
      <PaymentForm userId={userId} />
    </div>
  );
}
```