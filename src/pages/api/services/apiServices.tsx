import axios, { AxiosResponse, AxiosError } from "axios";
import { generateToken, verifyToken } from '../utility/jwt';


const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    "Content-type": "application/json",
  },
});

const setAuthHeader = (token: string) => {
  apiClient.defaults.headers.Authorization = `Bearer ${token}`;
};

const removeAuthHeader = () => {
  delete apiClient.defaults.headers.Authorization;
};

const handleRequestError = (method: string, path: string, error: AxiosError) => {
  if (axios.isAxiosError(error)) {
    const response = error.response;

    if (response) {
      console.error(`Error ${method.toUpperCase()} ${path}. Status Code: ${response.status}, Data:`, response.data);

      if (response.status === 404) {
        console.error('Resource not found.');
      } else if (response.status === 500) {
        console.error('Internal server error.');
      }
    } else {
      console.error(`Error ${method.toUpperCase()} ${path}. No response received.`, error.message);
    }
  } else {
    console.error(`Error ${method.toUpperCase()} ${path}:`, error);
  }
};

const request = async (method: 'post' | 'patch', path: string, data: any, token?: string ): Promise<AxiosResponse> => {
  if (token) {
    setAuthHeader(token);
  }

  try {
    const response = await apiClient[method](path, data);
    return response;
  } catch (error) {
    handleRequestError(method, path, error as AxiosError);
    throw error;
  } finally {
    removeAuthHeader();
  }
};

const createUser = async (user_id: string, nickname: string) => {
  try {
    const response = await request('post', '/users', { user_id, nickname });
    const token = generateToken({ userId: response.data.user_id });
    console.log('Create user successful. Response:', response.data);
    return { response, token };
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

const createChannel = async (channel_url: string, creator_user_id: string, chatmate_user_id: string) => {
  try {
    const response = await request('post', '/channels', { channel_url, creator_user_id, chatmate_user_id });
    console.log('Create channel successful. Response:', response.data);
    return response;
  } catch (error) {
    console.error('Error creating channel:', error);
    throw error;
  }
};

const updateUser = async (user_id: string, nickname?: string, profile_url?: string) => {
  try {
    const response = await request('patch', '/users', { user_id, nickname, profile_url });
    console.log('Update user successful. Response:', response.data);
    return response;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

const updateMessageCount = async (channel_url: string, message_count: number) => {
  try {
    const encodedChannelUrl = encodeURIComponent(channel_url);
    console.log('Updating message count. Encoded Channel URL:', encodedChannelUrl, 'Message Count:', message_count);

    const response = await request('patch', `/channels?channel_url=${encodedChannelUrl}&message_count=${message_count}`, {});

    console.log('Update successful. Response:', response.data);
    return response;
  } catch (error) {
    console.error('Error updating message count:', error);
    throw error;
  }
};

const login = async (user_id: string, nickname: string) => {
  try {
    const response = await request('post', '/auth/login', { user_id, nickname });
    const token = generateToken({ userId: response.data.user_id });
    console.log('Login successful. Response:', response.data);
    return { response, token };
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

const APIServices = {
  login,
  createUser,
  createChannel,
  updateUser,
  updateMessageCount
};

export default APIServices;
