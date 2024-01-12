import {
  Button,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import React, { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/core"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { API } from "../utils/api"
import DiamondItem from "./DiamondItem"

export default function TopUpButton({ onPress }: any) {
  const [diamond, setDiamond] = useState(0)
  const [modalVisible, setModalVisible] = useState(false)
  const diamondWallet = async () => {
    const token = await AsyncStorage.getItem("user")
    const response = await API.get("api/v1/detail-wallet", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    setDiamond(response.data.data.balance_diamond)
  }

  useEffect(() => {
    diamondWallet()
  }, [])

  return (
    <>
      <View>
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 20,
            right: 15,
            zIndex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/images/diamond.png")}
            style={{ width: 20, height: 20, marginRight: 5 }}
          />
          <Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>
            {diamond}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            width: 25,
            height: 25,
            backgroundColor: "#16FF00",
            borderRadius: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            top: 20,
            left: 350,
            zIndex: 2,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              textShadowColor: "black",
              textShadowRadius: 10,
            }}
          >
            +
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            position: "absolute",
            top: 20,
            right: 15,
            zIndex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/images/diamond.png")}
            style={{ width: 25, height: 25, marginRight: 5 }}
          />
          <Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>55</Text>

          <View style={styles.container}>
            <View style={styles.cardsContainer}>
              <View style={styles.cardWrapper}></View>
              <View style={styles.cardWrapper}></View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      ////
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView>
              <View>
                <DiamondItem />
              </View>
            </ScrollView>
            <Button title="Cancel" onPress={() => setModalVisible(!modalVisible)} />
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  },
})
