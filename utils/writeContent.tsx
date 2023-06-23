// import { CURRENT_USER_COLOR } from '../constant/colors';
import { ZoneMember } from '../store/zoneStore';
import { CURRENT_USER_COLOR } from '../theme/colors';
import { Text } from 'react-native';

const writeContent = (member: ZoneMember, isCurrentUser: boolean) => {
  const color = isCurrentUser ? CURRENT_USER_COLOR : member.userColor;
  return (
    <>
      <Text style={{ color: color }}>{member.username}</Text>
      <Text style={{ color: color }}>{member.message || ''}</Text>;
    </>
  );
};

export default writeContent;
