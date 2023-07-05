import { View } from 'react-native';

export const MessageBubbleTail = ({
  direction,
  userColor,
}: {
  direction: 'left' | 'right';
  userColor: string;
}) => {

  const isLeft = direction === 'left';
  return (
    <>
      <View
        style={{
          position: 'absolute',
          bottom: -1,
          [direction]: -14,
          width: 14,
          height: 24,
          borderBottomLeftRadius: isLeft? 0 : 8,
          borderBottomRightRadius: isLeft? 8: 0,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          zIndex: 1,
          backgroundColor: 'white',
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: -1,
          [direction]: -10,
          width: 16,
          height: 16,
          borderRadius: 8,
          borderColor: userColor,

          borderWidth: 1,
          borderBottomColor: 'black',
          // borderLeftColor: 'red',
          backgroundColor: userColor,
        }}
      />
    </>
  );
};
