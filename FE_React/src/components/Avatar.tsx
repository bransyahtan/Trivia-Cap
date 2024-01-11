import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { API } from "../utils/api";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert,
} from "react-native";

export const Avatar = ({ setTriggerFetch }) => {
  const [avatar, setAvatar] = useState([]);
  const handleCLickAvatar = async (obj) => {
    try {
      const token = await AsyncStorage.getItem("user");
      const response = await API.put("api/v1/update-profile", obj, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      console.log(response.data);
      setTriggerFetch((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching avatars:", error);
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
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <ScrollView>
          <View style={styles.diamondsContainer}>
            {avatar
              .reduce((rows, avatar, index) => {
                const rowIndex = Math.floor(index / 2);
                if (!rows[rowIndex]) {
                  rows[rowIndex] = [];
                }
                rows[rowIndex].push(
                  <TouchableOpacity
                    key={index}
                    style={styles.diamondItem}
                    onPress={() =>
                      handleCLickAvatar({
                        id_avatar: avatar.id,
                        name: avatar.name,
                        avatar: avatar.image_url,
                      })
                    }
                  >
                    <Image
                      source={avatar.image_url}
                      style={styles.avatarImage}
                    />
                    <Text style={styles.diamondValue}>{avatar.price}</Text>
                  </TouchableOpacity>
                );
                return rows;
              }, [])
              .map((row, rowIndex) => (
                <View key={rowIndex} style={styles.diamondsRow}>
                  {row}
                </View>
              ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  cardsContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  cardWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
    marginTop: -80,
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    flexDirection: "column",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  diamondsContainer: {
    columnGap: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  diamondsRow: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  diamondItem: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 15,
    width: "48%",
  },
  diamondImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
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
});
