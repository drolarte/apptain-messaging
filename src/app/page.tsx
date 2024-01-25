'use client'
import { useEffect, useState } from "react";
import { SendBirdProvider, ChannelList, Channel } from "@sendbird/uikit-react";
import "@sendbird/uikit-react/dist/index.css";
import ChannelListHeaderWrapper from "@/components/ChannelListHeaderWrapper";
import { GroupChannel } from "@sendbird/chat/groupChannel";
import CreateChannel from "@sendbird/uikit-react/CreateChannel";
import generateUUID from "@/pages/api/utility/uuidgenerator";
import generateRandomName from '@/pages/api/utility/nameGenerator';

import type { User } from "@sendbird/chat";
import APIServices from "@/pages/api/services/apiServices";

const Home = () => {
  const [channelUrl, setChannelUrl] = useState("");
  const [displayModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [userCreated, setUserCreated] = useState(false);
  
  const randomName = generateRandomName();

  const handleEditProfile = (user: User) => {
    APIServices.updateUser(user.userId, user.nickname, user.profileUrl);
  };

  const handleCreateChannel = (channel: GroupChannel) => {
    if (channel.memberCount == 2) {
      const chatmate = channel.members.at(-1);

    }
    setShowModal(false);
  };
  useEffect(() => {
    if (!userCreated) {
      setUserId(generateUUID());
      APIServices.createUser(generateUUID(), generateRandomName());
      setUserCreated(true); // Mark user as created
    }
  }, [userCreated]);
  
  return (
    <SendBirdProvider
      appId="8056AAA9-9594-4FE3-90AA-218173F46E42"
      userId={userId}
      nickname={randomName}
    >
      <div className="App flex">
        <ChannelList
          onChannelSelect={(channel) => setChannelUrl(channel ? channel.url : "")}
          onProfileEditSuccess={handleEditProfile}
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
