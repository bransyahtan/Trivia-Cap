import React from "react"
import { View, Text, FlatList, StyleSheet, ImageBackground, Image, TouchableOpacity } from "react-native"
import { MdOutlineLogout } from "react-icons/md"
import avatar1 from "../../assets/avatar/avatar1.png"
import avatar2 from "../../assets/avatar/avatar2.png"
import avatar3 from "../../assets/avatar/avatar3.png"
import crown from "../../assets/images/crown.png"
import medali1 from "../../assets/images/medali1.png"
import medali2 from "../../assets/images/medali2.png"
import medali3 from "../../assets/images/medali3.png"
import { useNavigation } from "@react-navigation/native"

const leaderboardData = [
  { id: "1", name: "Player 1", score: 10000, avatar: avatar1 },
  { id: "2", name: "Player 2", score: 400000, avatar: avatar2 },
  { id: "3", name: "Player 3", score: 11000, avatar: avatar3 },
]

const Leaderboard = () => {
  const sortedLeaderboard = [...leaderboardData].sort((a, b) => b.score - a.score)
  const navigation = useNavigation()

  return (
    <ImageBackground
      source={require("../../assets/images/bg_game.png")}
      style={{ flex: 1, opacity: 0.95 }}
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/leaderboard.png")}
          style={styles.header}
        />

        <View style={styles.winnerContainer}>
          <Image source={crown} style={styles.crown} />
          <Image source={sortedLeaderboard[0].avatar} style={styles.winner} />
          <Text style={styles.winnerName}>{sortedLeaderboard[0].name}</Text>
        </View>

        <FlatList
          data={sortedLeaderboard}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View style={styles.item}>
              <Text style={styles.rank}>{index + 1}</Text>
              <Image source={item.avatar} style={styles.avatar} />
              <View style={styles.playerInfo}>
                <Text style={styles.playerName}>{item.name}</Text>
                <Text style={styles.score}>{item.score} points</Text>
              </View>
              {index === 0 ? <Image source={medali1} style={styles.medal} /> : null}
              {index === 1 ? <Image source={medali2} style={styles.medal} /> : null}
              {index === 2 ? <Image source={medali3} style={styles.medal} /> : null}
            </View>
          )}
        />
      </View>
      
      {/* <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity style={styles.homeNavigate} onPress={() => navigation.navigate("Home" as never)}>
            <MdOutlineLogout size={20} />
            Back home
          </TouchableOpacity>
        </View> */}
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

  homeNavigate: {
    backgroundColor: "skyblue",
    width: 150,
    paddingVertical: 10,
    color: "#000",
    fontWeight: "bold",
    textShadowColor: "white",
    textShadowRadius: 2,
    textShadowOffset: { width: 1, height: 1 },
    borderRadius: 10,
    marginTop: 18,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 5,
  },
})

export default Leaderboard
