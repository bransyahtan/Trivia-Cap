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

export default function LoginScreen() {
  return (
    <ImageBackground
      source={require("../../assets/images/bg.png")}
      style={{ flex: 1, opacity: 0.95 }}
    >
      <ScrollView style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
        <StatusBar />
        <View style={{ alignItems: "center" }}>
          <View style={{ marginTop: 12 }}>
            <Image
              source={require("../../assets/images/1.png")}
              style={{ width: 500, height: 500 }}
            />
          </View>

          <View style={{ marginTop: 10, alignItems: "center" }}>
            <MyButton text="Login" background="#39A7FF" textColor="white" />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({})
