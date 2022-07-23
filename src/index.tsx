import React from "react";
import { render } from "react-dom";

const Application: React.FC<Record<string, never>> = () => <h1>Application</h1>;

render(<Application />, document.getElementById("app"));
