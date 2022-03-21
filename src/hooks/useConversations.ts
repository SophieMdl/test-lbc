import { useQuery } from "react-query";
import { getConversations } from "../utils/conversationApi";

const useConversations = () => useQuery("conversations", getConversations);

export default useConversations;
