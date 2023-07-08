import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const insertIntoPoll = async (data: Polls) => {
  if (!data?.code_challenge) {
    throw new Error("invalid data");
  }
  return prisma.polls.create({
    data: {
      ...data,
    },
  });
};

const getPollsWithCodeVerifier = async (data: { code_verifier: string }) => {
  const response = await prisma.polls.findUnique({
    where: {
      code_verifier: data?.code_verifier,
    },
  });
  return response;
};

const updatePolls = async (data: { code_challenge: string; token: Record<string,any> }) => {
  return prisma.polls.update({
    where: {
      code_challenge: data?.code_challenge,
    },
    data: {
      token: data?.token,
    },
  });
};
export { insertIntoPoll, getPollsWithCodeVerifier, updatePolls };
