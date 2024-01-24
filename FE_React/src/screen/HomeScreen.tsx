import React, { useState, useEffect } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import MyButton from "../components/Button";
import TopUpButton from "../components/modalTopUp/TopUpButton";
import { useNavigation } from "@react-navigation/core";
import ModalAvatar from "../components/modalAvatar/ModalAvatar";
import ModalEditProfile from "../components/modalEditProfile/ModalEditProfile";
import useAuth from "../hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { socket } from "../utils/socket";
import { styles } from "../styles/homeScreenStyle";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [triggerFetch, setTriggerFetch] = useState(0);
  const { getUser, user, handleLogout } = useAuth();
  const isFocused = useIsFocused();

  const handleTopUp = () => {
    navigation.navigate("Shop" as never);
  };

  const clearIdRoom = async () => {
    await AsyncStorage.removeItem("idRoom");
  };

  useEffect(() => {
    clearIdRoom();
    socket.emit("clear", true);
  }, [isFocused]);

  return (
    <ImageBackground
      source={require("../../assets/images/bg1.png")}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <StatusBar />
        <TopUpButton onPress={handleTopUp} />

        <TouchableOpacity
          onPress={() => navigation.navigate("Leaderboard" as never)}
          style={styles.leaderboardButton}
        >
          <Image
            source={require("../../assets/images/leaderboard-1.png")}
            style={styles.leaderboardIcon}
          />
          <Text style={styles.leaderboardText}>Leaderboard</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.avatarButton}>
          <ModalAvatar setTriggerFetch={setTriggerFetch} />
        </TouchableOpacity>

        <View style={styles.centeredView}>
          <Image
            source={require("../../assets/images/2.png")}
            style={styles.backgroundImage}
          />
          <View style={styles.profileContainer}>
            <Image
              source={{
                uri: user?.avatar || "https://via.placeholder.com/150",
              }}
              style={styles.profileImage}
            />
            <Text style={styles.profileName}>{user?.name || "xxx"}</Text>
          </View>
          <View style={styles.editProfileButton}>
            <ModalEditProfile getUser={getUser} />
          </View>
          <View style={styles.buttonContainer}>
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
