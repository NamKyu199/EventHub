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
  userIds: string[]
}

const AvatarGroup = ({ size = 24, userIds }: Props) => {
  const displayedUsers = userIds.slice(0, 3); // Lấy tối đa 3 user
  const remainingUsers = userIds.length - displayedUsers.length; // Tính số lượng còn lại

  return (
    <RowComponent justify='flex-start' styles={{ marginVertical: 12 }}>
      {displayedUsers.map((userId, index) => (
        <Image
          key={userId} // Dùng userId làm key thay vì index
          source={appImage.AvatarDemo} // Cần thay bằng ảnh user thực tế nếu có
          style={{
            width: size,
            height: size,
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
            text={`+ ${remainingUsers} going`}
            size={12 + (size - 24) / 5}
            color={appColors.primary}
            font={fontFamililes.semiBold}
          />
        </>
      )}
    </RowComponent>
  )
}

export default AvatarGroup
