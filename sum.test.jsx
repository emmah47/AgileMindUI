import React from "react"

import CoolButton from "./sum";
import {render} from "@testing-library/react"


test("Cool Button test", () => {
  render(<CoolButton label="Click me" />);
})