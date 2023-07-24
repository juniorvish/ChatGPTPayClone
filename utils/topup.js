```javascript
import { SolanaPay } from 'solana-pay';

export const topUpBalance = async (userId, amount) => {
  try {
    // Initialize Solana Pay
    const solanaPay = new SolanaPay();

    // Top up user balance
    const transaction = await solanaPay.topUp(userId, amount);

    // Check if transaction was successful
    if (transaction.status === 'success') {
      return {
        status: 'success',
        message: 'Balance topped up successfully',
        balance: transaction.newBalance
      };
    } else {
      throw new Error('Transaction failed');
    }
  } catch (error) {
    return {
      status: 'error',
      message: error.message
    };
  }
};
```