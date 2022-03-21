import type { FC } from "react";
import { Conversation } from "../types/conversation";
import Head from "next/head";
import ConversationsList from "../components/ConversationsList";
import Error from "../components/Error";
import useConversations from "../hooks/useConversations";

type ConversationListProps = {
  conversations: Conversation[];
  isError: boolean;
};

const Home: FC<ConversationListProps> = () => {
  const { data: conversations, isError, isLoading } = useConversations();

  if (isLoading) {
    return <span>Is loading...</span>;
  }

  return (
    <>
      <Head>
        <title>Conversation list</title>
        <meta name="description" content="Conversation list"></meta>
      </Head>
      {isError ? (
        <Error text="Error when loading conversations" />
      ) : (
        <ConversationsList conversations={conversations} />
      )}
    </>
  );
};

export default Home;
