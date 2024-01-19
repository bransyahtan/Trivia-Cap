import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import React, { useEffect, useState } from "react"
import { API } from "../utils/api"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import * as WebBrowser from "expo-web-browser"

export default function DiamondItem({ setTrigger }) {
  const [modalVisible, setModalVisible] = useState(false)
  const [diamond, setDiamond] = useState([])

  const getDiamond = async () => {
    try {
      const token = await AsyncStorage.getItem("user")
      // const response = await API.get("api/v1/diamonds", {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      const response = await axios.get("http://192.168.18.238:8000/api/diamonds", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setDiamond(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleClickDiamond = async (obj) => {
    try {
      const token = await AsyncStorage.getItem("user")
      const response = await API.post(
        "api/v1/topup",
        {
          amount: obj.price,
          amount_diamond: obj.amount,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      )
      WebBrowser.openBrowserAsync(response.data.data.snap_url)
      setModalVisible(false)
      setTrigger()
    } catch (error) {
      console.error("Error fetching diamond:", error)
    }
  }

  useEffect(() => {
    getDiamond()
  }, [])

  return (
    <View style={styles.centeredView}>
      <View>
        <ScrollView>
          <View style={styles.diamondsContainer}>
            {diamond.length == 0 && (
              <View
                style={{
                  backgroundColor: "#eaeaea",
                  width: 100,
                  height: 100,
                }}
              ></View>
            )}
            <View style={styles.diamondsRow}>
              <Text
                style={{
                  fontWeight: "bold",
                  marginBottom: 10,
                  fontSize: 24,
                }}
              >
                Shop Diamonds
              </Text>
              {diamond.map((d) => (
                <View
                  key={d.id}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    style={styles.diamondItem}
                    onPress={() => handleClickDiamond(d)}
                  >
                    <Image
                      source={require("../../assets/images/diamonds.png")}
                      style={{ width: 120, height: 120 }}
                    />
                    <Text style={styles.diamondValue}>{d.amount}</Text>
                    <Text>Rp.{parseInt(d.price).toLocaleString("en-ID")}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
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
    backgroundColor: "#eaeaea",
    paddingHorizontal: 60,
    paddingBottom: 20,
    borderRadius: 10,
  },

  diamondImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  diamondValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: -40,
  },
  avatarImage: {
    borderRadius: 50,
    width: 80,
    height: 80,
    marginBottom: 10,
  },
})
