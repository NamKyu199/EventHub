import { View, Text, Dimensions, ImageBackground } from 'react-native'
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

interface Props {
  item: EventModle;
  type: 'card' | 'list'
}

const EventItem = (props: Props) => {

  const { item } = props;

  const navigation: any = useNavigation();

  return (
    <CardComponent isShadow onPress={() => { navigation.navigate('EventDetail', { item }) }} styles={{ width: appInfo.size.WIDTH * 0.7 }}>
      <ImageBackground style={{ flex: 1, marginBottom: 12, height: appInfo.size.HEIGHT * 0.2 }} source={appImage.EventLogo} imageStyle={{
        padding: 10,
        resizeMode: 'cover',
        borderRadius: 12,
      }}>
        <RowComponent justify='space-between'>
          <CardComponent styles={[globalStyles.nospaceCard, globalStyles.card, { width: 48, height: 48 }]} bgColor='#FFFFFFB3'>
            <TextComponent color={appColors.danger2} font={fontFamililes.bold} size={12} text='10' />
            <TextComponent color={appColors.danger2} font={fontFamililes.bold} size={9} text='JUNE' />
          </CardComponent>
          <CardComponent styles={[globalStyles.nospaceCard, globalStyles.card]} bgColor='#FFFFFFB3'>
            <Save2
              size="20"
              color={appColors.danger2}
              variant="Bold"
            />
          </CardComponent>
        </RowComponent>
      </ImageBackground>
      <TextComponent text='International Band Music Festival' title size={18} numberOfLine={1} />
      <AvatarGroup />
      <RowComponent>
        <Location size={18} color={appColors.text3} variant='Bold' />
        <SpaceComponent width={10} />
        <TextComponent flex={1} text={item.location.address} size={12} color={appColors.text3} />
      </RowComponent>

    </CardComponent>
  )
}

export default EventItem