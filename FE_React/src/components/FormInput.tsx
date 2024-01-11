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
        borderWidth: 2,
        borderColor: "grey",
        width: 300,
        paddingVertical: 12,
        marginTop: 20,
        elevation: 5,
        shadowOffset: {
          width: 0,
          height: 1,
        }
      }}
    ></TextInput>
  )
}

export default MyTextInput

const styles = StyleSheet.create({})
