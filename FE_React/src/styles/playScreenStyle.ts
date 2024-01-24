import {StyleSheet} from "react-native"


export const styles = StyleSheet.create({
    container: {
      backgroundColor: "rgba(0,0,0,0.6)",
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
    timer: {
      alignItems: "center",
      marginTop: 10,
      marginBottom: 20,
    },
    timerText: {
      color: "white",
      fontSize: 18,
    },
    questionContainer: {
      alignItems: "center",
      paddingHorizontal: 20,
      marginTop: 20,
    },
    score: {
      color: "white",
      fontSize: 24,
      fontWeight: "bold",
    },
    questionText: {
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 20,
      padding: 30,
      borderRadius: 20,
      backgroundColor: "#E1C78F",
      textShadowColor: "black",
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
    },
    answerOptionsContainer: {
      alignItems: "center",
      marginTop: 20,
    },
    correctAnswer: {
      backgroundColor: "#66f01d",
      opacity: 1,
      borderColor: "green",
      borderWidth: 5,
      color: "white",
    },
    wrongAnswer: {
      backgroundColor: "red",
      opacity: 1,
      borderColor: "tomato",
      borderWidth: 5,
      color: "white",
    },
    optionButton: {
      flexDirection: "row",
      backgroundColor: "#f5f5f5",
      padding: 8,
      borderRadius: 50,
      marginVertical: 10,
      width: 300,
      alignItems: "center",
      opacity: 0.8,
      borderWidth: 5,
      borderColor: "transparent",
    },
    optionText: {
      fontWeight: "normal",
      fontSize: 15,
      padding: 5,
    },
    selectedAnswer: {
      backgroundColor: "white",
      opacity: 1,
      borderColor: "#E1C78F",
      borderWidth: 5,
    },
    answerText: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
    },
    correctOption: {
      backgroundColor: "#00CC66",
    },
    incorrectOption: {
      backgroundColor: "#FF4D4D",
    },
    optionImage: {
      width: 30,
      height: 30,
      borderRadius: 15,
    },
  });