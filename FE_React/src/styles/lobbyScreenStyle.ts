import {StyleSheet} from "react-native"


export const styles = StyleSheet.create({
    table: {
      alignItems: "center",
      margin: 8,
      marginTop: 20,
    },
    spinner: {
      marginBottom: 50,
    },
    avatarContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatarImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginBottom: 8,
    },
    avatarName: {
      color: "white",
    },
    iconText: {
      width: 55,
      height: 100,
    },
    score: {
      marginRight: 5,
      position: "absolute",
      top: 10,
      left: 150,
      zIndex: 1,
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
    },
  })