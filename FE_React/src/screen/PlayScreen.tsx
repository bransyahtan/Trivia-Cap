import React, { useState, useEffect } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { socket } from "../utils/socket";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { UserInfo } from "../interface/User";
import { ProgressBar, MD3Colors } from "react-native-paper";

interface Quiz {
  question: string;
  a: string;
  b: string;
  c: string;
  answer: string;
  time: number;
}

const PlayScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [user, setUser] = useState<UserInfo & { score: number }>({
    avatar: "",
    email: "",
    id: 0,
    name: "",
    score: 0,
    wallet: 0,
  });

  const [selectedOption, setSelectedOption] = useState(null);
  const [quize, setQuize] = useState<Quiz>({
    question: "...",
    a: "",
    b: "",
    c: "",
    answer: "",
    time: 0.01,
  });
  const [idx, setIdx] = useState(0);

  const multipleChoice = ["a", "b", "c"];

  const getAuth = async () => {
    const token = await AsyncStorage.getItem("user");
    const decoded = jwtDecode(token) as UserInfo;
    setUser({ ...decoded, score: 0 });
  };

  const handleAnswer = (selected) => {
    setSelectedOption(selected);
  };

  useEffect(() => {
    if (quize.time === 0) {
      setTimeout(() => {
        setIdx((prev) => prev + 1);
        socket.emit("getQuizes", { idx: idx + 1 });
        if (selectedOption == quize.answer) {
          socket.emit("user", {
            name: user.name,
            score: 10,
          });
        }
      }, 3000);
    }
  }, [quize.time]);

  useEffect(() => {
    getAuth();
    socket.emit("getQuizes", { idx });
    socket.on("getQuizes", (data) => {
      if (!data) {
        navigation.navigate("Leaderboard" as never);
      }
      setQuize(data);
    });

    socket.on("user", (data) => {
      setUser((prev) => ({ ...prev, score: data.score }));
    });
  }, [isFocused]);

  return (
    <ImageBackground
      source={require("../../assets/images/bg_game.png")}
      style={{ flex: 1, opacity: 0.95 }}
    >
      <ScrollView style={styles.container}>
        <StatusBar />
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            padding: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
            {idx + 1} / 10
          </Text>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/images/score.png")}
              style={{ width: 40, height: 40 }}
            />
            <Text style={styles.score}>{user.score}</Text>
          </View>
        </View>
        <View>
          <ProgressBar
            progress={idx / 10}
            color={MD3Colors.primary50}
            style={{ height: 10, width: "90%", marginHorizontal: "auto" }}
          />
        </View>

        {/* Timer display */}
        <View style={styles.timer}>
          <Text style={styles.timerText}>
            Timer:{" "}
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              {quize.time}
            </Text>{" "}
            seconds
          </Text>
        </View>

        {/* Question */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{quize.question}</Text>
        </View>

        {/* Answer Options */}
        <View style={styles.answerOptionsContainer}>
          {multipleChoice.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionButton,
                // check if option is selected
                selectedOption == quize[option] && styles.selectedAnswer,

                // check if option is correct

                selectedOption == quize[option] && quize.time === 0
                  ? selectedOption == quize.answer
                    ? {
                        backgroundColor: "#66f01d",
                        borderColor: "green",
                      }
                    : {
                        backgroundColor: "tomato",
                        borderColor: "red",
                      }
                  : {
                      backgroundColor: "#f5f5f5",
                    },

                // quize.time === 0
                //   ? quize[option] == selectedOption && quize.answer == quize[option]
                //     ? {
                //         backgroundColor: "#66f01d",
                //         borderColor: "green",
                //       }
                //     : {
                //         backgroundColor: "tomato",
                //         borderColor: "red",
                //       }
                //   : {
                //       backgroundColor: "#f5f5f5",
                //     },
              ]}
              disabled={quize.time === 0}
              onPress={() => handleAnswer(quize[option])}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedOption == quize[option] && { fontWeight: "bold" },
                ]}
              >
                {option.toUpperCase()} {quize[option]}
              </Text>
              {selectedOption == quize[option] && (
                <Image
                  source={require("../../assets/avatar/avatar2.png")}
                  style={styles.optionImage}
                />
              )}
            </TouchableOpacity>
          ))}

          {quize.time === 0 && (
            <Text
              style={{ fontSize: 24, fontWeight: "bold", color: "whitesmoke" }}
            >
              Jawaban Benar:{" "}
              <Text style={{ display: "flex", color: "white" }}>
                {quize.answer}
              </Text>
            </Text>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

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

export default PlayScreen;
