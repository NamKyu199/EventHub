import React from 'react'
import { ButtonComponent, SectionComponent, TextComponent } from '../../../components'
import { appColors } from '../../../constants/appColors'
import { fontFamililes } from '../../../constants/fontFamililes'
import { Google_SVG } from '../../../utils/svg'
import { Google } from 'iconsax-react-native'

const SocialLogin = () => {
    return (
        <SectionComponent>
            <TextComponent
                styles={{ textAlign: 'center' }}
                text='OR'
                color={appColors.gray4}
                size={16}
                font={fontFamililes.medium}
            />
            <ButtonComponent
                type='primary'
                color={appColors.white}
                textColor={appColors.text}
                text='Đăng nhập bằng Google'
                icon={
                    // <Google_SVG/>
                    <Google size={24} color={appColors.primary}/>
                }
                iconFlex='left'
            />
        </SectionComponent>
    )
}

export default SocialLogin