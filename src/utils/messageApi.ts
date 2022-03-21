import axios from "axios";
import { Message } from "../types/message";

const API_URL = "http://localhost:3005";

export type Body = {
  timestamp: number;
  body: string;
  authorId: number;
};

export const getConversationbyId = async (id: string): Promise<Message[]> => {
  return axios
    .get(`${API_URL}/messages?conversationId=${id}`)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
      return Promise.reject();
    });
};

export const postMessage = async (
  body: Body,
  conversationId: string
): Promise<{ data: Message }> => {
  return await axios
    .post(`${API_URL}/messages/${conversationId}`, body)
    .then((res) => res)
    .catch((error) => {
      console.log(error);
      return Promise.reject();
    });
};

export const deleteMessage = async (messageId: number): Promise<unknown> => {
  return await axios
    .delete(`${API_URL}/message/${messageId}`)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
      return Promise.reject();
    });
};
