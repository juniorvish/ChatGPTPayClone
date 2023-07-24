import { getSession } from 'next-auth/client';
import { connectToDatabase } from '../../utils/db';

export default async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: 'Not authenticated' });
    return;
  }

  const { db } = await connectToDatabase();

  const user = await db.collection('users').findOne({ email: session.user.email });

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  res.status(200).json({ balance: user.balance });
};