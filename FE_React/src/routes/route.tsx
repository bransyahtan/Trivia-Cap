import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import HomeScreen from "../screen/HomeScreen"
import ProfileScreen from "../screen/ProfileScreen"
import ShopScreen from "../screen/ShopScreen"
import LobyScreen from "../screen/LobyScreen"
import EditProfileScreen from "../screen/EditProfileScreen"
import LoginScreen from "../screen/LoginScreen"
import PlayScreen from "../screen/PlayScreen"
import CongratsScreen from "../screen/CongratsScreen"
import Leaderboard from "../screen/LeaderboardScreen"

const Stack = createStackNavigator()
const ProfileStack = createStackNavigator()

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  )
}

//

const Route = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="Lobby"
        component={LobyScreen}
        options={{ headerShown: false }}
      />
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
      {/* <Stack.Screen
        name="SelectProfile"
        component={SelectProfileScreen}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="Shop" component={ShopScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default Route
