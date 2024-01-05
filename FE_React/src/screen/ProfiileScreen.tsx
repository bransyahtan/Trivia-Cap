import React from "react";
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

const data = [
  { id: 1, image: require("../../assets/avatar/avatar1.png") },
  { id: 2, image: require("../../assets/avatar/avatar2.png") },
  { id: 3, image: require("../../assets/avatar/avatar3.png") },
  { id: 4, image: require("../../assets/avatar/avatar4.png") },
  { id: 5, image: require("../../assets/avatar/avatar5.png") },
  { id: 6, image: require("../../assets/avatar/avatar6.png") },
  { id: 7, image: require("../../assets/avatar/avatar7.png") },
  { id: 8, image: require("../../assets/avatar/avatar8.png") },
  { id: 9, image: require("../../assets/avatar/avatar9.png") },
];

export default function ProfileScreen() {
  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => handleAvatarClick(item.id)}
      style={styles.avatarContainer}
    >
      <Image source={item.image} style={styles.avatarImage} />
    </TouchableOpacity>
  );

  const handleAvatarClick = (avatarId: number) => {
    console.log(`Avatar clicked: ${avatarId}`);
    // Tambahkan logika atau pemrosesan tambahan sesuai kebutuhan
  };

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
              data={data}
              numColumns={3}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ marginTop: 30 }}
            />
          </View>

          <View style={{ marginTop: 50 }}>
            <MyTextInput placeholder="Your Name" />
          </View>
          <View style={{ marginTop: 5, alignItems: "center" }}>
            <MyButton text="Continue" background="#39A7FF" textColor="white" />
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
