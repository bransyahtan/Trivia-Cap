import React, { useState, useEffect } from "react"
import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native"

import MyButton from "../components/Button"
import TopUpButton from "../components/TopUpButton"
import { useNavigation } from "@react-navigation/core"
import ModalAvatar from "../components/ModalAvatar"
import ModalEditProfile from "../components/ModalEditProfile"
import useAuth from "../hooks/useAuth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useIsFocused } from "@react-navigation/native"
import { socket } from "../utils/socket"

export default function HomeScreen() {
  const navigation = useNavigation()
  const [triggerFetch, setTriggerFetch] = useState(0)
  const { getUser, user, handleLogout } = useAuth()
  const isFocused = useIsFocused()

  const handleTopUp = () => {
    navigation.navigate("Shop" as never)
  }

  const clearIdRoom = async () => {
    await AsyncStorage.removeItem("idRoom")
  }



  useEffect(() => {
    clearIdRoom()
    socket.emit("clear", true)
  }, [isFocused])

  return (
    <ImageBackground
      source={require("../../assets/images/bg1.png")}
      style={{ flex: 1, opacity: 0.95 }}
    >
      <ScrollView style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <StatusBar />
        <TopUpButton onPress={handleTopUp} />

        <TouchableOpacity
          onPress={() => navigation.navigate("Leaderboard" as never)}
          style={{ marginTop: -25, alignItems: "center" }}
        >
          <Image
            source={require("../../assets/images/leaderboard-1.png")}
            style={{ width: 35, height: 35 }}
          />
          <Text style={{ color: "white", fontSize: 10, marginTop: -8 }}>Leaderboard</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            position: "absolute",
            top: 35,
            right: -25,
            zIndex: 1,
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <ModalAvatar setTriggerFetch={setTriggerFetch} />
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../assets/images/2.png")}
            style={{ width: 430, height: 130, borderRadius: 65, marginTop: 40 }}
          />
          <View style={{ marginTop: 20 }}>
            <Image
              source={{
                uri: user?.avatar || "https://via.placeholder.com/150",
              }}
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
              {user?.name || "xxx"}
            </Text>
          </View>
          <View style={{ top: -105, left: 40 }}>
            I<ModalEditProfile getUser={getUser} />
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
