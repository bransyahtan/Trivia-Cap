import {StyleSheet} from "react-native"


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      opacity: 0.95,
    },
    scrollView: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    leaderboardButton: {
      marginTop: -25,
      alignItems: "center",
    },
    leaderboardIcon: {
      width: 35,
      height: 35,
    },
    leaderboardText: {
      color: "white",
      fontSize: 10,
      marginTop: -8,
    },
    avatarButton: {
      position: "absolute",
      top: 35,
      right: -25,
      zIndex: 1,
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
    },
    centeredView: {
      alignItems: "center",
    },
    backgroundImage: {
      width: 430,
      height: 130,
      borderRadius: 65,
      marginTop: 40,
    },
    profileContainer: {
      marginTop: 20,
    },
    profileImage: {
      width: 130,
      height: 130,
      borderRadius: 65,
      borderColor: "white",
      borderWidth: 3,
      shadowOffset: { width: 3, height: 1 },
      shadowColor: "black",
      shadowOpacity: 1,
      shadowRadius: 1,
    },
    profileName: {
      color: "white",
      fontSize: 25,
      fontWeight: "bold",
      textAlign: "center",
      marginTop: 10,
    },
    editProfileButton: {
      top: -105,
      left: 40,
    },
    buttonContainer: {
      marginTop: 50,
      alignItems: "center",
    },
  });