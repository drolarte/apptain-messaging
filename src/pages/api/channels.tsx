import { NextApiRequest, NextApiResponse } from "next";
import db from "./database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    let result;

    if (req.method === "POST") {
      result = await db.createChannel(req.body);
    } else if (req.method === "PATCH") {
      result = await db.updateMessageCount({
        channel_url: req.query.channel_url as string,
        message_count: req.body.message_count,
      });
      
    } else {
      return res.status(200).json({message: "Ok"});
    }

    res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: "failed to load data" });
  }
}
