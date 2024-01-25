import React from "react";
import ChannelListHeader from "@sendbird/uikit-react/ChannelList/components/ChannelListHeader";
import CreateChannelIcon from "./CreateChannelIcon";
import ProfileEditButton from "./ProfileEditButton";

interface ChannelListHeaderWrapperProps {
  onClickCreateChannel: () => void;
}

const ChannelListHeaderWrapper: React.FC<ChannelListHeaderWrapperProps> = ({ onClickCreateChannel }) => {
  const [showProfileEdit, setShowProfileEdit] = React.useState(false);

  return (
    <div>
      <ChannelListHeader
        renderIconButton={() => (
          <CreateChannelIcon onClickCreateChannel={onClickCreateChannel} />
        )}
        onEdit={() => setShowProfileEdit(true)}
      />
      {showProfileEdit && <ProfileEditButton setShowProfileEdit={setShowProfileEdit} />}
    </div>
  );
};

export default ChannelListHeaderWrapper;
