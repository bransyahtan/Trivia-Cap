import React from "react"
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native"

const data = [
  { id: 1, name: "User 1", avatar: require("../../assets/avatar/avatar1.png") },
  { id: 2, name: "User 2", avatar: require("../../assets/avatar/avatar2.png") },
  { id: 3, name: "com", avatar: require("../../assets/avatar/avatar-bot.png") },
]

export default function LobyScreen() {
  const renderItem = ({ item }: any) => (
    <View style={styles.table}>
      <View style={styles.avatarContainer}>
        <Image source={item.avatar} style={styles.avatarImage} />
        <Text style={styles.avatarName}>{item.name}</Text>
      </View>
    </View>
  )

  return (
    <ImageBackground
      source={require("../../assets/images/bg1.png")}
      style={{ flex: 1, opacity: 0.95 }}
    >
      <ScrollView style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
        <StatusBar />
        <View style={{ alignItems: "center" }}>
          <View style={{ marginTop: 52 }}>
            <View style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Text
                style={{
                  color: "white",
                  fontSize: 40,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                20 S
              </Text>

              <Text
                style={{
                  color: "white",
                  fontSize: 25,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Finding opponent ...
              </Text>

              <Text
                style={{
                  color: "white",
                  fontSize: 25,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                2 / 3
              </Text>
            </View>
            <FlatList
              data={data}
              horizontal={false}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ marginTop: 30 }}
            />
            V
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  table: {
    alignItems: "center",
    margin: 8,
    marginTop: 20,
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  avatarName: {
    color: "white",
  },
})
