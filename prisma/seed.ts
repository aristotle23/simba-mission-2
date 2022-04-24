import { PrismaClient } from "@prisma/client";

import { hashPassword } from "../helpers/auth";

const Prisma = new PrismaClient();

const main = async () => {
  const john = await Prisma.user.upsert({
    where: { email: "John Doe" },
    update: {},
    create: {
      name: "John Doe",
      email: "johndoe@mail.com",
      password: await hashPassword("password"),
    },
  });
  const mary = await Prisma.user.upsert({
    where: { email: "marydoe@gmail.com" },
    update: {},
    create: {
      email: "marydoe@gmail.com",
      name: "Mary Doe",
      password: await hashPassword("password"),
    },
  });
  console.log({ john, mary });
};
main()
  .catch((e) => {
    console.log(e);
    process.exit();
  })
  .finally(async () => {
    await Prisma.$disconnect();
  });
