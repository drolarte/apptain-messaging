import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createUser = async ({ user_id, nickname }: { user_id: string; nickname: string }) =>
  prisma.users.create({
    data: { user_id, nickname },
  });

const createChannel = async ({ channel_url, creator_user_id, chatmate_user_id }: { channel_url: string; creator_user_id: string; chatmate_user_id: string }) =>
  prisma.channels.create({
    data: { channel_url, creator_user_id, chatmate_user_id },
  });

const updateUser = async ({ user_id, nickname, profile_url }: { user_id: string; nickname?: string; profile_url?: string }) =>
  prisma.users.update({
    where: { user_id },
    data: { nickname, profile_url },
  });

export default { createUser, createChannel, updateUser };
