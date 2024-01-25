'use client'
import { useState } from "react";
import { SendBirdProvider, ChannelList, Channel } from "@sendbird/uikit-react";
import "@sendbird/uikit-react/dist/index.css";
import ChannelListHeaderWrapper from "@/components/ChannelListHeaderWrapper";
import { GroupChannel } from "@sendbird/chat/groupChannel";
import CreateChannel from "@sendbird/uikit-react/CreateChannel";

const Home = () => {
  const [channelUrl, setChannelUrl] = useState("");
  const [displayModal, setShowModal] = useState(false);

  const handleCreateChannel = (channel: GroupChannel) => {
    if (channel.memberCount === 2) {
      console.log(channel.memberCount);
    }

    setShowModal(false);
  };

  return (
    <SendBirdProvider
      appId="8056AAA9-9594-4FE3-90AA-218173F46E42"
      userId="user-id-sample-text"
    >
      <div className="App flex">
        <ChannelList
          onChannelSelect={(channel) => setChannelUrl(channel ? channel.url : "")}
          renderHeader={() => (
            <ChannelListHeaderWrapper onClickCreateChannel={() => setShowModal(true)} />
          )}
        />
        {displayModal && (
          <CreateChannel
            onCreateChannel={handleCreateChannel}
            onCancel={() => setShowModal(false)}
          />
        )}
        <Channel channelUrl={channelUrl} />
      </div>
    </SendBirdProvider>
  );
};

export default Home;
