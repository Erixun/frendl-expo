import { Pressable, Text, TextStyle, View, ViewStyle, Image, ViewProps } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { buttonPrimaryColor } from '../theme/colors';

type Props = {
  onPress: () => void;
  label: string;
  size?: 'sm' | 'md' | 'lg';
  rightAsset?: JSX.Element;
  leftAsset?: JSX.Element;
} & ViewProps;

// <View style={{height: 50, width: 50}}>
{/* </View> */}
const BankIDLogo = () => (
    <Image style={{height: 50, width: 50}} source={require('../assets/logo/BankID_logo.png')} />
);

const AppButton = ({ onPress, label, size = 'lg', leftAsset, rightAsset, style }: Props) => (
  <Pressable
    style={({ pressed }) => (pressed ? [$buttonPressed, btnSize[size], style] : [$button, btnSize[size], style])}
    onPress={onPress}
  >
    {/* {leftAsset && leftAsset} */}
    <Text style={$buttonText}>{label}</Text>
    {/* <BankIDLogo /> */}
    {rightAsset && rightAsset}
  </Pressable>
);

export default AppButton;

const $button: ViewStyle = {
  width: 150,
  // padding: 10,
  paddingHorizontal: 20,
  backgroundColor: buttonPrimaryColor,
  borderRadius: 50,
  elevation: 4,
  // backgroundColor: 'lightgray',
  margin: 10,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
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
  width: 250,
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
  fontSize: 22,
  textAlign: 'center',
};
