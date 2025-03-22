import React, { useState } from 'react'
import { ButtonComponent, ChoiceLocation, ContainerComponent, DateTimePicker, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '~components';
import { useSelector } from 'react-redux';
import { authSelector } from '~redux/reducers/authReducer';
import userAPI from '~apis/userApi';

const initValues = {
  title: '',
  descriptiont: '',
  location: {
    title: '',
    address: ''
  },
  imageUrl: '',
  users: [''],
  authorId: '',
  startAt: Date.now(),
  endAt: Date.now(),
  Date: Date.now(),
}

const AddNewScreen = () => {
  const auth: any = useSelector(authSelector)
  const [eventData, setEventData] = useState<any>({ ...initValues, authorId: auth.id });

  const handleChangeValue = (key: string, value: string | Date) => {
    const items = { ...eventData };
    items[`${key}`] = value;

    setEventData(items);
  };

  const handleAddEvent = async () => {
    const res = await userAPI.HandleUser('/get-all');
    console.log(res)
  }

  return (
    <ContainerComponent isScroll>
      <SectionComponent>
        <TextComponent text='Add new' title />
      </SectionComponent>
      <SectionComponent>
        <InputComponent
          placeholder='Title'
          value={eventData.title}
          onChange={val => handleChangeValue('title:', val)}
          allowClear
        />
        <InputComponent
          placeholder='Descriptiont'
          multiline
          numberOfLines={3}
          value={eventData.descriptiont}
          onChange={val => handleChangeValue('title:', val)}
          allowClear
        />
        <RowComponent>
          <DateTimePicker
            lable='Start at:'
            type='time'
            onSelect={val => handleChangeValue('startAt', val)}
            selected={eventData.startAt} />
          <SpaceComponent width={20} />
          <DateTimePicker
            lable='End at:'
            type='time'
            onSelect={val => handleChangeValue('endAt', val)}
            selected={eventData.endAt} />
        </RowComponent>
        <DateTimePicker
          lable='Date'
          type='date'
          onSelect={val => handleChangeValue('Date', val)}
          selected={eventData.Date} />
        <InputComponent
          placeholder='Title Address'
          value={eventData.descriptiont}
          onChange={val => handleChangeValue('location', { ...eventData.location, title: val })}
          allowClear
        />
        <ChoiceLocation />
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent
          text='Add New'
          onPress={handleAddEvent}
          type='primary'
        />
      </SectionComponent>
    </ContainerComponent>
  )
}

export default AddNewScreen