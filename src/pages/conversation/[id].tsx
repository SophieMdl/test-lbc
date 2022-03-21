import React, { FC, useMemo } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { getConversationbyId } from "../../utils/messageApi";
import ConversationDetail from "../../components/ConversationDetail";
import { useQuery } from "react-query";
import { User } from "../../types/user";
import useConversations from "../../hooks/useConversations";

type ConversationPageProps = {
  users: User[];
};

const ConversationPage: FC<ConversationPageProps> = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { data: conversations } = useConversations();

  const { data: messages, isError } = useQuery([`conversation`, id], () =>
    getConversationbyId(id as string)
  );

  const conversation = useMemo(
    () =>
      conversations?.find((conversation) => conversation.id.toString() === id),
    [id]
  );

  const { senderNickname } = conversation || {};

  return (
    <>
      <Head>
        <title>{senderNickname}</title>
        <meta
          name="description"
          content={`Conversation with ${senderNickname}`}
        ></meta>
      </Head>
      <ConversationDetail
        senderName={senderNickname}
        conversationId={id}
        messages={messages}
        isConversation={!isError && Boolean(conversation)}
      />
    </>
  );
};

export default ConversationPage;
