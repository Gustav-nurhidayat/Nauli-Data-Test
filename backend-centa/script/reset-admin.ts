import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("SuperAdmin0895*#", 10);

  await prisma.user.update({
    where: {
      email: "admin@centa.local",
    },
    data: {
      password,
    },
  });

  console.log("Password berhasil direset.");
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });
