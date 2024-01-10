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
import MyTextInput from "../components/FormInput";
import MyButton from "../components/Button";
import { API } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const data = [
//   { id: 1, image: require("../../assets/avatar/avatar1.png") },
//   { id: 2, image: require("../../assets/avatar/avatar2.png") },
//   { id: 3, image: require("../../assets/avatar/avatar3.png") },
//   { id: 4, image: require("../../assets/avatar/avatar4.png") },
//   { id: 5, image: require("../../assets/avatar/avatar5.png") },
//   { id: 6, image: require("../../assets/avatar/avatar6.png") },
//   { id: 7, image: require("../../assets/avatar/avatar7.png") },
//   { id: 8, image: require("../../assets/avatar/avatar8.png") },
//   { id: 9, image: require("../../assets/avatar/avatar9.png") },
// ];

export default function SelectProfileScreen() {
  const [avatar, setAvatar] = useState([]);
  const [username, setUsername] = useState("");

  const [selectedAvatar, setSelectedAvatar] = useState("");

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => handleAvatarClick(item)}
      style={styles.avatarContainer}
    >
      <Image source={item.image_url} style={styles.avatarImage} />
    </TouchableOpacity>
  );

  const handleAvatarClick = (avatar) => {
    setSelectedAvatar(avatar.image_url);
    // console.log("Avatar clicked:", avatar.image_url);
  };

  const getAvatar = async () => {
    try {
      const token = await AsyncStorage.getItem("user");
      const response = await API.get("api/v1/avatars", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setAvatar(response.data.data);
    } catch (error) {
      console.error("Error fetching avatars:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem("user");
      const response = await API.put(
        "api/v1/update-profile",
        {
          avatar: selectedAvatar,
          name: username,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(avatar);
  useEffect(() => {
    getAvatar();
  }, []);
  console.log(username);
  console.log(selectedAvatar);
  return (
    <ImageBackground
      source={require("../../assets/images/bg1.png")}
      style={{ flex: 1, opacity: 0.95 }}
    >
      <ScrollView style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
        <StatusBar />
        <View style={{ alignItems: "center" }}>
          <View>
            <FlatList
              data={avatar}
              numColumns={3}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ marginTop: 30 }}
            />

            {/* {avatar ? (

            )} */}
          </View>

          <View style={{ marginTop: 50 }}>
            <MyTextInput
              //  namae here
              onChangeText={setUsername}
              placeholder="Your Username"
            />
          </View>
          <View style={{ marginTop: 5, alignItems: "center" }}>
            <MyButton
              text="Continue"
              background="#39A7FF"
              textColor="white"
              navigateTo="MainApp"
              onPress={handleSubmit}
            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
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
