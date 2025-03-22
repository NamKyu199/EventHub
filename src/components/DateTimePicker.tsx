import { View, Text } from 'react-native'
import React, { useState } from 'react'
import DatePicker from 'react-native-date-picker'
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import { ArrowDown2, Calendar, Clock } from 'iconsax-react-native';
import { appColors } from '~constants/appColors';
import { globalStyles } from '~styles/globalStyles';
import { fontFamililes } from '~constants/fontFamililes';
import { DateTime } from '~utils/DateTime';

interface Props {
    selected: Date,
    type: 'date' | 'time',
    onSelect: (val: Date) => void;
    lable?: string
}

const DateTimePicker = (props: Props) => {

    const { type, onSelect, selected, lable } = props;
    const [isShowDatePicker, setIsShowDatePicker] = useState(false);

    return (
        <View style={{ flex: 1 }}>
            {lable && (
                <TextComponent text={lable} styles={{ marginBottom: 8 }} />
            )}
            <RowComponent styles={[globalStyles.inputcontainer]} onPress={() => setIsShowDatePicker(true)}>
                <TextComponent
                    text={`${selected ? (type === 'time' ? DateTime.GetTime(selected) : DateTime.GetDate(selected)) : 'Choice'}`}
                    flex={1}
                    font={fontFamililes.medium}
                    styles={{ textAlign: 'center' }}
                />
                {type === 'time' ? (
                    <Clock size={22} color={appColors.gray} />
                ) : (
                    <Calendar size={22} color={appColors.gray} />
                )}
            </RowComponent>
            <DatePicker
                mode={type}
                open={isShowDatePicker}
                date={new Date()}
                modal
                onCancel={() => setIsShowDatePicker(false)}
                onConfirm={val => {
                    setIsShowDatePicker(false);
                    onSelect(val);
                }}
            />
        </View>
    )
}

export default DateTimePicker