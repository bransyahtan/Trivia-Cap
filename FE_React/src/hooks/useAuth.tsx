import { useIsFocused } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { API } from "../utils/api"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { UserInfo } from "../interface/User"

export default function useAuth() {
  const isFocused = useIsFocused()
  const [user, setUser] = useState<UserInfo | null>(null)

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user")
      setUser(null)
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  const getUser = async () => {
    try {
      const response = await API.get("api/v1/detail-user", {
        headers: {
          Authorization: "Bearer " + (await AsyncStorage.getItem("user")),
        },
      })
      setUser(response.data.data)
    } catch (error) {
      console.error("Error getting user data:", error)
    }
  }

  useEffect(() => {
    getUser()
  }, [isFocused])

  return {
    getUser,
    handleLogout,
    user,
  }
}
