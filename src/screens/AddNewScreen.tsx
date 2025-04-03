import React, { useEffect, useState } from 'react'
import { ButtonComponent, ButtonImagePicker, ChoiceLocation, ContainerComponent, DateTimePicker, DropdownPicker, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '~components';
import { useSelector } from 'react-redux';
import { authSelector } from '~redux/reducers/authReducer';
import userAPI from '~apis/userApi';
import { SelectModel } from '~models/SelectModel';
import { Alert, Image } from 'react-native';
import { ImageOrVideo } from 'react-native-image-crop-picker';
import { Validate } from '~utils/validate';
import { appColors } from '~constants/appColors';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventModle } from '~models/EventModel';
import eventAPI from '~apis/eventApi';

const initValues = {
  title: '',
  description: '',
  locationTitle: '',
  locationAddress: '',
  position: {
    lat: '',
    long: '',
  },
  photoUrl: '',
  users: [],
  authorId: '',
  startAt: Date.now(),
  endAt: Date.now(),
  date: Date.now(),
  price: '',
  category: ''
}

const AddNewScreen = ({ navigation }: any) => {
  const auth: any = useSelector(authSelector);
  const [eventData, setEventData] = useState<any>({
    ...initValues,
    authorId: auth.id
  });
  const [usersSelect, setUsersSelect] = useState<SelectModel[]>([]);
  const [fileSelected, setFileSelected] = useState<any>();
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]); // Thêm state mới

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  useEffect(() => {
    const mess = Validate.EventValidation(eventData);
    setErrorMessage(mess)
  }, [eventData]);

  // Lắng nghe thay đổi của selectedUsers để cập nhật eventData
  useEffect(() => {
    handleChangeValue('users', selectedUsers);
  }, [selectedUsers]);

  const handleGetAllUsers = async () => {
    const api = `/get-all`;
    try {
      const res: any = await userAPI.HandleUser(api);
      if (res && res.data) {
        const items: SelectModel[] = res.data.map((item: any) => ({
          label: item.fullName ? item.fullName : item.email,
          value: item.id,
        }));
        setUsersSelect(items);
      }
    } catch (error) {
      console.log('Lỗi', error);
    }
  };

  const saveImageToStorage = async (file: ImageOrVideo) => {
    try {
      if (!file?.path) return null;

      const filename = file.filename || `image_${Date.now()}.jpg`;
      const destPath = `${RNFS.DocumentDirectoryPath}/${filename}`;

      await RNFS.copyFile(file.path, destPath);

      return `file://${destPath}`;
    } catch (error) {
      console.error("Lỗi khi lưu ảnh:", error);
      return null;
    }
  };

  const handleAddEvent = async () => {
    let savedPhotoPath = eventData.photoUrl;

    if (fileSelected) {
      const newPath = await saveImageToStorage(fileSelected);
      if (newPath) savedPhotoPath = newPath;
    }

    const newEventData = {
      ...eventData,
      photoUrl: savedPhotoPath,
      authorIds: auth.id,
      authorName: auth.fullName,
      authorEmail: auth.email,
      authorPhotoUrl: auth.photo,
    };

    await AsyncStorage.setItem("savedEvent", JSON.stringify(newEventData));
    console.log(newEventData)
    navigation.navigate('Explore', {
      screen: 'HomeScreen'
    });

    await eventAPI.HandleEvent(`/add-new`, newEventData, 'post');
  };

  const handleFileSelected = (val: ImageOrVideo) => {
    setFileSelected(val);
    handleChangeValue('photoUrl', val.path);
  };

  const handleChangeValue = (key: string, value: any) => {
    setEventData((prevState: any) => ({
      ...prevState,
      [key]: value
    }));
  };

  return (
    <ContainerComponent isScroll>
      <SectionComponent>
        <TextComponent text='Add new' title />
      </SectionComponent>
      <SectionComponent>
        {(eventData.photoUrl || fileSelected?.path) && (
          <Image
            source={{ uri: eventData.photoUrl || fileSelected.path }}
            style={{ width: '100%', height: 250, marginBottom: 12 }}
            resizeMode='cover'
          />
        )}
        <ButtonImagePicker onSelect={(val: any) =>
          val.type === 'url'
            ? handleChangeValue('photoUrl', val.value as string)
            : handleFileSelected(val.value)
        } />
        <InputComponent
          placeholder='Title'
          value={eventData.title}
          onChange={val => handleChangeValue('title', val)}
          allowClear
        />
        <InputComponent
          placeholder='Description'
          multiline
          numberOfLines={3}
          value={eventData.description}
          onChange={val => handleChangeValue('description', val)}
          allowClear
        />
        <DropdownPicker
          selected={eventData.category}
          values={[
            { label: 'Sport', value: 'sport' },
            { label: 'Food', value: 'food' },
            { label: 'Art', value: 'art' },
            { label: 'Music', value: 'music' }
          ]}
          onSelect={(val) => handleChangeValue('category', val)}
        />
        <RowComponent>
          <DateTimePicker label='Start at:' type='time' onSelect={val => handleChangeValue('startAt', val)} selected={eventData.startAt} />
          <SpaceComponent width={20} />
          <DateTimePicker label='End at:' type='time' onSelect={val => handleChangeValue('endAt', val)} selected={eventData.endAt} />
        </RowComponent>
        <DateTimePicker label='Date' type='date' onSelect={val => handleChangeValue('date', val)} selected={eventData.date} />

        {/* Sửa lỗi DropdownPicker */}
        <DropdownPicker
          label='Invited users'
          values={usersSelect}
          onSelect={(val) => setSelectedUsers(Array.isArray(val) ? val : [val])}
          selected={selectedUsers}
          mutible
        />

        <InputComponent
          placeholder='Title Address'
          value={eventData.locationTitle}
          onChange={val => handleChangeValue('locationTitle', val)}
          allowClear
        />
        <ChoiceLocation onSelect={(val) => {
          handleChangeValue('locationAddress', val.address);
          handleChangeValue('position', val.position ? { lat: val.position.lat, long: val.position.long } : { lat: '', long: '' });
        }} />
        <InputComponent
          placeholder='Price'
          type='number-pad'
          allowClear
          value={eventData.price}
          onChange={val => handleChangeValue('price', val)}
        />
      </SectionComponent>
      {errorMessage.length > 0 && (
        <SectionComponent>
          {errorMessage.map(mess => (
            <TextComponent
              text={mess}
              key={mess}
              color={appColors.danger}
              styles={{ marginBottom: 12 }}
            />
          ))}
        </SectionComponent>
      )}
      <SectionComponent>
        <ButtonComponent
          disable={errorMessage.length > 0}
          text='Add New'
          onPress={handleAddEvent}
          type='primary'
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default AddNewScreen;
