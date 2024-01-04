import React, { useState, useEffect } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MyButton from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserInfo {
  picture?: string;
  email: string;
  verified_email: boolean;
  name: string;
}

export default function HomeScreen() {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const data = await AsyncStorage.getItem("user");
      console.log(data);
      if (data) {
        const userData = JSON.parse(data) as UserInfo;
        setUser(userData);
      }
    } catch (error) {
      console.error("Error getting user data:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user");

      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

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
            <MyButton
              text="Play Game"
              background="#39A7FF"
              textColor="white"
              navigateTo="Login"
            />

            <MyButton
              text="Logout"
              background="#BE3144"
              textColor="white"
              onPress={handleLogout}
              navigateTo="Login"
            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({});
