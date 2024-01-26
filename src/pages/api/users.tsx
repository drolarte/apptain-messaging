import type { NextApiRequest, NextApiResponse } from 'next';
import db from './database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let result;

    if (req.method === 'POST') {
      result = await db.createUser(req.body);
    } else if (req.method === 'PATCH') {
      result = await db.updateUser(req.body);
    } else {
      return res.status(200).json({ message: 'OK Response' });
    }

    if (result) {
      return res.status(200).json(result);
    }

    return res.status(500).json({ error: 'Operation failed. Unable to create/update user.' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
