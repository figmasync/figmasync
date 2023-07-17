import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUser = (id: string) => {
  return prisma.users?.findUnique({
    where: {
      provider_id: id
    },
  });
};
const insertUser = (data: { id: string; providerId: string,provider:string }) => {
  return prisma.users.create({
    data: {
      provider_id: data?.providerId,
      provider: data?.provider,
      id: data?.id,
    },
  });
};
export { getUser, insertUser };
