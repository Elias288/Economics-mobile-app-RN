import { StyleSheet } from "react-native";

const colors = {
    black: '#1d1d1d',
    white: '#fff',
    lightGray: '#bbbbbb',
    gray: '#7e7e7e',
    red: '#ac1212'
}

const generalStyles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        marginVertical: 5,
        padding: 10,
    },
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 20,
        paddingBottom: 100,
    },
    textTitle: {
        fontWeight: "bold",
        fontSize: 30,
        color: colors.black
    },
    textSubtitle: {
        fontWeight: "bold",
        fontSize: 26,
        color: colors.black
    },
});

export {
    generalStyles,
    colors,
};