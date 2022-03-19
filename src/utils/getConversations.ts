import { getLoggedUserId } from "./getLoggedUserId";
import axios from "axios";

export const getConversations = async () => {
  const userId = getLoggedUserId();
  return await axios
    .get(`${process.env.API_URL}/conversations?senderId=${userId}`)
    .then((res) => ({
      isError: false,
      conversations: res.data,
    }))
    .catch(() => ({
      isError: true,
      conversations: null,
    }));
};
