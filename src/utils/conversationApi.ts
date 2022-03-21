import axios from "axios";
import { getLoggedUserId } from "./getLoggedUserId";
import { Conversation } from "../types/conversation";

const API_URL = "http://localhost:3005";

export const getConversations = async (): Promise<Conversation[]> => {
  const userId = getLoggedUserId();

  return await axios
    .get(`${API_URL}/conversations?senderId=${userId}`)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
      return Promise.reject();
    });
};
