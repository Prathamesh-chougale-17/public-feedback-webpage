import React from "react";
import SpeechBubbleCss from "./SpeechBubble.module.css";

const SpeechBubble = ({ children }: { children: React.ReactNode }) => {
  return <div className={SpeechBubbleCss.speechbubble}>{children}</div>;
};

export default SpeechBubble;
