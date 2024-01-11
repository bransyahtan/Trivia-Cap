import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import MyTextInput from "./FormInput";
import MyButton from "./Button";
import { API } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SelectProfileScreen() {
  const [avatar, setAvatar] = useState([]);
  const [username, setUsername] = useState("");

  const [selectedAvatar, setSelectedAvatar] = useState({
    avatar: "",
    id_avatar: -1,
  });

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => handleAvatarClick(item)}
      style={styles.avatarContainer}
    >
      <Image source={item.avatar} style={styles.avatarImage} />
    </TouchableOpacity>
  );

  const handleAvatarClick = (avatar) => {
    console.log(avatar);
    setSelectedAvatar({
      avatar: avatar.avatar,
      id_avatar: avatar.id_avatar,
    });
    // console.log("Avatar clicked:", avatar.image_url);
  };

  const getAvatar = async () => {
    try {
      const token = await AsyncStorage.getItem("user");
      const response = await API.get("api/v1/my-avatars", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setAvatar(response.data.data);
      console.log(response.data);
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
          avatar: selectedAvatar.avatar,
          name: username,
          id_avatar: selectedAvatar.id_avatar,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
    <>
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
        </View>

        <View style={{ marginTop: 50 }}>
          <MyTextInput onChangeText={setUsername} placeholder="Your Username" />
        </View>
        <View style={{ marginTop: 5, alignItems: "center" }}>
          <MyButton
            text="Save"
            background="#39A7FF"
            textColor="white"
            onPress={handleSubmit}
          />
        </View>
      </View>
    </>
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
