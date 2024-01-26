import { NextApiRequest, NextApiResponse } from 'next';
import db from './database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      const result = await db.createChannel(req.body);

      if (result) {
        return res.status(200).json(result);
      } else {
        return res.status(500).json({ error: 'Failed to create channel' });
      }
    }

    return res.status(200).json({ message: 'Ok' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
