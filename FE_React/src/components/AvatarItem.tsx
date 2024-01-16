import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { API } from "../utils/api";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Button } from "react-native";
import Modal from "react-native-modal";
import Toast from "react-native-toast-message";

export const Avatar = ({ setTriggerFetch }) => {
  const [avatar, setAvatar] = useState([]);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleCLickAvatar = avatar => {
    setSelectedAvatar(avatar);
    setIsConfirmationModalVisible(true);
  };

  const confirmPurchase = async () => {
    try {
      const token = await AsyncStorage.getItem("user");
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
        }
      );

      if (response.status == 500) {
        setIsFailedModalVisible(true);
      } else {
        setIsSuccessModalVisible(true);
        setTriggerFetch(prev => prev + 1);
      }
    } catch (error) {
      setIsFailedModalVisible(true);
    } finally {
      setIsConfirmationModalVisible(false);
    }
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

  useEffect(() => {
    getAvatar();
  }, []);

  return (
    <View>
      <ScrollView>
        <View style={styles.diamondsContainer}>
          {avatar.map((avatar, index) => (
            <TouchableOpacity key={index} style={styles.diamondItem} onPress={() => handleCLickAvatar(avatar)}>
              <Image source={{ uri: avatar.image_url }} style={styles.avatarImage} />
              <Text
                style={{
                  ...styles.diamondValue,
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
          <Image source={{ uri: selectedAvatar ? selectedAvatar.image_url : "" }} style={styles.avatarImage} />
          <Text
            style={{
              ...styles.diamondValue,
              color: selectedAvatar && parseInt(selectedAvatar.price) === 0 ? "gray" : "red",
            }}
          >
            {selectedAvatar ? (parseInt(selectedAvatar.price) === 0 ? "Free" : selectedAvatar.price) : ""}
          </Text>
          <Button
            title="Confirm"
            onPress={confirmPurchase}
            // style={{ marginTop: 10 }}
          />
          <Button
            title="Cancel"
            onPress={() => setIsConfirmationModalVisible(false)}
            // style={{ marginTop: 10 }}
          />
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
  );
};

const styles = StyleSheet.create({
  diamondsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  diamondItem: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 15,
    width: "48%",
  },
  diamondValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  avatarImage: {
    borderRadius: 50,
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  itemModal: {
    justifyContent: "center",
    alignItems: "center",
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
});
