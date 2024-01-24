import {StyleSheet} from "react-native"


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    header: {
      width: 200,
      height: 30,
      marginLeft: -10,
    },
    item: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 12,
      backgroundColor: "white",
      borderRadius: 8,
      marginBottom: 8,
    },
    rank: {
      fontSize: 18,
      fontWeight: "bold",
      marginRight: 8,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 8,
    },
    playerInfo: {
      flex: 1,
    },
    playerName: {
      fontSize: 18,
      marginRight: 8,
    },
    score: {
      fontSize: 18,
      fontWeight: "bold",
    },
    medal: {
      width: 45,
      height: 45,
    },
    crown: {
      width: 120,
      height: 120,
      marginBottom: -32,
    },
    winner: {
      width: 120,
      height: 120,
      borderWidth: 4,
      borderColor: "white",
      borderRadius: 20,
      elevation: 5,
    },
    winnerName: {
      backgroundColor: "white",
      marginTop: 5,
      paddingHorizontal: 15,
      paddingVertical: 3,
      borderRadius: 10,
      fontSize: 20,
      fontWeight: "bold",
      color: "black",
      textShadowColor: "white",
      textShadowOffset: { width: 1, height: 1 },
    },
    winnerContainer: {
      alignItems: "center",
      marginBottom: 40,
      paddingBottom: 20,
      borderRadius: 20,
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