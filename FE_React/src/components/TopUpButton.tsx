import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../utils/api";

export default function TopUpButton({ onPress }: any) {
  const [diamond, setDiamond] = useState(0);
  const diamondWallet = async () => {
    const token = await AsyncStorage.getItem("user");
    const response = await API.get("api/v1/detail-wallet", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setDiamond(response.data.data.balance_diamond);
  };

  useEffect(() => {
    diamondWallet();
  }, []);

  return (
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
        <TouchableOpacity
          onPress={onPress}
          style={{
            marginLeft: 10,
            backgroundColor: "#16FF00",
            paddingHorizontal: 8,
            borderRadius: 5,
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
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
