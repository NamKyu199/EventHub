import { View, Text, Dimensions, ImageBackground, Image } from 'react-native'
import React from 'react'
import CardComponent from './CardComponent';
import TextComponent from './TextComponent';
import { EventModle } from '~models/EventModel';
import AvatarGroup from './AvatarGroup';
import RowComponent from './RowComponent';
import { appColors } from '~constants/appColors';
import { Location, Save2 } from 'iconsax-react-native';
import SpaceComponent from './SpaceComponent';
import appImage from '~constants/appImage';
import { fontFamililes } from '~constants/fontFamililes';
import { globalStyles } from '~styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import { appInfo } from '~constants/appInfos';
import { DateTime } from '~utils/DateTime';
import { useSelector } from 'react-redux';
import { authSelector, AuthState } from '~redux/reducers/authReducer';
import { numberToString } from '~utils/numberToString';

interface Props {
  item: EventModle;
  type: 'card' | 'list'
}

const EventItem = (props: Props) => {

  const { item, type } = props;
  const navigation: any = useNavigation();
  const auth: AuthState = useSelector(authSelector);

  return (
    <CardComponent
      isShadow
      onPress={() => { navigation.navigate('EventDetail', { item }) }}
      styles={{ width: appInfo.size.WIDTH * 0.7 }}>
      {
        type === 'card' ? (
          <>
            <ImageBackground
              style={{ flex: 1, marginBottom: 12, height: appInfo.size.HEIGHT * 0.2 }}
              source={{ uri: item.photoUrl }}
              imageStyle={{
                padding: 10,
                resizeMode: 'cover',
                borderRadius: 12,
              }}>
              <RowComponent justify='space-between'>
                <CardComponent styles={[globalStyles.nospaceCard, globalStyles.card, { width: 48, height: 48 }]} bgColor='#FFFFFFB3'>
                  <TextComponent
                    color={appColors.danger2}
                    font={fontFamililes.bold}
                    size={12} text={numberToString(new Date(+item.date).getDate())}
                  />
                  <TextComponent
                    color={appColors.danger2}
                    font={fontFamililes.bold}
                    size={9} text={(appInfo.monthNames[new Date(+item.date).getMonth()]).substring(0, 3)}
                  />
                </CardComponent>
                {auth.follow_events && auth.follow_events.includes(item._id) && (
                  <CardComponent styles={[globalStyles.nospaceCard, globalStyles.card]} bgColor='#FFFFFFB3'>
                    <Save2
                      size="20"
                      color={appColors.danger2}
                      variant="Bold"
                    />
                  </CardComponent>
                )}
              </RowComponent>
            </ImageBackground>
            <TextComponent text={item.title} title size={18} numberOfLine={1} />
            <AvatarGroup userIds={item.users} />
            <RowComponent>
              <Location size={18} color={appColors.text3} variant='Bold' />
              <SpaceComponent width={10} />
              <TextComponent flex={1} text={item.locationAddress} size={12} color={appColors.text3} />
            </RowComponent>
          </>
        ) : (
          <>
            <RowComponent>
              <Image
                source={{ uri: item.photoUrl }}
                style={{
                  width: 79,
                  height: 92,
                  borderRadius: 12,
                  resizeMode: 'cover'
                }}
              />
              <SpaceComponent width={12} />
              <View style={{ flex: 1, alignItems: 'stretch' }}>
                <TextComponent
                  text={`${DateTime.GetDayString(+item.date)} • ${DateTime.GetTime(new Date(+item.startAt))}`}
                  size={13}
                  color={appColors.primary}
                />
                <SpaceComponent height={8} />
                <TextComponent text={item.title} title size={14} numberOfLine={2} />
                <SpaceComponent height={10} />
                <RowComponent>
                  <Location size={18} color={appColors.text3} variant='Bold' />
                  <SpaceComponent width={8} />
                  <TextComponent flex={1} text={item.locationAddress} size={13} color={appColors.text3} numberOfLine={1} />
                </RowComponent>
              </View>
            </RowComponent>
          </>
        )
      }

    </CardComponent>
  )
}

export default EventItem