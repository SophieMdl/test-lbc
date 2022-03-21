import React from "react";
import Link from "next/link";
import styles from "../styles/ConversationList.module.css";
import { Conversation } from "../types/conversation";
import { formatTimestamp } from "./helpers";

type ConversationsListProps = {
  conversations: Conversation[];
};

const ConversationsList = ({ conversations }: ConversationsListProps) => (
  <main>
    <ul>
      {conversations.map((conversation) => {
        const { id, senderNickname, lastMessageTimestamp } = conversation;
        return (
          <li key={id}>
            <Link href={`/conversation/${id}`} passHref>
              <a>
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
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  </main>
);

export default ConversationsList;
