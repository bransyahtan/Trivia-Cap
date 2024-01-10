import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screen/HomeScreen";
import ProfileScreen from "../screen/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import SelectProfileScreen from "../screen/SelectProfileScreen";
import ShopScreen from "../screen/ShopScreen";
import LobyScreen from "../screen/LobyScreen";
import EditProfileScreen from "../screen/EditProfileScreen";
import LoginScreen from "../screen/LoginScreen";
import PlayScreen from "../screen/PlayScreen";
import CongratsScreen from "../screen/CongratsScreen";
import Leaderboard from "../screen/LeaderboardScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const ProfileStack = createStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator>
<<<<<<< HEAD
      <Tab.Navigator initialRouteName="EditProfile">
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Shop"
          component={ShopScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
      <Tab.Screen
=======
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
>>>>>>> 63b0221701c9961e6bae19b9c605c2a3f4caaf17
        name="EditProfile"
        component={EditProfileScreen}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
};

const MainApp = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Shop") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Shop"
        component={ShopScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const Route = () => {
  return (
<<<<<<< HEAD
    <Stack.Navigator initialRouteName="Leaderboard">
=======
    <Stack.Navigator initialRouteName="Login">
>>>>>>> 63b0221701c9961e6bae19b9c605c2a3f4caaf17
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Lobby"
        component={LobyScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Play"
        component={PlayScreen}
        options={{ headerShown: false }}
      />
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
      <Stack.Screen
        name="SelectProfile"
        component={SelectProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Route;
