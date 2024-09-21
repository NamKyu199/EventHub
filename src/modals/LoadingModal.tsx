import React from 'react'
import { ActivityIndicator, Modal, View } from 'react-native'
import { TextComponent } from '~components'
import { appColors } from '~constants/appColors'
import { globalStyles } from '~styles/globalStyles'

interface Props {
    visible: boolean,
    mess?: string,
    onClose?: () => void
}


const LoadingModal = (props: Props) => {
    const { visible, mess, onClose } = props;
    return (
        <Modal
            visible={visible}
            style={[{ flex: 1 }]}
            transparent
            statusBarTranslucent
        >
            <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <ActivityIndicator color={appColors.white} size={32} />
                <TextComponent text='Loading' flex={0} color={appColors.white} />
            </View>
        </Modal>
    )
}

export default LoadingModal