import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native"
import React from "react"
import TopUpButton from "../components/TopUpButton"
import { useNavigation } from "@react-navigation/native"

export default function CongratsScreen() {
  const navigation = useNavigation()

  const LoginNavigate = () => {
    navigation.navigate("Login")
  }

  return (
    <ImageBackground
      source={require("../../assets/images/bg_game.png")}
      style={{ flex: 1, opacity: 0.95 }}
    >
      <ScrollView style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
        <StatusBar />

        <TopUpButton onPress={LoginNavigate} />

        <Image source={require("../../assets/images/2.png")} style={[styles.iconText]} />

        <View style={[styles.score]}>
          <Image
            source={require("../../assets/images/score.png")}
            style={{ width: 40, height: 40 }}
          />
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>100</Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <Text
            style={{ color: "white", fontSize: 35, fontWeight: "bold", marginTop: 80 }}
          >
            CONGRATS
          </Text>

          <View
            style={{
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
            }}
          >
            <Image
              source={require("../../assets/avatar/avatar1.png")}
              style={{
                width: 130,
                height: 130,
                borderRadius: 65,
                borderColor: "white",
                borderWidth: 2,
              }}
            />
            <Text
              style={{
                color: "white",
                fontSize: 25,
                fontWeight: "bold",
                textAlign: "center",
                textShadowColor: "black",
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 1,
              }}
            >
              User 1
            </Text>
          </View>

          <View style={[styles.optionButton]}>
            <Image
              source={require("../../assets/avatar/avatar8.png")}
              style={{
                width: 50,
                height: 50,
                borderRadius: 100,
                marginRight: 20,
                borderColor: "white",
                borderWidth: 2,
              }}
            />
            <Text style={styles.optionText}>User 2</Text>
            <View style={{ flexDirection: "row", marginLeft: 10 }}></View>
          </View>

          <View style={[styles.optionButton]}>
            <Image
              source={require("../../assets/avatar/avatar6.png")}
              style={{
                width: 50,
                height: 50,
                borderRadius: 100,
                marginRight: 20,
                borderColor: "white",
                borderWidth: 2,
              }}
            />
            <Text style={styles.optionText}>User 3</Text>
            <View style={{ flexDirection: "row", marginLeft: 10 }}></View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  optionButton: {
    flexDirection: "row",
    backgroundColor: "#bbb",
    textShadowColor: "black",
    textShadowRadius: 2,
    textShadowOffset: { width: 2, height: 2 },
    padding: 15,
    borderRadius: 20,
    marginVertical: 10,
    width: 300,
    alignItems: "center",
  },
  optionText: {
    color: "white",
    fontSize: 20,
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
})
