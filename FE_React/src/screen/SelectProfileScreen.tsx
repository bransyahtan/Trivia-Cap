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
import MyTextInput from "../components/FormInput";
import MyButton from "../components/Button";
import { API } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/selectProfileStyle";

export default function SelectProfileScreen() {
  const [avatar, setAvatar] = useState([]);
  const [username, setUsername] = useState("");
  const navigation = useNavigation();

  const [selectedAvatar, setSelectedAvatar] = useState({
    image_url: "",
    id_avatar: 0,
  });

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => handleAvatarClick(item)}
      style={styles.avatarContainer}
    >
      <Image source={item.image_url} style={styles.avatarImage} />
    </TouchableOpacity>
  );

  const handleAvatarClick = (avatar) => {
    setSelectedAvatar({ image_url: avatar.image_url, id_avatar: avatar.id });
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
          avatar: selectedAvatar.image_url,
          name: username,
          id_avatar: selectedAvatar.id_avatar,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      navigation.navigate("Home" as never);
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
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
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

          <View style={styles.inputContainer}>
            <MyTextInput
              onChangeText={setUsername}
              placeholder="Your Username"
            />
          </View>
          <View style={styles.buttonContainer}>
            <MyButton
              text="Continue"
              background="#39A7FF"
              textColor="white"
              onPress={handleSubmit}
            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
