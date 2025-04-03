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
  userIds: string[] // Nhận vào danh sách user ID
}

const AvatarGroup = (props: Props) => {
  const { size, userIds } = props
  const displayedUsers = userIds.slice(0, 3); // Hiển thị tối đa 3 người
  const remainingUsers = userIds.length - displayedUsers.length;

  // Lấy ảnh tương ứng theo số lượng user
  const getAvatarImage = (index: number) => {
    if (index === 0) return appImage.AvatarDemo1;
    if (index === 1) return appImage.UserLogo;
    if (index === 2) return appImage.AvatarDemo2;
    return appImage.AvatarDemo;
  }

  return (
    <RowComponent justify='flex-start' styles={{ marginVertical: 12 }}>
      {displayedUsers.map((userId, index) => (
        <Image
          key={userId}
          source={getAvatarImage(index)} // Render ảnh theo thứ tự index
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
      {remainingUsers > 0 && (
        <>
          <SpaceComponent width={12} />
          <TextComponent
            text={`+ ${remainingUsers} người`}
            size={12 + (size ? (size - 24) / 5 : 0)}
            color={appColors.primary}
            font={fontFamililes.semiBold}
          />
        </>
      )}
    </RowComponent>
  )
}

export default AvatarGroup;
