// Leaderboard.js
import React from "react"
import { View, Text, FlatList, StyleSheet, ImageBackground, Image } from "react-native"

// Import gambar avatar
import avatar1 from "../../assets/avatar/avatar1.png"
import avatar2 from "../../assets/avatar/avatar2.png"
import avatar3 from "../../assets/avatar/avatar3.png"

//import mendali
import crown from "../../assets/images/crown.png"
import medali1 from "../../assets/images/medali1.png"
import medali2 from "../../assets/images/medali2.png"
import medali3 from "../../assets/images/medali3.png"

const leaderboardData = [
  { id: "1", name: "Player 1", score: 1200, avatar: avatar1, medal: medali1 },
  { id: "2", name: "Player 2", score: 1000, avatar: avatar2, medal: medali2 },
  { id: "3", name: "Player 3", score: 900, avatar: avatar3, medal: medali3 },
]

const Leaderboard = () => {
  return (
    <ImageBackground
      source={require("../../assets/images/bg_game.png")}
      style={{ flex: 1, opacity: 0.95 }}
    >
      <View style={styles.container}>
        <Image source={require("../../assets/images/leaderboard.png")} style={styles.header} />

        <View style={styles.winnerContainer}>
          <Image source={crown} style={styles.crown} />
          <Image source={avatar1} style={styles.winner} />
          <Text style={styles.winnerName}>Player 1</Text>
        </View>

        <FlatList
          data={leaderboardData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.rank}>{item.id}</Text>

              {/* Tambahkan komponen Image untuk menampilkan avatar */}
              <Image source={item.avatar} style={styles.avatar} />

              <View style={styles.playerInfo}>
                <Text style={styles.playerName}>{item.name}</Text>
                <Text style={styles.score}>{item.score} points</Text>
              </View>
              {/* <Image source={crown} style={styles.crown} /> */}
              <Image source={item.medal} style={styles.medal} />
            </View>
          )}
        />
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  header: {
    width: 200,
    height: 30,
    marginLeft: -10,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 8,
  },
  rank: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 18,
    marginRight: 8,
  },
  score: {
    fontSize: 18,
    fontWeight: "bold",
  },
  medal: {
    width: 45,
    height: 45,
  },
  crown: {
    width: 120,
    height: 120,
    marginBottom: -32,
  },
  winner: {
    width: 120,
    height: 120,
    borderWidth: 4,
    borderColor: "white",
    borderRadius: 20,
    elevation: 5,
  },
  winnerName: {
    backgroundColor: "white",
    marginTop: 5,
    paddingHorizontal: 15,
    paddingVertical: 3,
    borderRadius: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textShadowColor: "white",
    textShadowOffset: { width: 1, height: 1 },
  },
  winnerContainer: {
    alignItems: "center",
    marginBottom: 40,
    paddingBottom: 20,
    borderRadius: 20,
  },
})

export default Leaderboard
