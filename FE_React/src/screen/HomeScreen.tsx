import React, { useState, useEffect } from "react"
import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native"
import MyButton from "../components/Button"
import TopUpButton from "../components/TopUpButton"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/core"
import ModalEditProfile from "../components/ModalEditProfile"

interface UserInfo {
  picture?: string
  email: string
  verified_email: boolean
  name: string
}

export default function HomeScreen() {
  const navigation = useNavigation()
  const [user, setUser] = useState<UserInfo | null>(null)

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    try {
      const data = await AsyncStorage.getItem("user")
      console.log(data)
      if (data) {
        const userData = JSON.parse(data) as UserInfo
        setUser(userData)
      }
    } catch (error) {
      console.error("Error getting user data:", error)
    }
  }

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user")

      setUser(null)
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  const handleTopUp = () => {
    navigation.navigate("Shop" as never)
    console.log("aaaa")
  }

  return (
    <ImageBackground
      source={require("../../assets/images/bg1.png")}
      style={{ flex: 1, opacity: 0.95 }}
    >
      <ScrollView style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <StatusBar />
        <TopUpButton onPress={handleTopUp} />
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../assets/images/2.png")}
            style={{ width: 430, height: 130, borderRadius: 65, marginTop: 50 }}
          />
          <View style={{ marginTop: 20 }}>
            <Image
              source={require("../../assets/avatar/avatar1.png")}
              style={{
                width: 130,
                height: 130,
                borderRadius: 65,
                borderColor: "white",
                borderWidth: 3,
                shadowOffset: { width: 3, height: 1 },
                shadowColor: "black",
                shadowOpacity: 1,
                shadowRadius: 1,
              }}
            />

            <Text
              style={{
                color: "white",
                fontSize: 25,
                fontWeight: "bold",
                textAlign: "center",
                marginTop: 10,
              }}
            >
              Player 1
            </Text>
          </View>
          <View style={{ top: -105, left: 40 }}>
            I<ModalEditProfile />
          </View>
          <View style={{ marginTop: 50, alignItems: "center" }}>
            <MyButton
              text="Play Game"
              background="#39A7FF"
              textColor="white"
              navigateTo="Lobby"
            />
            <MyButton
              text="Logout"
              background="#BE3144"
              textColor="white"
              navigateTo="Login"
              onPress={handleLogout}
            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({})
