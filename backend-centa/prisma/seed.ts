import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@centa.local";

  const existingAdmin = await prisma.user.findUnique({
    where: { email },
  });

  if (existingAdmin) {
    console.log("Super Admin sudah ada.");
    return;
  }

  const hashedPassword = await bcrypt.hash("SuperAdmin0895*#", 10);

  await prisma.user.create({
    data: {
      name: "Super Admin",
      email,
      password: hashedPassword,
      role: Role.SUPER_ADMIN,
    },
  });

  console.log("Super Admin berhasil dibuat.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });