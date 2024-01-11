import React, { useEffect, useState } from "react";
import DiamondShopCard from "./DiamondShopCard";
import AvatarShopCard from "./AvatarShopCard";
import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Button,
} from "react-native";
import TopUpButton from "../components/TopUpButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../utils/api";
import axios from "axios";
import * as WebBrowser from "expo-web-browser";

const ShoppingPanel: React.FC = () => {
  const [modalVisibleDiamond, setModalVisibleDiamond] = useState(false);
  const [modalVisibleAvatar, setModalVisibleAvatar] = useState(false);
  const [avatar, setAvatar] = useState([]);
  const [diamond, setDiamond] = useState([]);

  const handleCLickAvatar = async (obj) => {
    try {
      const token = await AsyncStorage.getItem("user");
      const response = await API.put("api/v1/update-profile", obj, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      // if (response.data.Status == "OK") {
      // }s

      console.log(response.data);
    } catch (error) {
      console.error("Error fetching avatars:", error);
    }
  };

  const handleClickDiamond = async (obj) => {
    try {
      const token = await AsyncStorage.getItem("user");
      const response = await API.post("api/v1/topup", obj, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      WebBrowser.openBrowserAsync(response.data.data.snap_url);
    } catch (error) {
      console.error("Error fetching diamond:", error);
    }
  };

  const getDiamond = async () => {
    try {
      const token = await AsyncStorage.getItem("user");
      const response = await axios.get(
        "http://192.168.18.238:8000/api/diamonds",
        {
          headers: {
            Authorization: "Bearer " + token,
            "ngrok-skip-browser-warning": true,
          },
        }
      );
      setDiamond(response.data.data);
    } catch (error) {
      console.error("Error fetching diamond:", error);
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
  // console.log(avatar);

  useEffect(() => {
    getAvatar();
    getDiamond();
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/images/bg1.png")}
      style={{ flex: 1, opacity: 0.95 }}
    >
      <StatusBar />
      <TopUpButton />
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/shop.png")}
          style={styles.image}
        />
        <View style={styles.cardsContainer}>
          <View style={styles.cardWrapper}>
            <TouchableOpacity onPress={() => setModalVisibleDiamond(true)}>
              <DiamondShopCard />
            </TouchableOpacity>
          </View>
          <View style={styles.cardWrapper}>
            <TouchableOpacity onPress={() => setModalVisibleAvatar(true)}>
              <AvatarShopCard />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Diamond Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleDiamond}
        onRequestClose={() => {
          setModalVisibleDiamond(!modalVisibleDiamond);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView>
              <View style={styles.diamondsContainer}>
                {diamond
                  .reduce((rows, diamond, index) => {
                    const rowIndex = Math.floor(index / 2);
                    if (!rows[rowIndex]) {
                      rows[rowIndex] = [];
                    }
                    rows[rowIndex].push(
                      <TouchableOpacity
                        key={index}
                        style={styles.diamondItem}
                        onPress={() =>
                          handleClickDiamond({
                            amount: diamond.price,
                            amoutDiamond: diamond.amount,
                          })
                        }
                      >
                        {/* <Image
                          source={diamond.imageSource}
                          style={styles.diamondImage}
                        /> */}
                        <Text style={styles.diamondValue}>{diamond.price}</Text>
                        <Text style={styles.diamondValue}>
                          {diamond.amount}
                        </Text>
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
            <Button
              title="Cancel"
              onPress={() => setModalVisibleDiamond(!modalVisibleDiamond)}
            />
          </View>
        </View>
      </Modal>

      {/* Avatar Modal */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleAvatar}
        onRequestClose={() => {
          setModalVisibleAvatar(!modalVisibleAvatar);
        }}
      >
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
            <Button
              title="Cancel"
              onPress={() => setModalVisibleAvatar(!modalVisibleAvatar)}
            />
          </View>
        </View>
      </Modal>
    </ImageBackground>
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
export default ShoppingPanel;
