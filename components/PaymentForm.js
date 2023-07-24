```jsx
import React, { useState } from 'react';
import { pay } from '../utils/pay';

const PaymentForm = () => {
  const [amount, setAmount] = useState('');

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    const response = await pay(amount);
    if (response.success) {
      alert('Payment successful!');
    } else {
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handlePaymentSubmit}>
      <label htmlFor="paymentAmount">Amount:</label>
      <input
        type="number"
        id="paymentAmount"
        name="paymentAmount"
        value={amount}
        onChange={handleAmountChange}
        required
      />
      <button type="submit">Pay</button>
    </form>
  );
};

export default PaymentForm;
```