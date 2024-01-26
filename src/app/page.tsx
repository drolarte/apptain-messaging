'use client'
import { useEffect, useRef, useState } from "react";
import { SendBirdProvider, ChannelList, Channel } from "@sendbird/uikit-react";
import "@sendbird/uikit-react/dist/index.css";
import ChannelListHeaderWrapper from "@/components/ChannelListHeaderWrapper";
import { GroupChannel } from "@sendbird/chat/groupChannel";
import CreateChannel from "@sendbird/uikit-react/CreateChannel";
import generateUUID from "@/pages/api/utility/uuidgenerator";
import generateRandomName from '@/pages/api/utility/nameGenerator';

import type { User } from "@sendbird/chat";
import APIServices from "@/pages/api/services/apiServices";

const useUserCreation = () => {
  const [userId, setUserId] = useState("");
  const [userNickName, setUserNickName] = useState("");
  const [userCreated, setUserCreated] = useState(false);
  const isMountedRef = useRef(false);

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;

      const fetchData = async () => {
        const generatedUserId = generateUUID();
        const generatedUserName = generateRandomName();

        setUserId(generatedUserId);
        setUserNickName(generatedUserName);

        try {
          await APIServices.createUser(generatedUserId, generatedUserName);
          setUserCreated(true);
        } catch (error) {
          console.error("Error creating user:", error);
        }
      };

      fetchData();
    }
  }, []);

  return { userId, userNickName };
};

const Home = () => {
  const { userId, userNickName } = useUserCreation();
  const [channelUrl, setChannelUrl] = useState("");
  const [displayModal, setShowModal] = useState(false);

  const handleEditProfile = (user: User) => {
    APIServices.updateUser(user.userId, user.nickname, user.profileUrl);
  };

  const handleCreateChannel = (channel: GroupChannel) => {
    if (channel.memberCount === 2) {
      const currentUserId = userId;
      const chatmate = channel.members.find((member) => member.userId !== currentUserId);

      if (chatmate) {
        APIServices.createChannel(channel.url, currentUserId, chatmate.userId);
      } else {
        console.error("Unable to find the other member in the channel.");
      }
    }
    setShowModal(false);
  };
  
  return (
    <SendBirdProvider 
        appId="8056AAA9-9594-4FE3-90AA-218173F46E42" 
        userId={userId} 
        nickname={userNickName}
        profileUrl="https://file-us-1.sendbird.com/profile_images/f6d560dee03b4ab39c64a7ecff6b56c6.jpg"
        >
      <div className="App flex">
        <ChannelList
          onChannelSelect={(channel) => setChannelUrl(channel ? channel.url : "")}
          onProfileEditSuccess={handleEditProfile}
          renderHeader={() => (
            <div>
              <ChannelListHeaderWrapper
                onClickCreateChannel={() => {
                  setShowModal(true);
                }}
              />
            </div>
          )}
        />
        {displayModal && (
          <CreateChannel onCreateChannel={handleCreateChannel} onCancel={() => setShowModal(false)} />
        )}
        <Channel channelUrl={channelUrl} />
      </div>
    </SendBirdProvider>
  );
};

export default Home;