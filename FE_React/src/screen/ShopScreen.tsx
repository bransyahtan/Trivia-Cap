import React, { useState } from "react";
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

const ShoppingPanel: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  const diamonds = [
    { value: 50, imageSource: require("../../assets/images/diamond1.png") },
    { value: 100, imageSource: require("../../assets/images/diamond2.png") },
    { value: 250, imageSource: require("../../assets/images/diamond3.png") },
    { value: 500, imageSource: require("../../assets/images/diamond4.png") },
    { value: 700, imageSource: require("../../assets/images/diamond5.png") },
    { value: 1200, imageSource: require("../../assets/images/diamond6.png") },
  ];

  const avatars = [
    { value: 50, imageSource: require("../../assets/avatar/avatar1.png") },
    { value: 100, imageSource: require("../../assets/avatar/avatar2.png") },
    { value: 250, imageSource: require("../../assets/avatar/avatar3.png") },
    { value: 500, imageSource: require("../../assets/avatar/avatar4.png") },
    { value: 700, imageSource: require("../../assets/avatar/avatar5.png") },
    { value: 1200, imageSource: require("../../assets/avatar/avatar7.png") },
  ];

  return (
    <ImageBackground source={require("../../assets/images/bg_game.png")} style={{ flex: 1, opacity: 0.95 }}>
      <StatusBar />
      <TopUpButton />
      <View style={styles.container}>
        <Image source={require("../../assets/images/shop.png")} style={styles.image} />
        <View style={styles.cardsContainer}>
          <View style={styles.cardWrapper}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <DiamondShopCard />
            </TouchableOpacity>
          </View>
          <View style={styles.cardWrapper}>
            <TouchableOpacity onPress={() => setModalVisible2(true)}>
              <AvatarShopCard />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Diamond Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView>
              <View style={styles.diamondsContainer}>
                {diamonds
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
                        <Image source={diamond.imageSource} style={styles.diamondImage} />
                        <Text style={styles.diamondValue}>{diamond.value}</Text>
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
            <Button title="Cancel" onPress={() => setModalVisible(!modalVisible)} />
          </View>
        </View>
      </Modal>

      {/* Avatar Modal */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          setModalVisible2(!modalVisible2);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView>
              <View style={styles.diamondsContainer}>
                {avatars
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
                          console.log(`Selected avatar value: ${diamond.value}`);
                          setModalVisible2(false);
                        }}
                      >
                        <Image source={diamond.imageSource} style={styles.avatarImage} />
                        <Text style={styles.diamondValue}>{diamond.value}</Text>
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
            <Button title="Cancel" onPress={() => setModalVisible2(!modalVisible2)} />
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
    backgroundColor: "rgba(0, 0, 0, 0.6)",
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
