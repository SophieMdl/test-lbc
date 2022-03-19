import React from "react";
import { fromUnixTime, format } from "date-fns";
import styles from "../styles/ConversationList.module.css";
import { Conversation } from "../types/conversation";

const formatTimestamp = (timeStamp: number): string =>
  format(fromUnixTime(timeStamp), "MMMM dd");

type ConversationsListProps = {
  conversations: Conversation[];
};

const ConversationsList = ({ conversations }: ConversationsListProps) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <ul>
          {conversations.map((conversation) => {
            const { id, senderNickname, lastMessageTimestamp } = conversation;
            return (
              <li key={id}>
                <article className={styles.message}>
                  <figure className={styles.avatar}>
                    <span>{senderNickname.charAt(0)}</span>
                  </figure>
                  <div>
                    <p>{senderNickname}</p>
                    <p className="has-text-grey">
                      {formatTimestamp(lastMessageTimestamp)}
                    </p>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
};

export default ConversationsList;
