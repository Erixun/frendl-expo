import { StyleProp, TextInput, TextStyle } from 'react-native';
import { AppColors } from '../theme/colors';
import { TextInputProps } from 'react-native-paper';

const AppTextInput = ({
  value,
  onChangeText,
  style,
  ...otherProps
}: {
  style?: StyleProp<TextStyle>;
  value: string;
  onChangeText: (text: string) => void;
} & TextInputProps) => {
  return <TextInput style={[$inputStyle, style]} {...otherProps} value={value} onChangeText={onChangeText}/>;
};

export default AppTextInput;

const $inputStyle: TextStyle = {
  backgroundColor: AppColors.neutral100,
  width: 250,
  paddingVertical: 5,
  paddingHorizontal: 10,
  borderRadius: 5,
  borderColor: AppColors.neutral500,
  borderWidth: 1,
  margin: 10,
  elevation: 4,
};
