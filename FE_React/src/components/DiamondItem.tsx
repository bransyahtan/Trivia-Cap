import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { API } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as WebBrowser from "expo-web-browser";

export default function DiamondItem({ setTrigger }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [diamond, setDiamond] = useState([]);

  const getDiamond = async () => {
    try {
      const token = await AsyncStorage.getItem("user");
      // const response = await API.get("api/v1/diamonds", {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      const response = await axios.get(
        "http://192.168.18.238:8000/api/diamonds",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDiamond(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickDiamond = async (obj) => {
    try {
      const token = await AsyncStorage.getItem("user");
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
        }
      );
      WebBrowser.openBrowserAsync(response.data.data.snap_url);
      setModalVisible(false);
      setTrigger();
    } catch (error) {
      console.error("Error fetching diamond:", error);
    }
  };

  useEffect(() => {
    getDiamond();
  }, []);

  // const diamonds = [
  //   { value: 50, imageSource: require("../../assets/images/diamond.png") },
  //   { value: 100, imageSource: require("../../assets/images/diamond.png") },
  //   { value: 250, imageSource: require("../../assets/images/diamond.png") },
  //   { value: 500, imageSource: require("../../assets/images/diamond.png") },
  //   { value: 700, imageSource: require("../../assets/images/diamond.png") },
  //   { value: 1200, imageSource: require("../../assets/images/diamond.png") },
  // ]

  return (
    <View style={styles.centeredView}>
      <View>
        <ScrollView>
          <View style={styles.diamondsContainer}>
            {/* {diamond
              .reduce((rows, diamond, index) => {
                const rowIndex = Math.floor(index / 2);
                if (!rows[rowIndex]) {
                  rows[rowIndex] = [];
                }
                rows[rowIndex].push(
                  <TouchableOpacity
                    key={index}
                    style={styles.diamondItem}
                    onPress={() => {
                      // Untuk Handle diamond setelah di click
                      console.log(`Selected diamond value: ${diamond.value}`);
                      setModalVisible(false);
                    }}
                  >
                    <Text style={styles.diamondValue}>{diamond.price}</Text>
                  </TouchableOpacity>
                );
                return rows;
              }, [])
              .map((row, rowIndex) => (
                <View key={rowIndex} style={styles.diamondsRow}>
                  {row}
                </View>
              ))} */}
            {diamond.map((d) => (
              <View key={d.id} style={styles.diamondsRow}>
                <TouchableOpacity
                  style={styles.diamondItem}
                  onPress={() => handleClickDiamond(d)}
                >
                  <Text style={styles.diamondValue}>{d.amount}</Text>
                  <Text>Rp.{parseInt(d.price).toLocaleString("en-ID")}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
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
