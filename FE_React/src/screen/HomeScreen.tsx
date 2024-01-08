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
import TopUpButton from "../components/TopUpButton"
import { useNavigation } from "@react-navigation/native"

export default function HomeScreen() {
  const navigation = useNavigation()

  const LoginNavigate = () => {
    navigation.navigate("Login" as never)
  }

  return (
    <ImageBackground
      source={require("../../assets/images/bg1.png")}
      style={{ flex: 1, opacity: 0.95 }}
    >
      <ScrollView style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <StatusBar />

        <TopUpButton onPress={LoginNavigate} />

        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../assets/images/2.png")}
            style={{ width: 430, height: 130, borderRadius: 65, marginTop: 30 }}
          />

          <View style={{ marginTop: 20 }}>
            <Image
              source={require("../../assets/avatar/avatar1.png")}
              style={{ width: 130, height: 130, borderRadius: 65 }}
            />
            <Text
              style={{
                color: "white",
                fontSize: 25,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              User
            </Text>
            I
          </View>

          <View style={{ marginTop: 80, alignItems: "center" }}>
            <MyButton text="Play Game" background="#39A7FF" textColor="white" />
            <MyButton text="Logout" background="#BE3144" textColor="white" />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({})
