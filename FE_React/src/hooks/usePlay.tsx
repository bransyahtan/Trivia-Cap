import { useEffect, useState } from "react"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { socket } from "../utils/socket"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { jwtDecode } from "jwt-decode"
import { UserInfo } from "../interface/User"
import { Quiz } from "../types"

export default function usePlay() {
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const [idRoom, setIdRoom] = useState("")
  const [user, setUser] = useState<UserInfo & { score: number }>({
    avatar: "",
    email: "",
    id: 0,
    name: "",
    score: 0,
    wallet: 0,
  })

  const [selectedOption, setSelectedOption] = useState(null)
  const [quize, setQuize] = useState<Quiz>({
    question: "...",
    a: "",
    b: "",
    c: "",
    answer: "",
    time: 0.01,
  })
  const [idx, setIdx] = useState(0)

  const multipleChoice = ["a", "b", "c"]

  const getAuth = async () => {
    const token = await AsyncStorage.getItem("user")
    const decoded = jwtDecode(token) as UserInfo
    setUser((prev) => ({ ...prev, ...decoded }))
  }

  const handleAnswer = (selected) => {
    setSelectedOption(selected)
  }

  useEffect(() => {
    // timeout
    if (quize.time === 0) {
      setTimeout(() => {
        setIdx((prev) => prev + 1)
        socket.emit("getQuizes", { idx: idx + 1, idRoom })
        if (selectedOption == quize.answer) {
          socket.emit("user", {
            score: 10,
          })
        }
      }, 3000)
    }
  }, [quize.time])

  useEffect(() => {
    // Mulai pertanyaan
    if (idRoom) {
      socket.emit("getQuizes", { idx, idRoom })
      socket.on("getQuizes", (data) => {
        if (!data) {
          navigation.navigate("Congrats" as never)
          return
        }
        setQuize(data)
      })

      socket.on("user", async (data) => {
        const token = await AsyncStorage.getItem("user")
        const decoded = jwtDecode(token) as UserInfo
        const res = data.filter((u) => u.name == decoded.name)[0]
        setUser((prev) => ({ ...prev, score: res.score }))
      })
    }
  }, [isFocused, idRoom])

  // console.log(quize)

  return {
    user,
    selectedOption,
    quize,
    idx,
    multipleChoice,
    setIdRoom,
    idRoom,
    handleAnswer,
  }
}
