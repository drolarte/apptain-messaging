import { NextApiRequest, NextApiResponse } from "next";
import db from "./database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === "POST") {
      const result = await db.createChannel(req.body);
      return res.status(200).json(result);
    }

    return res.status(200).json({ message: "Ok" });
  } catch (err) {
    return res.status(500).json({ error: "failed to load data" });
  }
}
