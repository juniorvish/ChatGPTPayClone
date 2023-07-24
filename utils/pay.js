```javascript
import { SolanaPay } from 'solana-pay';

const pay = async (userId, amount) => {
  try {
    const solanaPay = new SolanaPay();
    const transaction = await solanaPay.createTransaction(userId, amount);
    const result = await solanaPay.executeTransaction(transaction);
    return result;
  } catch (error) {
    console.error('Payment error:', error);
    throw error;
  }
};

export default pay;
```