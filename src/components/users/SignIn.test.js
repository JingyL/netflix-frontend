import React from "react";
import { render } from "@testing-library/react";
import SignIn from "./SignIn";
import { MemoryRouter } from "react-router";

it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
