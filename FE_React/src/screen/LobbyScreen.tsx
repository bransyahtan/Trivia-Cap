import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { FaAnglesLeft } from "react-icons/fa6";
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { socket } from "../utils/socket";
import useAuth from "../hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../styles/lobbyScreenStyle";

export default function LobbyScreen() {
  const navigation = useNavigation();

  const { user } = useAuth();
  const [data, setData] = useState<
    { name: string; avatar: string; id: string }[]
  >([]);
  const [time, setTime] = useState(20);

  const renderItem = ({ item }: any) => (
    <View style={styles.table}>
      <View style={styles.avatarContainer}>
        <Image source={item.avatar} style={styles.avatarImage} />
        <Text style={styles.avatarName}>{item.name}</Text>
      </View>
    </View>
  );

  useEffect(() => {
    if (user) {
      socket.emit("joinRoom", {
        name: user.name,
        avatar: user.avatar,
      });

      socket.on("joinRoom", async (user, timeout, idRoom) => {
        await AsyncStorage.setItem("idRoom", idRoom);
        setTime(timeout);

        if (user === "start") {
          setTimeout(() => {
            navigation.navigate("Play" as never);
          }, 3000);
          return;
        }
        setData(user);
      });
    }
  }, [user]);

  return (
    <ImageBackground
      source={require("../../assets/images/bg_game.png")}
      style={{ flex: 1, opacity: 0.95 }}
    >
      <ScrollView style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
        <StatusBar backgroundColor={"white"} barStyle={"light-content"} />

        <View>
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              paddingHorizontal: 10,
              marginTop: -20,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Home" as never);
              }}
            >
              <FaAnglesLeft color="white" fontSize={25} />
            </TouchableOpacity>

            <View>
              <Image
                source={require("../../assets/images/2.png")}
                style={[styles.iconText]}
              />
            </View>
          </View>

          <View style={{ marginTop: -20 }}>
            <View style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Text
                style={{
                  color: "white",
                  fontSize: 40,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {time} s
              </Text>

              <Text
                style={{
                  color: "white",
                  fontSize: 25,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Finding opponent ...
              </Text>

              <Text
                style={{
                  color: "white",
                  fontSize: 25,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {data.length} / 3
              </Text>
            </View>
            <FlatList
              data={data}
              horizontal={false}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ marginTop: 30 }}
            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
