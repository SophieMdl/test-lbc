import React, { FC } from "react";

type ErrorProps = { text: string };

const Error: FC<ErrorProps> = ({ text }: ErrorProps) => {
  return <div className="notification is-danger is-light">{text}</div>;
};

export default Error;
