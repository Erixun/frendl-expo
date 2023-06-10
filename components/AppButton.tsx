import { Pressable, Text, TextStyle, ViewStyle } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { buttonPrimaryColor } from '../theme/colors';

type Props = {
  onPress: () => void;
  label: string;
  size?: 'sm' | 'md' | 'lg';
};

const AppButton = ({ onPress, label, size = 'lg' }: Props) => (
  <Pressable
    style={({ pressed }) => (pressed ? [$buttonPressed, btnSize[size]] : [$button, btnSize[size]])}
    onPress={onPress}
  >
    <Text style={$buttonText}>{label}</Text>
  </Pressable>
);

export default AppButton;

const $button: ViewStyle = {
  width: 150,
  padding: 10,
  backgroundColor: buttonPrimaryColor,
  borderRadius: 5,
  elevation: 4,
  // backgroundColor: 'lightgray',
  margin: 10,
};
const $btnSm: ViewStyle = {
  width: 100,
  padding: 10,
};

const $btnMd: ViewStyle = {
  width: 150,
  padding: 10,
};

const $btnLg: ViewStyle = {
  width: 200,
  padding: 10,
};
const btnSize = {
  sm: $btnSm,
  md: $btnMd,
  lg: $btnLg,
};

const $buttonPressed: ViewStyle[] = [
  $button,
  { backgroundColor: Colors.neutral900 },
];
const $buttonText: TextStyle = {
  color: 'white',
  fontSize: 18,
  textAlign: 'center',
};
