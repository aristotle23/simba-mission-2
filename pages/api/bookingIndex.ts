import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@helpers/prisma";

export default async function bookingIndex(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(404).json("Can't requested url on server");
  }
  const { userId } = req.query;
  console.log(userId);

  const meetings = await prisma.events.findMany({
    where: {
      userId: parseInt(userId),
    },
    select: {
      dateTime: true,
      eventType: {
        select: {
          title: true,
          description: true,
          duration: true,
        },
      },
      attendee: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
  return res.json(meetings);
}
