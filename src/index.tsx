import React from "react";
import { createRoot } from "react-dom/client";

const Application: React.FC<Record<string, never>> = () => <h1>Application</h1>;

const container = document.getElementById("app");
const root = createRoot(container!);
root.render(<Application />);
