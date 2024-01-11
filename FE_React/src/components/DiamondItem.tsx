import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import React, { useState } from "react"

export default function DiamondItem() {
  const [modalVisible, setModalVisible] = useState(false)

  const diamonds = [
    { value: 50, imageSource: require("../../assets/images/diamond.png") },
    { value: 100, imageSource: require("../../assets/images/diamond.png") },
    { value: 250, imageSource: require("../../assets/images/diamond.png") },
    { value: 500, imageSource: require("../../assets/images/diamond.png") },
    { value: 700, imageSource: require("../../assets/images/diamond.png") },
    { value: 1200, imageSource: require("../../assets/images/diamond.png") },
  ]

  return (
    <View style={styles.centeredView}>
      <View>
        <ScrollView>
          <View style={styles.diamondsContainer}>
            {diamonds
              .reduce((rows, diamond, index) => {
                const rowIndex = Math.floor(index / 2)
                if (!rows[rowIndex]) {
                  rows[rowIndex] = []
                }
                rows[rowIndex].push(
                  <TouchableOpacity
                    key={index}
                    style={styles.diamondItem}
                    onPress={() => {
                      // Untuk Handle diamond setelah di click
                      console.log(`Selected diamond value: ${diamond.value}`)
                      setModalVisible(false)
                    }}
                  >
                    <Image source={diamond.imageSource} style={styles.diamondImage} />
                    <Text style={styles.diamondValue}>{diamond.value}</Text>
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
})
