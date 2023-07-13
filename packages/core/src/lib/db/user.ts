import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUser = (id: string) => {
  return prisma.users?.findUnique({
    where: {
      id: id,
    },
  });
};
const insertUser = (data: { id: string; githubUserId: string }) => {
  return prisma.users.create({
    data: {
      github_user_id: data?.githubUserId,
      id: data?.id,
    },
  });
};
export { getUser, insertUser };
