import { useNavigation } from "@react-navigation/core";
import React from "react";
import { FaAnglesLeft } from "react-icons/fa6";
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const data = [
  { id: 1, name: "User 1", avatar: require("../../assets/avatar/avatar1.png") },
  { id: 2, name: "User 2", avatar: require("../../assets/avatar/avatar2.png") },
  { id: 3, name: "com", avatar: require("../../assets/avatar/avatar-bot.png") },
];

export default function LobyScreen() {
  const navigation = useNavigation();
  const renderItem = ({ item }: any) => (
    <View style={styles.table}>
      <View style={styles.avatarContainer}>
        <Image source={item.avatar} style={styles.avatarImage} />
        <Text style={styles.avatarName}>{item.name}</Text>
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={require("../../assets/images/bg_game.png")}
      style={{ flex: 1, opacity: 0.95 }}
    >
      <ScrollView style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
        <StatusBar />

        <Image
          source={require("../../assets/images/2.png")}
          style={[styles.iconText]}
        />

        <View style={[styles.score]}>
          <Image
            source={require("../../assets/images/score.png")}
            style={{ width: 40, height: 40 }}
          />
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            100
          </Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home" as never);
            }}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              zIndex: 1,
            }}
          >
            <FaAnglesLeft color="white" fontSize={25} />
          </TouchableOpacity>
          <View style={{ marginTop: 52 }}>
            <View style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Text
                style={{
                  color: "white",
                  fontSize: 40,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                20 S
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
                2 / 3
              </Text>
            </View>
            <FlatList
              data={data}
              horizontal={false}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ marginTop: 30 }}
            />
            V
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  table: {
    alignItems: "center",
    margin: 8,
    marginTop: 20,
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  avatarName: {
    color: "white",
  },
  iconText: {
    width: 180,
    height: 180,
    marginRight: 5,
    position: "absolute",
    top: -55,
    left: -30,
    zIndex: 1,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  score: {
    marginRight: 5,
    position: "absolute",
    top: 10,
    left: 150,
    zIndex: 1,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
