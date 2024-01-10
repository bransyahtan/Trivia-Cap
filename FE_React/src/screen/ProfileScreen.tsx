import React, { useEffect, useState } from "react";
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

import MyButton from "../components/Button";
import TopUpButton from "../components/TopUpButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import { jwtDecode } from "jwt-decode";

interface UserInfo {
  picture?: string;
  email: string;
  verified_email: boolean;
  name: string;
}

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState<UserInfo | null>(null);

  // const renderItem = ({ item }: any) => (
  //   <TouchableOpacity
  //     onPress={() => handleAvatarClick(item.id)}
  //     style={styles.avatarContainer}
  //   >
  //     <Image source={item.image} style={styles.avatarImage} />
  //   </TouchableOpacity>
  // );

  // const handleAvatarClick = (avatarId: number) => {
  //   console.log(`Avatar clicked: ${avatarId}`);
  // };

  const getUser = async () => {
    try {
      const data = await AsyncStorage.getItem("user");
      console.log(data);
      if (data) {
        const userData = jwtDecode(data) as UserInfo;
        setUser(userData);
      }
    } catch (error) {
      console.error("Error getting user data:", error);
    }
  };

  const handleTopUp = () => {
    navigation.navigate("Shop" as never);
    console.log("whyyy boommmmm");
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View
      style={{ flex: 1, backgroundColor: "black", justifyContent: "center" }}
    >
      <ScrollView style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <StatusBar />

        <TopUpButton onPress={handleTopUp} />

        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../assets/images/2.png")}
            style={{ width: 430, height: 130, borderRadius: 65, marginTop: 30 }}
          />

          <View style={{ marginTop: 20, alignItems: "center" }}>
            <Image
              source={require("../../assets/avatar/avatar1.png")}
              style={{
                width: 130,
                height: 130,
                borderRadius: 65,
                alignSelf: "center",
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
              Antonio Berewendo
            </Text>
          </View>

          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "center",
              borderWidth: 1,
              borderRadius: 8,
              borderColor: "white",
              overflow: "hidden",
            }}
          >
            <View style={styles.statBox}>
              <Text style={styles.statText}>PLAY</Text>
              <Text style={styles.statText}>3</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statText}>WINS</Text>
              <Text style={styles.statText}>2</Text>
            </View>
          </View>

          <View style={{ marginTop: 60, alignItems: "center" }}>
            <MyButton
              text="Edit Profile"
              background="purple"
              textColor="white"
              navigateTo="EditProfile"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  statBox: {
    backgroundColor: "transparent",
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  statText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  avatarContainer: {
    flex: 1,
    alignItems: "center",
    margin: 8,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
});
