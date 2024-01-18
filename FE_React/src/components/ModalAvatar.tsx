import React, { useState } from "react"
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  Button,
  Text,
} from "react-native"
import { Avatar } from "./AvatarItem"
import MyButton from "./Button"
const ModalAvatar: React.FC<{
  setTriggerFetch: React.Dispatch<React.SetStateAction<number>>
}> = ({ setTriggerFetch }) => {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.cardsContainer}>
          <View style={styles.cardWrapper}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <View>
                <Image
                  source={require("../../assets/images/store.png")}
                  style={{ width: 70, height: 70 }}
                />
                <Text style={{ color: "white", fontSize: 10, textAlign: 'center' }}>
                  Avatar Shop
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView>
              <Avatar setTriggerFetch={setTriggerFetch} />
            </ScrollView>

            <View style={styles.buttonModal}>
              <MyButton
                text="Cancel"
                textColor="#fff"
                background="tomato"
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  cardsContainer: {
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  cardWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    flexDirection: "column",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    modalProfile: {},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonModal: {
    marginTop: 10,
    width: 80,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
})
export default ModalAvatar
