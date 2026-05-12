import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "@/App";

/**
 * App entry point.
 *
 * Notes:
 *  - StrictMode is intentionally disabled in production to prevent the double-mount /
 *    double-effect behavior, which throws off our manual RAF/animation lifecycle
 *    (Atmosphere canvas, useReveal observer). It stays on in dev for sanity checks.
 *  - createRoot uses concurrent rendering by default so transitions/suspense
 *    boundaries below the fold yield to the browser smoothly.
 */
const root = ReactDOM.createRoot(document.getElementById("root"));

const tree = import.meta.env.PROD ? <App /> : (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

root.render(tree);
