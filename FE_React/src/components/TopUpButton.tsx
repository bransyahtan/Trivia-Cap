import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/core";

export default function TopUpButton({ onPress }: any) {
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
          55
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
