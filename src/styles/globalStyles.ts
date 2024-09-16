import { StyleSheet } from "react-native";
import { appColors } from "../constants/appColors";
import { fontFamililes } from "../constants/fontFamililes";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appColors.white,
    },
    text: {
        fontFamily: fontFamililes.regular,
        fontSize: 14,
        color: appColors.text
    }
})