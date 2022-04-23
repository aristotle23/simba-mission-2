const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient();

const main = async () => {
  const john = await Prisma.user.upsert({
    where: { email: "John Doe" },
    update: {},
    create: {
      name: "John Doe",
      email: "johndoe@mail.com",
      password: "password",
    },
  });
  const mary = await Prisma.user.upsert({
    where: { email: "marydoe@gmail.com" },
    update: {},
    create: {
      email: "marydoe@gmail.com",
      name: "Mary Doe",
      password: "password",
    },
  });
  console.log({ john, mary });
};
main()
  .catch((e) => {
    console.log(e);
    process.exit();
  })
  .finally(async (e) => {
    await Prisma.$disconnect();
  });
