import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { TextInput } from "react-native-gesture-handler"
// import { PiNotePencilLight } from "react-icons/pi";

const MyTextInput = (props: any) => {
  return (
    <TextInput
      placeholder={props.placeholder}
      onChangeText={props.onChangeText}
      style={{
        fontSize: 18,
        color: "grey",
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        width: 300,
        paddingVertical: 15,
        marginTop: 20,
        elevation: 5,
      }}
    ></TextInput>
  )
}

export default MyTextInput

const styles = StyleSheet.create({})
