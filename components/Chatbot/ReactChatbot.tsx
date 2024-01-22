"use client";
import { useState } from "react";
import Chatbot from "./Chatbot";

const ReactChatbot = () => {
  const [isChatbotOpen, setChatbotOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setChatbotOpen(true)}>Open Chatbot</button>

      {isChatbotOpen && (
        <div style={{ position: "fixed", right: 0, bottom: 0 }}>
          <Chatbot />
        </div>
      )}
    </div>
  );
};

export default ReactChatbot;
