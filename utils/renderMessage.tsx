import { MessageBubble } from '../components/Chat/MessageBubble';
import { useMapStore } from '../store/mapStore';
import { ZoneChatLogEntry } from '../store/zoneStore';
import { AppColors } from '../theme/colors';

export const renderMessage =
  (DATA: ZoneChatLogEntry[]) =>
  ({ item, index }: { item: ZoneChatLogEntry; index: number }) => {
    const { zone } = useMapStore();

    const userColor =
      zone?.memberMap.get(item.userId)?.userColor || AppColors.primary200;

    const isSameUser =
      index < DATA.length - 1 && item.username === DATA[index + 1].username;

    const isCurrentUser = zone?.currentUser?.userId === item.userId;

    const hasUserNextMessage =
      index > 0 && item.username === DATA[index - 1].username;

    return (
      <MessageBubble
        userColor={userColor}
        isCurrentUser={isCurrentUser}
        isSameUser={isSameUser}
        hasUserNextMessage={hasUserNextMessage}
        message={item.message}
        username={item.username}
        createdAt={item.createdAt}
      />
    );
  };
