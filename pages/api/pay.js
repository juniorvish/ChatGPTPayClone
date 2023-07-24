```javascript
import { SolanaPay } from 'solana-pay';
import { UserSchema } from '../../utils/userSchema';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, amount } = req.body;

    try {
      const user = await UserSchema.findOne({ userId });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const solanaPay = new SolanaPay();
      const transaction = await solanaPay.pay(userId, amount);

      if (transaction.success) {
        user.userBalance += amount;
        await user.save();

        return res.status(200).json({ success: true, balance: user.userBalance });
      } else {
        return res.status(400).json({ error: 'Payment failed' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
```