import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createUser = async ({ user_id, nickname }: { user_id: string; nickname: string }) => {
  try {
    const result = await prisma.users.create({
      data: { user_id, nickname },
    });
    return result;
  } catch (error) {
    console.error(`Error creating user: ${(error as Error).message}`);
    throw new Error("Failed to create user");
  }
};

const createChannel = async ({ channel_url, creator_user_id, chatmate_user_id }: { channel_url: string; creator_user_id: string; chatmate_user_id: string }) => {
  try {
    const result = await prisma.channels.create({
      data: { channel_url, creator_user_id, chatmate_user_id },
    });
    return result;
  } catch (error) {
    console.error(`Error creating channel: ${(error as Error).message}`);
    throw new Error("Failed to create channel");
  }
};

const updateUser = async ({ user_id, nickname, profile_url }: { user_id: string; nickname?: string; profile_url?: string }) => {
  try {
    const result = await prisma.users.update({
      where: { user_id },
      data: { nickname, profile_url },
    });
    return result;
  } catch (error) {
    console.error(`Error updating user: ${(error as Error).message}`);
    throw new Error("Failed to update user");
  }
};

const updateMessageCount = async ({ channel_url, message_count }: { channel_url: string; message_count: number }) => {
  try {
    const result = await prisma.channels.update({
      where: { channel_url },
      data: { message_count },
    });
    return result;
  } catch (error) {
    console.error(`Error updating message count: ${(error as Error).message}`);
    throw new Error("Failed to update message count");
  }
};

export default { createUser, createChannel, updateUser, updateMessageCount };
