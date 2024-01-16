import React, { useState, useEffect } from "react"
import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native"
import TopUpButton from "../components/TopUpButton"
import { useNavigation } from "@react-navigation/native"
import { socket } from "../utils/socket"

const PlayScreen = () => {
  const navigation = useNavigation()
  const [quizes, setQuizes] = useState([])

  const LoginNavigate = () => {
    navigation.navigate("Login" as never)
  }

  const [selectedOption, setSelectedOption] = useState(null)
  const [answerOptions, setAnswerOptions] = useState([
    {
      label: "A. Indonesia",
      value: "Indonesia",
      isRight: false,
      isWrong: false,
    },
    { label: "B. Amerika", value: "Amerika", isRight: false, isWrong: false },
    { label: "C. Rusia", value: "Rusia", isRight: false, isWrong: false },
  ])

  // Timer state and effect
  const [timer, setTimer] = useState(10)

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0))
    }, 1000)
    if (timer === 0) {
      clearInterval(timerInterval)
      revealAnswers()
    }

    return () => clearInterval(timerInterval)
  }, [timer])

  const revealAnswers = () => {
    const correctAnswer = "Rusia"
    const updatedOptions = [...answerOptions]
    updatedOptions.forEach((option) => {
      option.isRight = option.value === correctAnswer
      option.isWrong = option.value !== correctAnswer
    })
    setAnswerOptions(updatedOptions)
  }

  const checkAnswer = (selected) => {
    setSelectedOption(selected)
  }

  useEffect(() => {
    socket.connect()

    socket.on("getQuizes", (data) => setQuizes(data))

    return () => {
      socket.disconnect()
    }
  }, [])

  console.log(quizes)
  return (
    <ImageBackground
      source={require("../../assets/images/bg_game.png")}
      style={{ flex: 1, opacity: 0.95 }}
    >
      <ScrollView style={styles.container}>
        <StatusBar />

        <View
          style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}
        >
          <Text>Quiz Challenge</Text>
          <Text>Timer</Text>
        </View>

        <Image source={require("../../assets/images/2.png")} style={styles.iconText} />

        {/* Timer display */}
        <View style={styles.timer}>
          <Text style={styles.timerText}>Timer: {timer} seconds</Text>
        </View>

        {/* Question */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>Negara apa yang paling luas di dunia?</Text>
        </View>

        {/* Answer Options */}
        <View style={styles.answerOptionsContainer}>
          {answerOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                option.isRight && styles.correctOption,
                option.isWrong && styles.incorrectOption,
              ]}
              onPress={() => checkAnswer(option.value)}
            >
              <Text style={styles.optionText}>{option.label}</Text>
              {option.isWrong && (
                <Image
                  source={require("../../assets/avatar/avatar2.png")}
                  style={styles.optionImage}
                />
              )}
              {option.isRight && (
                <Image
                  source={require("../../assets/avatar/avatar3.png")}
                  style={[styles.optionImage, { marginLeft: 10 }]}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
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
    fontWeight: "bold",
  },
  questionContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
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
  optionButton: {
    flexDirection: "row",
    backgroundColor: "#39A7FF",
    padding: 8,
    borderRadius: 50,
    marginVertical: 10,
    width: 300,
    alignItems: "center",
  },
  optionText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    borderWidth: 0.5,
    borderColor: "white",
    width: 40,
    height: 40,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
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
})

export default PlayScreen
