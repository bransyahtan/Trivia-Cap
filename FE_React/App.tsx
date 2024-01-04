<<<<<<< HEAD
import { NavigationContainer } from "@react-navigation/native"
import Route from "./src/routes/route"

export default function App() {
  return (
    <NavigationContainer>
      <Route />
    </NavigationContainer>
  )
}
=======
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>HAI manis</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
>>>>>>> e02147758b59a6e649aeda9211b09ef287b8e07b
