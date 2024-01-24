import {StyleSheet} from "react-native"


export const styles = StyleSheet.create({
    podiumFirst: {
      marginTop: 20,
      backgroundColor: "#F4CE14",
      paddingHorizontal: 40,
      paddingVertical: 20,
      borderRadius: 10,
      marginBottom: 13,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 20,
    },
    imageFirst: {
      width: 130,
      height: 130,
      borderRadius: 65,
      borderColor: "white",
      borderWidth: 2,
    },
    imageX: {
      width: 50,
      height: 50,
      borderRadius: 100,
      marginRight: 20,
      borderColor: "white",
      borderWidth: 2,
    },
    podiumX: {
      flexDirection: "row",
      backgroundColor: "#bbb",
      textShadowColor: "black",
      padding: 15,
      borderRadius: 20,
      marginVertical: 10,
      width: 300,
      alignItems: "center",
    },
  
    optionText: {
      color: "black",
      fontSize: 20,
      fontWeight: "bold",
      textShadowColor: "black",
      textShadowRadius: 2,
      textShadowOffset: { width: 1, height: 1 },
    },
  
    iconText: {
      width: 180,
      height: 180,
      marginRight: 5,
      position: "absolute",
      top: -55,
      left: -30,
      zIndex: 1,
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
    },
  
    nameText: {
      color: "white",
      fontSize: 25,
      fontWeight: "bold",
      textAlign: "center",
      textShadowColor: "black",
      textShadowRadius: 2,
      textShadowOffset: { width: 1, height: 1 },
    },
  
    scoreText: {
      color: "#000",
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
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
  
    homeNavigate: {
      backgroundColor: "skyblue",
      width: 150,
      paddingVertical: 10,
      color: "#000",
      fontWeight: "bold",
      textShadowColor: "white",
      textShadowRadius: 2,
      textShadowOffset: { width: 1, height: 1 },
      borderRadius: 10,
      marginTop: 18,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      gap: 5,
    },
  });
  