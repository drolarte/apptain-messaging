import axios, { AxiosResponse } from "axios";

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    "Content-type": "application/json",
  },
});

const request = async (method: 'post' | 'patch', path: string, data: any): Promise<AxiosResponse> => {
  try {
    const response = await apiClient[method](path, data);
    return response;
  } catch (error) {
    console.error(`Error ${method.toUpperCase()} ${path}:`, error);
    throw error;
  }
};

const createUser = (user_id: string, nickname: string) => request('post', '/users', { user_id, nickname });

const createChannel = (channel_url: string, creator_user_id: string, chatmate_user_id: string) =>
  request('post', '/channels', { channel_url, creator_user_id, chatmate_user_id });

const updateUser = (user_id: string, nickname?: string, profile_url?: string) =>
  request('patch', '/users', { user_id, nickname, profile_url });
  
const updateMessageCount = (channel_url: string, message_count: number) =>
  request('patch', `/channels/${channel_url}`, { message_count });

const APIServices = {
  createUser,
  createChannel,
  updateUser,
  updateMessageCount
};

export default APIServices;
