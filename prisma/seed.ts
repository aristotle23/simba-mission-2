import { PrismaClient } from "@prisma/client";

import { hashPassword } from "../helpers/auth";

const Prisma = new PrismaClient();

const main = async () => {
  await Prisma.user.upsert({
    where: { email: "John Doe" },
    update: {
      name: "John Doe",
      email: "johndoe@mail.com",
      username: "johndoe",
      password: await hashPassword("password"),
    },
    create: {
      name: "John Doe",
      email: "johndoe@mail.com",
      username: "johndoe",
      password: await hashPassword("password"),
      event_types: {
        create: [
          {
            title: "John Doe Default Event Type",
            description: "John Doe default event type for his account",
            duration: 8,
          },
        ],
      },
    },
  });
  await Prisma.user.upsert({
    where: { email: "marydoe@gmail.com" },
    update: {
      email: "marydoe@gmail.com",
      name: "Mary Doe",
      username: "marydoe",
      password: await hashPassword("password"),
    },
    create: {
      email: "marydoe@gmail.com",
      name: "Mary Doe",
      username: "marydoe",
      password: await hashPassword("password"),
      event_types: {
        create: [
          {
            title: "Mary Doe Default Event Type",
            description: "Mary Doe default event type for her account",
            duration: 8,
          },
        ],
      },
    },
  });
};
main()
  .catch(() => {
    process.exit();
  })
  .finally(async () => {
    await Prisma.$disconnect();
  });
