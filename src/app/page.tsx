"use client";
import { SendBirdProvider } from "@sendbird/uikit-react";
import "@sendbird/uikit-react/dist/index.css";

export default function Home() {

  return (
    <SendBirdProvider
      appId="8056AAA9-9594-4FE3-90AA-218173F46E42"
      userId=''
    >
    </SendBirdProvider>
  );
}
