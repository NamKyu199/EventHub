import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { CardComponent, RowComponent, SpaceComponent, TextComponent } from '~components'
import { globalStyles } from '~styles/globalStyles'
import { ArrowRight2, Location } from 'iconsax-react-native'
import { appColors } from '~constants/appColors'
import ModalLocation from '~modals/ModalLocation'

const ChoiceLocation = ({ onSelect }: { onSelect: (val: { address: string; position?: { lat: number; long: number } }) => void }) => {
  const [isVisibleModalLocation, setIsVisibleModalLocation] = useState(false);
  const [addressSelected, setAddressSelected] = useState<{ address: string; position?: { lat: number; long: number } }>();

  return (
    <>
      <RowComponent
        styles={[globalStyles.inputcontainer]}
        onPress={() => setIsVisibleModalLocation(!isVisibleModalLocation)}
      >
        <Location size={22} variant="Bold" color={`${appColors.primary}80`} />
        <SpaceComponent width={12} />
        <TextComponent text={addressSelected ? addressSelected.address : 'Choice'} flex={1} />
        <ArrowRight2 color={appColors.primary} size={22} />
      </RowComponent>
      <ModalLocation
        visible={isVisibleModalLocation}
        onClose={() => setIsVisibleModalLocation(false)}
        onSelect={(val) => {
          setAddressSelected(val);
          onSelect(val); // Gửi cả địa chỉ và tọa độ lên component cha
        }}
      />
    </>
  );
};

export default ChoiceLocation;
