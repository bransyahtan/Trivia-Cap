import React, { useState, useEffect } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MyButton from "../components/Button";
import TopUpButton from "../components/TopUpButton";
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
      source={require("../../assets/images/bg1.png")}
      style={{ flex: 1, opacity: 0.95 }}
    >
      <ScrollView style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <StatusBar />

        <TopUpButton />

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
  );
}

const styles = StyleSheet.create({});
