import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { appColors } from '~constants/appColors'
import { ButtonComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '~components'
import { Messages3, UserAdd } from 'iconsax-react-native'
import { globalStyles } from '~styles/globalStyles'
import { fontFamililes } from '~constants/fontFamililes'

const AboutProfile = () => {
    return (
        <>
            <SectionComponent>
                <RowComponent>
                    <TouchableOpacity
                        style={[globalStyles.button,
                        {
                            flex: 1,
                            backgroundColor: appColors.primary
                        }
                        ]}
                    >
                        <UserAdd size={22} color={appColors.white} />
                        <SpaceComponent width={12} />
                        <TextComponent text='Follow' color={appColors.white} font={fontFamililes.medium} />
                    </TouchableOpacity>
                    <SpaceComponent width={20} />
                    <TouchableOpacity
                        style={[globalStyles.button,
                        {
                            flex: 1,
                            borderColor: appColors.primary,
                            borderWidth: 1
                        }
                        ]}
                    >
                        <Messages3 size={22} color={appColors.primary} />
                        <SpaceComponent width={12} />
                        <TextComponent text='Messages' color={appColors.primary} font={fontFamililes.medium} />
                    </TouchableOpacity>
                </RowComponent>
            </SectionComponent>
        </>
    )
}

export default AboutProfile