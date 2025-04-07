import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  DimensionValue,
} from 'react-native';
import React, { ReactNode } from 'react';
import { globalStyles } from '~styles/globalStyles';
import { appColors } from '~constants/appColors';
import { TextComponent } from '~components';
import { fontFamililes } from '~constants/fontFamililes';

interface Props {
  icon?: ReactNode;
  text?: string;
  type?: 'primary' | 'text' | 'link';
  color?: string;
  styles?: StyleProp<ViewStyle>;
  textColor?: string;
  textStyles?: StyleProp<TextStyle>;
  textFont?: string;
  onPress?: () => void;
  iconFlex?: 'right' | 'left';
  disable?: boolean;
  width?: DimensionValue; // ✅ Thay đổi ở đây
}

const ButtonComponent = (props: Props) => {
  const {
    icon,
    text,
    textColor,
    textStyles,
    textFont,
    color,
    styles,
    onPress,
    iconFlex,
    type,
    disable,
    width,
  } = props;

  return type === 'primary' ? (
    <View style={{ alignItems: 'center' }}>
      <TouchableOpacity
        disabled={disable}
        onPress={onPress}
        style={[
          globalStyles.button,
          globalStyles.shadow,
          {
            backgroundColor: color
              ? color
              : disable
                ? appColors.gray4
                : appColors.primary,
            marginBottom: 17,
            width: width ? width : '90%',
          },
          styles,
        ]}>
        {icon && iconFlex === 'left' && icon}
        {text &&
          <TextComponent
            text={text}
            color={textColor ?? appColors.white}
            styles={[
              {
                marginLeft: icon ? 12 : 0,
                fontSize: 16,
                textAlign: 'center',
              },
              textStyles,
            ]}
            flex={icon && iconFlex === 'right' ? 1 : 0}
            font={textFont ?? fontFamililes.medium}
          />
        }
        {icon && iconFlex === 'right' && icon}
      </TouchableOpacity>
    </View>
  ) : (
    <TouchableOpacity onPress={onPress}>
      {icon && icon}
      {text &&
        <TextComponent
          flex={0}
          text={text}
          color={type === 'link' ? appColors.primary : appColors.text}
        />
      }
    </TouchableOpacity>
  );
};

export default ButtonComponent;