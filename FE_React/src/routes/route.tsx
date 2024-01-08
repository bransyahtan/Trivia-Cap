import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import HomeScreen from "../screen/HomeScreen"
import ProfileScreen from "../screen/ProfileScreen"
import ShopScreen from "../screen/ShopScreen"
import LoginScreen from "../screen/LoginScreen"
import LobyScreen from "../screen/LobyScreen"
import PlayScreen from "../screen/PlayScreen"
import CongratsScreen from "../screen/CongratsScreen"
import Leaderboard from "../screen/LeaderboardScreen"

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const MainApp = () => {
  return (
    <Tab.Navigator initialRouteName="Profile">
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Shop" component={ShopScreen} options={{ headerShown: false }} />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  )
}

const Route = () => {
  return (
  <Stack.Navigator initialRouteName="MainApp">
      <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }} />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Loby" component={LobyScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Play" component={PlayScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="Congrats"
        component={CongratsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Leaderboard"
        component={Leaderboard}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default Route
