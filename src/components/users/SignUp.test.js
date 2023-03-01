import React from "react";
import { render } from "@testing-library/react";
import SignUp from "./SignUp";
import { MemoryRouter } from "react-router";

it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
