import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"

export default function MyButton({ text, background, textColor }: { text: string; background: string; textColor: string }) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: background,
        paddingVertical: 15,
        width: 300,
        borderRadius: 10,
        marginTop: 20,
        alignItems: "center",
        alignSelf: "auto",
        elevation: 5,
      }}
    >
      <Text style={{ color: textColor, fontWeight: "bold", fontSize: 18 }}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({})
