import IconButton from "@sendbird/uikit-react/ui/IconButton";
import Icon, { IconTypes, IconColors } from "@sendbird/uikit-react/ui/Icon";

interface CreateChannelIconProps {
  onClickCreateChannel: () => void;
}

const CreateChannelIcon: React.FC<CreateChannelIconProps> = ({ onClickCreateChannel }) => (
  <div>
    <IconButton height="32px" width="32px" onClick={onClickCreateChannel}>
      <Icon type={IconTypes.CREATE} fillColor={IconColors.PRIMARY} height="24px" width="24px" />
    </IconButton>
  </div>
);

export default CreateChannelIcon;
