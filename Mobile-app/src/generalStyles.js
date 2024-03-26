import { StyleSheet } from "react-native";

const generalStyles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
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
    },
    textSubtitle: {
        fontWeight: "bold",
        fontSize: 26,
    },
});

export default generalStyles;