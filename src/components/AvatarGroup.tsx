import { View, Text, Image } from 'react-native'
import React from 'react'
import RowComponent from './RowComponent'
import TextComponent from './TextComponent'
import { appColors } from '~constants/appColors'
import { fontFamililes } from '~constants/fontFamililes'
import appImage from '~constants/appImage'
import SpaceComponent from './SpaceComponent'

interface Props {
  size?: number
}

const AvatarGroup = (props: Props) => {
  const { size } = props;
  return (
    <RowComponent justify='flex-start' styles={{ marginVertical: 12 }}>
      {Array.from({ length: 3 }).map((item, index) => (
        <Image
          key={`img${index}`}
          source={appImage.AvatarDemo}
          style={{
            width: size ?? 24,
            height: size ?? 24,
            borderRadius: 100,
            borderWidth: 1,
            borderColor: appColors.white,
            marginLeft: index > 0 ? -8 : 0,
          }}
        />
      ))}
      <SpaceComponent width={12} />
      <TextComponent
        text='+ 22 going'
        size={12 + (size ? (size - 24) / 5 : 0)}
        color={appColors.primary}
        font={fontFamililes.semiBold}
      />
    </RowComponent>
  )
}

export default AvatarGroup