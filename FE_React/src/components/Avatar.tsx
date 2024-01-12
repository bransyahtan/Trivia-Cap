import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useEffect, useState } from "react"
import { API } from "../utils/api"
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
} from "react-native"

export const Avatar = ({ setTriggerFetch }) => {
  const [avatar, setAvatar] = useState([])
  const handleCLickAvatar = async (obj) => {
    try {
      const token = await AsyncStorage.getItem("user")
      const response = await API.post("api/v1/add-avatar", obj, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })

      if (response.status == 500) {
        alert("kosong")
      }

      console.log(response.data)
      setTriggerFetch((prev) => prev + 1)
    } catch (error) {
      console.error("Error fetching avatars:", error)
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
      <View>
        <ScrollView>
          <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
            Shop Avatar
          </Text>
          <View style={styles.diamondsContainer}>
            {avatar
              .reduce((rows, avatar, index) => {
                const rowIndex = Math.floor(index / 2)
                if (!rows[rowIndex]) {
                  rows[rowIndex] = []
                }
                rows[rowIndex].push(
                  <TouchableOpacity
                    key={index}
                    style={styles.diamondItem}
                    onPress={() =>
                      handleCLickAvatar({
                        id_avatar: avatar.id,
                        price: avatar.price,
                        avatar: avatar.image_url,
                      })
                    }
                  >
                    <Image source={avatar.image_url} style={styles.avatarImage} />
                    <Text
                      style={{
                        ...styles.diamondValue,
                        color: parseInt(avatar.price) == 0 ? "gray" : "red",
                      }}
                    >
                      {parseInt(avatar.price) == 0 ? "Free" : avatar.price}
                    </Text>
                  </TouchableOpacity>,
                )
                return rows
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
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
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
})
