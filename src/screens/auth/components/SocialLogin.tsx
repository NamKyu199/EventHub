import React from 'react'
import { ButtonComponent, SectionComponent, SpaceComponent, TextComponent } from '../../../components'
import { appColors } from '../../../constants/appColors'
import { fontFamililes } from '../../../constants/fontFamililes'
import { Facebook_SVG, Google_SVG } from '../../../utils/svg'

const SocialLogin = () => {
    return (
        <SectionComponent>
            <TextComponent
                styles={{ textAlign: 'center' }}
                text='Hoặc'
                color={appColors.gray4}
                size={16}
                font={fontFamililes.medium}
            />
            <SpaceComponent height={16} />
            <ButtonComponent
                type='primary'
                color={appColors.white}
                textColor={appColors.text}
                text='Đăng nhập bằng Google'
                textFont={fontFamililes.regular}
                icon={
                    <Google_SVG />
                }
                iconFlex='left'
            />
            <ButtonComponent
                type='primary'
                color={appColors.white}
                textColor={appColors.text}
                text='Đăng nhập bằng Facebook'
                textFont={fontFamililes.regular}
                icon={
                    <Facebook_SVG />
                }
                iconFlex='left'
            />
        </SectionComponent>
    )
}

export default SocialLogin