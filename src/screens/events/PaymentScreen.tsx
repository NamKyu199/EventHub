import { ArrowCircleLeft, ArrowLeft3, EmptyWallet, Home, Paypal } from 'iconsax-react-native';
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import eventAPI from '~apis/eventApi';
import { ButtonComponent, ContainerComponent, RowComponent, SectionComponent, SpaceComponent, TagComponent, TextComponent } from '~components';
import { appColors } from '~constants/appColors';
import { fontFamililes } from '~constants/fontFamililes';
import { DateTime } from '~utils/DateTime';

const PaymentScreen = ({ navigation, route }: any) => {
  const { billDetail: initialBillDetail } = route.params;
  const [billDetail, setBillDetail] = useState(initialBillDetail);

  const handlePaySuccessfully = async () => {
    const api = `/update-payment-success?billId=${billDetail._id}`;

    try {
      const res = await eventAPI.HandleEvent(api);

      if (res.data.status === "success") {
        console.log("✅ Thanh toán thành công:", JSON.stringify(res.data, null, 2));
        // Cập nhật lại trạng thái của billDetail sau khi thanh toán thành công
        setBillDetail((prevState: any) => ({
          ...prevState,
          status: 'success'
        }));
      } else {
        console.error("❌ Thanh toán thất bại");
      }
    } catch (error) {
      console.error("❌ Lỗi khi thanh toán:", error);
    }
  };

  useEffect(() => {
    // Đảm bảo khi quay lại màn hình, nếu có sự thay đổi từ parent component
    if (route.params?.billDetail) {
      setBillDetail(route.params.billDetail);
    }
  }, [route.params?.billDetail]);

  return (
    <ContainerComponent>
      <SectionComponent>
        <RowComponent justify='space-between' styles={{ marginTop: 12 }}>
          <ArrowLeft3
            onPress={() => navigation.goBack()}
            size={30}
            color={billDetail.status === 'success' ? '#2e7d32' : appColors.primary} />
          <TagComponent
            textColor={billDetail.status === 'success' ? '#2e7d32' : appColors.gray}
            lable={billDetail.status === 'success' ? 'Success' : 'Unpaid'}
            styles={{
              backgroundColor: billDetail.status === 'success' ? '#d4edda' : '#f8d7da',
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 4,
            }}
          />
        </RowComponent>
      </SectionComponent>
      <SectionComponent styles={{ alignItems: 'center' }}>
        <View style={{
          backgroundColor: billDetail.status === 'success' ? appColors.green : appColors.gray2,
          padding: 12,
          borderRadius: 100,
        }}>
          <Paypal size={40} color={billDetail.status === 'success' ? '#2e7d32' : appColors.primary} />
        </View>
        <SpaceComponent height={12} />
        <TextComponent
          text={`ID: ${billDetail._id}`}
          font={fontFamililes.bold}
          size={20} />
        <SpaceComponent height={6} />
        <RowComponent>
          <EmptyWallet size={14} color={appColors.gray} />
          <SpaceComponent width={8} />
          <TextComponent
            font={fontFamililes.regular}
            size={12}
            styles={{ color: appColors.gray }}
            text={`Date: ${DateTime.GetDayString(new Date(billDetail.createAt).getTime())}`}
          />
        </RowComponent>
        <SpaceComponent height={12} />
        <TextComponent
          text={`$: ${parseFloat(billDetail.price).toLocaleString()}`}
          font={fontFamililes.semiBold}
          size={24}
          color={billDetail.status === 'success' ? '#2e7d32' : appColors.primary}
        />
      </SectionComponent>
      <SectionComponent
        styles={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: 12
        }}>
        <RowComponent justify='space-between'>
          <TextComponent text='Total change' />
          <TextComponent text={`$${billDetail.price}`} font={fontFamililes.medium} color={appColors.primary} />
        </RowComponent>

        <ButtonComponent
          disable={billDetail.status === 'success'}
          onPress={handlePaySuccessfully}
          text='Pay now'
          type='primary'
          styles={{
            backgroundColor: billDetail.status === 'success' ? '#2e7d32' : appColors.primary,
            opacity: billDetail.status === 'success' ? 0.6 : 1, // Nhạt hơn khi disable
            marginBottom: 12,
            marginVertical: 12,
          }}
        />
        <TextComponent
          text='Payment securely processed by Paypal'
          styles={{ textAlign: 'center', fontSize: 12, color: appColors.gray }}
        />
      </SectionComponent>
    </ContainerComponent>
  );
}

export default PaymentScreen;