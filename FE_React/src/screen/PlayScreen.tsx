import React, { useState } from "react"
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
import TopUpButton from "../components/TopUpButton"
import { useNavigation } from "@react-navigation/native"

const PlayScreen = () => {
  const navigation = useNavigation()

  const LoginNavigate = () => {
    navigation.navigate("Login" as never)
  }

  const [selectedOption, setSelectedOption] = useState(null)

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

  return (
    <ImageBackground
      source={require("../../assets/images/bg_game.png")}
      style={{ flex: 1, opacity: 0.95 }}
    >
      <ScrollView style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
        <StatusBar />

        <TopUpButton onPress={LoginNavigate} />

        <Image source={require("../../assets/images/2.png")} style={styles.iconText} />

        <View style={styles.score}>
          <Image
            source={require("../../assets/images/score.png")}
            style={{ width: 40, height: 40 }}
          />
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>100</Text>
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
            Negara apa yang paling luas di dunia?
          </Text>

          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedOption === "Indonesia" && { backgroundColor: "#FF4D4D" },
            ]}
            onPress={() => checkAnswer("Indonesia")}
          >
            <Text style={styles.optionText}>A. Indonesia</Text>
          </TouchableOpacity>

          <TouchableOpacity
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
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  )
}

const styles: StyleProp<any> = {
  optionButton: {
    flexDirection: "row",
    backgroundColor: "#39A7FF",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: 300,
    alignItems: "center",
  },
  optionText: {
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
