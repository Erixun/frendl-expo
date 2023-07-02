import {
  View,
  Text,
  ViewStyle,
  FlatList,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from 'react-native';
import { useMapStore } from '../store/mapStore';
import { observer } from 'mobx-react-lite';
import AppTextInput from '../components/AppTextInput';
import { useState } from 'react';
import { renderMessage } from '../utils/renderMessage';

export const ZoneChatScreen = observer(() => {
  const { zone } = useMapStore();

  const [message, setMessage] = useState('');

  const changeMessage = (text: string) => {
    setMessage(text);
  };

  const DATA = zone?.chatLog.slice().reverse() || [];

  const handleSendMessage = () => {
    Keyboard.dismiss();
    if (!message) return;

    zone
      ?.sendMessage(message)
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setMessage('');
      });
  };

  return (
    <KeyboardAvoidingView
      style={$screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : -100} // Adjust the offset as needed
    >
      <FlatList
        keyboardShouldPersistTaps="handled"
        bounces={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
        focusable={false}
        ListEmptyComponent={
          <Text
            style={{
              fontSize: 18,
              fontStyle: 'italic',
              textAlign: 'center',
              padding: 30,
            }}
          >
            No messages yet
          </Text>
        }
        style={$chatLog}
        data={DATA}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderMessage(DATA)}
        inverted={true}
      />
      <View style={$messageInputContainer}>
        <AppTextInput
          style={$messageInput}
          placeholder="Message"
          value={message}
          onChangeText={changeMessage}
          onSubmitEditing={handleSendMessage}
          blurOnSubmit={true}
          autoFocus={false}
        />
      </View>
    </KeyboardAvoidingView>
  );
});

const $screen: ViewStyle = {
  flex: 1,
  height: '100%',
};

const $chatLog: ViewStyle = {
  flex: 1,
  paddingHorizontal: 15,
  marginTop: 10,
};

const $messageInputContainer: ViewStyle = {
  flexDirection: 'row',
  paddingHorizontal: 10,
  paddingTop: 10,
  paddingBottom: 10,
};

const $messageInput: ViewStyle = {
  margin: 0,
  height: 48,
  borderRadius: 24,
  paddingHorizontal: 20,
  elevation: 1,
  flex: 1,
};
