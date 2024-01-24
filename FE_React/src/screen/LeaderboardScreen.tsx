import React from "react";
import { View, Text, FlatList, ImageBackground, Image } from "react-native";
import avatar1 from "../../assets/avatar/avatar1.png";
import avatar2 from "../../assets/avatar/avatar2.png";
import avatar3 from "../../assets/avatar/avatar3.png";
import crown from "../../assets/images/crown.png";
import medali1 from "../../assets/images/medali1.png";
import medali2 from "../../assets/images/medali2.png";
import medali3 from "../../assets/images/medali3.png";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/leaderboardScreenStyle";

const leaderboardData = [
  { id: "1", name: "Player 1", score: 10000, avatar: avatar1 },
  { id: "2", name: "Player 2", score: 400000, avatar: avatar2 },
  { id: "3", name: "Player 3", score: 11000, avatar: avatar3 },
];

const Leaderboard = () => {
  const sortedLeaderboard = [...leaderboardData].sort(
    (a, b) => b.score - a.score
  );
  const navigation = useNavigation();

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
              {index === 0 ? (
                <Image source={medali1} style={styles.medal} />
              ) : null}
              {index === 1 ? (
                <Image source={medali2} style={styles.medal} />
              ) : null}
              {index === 2 ? (
                <Image source={medali3} style={styles.medal} />
              ) : null}
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
  );
};

export default Leaderboard;
