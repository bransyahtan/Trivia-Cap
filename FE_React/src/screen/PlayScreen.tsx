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

import { ProgressBar, MD3Colors } from "react-native-paper";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserInfo } from "../interface/User";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Quiz } from "../types";
import { socket } from "../utils/socket";
import usePlay from "../hooks/usePlay";
import { styles } from "../styles/playScreenStyle";

const PlayScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [idRoom, setIdRoom] = useState("");
  const [userAnswer, setUserAnswer] = useState([]);
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
    setUser((prev) => ({ ...prev, ...decoded }));
  };

  const handleAnswer = (selected, option) => {
    setSelectedOption(selected);

    socket.emit("answer", {
      name: user.name,
      avatar: user.avatar,
      answer: option,
      idRoom,
    });
  };

  const getIdRoom = async () => {
    const idRoom = await AsyncStorage.getItem("idRoom");
    setIdRoom(idRoom);
  };

  useEffect(() => {
    getIdRoom();
    getAuth();
  }, [isFocused]);

  useEffect(() => {
    // timeout

    if (quize.time === 0 && idRoom !== "") {
      setTimeout(() => {
        setIdx((prev) => prev + 1);
        socket.emit("getQuizes", { idx: idx + 1, idRoom });
        if (selectedOption == quize.answer) {
          socket.emit("user", {
            score: 10,
            idRoom,
          });
        }
      }, 3000);
    }
  }, [quize.time, idRoom]);

  useEffect(() => {
    // Mulai pertanyaan
    if (idRoom !== "") {
      socket.emit("getQuizes", { idx, idRoom });
      socket.on("getQuizes", (data) => {
        if (!data) {
          navigation.navigate("Congrats" as never);
          return;
        }
        setQuize(data);
      });

      socket.on("answer", (data) => {
        setUserAnswer(data);
        console.log("Update Answer");
      });

      socket.on("user", async (data) => {
        const token = await AsyncStorage.getItem("user");
        const decoded = jwtDecode(token) as UserInfo;
        const res = data.filter((u) => u.name == decoded.name)[0];

        setUser((prev) => ({ ...prev, score: res.score }));
      });
    }
  }, [isFocused, idRoom]);

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
            {idx + 1} / {10}
          </Text>

          {/* Timer display */}
          <View style={styles.timer}>
            <Text style={styles.timerText}>
              Timer:{" "}
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                {quize.time}
              </Text>{" "}
              seconds
            </Text>
            <Text>{idRoom}</Text>
          </View>

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
            progress={idx / 9}
            color={MD3Colors.primary50}
            style={{ height: 10, width: "90%", marginHorizontal: "auto" }}
          />
        </View>

        {/* Question */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{quize.question}</Text>
        </View>

        {/* Answer Options */}
        <View style={styles.answerOptionsContainer}>
          {multipleChoice.map((option, idx) => (
            <TouchableOpacity
              key={option + idx}
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
              ]}
              disabled={quize.time === 0}
              onPress={() => handleAnswer(quize[option], option)}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedOption == quize[option] && { fontWeight: "bold" },
                ]}
              >
                {option.toUpperCase()} {quize[option]}
              </Text>
              {quize.time !== 0 && selectedOption == quize[option] && (
                <Image
                  source={{ uri: user.avatar }}
                  style={styles.optionImage}
                />
              )}

              {quize.time === 0 &&
                userAnswer.map((data) => (
                  <>
                    {data.answer == option && (
                      <Image
                        source={{ uri: data.avatar }}
                        style={styles.optionImage}
                      />
                    )}
                  </>
                ))}
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

export default PlayScreen;
