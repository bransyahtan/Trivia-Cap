import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import TopUpButton from "../components/modalTopUp/TopUpButton";
import { useNavigation } from "@react-navigation/native";
import { socket } from "../utils/socket";
import { MdOutlineLogout } from "react-icons/md";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../styles/congratsScreenStyle";

export default function CongratsScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [idRoom, setIdRoom] = useState("");

  const LoginNavigate = () => navigation.navigate("Login" as never);

  const HomeNavigate = () => navigation.navigate("Home" as never);

  const getIdRoom = async () => {
    const idRoom = await AsyncStorage.getItem("idRoom");
    setIdRoom(idRoom);
  };

  useEffect(() => {
    getIdRoom();
    socket.on("finish", async (user) => {
      setData(user.sort((a, b) => b.score - a.score));
      await AsyncStorage.removeItem("idRoom");
    });
  }, [idRoom]);

  return (
    <ImageBackground
      source={require("../../assets/images/bg_game.png")}
      style={{ flex: 1, opacity: 0.95 }}
    >
      <ScrollView style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
        <StatusBar />

        <TopUpButton onPress={LoginNavigate} />

        <Image
          source={require("../../assets/images/2.png")}
          style={[styles.iconText]}
        />

        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              color: "white",
              fontSize: 35,
              fontWeight: "bold",
              marginTop: 30,
            }}
          >
            Congratulations!
          </Text>

          {data.length !== 0 &&
            data.map((user, idx) => (
              <View
                style={idx == 0 ? styles.podiumFirst : styles.podiumX}
                key={idx}
              >
                <Image
                  source={user.avatar}
                  style={idx == 0 ? styles.imageFirst : styles.imageX}
                />
                <View>
                  <Text style={styles.optionText}>{user.name}</Text>
                  <Text style={styles.scoreText}>Score: {user.score}</Text>
                </View>
              </View>
            ))}
        </View>

        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={styles.homeNavigate} onPress={HomeNavigate}>
            <MdOutlineLogout size={20} />
            Back home
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
