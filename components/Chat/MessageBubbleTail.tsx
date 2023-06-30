import { View } from 'react-native';

export const MessageBubbleTail = ({
  direction,
  userColor,
}: {
  direction: 'left' | 'right';
  userColor: string;
}) => {
  return (
    <>
      <View
        style={{
          position: 'absolute',
          bottom: 1,
          [direction]: -16,
          width: 16,
          height: 24,
          borderRadius: 8,
          zIndex: 1,
          backgroundColor: 'white',
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          [direction]: -10,
          width: 16,
          height: 16,
          borderRadius: 8,
          backgroundColor: userColor,
        }}
      />
    </>
  );
};
