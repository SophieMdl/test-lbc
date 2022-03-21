import React from "react";
import { render, screen, within } from "@testing-library/react";
import ConversationsList from "../components/ConversationsList";
import { conversationsMock } from "../__mocks__/conversationsMock.mock";

const conversationsNumber = conversationsMock.length;

describe("conversationsList", () => {
  beforeEach(() => {
    render(<ConversationsList conversations={conversationsMock} />);
  });

  test(`Renders a list with ${conversationsNumber} li item`, () => {
    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();

    const { getAllByRole } = within(list);

    expect(getAllByRole("listitem").length).toBe(conversationsNumber);
  });

  test(`Renders ${conversationsNumber} avatars`, () => {
    const avatar = screen.getAllByRole("figure");
    expect(avatar).toBeInTheDocument;
    expect(avatar.length).toBe(conversationsNumber);
  });

  test(`Renders ${conversationsNumber} links with correct href attribute`, () => {
    const links = screen.getAllByRole("link");

    expect(links).toBeInTheDocument;
    expect(links.length).toBe(conversationsNumber);
    links.forEach((link, i) =>
      expect(link).toHaveAttribute(
        "href",
        `/conversation/${conversationsMock[i].id}`
      )
    );
  });
});
