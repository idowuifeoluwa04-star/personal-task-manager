import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TaskProvider from "./context/TaskContext";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <TaskProvider>
        <App />
        <ToastContainer position="top-right" autoClose={2000} />
      </TaskProvider>
    </BrowserRouter>
  </StrictMode>
);