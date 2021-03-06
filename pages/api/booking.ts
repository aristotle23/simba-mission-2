import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@helpers/prisma";

export default async function booking(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(404).json({ message: "Can't request url on server" });
  }
  const data = req.body;
  const dateTime = new Date(data.dateTime);

  const event = await prisma.events.create({
    data: {
      dateTime,
      user: {
        connect: {
          username: data.username,
        },
      },
      eventType: {
        connect: {
          id: data.meetingId,
        },
      },
      attendee: {
        create: {
          name: data.name,
          email: data.email,
        },
      },
    },
    include: {
      attendee: true,
    },
  });

  return res.json({ event });
}
