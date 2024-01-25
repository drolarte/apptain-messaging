import EditUserProfile from "@sendbird/uikit-react/EditUserProfile";
import { useChannelListContext } from "@sendbird/uikit-react/ChannelList/context";

interface ProfileEditButtonProps {
  setShowProfileEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileEditButton: React.FC<ProfileEditButtonProps> = ({ setShowProfileEdit }) => {
  const { onProfileEditSuccess } = useChannelListContext();

  const handleEditProfile = (user: any) => {
    setShowProfileEdit(false);
    onProfileEditSuccess?.(user);
  };

  return (
    <EditUserProfile
      onCancel={() => setShowProfileEdit(false)}
      onEditProfile={handleEditProfile}
    />
  );
};

export default ProfileEditButton;
