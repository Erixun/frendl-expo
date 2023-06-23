import { View, Text } from 'react-native';
import { useMapStore } from '../store/mapStore';
import { observer } from 'mobx-react-lite';

export const ZoneChatScreen = observer(() => {
  const { zone } = useMapStore();
  return (
    <View>
      {/* <Text>ChatScreen</Text> */}
      {zone?.chatLog.map((message, i) => (
        <View key={i}>
          <Text>{message.username}</Text>
          <Text>{message.message}</Text>
        </View>
      ))}
    </View>
  );
});
