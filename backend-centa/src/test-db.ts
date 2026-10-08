import prisma from "./config/database";

async function test() {
  await prisma.$connect();

  console.log("Database Connected..");

  await prisma.$disconnect();
}

test();
