import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import Blog from "../Blog";

describe("<Blog />", () => {
  it("render Blog component as expected", async () => {
    const setVotesMock = jest.fn();
    const { queryByText } = render(
      <Blog
        blogData={[
          {
            id: 2,
            title: "Getting started",
            votes: 97,
            cover:
              "https://nextjs.org/static/images/learn/foundations/components.png",
            author: "Jane Doe",
          },
        ]}
        superProp="Hi-there"
        votes={10}
        setVotes={setVotesMock}
      />
    );
    expect(queryByText("Getting started")).toBeTruthy();
    expect(queryByText("Jane Doe")).toBeTruthy();
  });

  it("clicking upVote should invoke the expected method", async () => {
    const setVotesMock = jest.fn();
    render(
      <Blog
        blogData={[
          {
            id: 2,
            title: "Getting started",
            votes: 97,
            cover:
              "https://nextjs.org/static/images/learn/foundations/components.png",
            author: "Jane Doe",
          },
        ]}
        superProp="Hi-there"
        votes={10}
        setVotes={setVotesMock}
      />
    );
    await waitFor(() => userEvent.click(screen.getAllByTestId("upvote")[0]));
    expect(setVotesMock).toHaveBeenCalled();
  });
});