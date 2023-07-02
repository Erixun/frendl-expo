import { ViewStyle, View, Text } from 'react-native';
import { MessageBubbleTail } from './MessageBubbleTail';
import { AppColors } from '../../theme/colors';


export const MessageBubble = ({
  userColor,
  isCurrentUser,
  isSameUser,
  hasUserNextMessage,
  message,
  username,
  createdAt,
}: MessageBubbleProps) => {
  const $currentUserStyle: ViewStyle = isCurrentUser
  ? { alignSelf: 'flex-end', marginRight: 10, marginLeft: '20%' }
  : {};
  
  return (
    <View
    style={[
        $messageBubble,
        {
          backgroundColor: userColor,
          marginTop: isSameUser ? -6 : 10,
        },
        $currentUserStyle,
      ]}
      >
      {!isSameUser && <Text style={{ fontWeight: 'bold' }}>{username}</Text>}
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Text>{message}</Text>
        <Text
          style={{
            fontSize: 10,
            overflow: 'visible',
            alignSelf: 'flex-end',
            marginBottom: -5,
            marginRight: -8,
            marginLeft: 'auto',
          }}
          >
          {new Date(createdAt).toLocaleTimeString('sv-SE', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
      {!hasUserNextMessage && (
        <MessageBubbleTail
        direction={isCurrentUser ? 'right' : 'left'}
        userColor={userColor}
        />
        )}
    </View>
  );
};

const $messageBubble: ViewStyle = {
  backgroundColor: AppColors.primary200,
  padding: 10,
  paddingHorizontal: 15,
  marginHorizontal: 10,
  marginRight: '20%',
  flexBasis: '50%',
  alignSelf: 'flex-start',
  borderRadius: 10,
  marginBottom: 8,
  // elevation: 5,
  flex: 0,
};

type MessageBubbleProps = {
  userColor: string;
  isCurrentUser: boolean;
  isSameUser: boolean;
  hasUserNextMessage: boolean;
  message: string;
  username: string;
  createdAt: string;
};