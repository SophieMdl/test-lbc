import React, { FC, useState } from "react";
import classnames from "classnames";
import Link from "next/link";
import { getUnixTime } from "date-fns";
import styles from "../styles/ConversationDetail.module.scss";
import { useMutation, useQueryClient } from "react-query";
import { Message } from "../types/message";
import { formatTimestamp, getHour } from "./helpers";
import { getLoggedUserId } from "../utils/getLoggedUserId";
import { postMessage, Body, deleteMessage } from "../utils/messageApi";
import Error from "./Error";

const preciseDate = (
  lastMessageTimestamp: number
): string => `${formatTimestamp(lastMessageTimestamp)} at 
${getHour(lastMessageTimestamp)}`;

type ConversationDetailProps = {
  messages: Message[];
  conversationId: string;
  senderName: string;
  isConversation: boolean;
};

const ConversationDetail: FC<ConversationDetailProps> = ({
  messages,
  conversationId,
  senderName,
  isConversation,
}) => {
  const lastMessageTimestamp = messages?.[messages?.length - 1]?.timestamp;
  const userId = getLoggedUserId();

  const useQuery = useQueryClient();
  const [newMessage, setNewMessage] = useState("");
  const [isError, setIsError] = useState(!isConversation);

  const queryKey = [`conversation`, conversationId];

  const addMessagesMutation = useMutation(
    (body: Body) => postMessage(body, conversationId),
    {
      onSuccess: ({ data }) => {
        useQuery.setQueryData(queryKey, (messages: Message[]) => [
          ...messages,
          data,
        ]);
        setNewMessage("");
      },
      onError: () => setIsError(true),
    }
  );

  const deleteMessagesMutation = useMutation(
    (id: number) => deleteMessage(id),
    {
      // the api to delete message doesn't seem implemented
      onSuccess: () => {},
      onError: () => setIsError(true),
    }
  );

  const submitMessage = (e) => {
    e.preventDefault();

    const body = {
      body: newMessage,
      authorId: userId,
      timestamp: getUnixTime(new Date()),
      conversationId,
    };

    addMessagesMutation.mutate(body);
  };

  const handleTextareaChange = (e) => setNewMessage(e.target.value);

  return (
    <>
      <header>
        <Link href={`/`} passHref>
          <a className="button is-outlined is-small mr-4 is-rounded"> Back </a>
        </Link>
        <h1 className="mr-3">{senderName}</h1>
        {lastMessageTimestamp && (
          <span className={styles.date}>
            Last message sent: {preciseDate(lastMessageTimestamp)}
          </span>
        )}
      </header>
      <main>
        {isError && <Error text="An error occured. Please retry later." />}

        <ul className={styles.messages}>
          {messages?.map((message) => {
            const { id, body, authorId, timestamp } = message;
            const userIsAuthor = userId === authorId;
            return (
              <li key={id} className={styles.message}>
                <article
                  className={classnames("message", {
                    "is-success": userIsAuthor,
                    "is-info": !userIsAuthor,
                  })}
                >
                  <div className="message-body">
                    <div className={styles.message__header}>
                      <span className="is-size-7">
                        {!userIsAuthor && `${senderName} - `}
                        <span className="is-italic">
                          {preciseDate(timestamp)}
                        </span>
                      </span>
                      {userIsAuthor && (
                        <button
                          type="button"
                          className="delete"
                          onClick={() => deleteMessagesMutation.mutate(id)}
                          aria-label="delete"
                        ></button>
                      )}
                    </div>
                    {body}
                  </div>
                </article>
              </li>
            );
          })}
        </ul>

        {isConversation && (
          <div className="is-flex">
            <textarea
              className={classnames("textarea", styles.textarea)}
              placeholder="Send message"
              value={newMessage}
              onChange={handleTextareaChange}
              maxLength={500}
            ></textarea>
            <button
              type="submit"
              className={classnames("button is-primary is-rounded", {
                "is-loading": addMessagesMutation.isLoading,
              })}
              disabled={newMessage === ""}
              onClick={submitMessage}
            >
              Submit
            </button>
          </div>
        )}
      </main>
    </>
  );
};

export default ConversationDetail;
