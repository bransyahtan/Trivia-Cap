import { Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import MyButton from "../components/Button";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import axios from "axios";
import { API, BASE_URL } from "../utils/api";
import { jwtDecode } from "jwt-decode";

interface UserInfo {
  picture?: string;
  email: string;
  verified_email: boolean;
  name: string;
}

// test
WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [authInProgress, setAuthInProgress] = useState(false);
  const navigate = useNavigation();

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: "226355358927-33ikf3sl0pbvc283t9vk7ehmcrb26nda.apps.googleusercontent.com",
  });

  const handleEffect = async () => {
    const user = await getLocalUser();

    if (!user) {
      setAuthInProgress(true);
      const result = await promptAsync();
      if (result.type == "success") {
        const user = await getUserInfo(result?.authentication?.accessToken || "");
        const response = await axios.post("http://192.168.18.188:8080/api/v1/user", {
          email: user.email,
          avatar: user.picture,
          name: user.name,
        });

        await AsyncStorage.setItem("user", response.data.token);
        navigate.navigate("SelectProfile" as never);
      }
    } else {
      navigate.navigate("Home" as never);
      // console.log(user);
      // console.log("loaded locally");
    }
  };

  const getLocalUser = async () => {
    try {
      const data = await AsyncStorage.getItem("user");
      if (!data) return null;
      return jwtDecode(data) as UserInfo;
    } catch (error) {
      console.log("Error getting local user:", error);
      return null;
    }
  };

  const getUserInfo = async (token: string): Promise<UserInfo> => {
    if (!token) return;
    try {
      const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = await response.json();

      setAuthInProgress(false);
      return user;
    } catch (error) {
      console.log("Error fetching user info:", error);
      setAuthInProgress(false);
    }
  };

  return (
    <ImageBackground source={require("../../assets/images/bg-game.png")} style={{ flex: 1, opacity: 0.95 }}>
      <ScrollView style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <StatusBar />
        <View style={{ alignItems: "center" }}>
          <View style={{ marginTop: 12 }}>
            <Image source={require("../../assets/images/1.png")} style={{ width: 480, height: 480 }} />
          </View>

          <View style={{ marginTop: 10, alignItems: "center" }}>
            <MyButton
              text="Login"
              background="#39A7FF"
              textColor="white"
              onPress={handleEffect}
              // navigateTo="MainApp"
            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({});
