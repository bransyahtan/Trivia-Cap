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
  Button,
} from "react-native"

import MyButton from "../components/Button"
import TopUpButton from "../components/TopUpButton"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/core"
import { jwtDecode } from "jwt-decode"
import Modal from "react-native-modal"
import { API } from "../utils/api"
import ModalAvatar from "../components/ModalAvatar"
import axios from "axios"
import ModalEditProfile from "../components/ModalEditProfile"
import { useIsFocused } from "@react-navigation/native"

interface UserInfo {
  email: string
  name: string
  avatar: string
  id: number
  wallet: number
}

export default function HomeScreen() {
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const [user, setUser] = useState<UserInfo | null>(null)
  const [triggerFetch, setTriggerFetch] = useState(0)

  const getUser = async () => {
    try {
      const response = await API.get("api/v1/detail-user", {
        headers: {
          Authorization: "Bearer " + (await AsyncStorage.getItem("user")),
        },
      })
      setUser(response.data.data)
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
  }

  useEffect(() => {
    getUser()
  }, [triggerFetch, isFocused])

  return (
    <ImageBackground
      source={require("../../assets/images/bg1.png")}
      style={{ flex: 1, opacity: 0.95 }}
    >
      <ScrollView style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <StatusBar />
        <TopUpButton onPress={handleTopUp} />
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
            style={{ width: 430, height: 130, borderRadius: 65, marginTop: 10 }}
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
