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
import MyButton from "../components/Button"

export default function HomeScreen() {
  return (
    <ImageBackground
      source={require("../../assets/images/bg.png")}
      style={{ flex: 1, opacity: 0.95 }}
    >
      <ScrollView style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
        <StatusBar />
        <View style={{ alignItems: "center" }}>
          <View style={{ marginTop: 100 }}>
            <Image
              source={require("../../assets/images/Logo.png")}
              style={{ width: 200, height: 200 }}
            />
          </View>

          <View>
            <Text
              style={{
                color: "white",
                fontSize: 40,
                fontWeight: "bold",
                width: 224,
                textAlign: "center",
                marginTop: 30,
              }}
            >
              Trivia Cap
            </Text>
          </View>

          <View style={{ marginTop: 10, alignItems: "center" }}>
            <MyButton text="Play Game" background="#39A7FF" textColor="white" />
            <MyButton text="Logout" background="#BE3144" textColor="white" />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({})
