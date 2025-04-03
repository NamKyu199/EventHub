import { View, Text, StyleProp, ViewStyle, TextStyle, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'
import TextComponent from './TextComponent';
import { globalStyles } from '~styles/globalStyles';
import { appColors } from '~constants/appColors';
import { fontFamililes } from '~constants/fontFamililes';

interface Props {
  onPress?: () => void;
  lable: string;
  icon?: ReactNode;
  textColor?: string;
  bgColor?: string;
  styles?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>; // ✅ Thêm textStyle vào Props
}

const TagComponent = (props: Props) => {

  const { onPress, lable, icon, textColor, bgColor, styles, textStyle } = props

  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      style={[
        globalStyles.row,
        globalStyles.tag,
        globalStyles.center,
        { backgroundColor: bgColor ?? appColors.white },
        styles
      ]}
    >
      {icon && icon}
      <TextComponent
        font={fontFamililes.medium}
        text={lable}
        styles={[
          { marginLeft: icon ? 8 : 0 },
          textStyle // ✅ Truyền textStyle vào TextComponent
        ]}
        color={textColor ? textColor : bgColor ? appColors.white : appColors.gray}
      />
    </TouchableOpacity>
  )
}

export default TagComponent;
