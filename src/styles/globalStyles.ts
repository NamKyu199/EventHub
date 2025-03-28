import { StyleSheet } from 'react-native';
import { appColors } from '../constants/appColors';
import { fontFamililes } from '~constants/fontFamililes';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },

  text: {
    fontFamily: fontFamililes.regular,
    fontSize: 14,
    color: appColors.text,
  },

  button: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    // minHeight: 56,
    flexDirection: 'row',
  },
  shadow: {
    shadowColor: 'rgba(0, 0, 0, 0.7)', // Màu bóng
    shadowOffset: { width: 0, height: 0 }, // Không lệch hướng
    shadowOpacity: 0.5, // Độ rõ bóng
    shadowRadius: 12, // Lan tỏa bóng
    elevation: 12, // Android cần giá trị cao hơn để thấy rõ
  },

  section: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3D56F0',
    width: 30,
    height: 30,
    borderRadius: 100,
  },

  tag: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: appColors.white,
    borderRadius: 100,
  },

  card: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: appColors.white,
    marginHorizontal: 12,
    marginVertical: 6,
    marginBottom: 16
  },
  nospaceCard: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0
  },
  inputcontainer: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appColors.gray3,
    width: '100%',
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: appColors.white,
    marginBottom: 19,
  },
  input: {
    padding: 0,
    margin: 0,
    flex: 1,
    paddingHorizontal: 14,
    color: appColors.text,
    letterSpacing: 1
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});