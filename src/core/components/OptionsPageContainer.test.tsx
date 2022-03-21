import React from "react";
import { Checkbox } from "./controls";
import { OptionsPageContainer } from "./OptionsPageContainer";
import { render, screen } from "@testing-library/react";

describe("OptionsPageContainer", () => {
  it("loads settings and links options", async () => {
    render(
      <OptionsPageContainer>
        <Checkbox name="foo" />
      </OptionsPageContainer>
    );
    expect(await screen.findByTestId("foo")).toBeTruthy();
  });

  it("loads settings and shows unlinked options", async () => {
    render(
      <OptionsPageContainer>
        <Checkbox name="not-a-key" />
      </OptionsPageContainer>
    );
    expect(
      await screen.findByText("Unlinked Checkbox: not-a-key")
    ).toBeTruthy();
  });
});
