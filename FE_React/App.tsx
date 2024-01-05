import { NavigationContainer } from "@react-navigation/native";
import Route from "./src/routes/route";
import React from "react";

export default function App() {
  return (
    <NavigationContainer>
      <Route />
    </NavigationContainer>
  );
}
