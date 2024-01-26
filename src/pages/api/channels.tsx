import { NextApiRequest, NextApiResponse } from 'next';
import db from './database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method, body, query } = req;

    if (method === 'POST') {
      const result = await db.createChannel(body);
      return res.status(200).json(result);
    }

    if (method === 'PATCH') {
      const { channel_url, message_count } = query;
      const result = await db.updateMessageCount({
        channel_url: channel_url as string,
        message_count: parseInt(message_count as string, 10),
      });
      return res.status(200).json(result);
    }

    return res.status(200).json({ message: "Response Ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to load data' });
  }
}
