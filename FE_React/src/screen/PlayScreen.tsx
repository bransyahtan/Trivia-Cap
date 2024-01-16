import React, { useEffect, useState } from "react"
import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import questions from "../data/questions"
import { socket } from "../utils/socket"
import { useNavigation } from "@react-navigation/native"
import { AntDesign } from "@expo/vector-icons"

interface Quize {
  a: string
  answer: string
  b: string
  c: string
  id: number
  question: string
}

const PlayScreen = () => {
  const [quizes, setQuizes] = useState<Quize[]>([])
  const navigation = useNavigation()

  const data = questions
  const currentQuestions = data[0]
  const totalQuestions = data.length
  // console.log(currentQuestions)

  //score
  const [score, setScore] = useState(0)

  //index of the question
  const [index, setIndex] = useState(0)

  //answer status (true or false)
  const [answerStatus, setAnswerStatus] = useState(null)

  //answer
  const [answer, setAnswer] = useState([])

  //select answer
  const [selectAnswer, setSelectAnswer] = useState(null)

  //counter
  const [counter, setCounter] = useState(10)

  let interval = null

  const [selectedOption, setSelectedOption] = useState(null)

  // useEffect(() => {
  //   if (selectAnswer !== null) {
  //     if (selectAnswer === currentQuestions?.correctAnswerIndex) {
  //       setScore(score + 10)
  //       setAnswerStatus(true)
  //       answer.push({ question: index + 1, answer: true })
  //     } else {
  //       setAnswerStatus(false)
  //       answer.push({ question: index + 1, answer: false })
  //     }
  //   }
  // }, [selectAnswer])

  // useEffect(() => {
  //   setSelectAnswer(null)
  //   setAnswerStatus(null)
  // }, [currentQuestions])

  // useEffect(() => {
  //   const myInterval = () => {
  //     if (counter >= 1) {
  //       setCounter((counter) => counter - 1)
  //     }
  //     if (counter === 0) {
  //       setIndex(index + 1)
  //       setCounter(15)
  //     }
  //   }
  //   interval = setTimeout(myInterval, 1000)
  //   //clean up
  //   return () => {
  //     clearTimeout(interval)
  //   }
  // }, [counter])

  // useEffect(() => {
  //   if (index + 1 > data.length) {
  //     navigation.navigate("Congrats", {
  //       answer: answer,
  //       score: score,
  //     })
  //   }
  // })

  // useEffect(() => {
  //   if (!interval) {
  //     setCounter(15)
  //   }
  // }, [index])

  const checkAnswer = (selected: any) => {
    const correctAnswer = "Rusia"
    setSelectedOption(selected)

    // Periksa apakah jawaban benar atau salah
    if (selected === correctAnswer) {
      console.log("Jawaban Benar!")
    } else {
      console.log("Jawaban Salah!")
    }
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
      <ScrollView style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
        <StatusBar />

        <View
          style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}
        >
          <Text>Quiz Challenge</Text>
          <Text>{counter}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 10,
          }}
        >
          <Text>Your Progress</Text>
          <Text>
            ({index}/{totalQuestions}) question answered
          </Text>
        </View>

        <View style={{ alignItems: "center", paddingHorizontal: 20, marginTop: 150 }}>
          <Text
            style={{
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
            }}
          >
            {currentQuestions.question}
          </Text>

          {currentQuestions?.options.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={
                selectAnswer === index && index === currentQuestions.correctAnswerIndex
                  ? {
                      flexDirection: "row",
                      backgroundColor: "green",
                      padding: 8,
                      borderRadius: 50,
                      marginVertical: 10,
                      width: 300,
                      alignItems: "center",
                    }
                  : selectAnswer !== null && selectAnswer === index
                  ? {
                      flexDirection: "row",
                      backgroundColor: "red",
                      padding: 8,
                      borderRadius: 50,
                      marginVertical: 10,
                      width: 300,
                      alignItems: "center",
                    }
                  : {
                      flexDirection: "row",
                      backgroundColor: "#39A7FF",
                      padding: 8,
                      borderRadius: 50,
                      marginVertical: 10,
                      width: 300,
                      alignItems: "center",
                    }
              }
              onPress={() => selectAnswer === null && setSelectAnswer(index)}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {selectAnswer === index &&
                index === currentQuestions?.correctAnswerIndex ? (
                  <AntDesign
                    style={styles.optionText}
                    name="check"
                    size={24}
                    color="green"
                  />
                ) : selectAnswer != null && selectAnswer === index ? (
                  <AntDesign
                    style={styles.optionText}
                    name="closecircle"
                    size={24}
                    color="red"
                  />
                ) : (
                  <Text style={styles.optionText}>{item.options}</Text>
                )}

                <Text style={styles.answerText}>{item.answer}</Text>
              </View>
            </TouchableOpacity>
          ))}

          {/* <TouchableOpacity
            style={[
              styles.optionButton,
              selectedOption === "Amerika" && { backgroundColor: "#FF4D4D" },
            ]}
            onPress={() => checkAnswer("Amerika")}
          >
            <Text style={styles.optionText}>B. Amerika</Text>
            <View style={{ flexDirection: "row", marginLeft: 10 }}>
              <Image
                source={require("../../assets/avatar/avatar2.png")}
                style={{ width: 30, height: 30, borderRadius: 15 }}
              />
              <Image
                source={require("../../assets/avatar/avatar1.png")}
                style={{ width: 30, height: 30, borderRadius: 15 }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedOption === "Rusia" && { backgroundColor: "#00CC66" },
            ]}
            onPress={() => checkAnswer("Rusia")}
          >
            <Text style={styles.optionText}>C. Rusia</Text>
            <Image
              source={require("../../assets/avatar/avatar3.png")}
              style={{ width: 30, height: 30, borderRadius: 15, marginLeft: 10 }}
            />
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </ImageBackground>
  )
}

const styles: StyleProp<any> = {
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
}

export default PlayScreen
