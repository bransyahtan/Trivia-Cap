import React, { useEffect, useState } from "react"
import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Button,
} from "react-native"
import MyTextInput from "./FormInput"
import MyButton from "./Button"
import { API } from "../utils/api"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Modal from "react-native-modal"
import Toast from "react-native-toast-message"

export default function EditProfileItem({ getUser }) {
  const [avatar, setAvatar] = useState([])
  const [username, setUsername] = useState("")
  const [selectedAvatar, setSelectedAvatar] = useState({
    avatar: "",
    id_avatar: -1,
  })
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false)

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => handleAvatarClick(item)}
      style={[
        styles.avatarContainer,
        selectedAvatar == item && {
          backgroundColor: "red",
        },
      ]}
    >
      <Image source={item.avatar} style={styles.avatarImage} />
    </TouchableOpacity>
  )

  const handleAvatarClick = (avatar) => {
    setSelectedAvatar({
      avatar: avatar.avatar,
      id_avatar: avatar.id_avatar,
    })
  }

  const getAvatar = async () => {
    try {
      const token = await AsyncStorage.getItem("user")
      const response = await API.get("api/v1/my-avatars", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      setAvatar(response.data.data)
    } catch (error) {
      console.error("Error fetching avatars:", error)
    }
  }

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem("user")
      await API.put(
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
        },
      )

      getUser()
      setIsSuccessModalVisible(true)
    } catch (error) {
      console.log(error)
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "An error occurred while updating the profile.",
      })
    }
  }

  useEffect(() => {
    getAvatar()
  }, [])

  return (
    <>
      <StatusBar />
      <View style={{ alignItems: "center" }}>
        {/* <FlatList
          data={avatar}
          numColumns={3}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ marginTop: 30 }}
        /> */}

        <View style={styles.avatarContainer}>
          {avatar.map((a) => (
            <TouchableOpacity
              onPress={() => handleAvatarClick(a)}
              style={[
                styles.avatarItem,
                selectedAvatar.id_avatar == a.id_avatar && {
                  borderColor: "red",
                  borderWidth: 2,
                  // borderRadius: 40,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
            >
              <Image source={a.avatar} style={styles.avatarImage} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ marginTop: 10 }}>
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

      {/* Success Modal */}
      <Modal isVisible={isSuccessModalVisible} style={styles.successModal}>
        <View style={styles.modalContent}>
          <Text style={styles.successText}>Profile updated successfully!</Text>
          <Button title="OK" onPress={() => setIsSuccessModalVisible(false)} />
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  avatarContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  avatarItem: {
    flex: 1,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    margin: 8,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  successModal: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  successText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
})
