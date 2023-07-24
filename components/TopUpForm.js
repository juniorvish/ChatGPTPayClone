```jsx
import React, { useState } from 'react';
import { topUpBalance } from '../utils/topup';

const TopUpForm = () => {
  const [amount, setAmount] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await topUpBalance(amount);
    if (response.success) {
      setAmount('');
      alert(`Successfully topped up ${amount} USDC`);
    } else {
      alert('Failed to top up. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="topUpAmount">
        Top Up Amount (USDC):
        <input
          type="number"
          id="topUpAmount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </label>
      <button type="submit">Top Up</button>
    </form>
  );
};

export default TopUpForm;
```