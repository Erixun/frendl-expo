import {
  View,
  Text,
  ViewStyle,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useMapStore } from '../store/mapStore';
import { observer } from 'mobx-react-lite';
import { AppColors } from '../theme/colors';
import AppTextInput from '../components/AppTextInput';
import { useEffect, useRef, useState } from 'react';
// import { Colors } from 'react-native/Libraries/NewAppScreen';

export const ZoneChatScreen = observer(() => {
  const { zone } = useMapStore();

  const [message, setMessage] = useState('');

  const changeMessage = (text: string) => {
    setMessage(text);
  };

  const scrollToBottom = () => {
    // chatLogRef.current?.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    scrollToBottom();
  }, [zone?.chatLog]);
  // <KeyboardAvoidingView
  //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  //   style={$screen}
  //   keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
  //   >
  /* </KeyboardAvoidingView> */

  const chatLogRef = useRef<FlatList>(null);

  const DATA = zone?.chatLog.slice().reverse() || [];
  return (
    <View style={$screen}>
      <FlatList
        keyboardShouldPersistTaps="handled"
        bounces={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
        ListEmptyComponent={<Text>Chat Log Empty</Text>}
        // ListHeaderComponent={
        //   // <AppTextInput value={message} onChangeText={changeMessage} />
        //   <View style={$messageInputContainer}>
        //     <AppTextInput
        //       style={$messageInput}
        //       placeholder="Message"
        //       // multiline={true}
        //       value={message}
        //       onChangeText={changeMessage}
        //       // onSubmitEditing={(text) => zone?.sendMessage(text)}
        //     />
        //   </View>
        // }
        ref={chatLogRef}
        style={$chatLog}
        data={DATA}
        keyExtractor={(message, index) => index.toString()}
        renderItem={({ item, index }) => {
          //IF THE MESSAGE IS FROM same user as previous message, don't show username
          const isSameUser =
            index < DATA.length-1 && item.username === DATA[index + 1].username;
          const member = zone?.memberMap.get(item.userId);
          return (
            <View style={[$messageBubble, {backgroundColor: member?.userColor, marginTop: isSameUser? 0 : 10}]}>
              {!isSameUser && (
                <Text style={{ fontWeight: 'bold' }}>{item.username}</Text>
              )}
              <Text>{item.message}</Text>
              <Text style={{ fontSize: 10, alignSelf: 'flex-end' }}>
                {new Date(item.createdAt).toLocaleTimeString('sv-SE', {hour: '2-digit', minute:'2-digit'})}
              </Text>
            </View>
          );
        }}
        inverted={true}
      />
      <View style={$messageInputContainer}>
        <AppTextInput
          style={$messageInput}
          placeholder="Message"
          // multiline={true}
          value={message}
          onChangeText={changeMessage}
          // onSubmitEditing={(text) => zone?.sendMessage(text)}
        />
      </View>
    </View>
  );
});

const $screen: ViewStyle = {
  flex: 1,
  height: '100%',
  // alignContent: 'space-between',
};

const $chatLog: ViewStyle = {
  flex: 1,
  paddingHorizontal: 10,
  marginBottom: 10,
  marginTop: 10,
};

const $messageBubble: ViewStyle = {
  backgroundColor: AppColors.primary200,
  padding: 10,
  marginRight: '20%',
  flexBasis: '50%',
  alignSelf: 'flex-start',
  borderRadius: 10,
  marginBottom: 8,
  elevation: 5,
  flex: 0,
};

const $messageInputContainer: ViewStyle = {
  flexDirection: 'row',
  paddingHorizontal: 10,
  paddingBottom: 10,
  marginTop: 10,
};

const $messageInput: ViewStyle = {
  margin: 0,
  height: 40,
  borderRadius: 20,
  elevation: 1,
  flex: 1,
};
