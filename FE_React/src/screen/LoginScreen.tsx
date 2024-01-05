import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import MyButton from "../components/Button";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";

interface UserInfo {
  picture?: string;
  email: string;
  verified_email: boolean;
  name: string;
}

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [authInProgress, setAuthInProgress] = useState(false);
  const navigate = useNavigation();

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:
      "226355358927-33ikf3sl0pbvc283t9vk7ehmcrb26nda.apps.googleusercontent.com",
  });

  // useEffect(() => {
  //   if (
  //     authInProgress &&
  //     response?.type === "success" &&
  //     response.authentication
  //   ) {
  //     getUserInfo(response.authentication.accessToken);
  //   }
  // }, [response]);

  const handleEffect = async () => {
    const user = await getLocalUser();

    if (!user) {
      setAuthInProgress(true);
      const result = await promptAsync();
      console.log(result);
      if (result.type == "success") {
        getUserInfo(result?.authentication?.accessToken || "");
        navigate.navigate("SelectProfile" as never);
      }
    } else {
      // navigate.navigate("Home" as never);
      console.log(user);
      console.log("loaded locally");
    }
  };

  const getLocalUser = async () => {
    try {
      const data = await AsyncStorage.getItem("user");
      if (!data) return null;
      return JSON.parse(data) as UserInfo;
    } catch (error) {
      console.log("Error getting local user:", error);
      return null;
    }
  };

  const getUserInfo = async (token: string) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();

      await AsyncStorage.setItem("user", JSON.stringify(user));
      setAuthInProgress(false);
    } catch (error) {
      console.log("Error fetching user info:", error);
      setAuthInProgress(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/bg1.png")}
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
