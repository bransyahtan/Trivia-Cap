import React, { useState } from "react"
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
} from "react-native"
import { PiNotePencil } from "react-icons/pi"
import EditProfileItem from "./EditProfileItem"
import MyButton from "./Button"

const ModalEditProfile = ({ getUser }) => {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.cardsContainer}>
          <View style={styles.cardWrapper}></View>
          <View style={styles.cardWrapper}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <PiNotePencil
                size={24}
                color="black"
                style={{ backgroundColor: "white", borderRadius: 10, padding: 3 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView>
              <View style={styles.selectProfileContainer}>
                <EditProfileItem getUser={getUser} />
              </View>
            </ScrollView>
            {/* <Button title="Cancel" onPress={() => setModalVisible(!modalVisible)} /> */}
            <View>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  cardsContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  cardWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
    marginTop: -80,
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
  selectProfileContainer: {
    columnGap: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  diamondsRow: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  diamondItem: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 15,
    width: "48%",
  },
  diamondImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  diamondValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  avatarImage: {
    borderRadius: 50,
    width: 80,
    height: 80,
    marginBottom: 10,
  },
})
export default ModalEditProfile
