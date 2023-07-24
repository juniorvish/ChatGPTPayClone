```javascript
import { getSession } from 'next-auth/client';
import { connectToDatabase } from '../../utils/db';
import { initiateChat, sendMessage } from '../../utils/chatGPT';

export default async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ message: 'Not authenticated' });
    return;
  }

  let client;
  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' });
    return;
  }

  if (req.method === 'POST') {
    const { message } = req.body;
    const userId = session.user.id;

    const userCollection = client.db().collection('users');
    const user = await userCollection.findOne({ userId: userId });

    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    if (user.userBalance <= 0) {
      res.status(403).json({ message: 'Insufficient balance.' });
      return;
    }

    let chatSessionId = user.chatSessionId;
    if (!chatSessionId) {
      chatSessionId = await initiateChat();
      await userCollection.updateOne({ userId: userId }, { $set: { chatSessionId: chatSessionId } });
    }

    const chatResponse = await sendMessage(chatSessionId, message);
    await userCollection.updateOne({ userId: userId }, { $inc: { userBalance: -1 } });

    res.status(200).json({ message: chatResponse });
  }
};
```