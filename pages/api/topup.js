import { topUpBalance } from '../../utils/topup';
import { UserSchema } from '../../utils/user';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, amount } = req.body;

    try {
      const user = await UserSchema.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const newBalance = topUpBalance(user.userBalance, amount);
      user.userBalance = newBalance;
      await user.save();

      return res.status(200).json({ userBalance: newBalance });
    } catch (error) {
      return res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}