import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useEffect, useState } from "react"
import { API } from "../utils/api"
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from "react-native"
import Modal from "react-native-modal"
import MyButton from "./Button"

export const Avatar = ({ setTriggerFetch }) => {
  const [avatar, setAvatar] = useState([])
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false)
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false)
  const [isFailedModalVisible, setIsFailedModalVisible] = useState(false)
  const [selectedAvatar, setSelectedAvatar] = useState(null)

  const handleCLickAvatar = (avatar) => {
    setSelectedAvatar(avatar)
    setIsConfirmationModalVisible(true)
  }

  const confirmPurchase = async () => {
    try {
      const token = await AsyncStorage.getItem("user")
      const response = await API.post(
        "api/v1/add-avatar",
        {
          id_avatar: selectedAvatar.id,
          price: selectedAvatar.price,
          avatar: selectedAvatar.image_url,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      )

      if (response.status == 500) {
        setIsFailedModalVisible(true)
      } else {
        setIsSuccessModalVisible(true)
        setTriggerFetch((prev) => prev + 1)
      }
    } catch (error) {
      setIsFailedModalVisible(true)
    } finally {
      setIsConfirmationModalVisible(false)
    }
  }

  const getAvatar = async () => {
    try {
      const token = await AsyncStorage.getItem("user")
      const response = await API.get("api/v1/avatars", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      setAvatar(response.data.data)
    } catch (error) {
      console.error("Error fetching avatars:", error)
    }
  }

  useEffect(() => {
    getAvatar()
  }, [])

  return (
    <View>
      <ScrollView>
        <Text style={styles.avatarTitle}>Avatar</Text>
        <View style={styles.avatarContainer}>
          {avatar.map((avatar, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.avatarItem,
                selectedAvatar == avatar && {
                  borderColor: "red",
                  borderWidth: 2,
                  backgroundColor: "rgba(0,0,0,0.7)",
                },
              ]}
              onPress={() => handleCLickAvatar(avatar)}
            >
              <Image source={{ uri: avatar.image_url }} style={styles.avatarImage} />
              <Text
                style={{
                  ...styles.avatarValue,
                  color: parseInt(avatar.price) === 0 ? "gray" : "red",
                }}
              >
                {parseInt(avatar.price) === 0 ? "Free" : avatar.price}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {/* confirmation modal */}
      <Modal isVisible={isConfirmationModalVisible} style={styles.itemModal}>
        <View style={styles.modalContent}>
          <Text style={styles.confirmationText}>Confirm Purchase</Text>
          <View style={styles.avatarContent}>
            <Image
              source={{ uri: selectedAvatar ? selectedAvatar.image_url : "" }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                borderColor: "white",
                borderWidth: 3,
              }}
            />

            <Text
              style={{
                ...styles.avatarValueContent,
                color:
                  selectedAvatar && parseInt(selectedAvatar.price) === 0 ? "gray" : "red",
              }}
            >
              {selectedAvatar
                ? parseInt(selectedAvatar.price) === 0
                  ? "Free"
                  : selectedAvatar.price
                : ""}
            </Text>
          </View>

          <View>
            <MyButton
              text="Buy"
              textColor="#fff"
              background="#39A7FF"
              onPress={confirmPurchase}
            />
          </View>
          <View style={{ marginTop: -10 }}>
            <MyButton
              text="Cancel"
              textColor="#fff"
              background="tomato"
              onPress={() => setIsConfirmationModalVisible(false)}
            />
          </View>
        </View>
      </Modal>

      {/* success modal yeyeye */}
      <Modal isVisible={isSuccessModalVisible} style={styles.itemModal}>
        <View style={styles.modalContent}>
          <Text style={styles.successText}>TERBELI YEY!</Text>
          <Button title="OK" onPress={() => setIsSuccessModalVisible(false)} />
        </View>
      </Modal>

      {/* failure modal */}
      <Modal isVisible={isFailedModalVisible} style={styles.itemModal}>
        <View style={styles.modalContentFailed}>
          <Text style={styles.failedText}>Anda Miskin</Text>
          <Button title="OK" onPress={() => setIsFailedModalVisible(false)} />
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  avatarContainer: {
    width: 250,
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  avatarTitle: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 10,
    fontSize: 23,
    fontWeight: "bold",
  },
  avatarItem: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#39A7",
    padding: 5,
    borderRadius: 10,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  avatarValue: {
    fontSize: 18,
    marginTop: -10,
    fontWeight: "bold",
  },
  avatarImage: {
    borderRadius: 50,
    width: 65,
    height: 65,
    marginBottom: 10,
    borderColor: "white",
    borderWidth: 2,
  },
  itemModal: {
    justifyContent: "center",
    alignItems: "center",
  },
  avatarContent: {
    backgroundColor: "#39A7",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  avatarValueContent: {
    fontSize: 18,
    // marginTop: -14,
    fontWeight: "bold",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  confirmationText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalContentFailed: {
    backgroundColor: "#db7b7b",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  failedText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "red",
  },
  successText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
})
