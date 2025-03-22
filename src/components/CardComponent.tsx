import { View, Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import React, { ReactNode } from 'react';
import { globalStyles } from '../styles/globalStyles';
import { appColors } from '../constants/appColors';

interface Props {
  onPress?: () => void;
  children: ReactNode;
  bgColor?: string;
  styles?: StyleProp<ViewStyle>;
  isShadow?: boolean,
}

const CardComponent = (props: Props) => {
  const { children, bgColor, styles, onPress, isShadow } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        globalStyles.card,
        isShadow ? globalStyles.shadow : undefined,
        {
          backgroundColor: bgColor ?? appColors.white,
          borderRadius: 12, // Quan trọng để bóng lan rộng
        },
        styles,
      ]}
    >
      {children}
    </TouchableOpacity>
  );
};

export default CardComponent;