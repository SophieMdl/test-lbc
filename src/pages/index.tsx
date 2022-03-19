import type { FC } from "react";
import { Conversation } from "../types/conversation";
import Head from "next/head";
import { getConversations } from "../utils/getConversations";
import ConversationsList from "../components/ConversationsList";

type ConversationListProps = {
  conversations: Conversation[];
  isError: boolean;
};

const Home: FC<ConversationListProps> = ({ conversations, isError }) => {
  return (
    <>
      <Head>
        <title>Conversation list</title>
        <meta name="description" content="Conversation list"></meta>
      </Head>
      {isError ? (
        <div className="notification is-danger is-light">
          Error when loading messages
        </div>
      ) : (
        <ConversationsList conversations={conversations} />
      )}
    </>
  );
};

export const getServerSideProps = async () => {
  const data = await getConversations();

  return {
    props: data,
  };
};

export default Home;
