import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import ButtonPrimary from "../components/ButtonPrimary";
import InputPrimary from "../components/InputPrimary";
import BackIcon from "../icons/BackIcon";
import NavigationBottom from "../components/NavigationBottom";
import { useState } from "react";
import { useUserStore } from "../store/user";

export default function PersonalScreen(props) {
  const userStore = useUserStore();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View>
        <View style={styles.navBtm}>
          <NavigationBottom active="profile"></NavigationBottom>
        </View>
        <View style={styles.container}>
          <View style={styles.main}>
            <View style={styles.top}>
              <BackIcon style={{ opacity: 0 }}></BackIcon>
              <Text style={styles.title}>بيانات شخصية</Text>
              <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <BackIcon></BackIcon>
              </TouchableOpacity>
            </View>
            <Text style={styles.subtitle}>رقم الهاتف</Text>
            <Text style={styles.phoneNumber}>{userStore.user.phone}</Text>
            <View style={styles.input}>
              <InputPrimary
                backgroundColor="#F2F2F4"
                placeholder="اسم"
                textAlign="right"
                value={userStore.user?.name}
                onChangeText={(text) => setName(text)}
              ></InputPrimary>
            </View>
            <View style={styles.input}>
              <InputPrimary
                backgroundColor="#F2F2F4"
                placeholder="اسم العائلة"
                textAlign="right"
                value={userStore.user?.surname}
                onChangeText={(text) => setSurname(text)}
              ></InputPrimary>
            </View>
            <View style={styles.input}>
              <InputPrimary
                backgroundColor="#F2F2F4"
                placeholder="بريد إلكتروني"
                textAlign="right"
                value={userStore.user?.email}
                onChangeText={(text) => setEmail(text)}
              ></InputPrimary>
            </View>
            <View style={[styles.input, styles.inputLast]}>
              <InputPrimary
                backgroundColor="#F2F2F4"
                placeholder="تاريخ الولادة"
                textAlign="right"
                value={userStore.user?.birthday}
                onChangeText={(text) => setBirthday(text)}
              ></InputPrimary>
            </View>
          </View>
          <View style={styles.btm}>
            <ButtonPrimary
              onPress={() => {
                console.log({
                  name,
                  surname,
                  email,
                  birthday,
                });
              }}
            >
              يحفظ
            </ButtonPrimary>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  navBtm: {
    position: "absolute",
    width: "100%",
    left: 0,
    bottom: 0,
    zIndex: 2,
    paddingHorizontal: 0,
  },
  btm: {
    width: "100%",
  },
  input: {
    marginBottom: 15,
  },
  inputLast: {
    marginBottom: 0,
  },
  container: {
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 106,
    display: "flex",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  phoneNumber: {
    fontFamily: "CircleExtraBold",
    textAlign: "center",
    fontSize: 18,
    lineHeight: 27,
    color: "#1F2024",
    marginBottom: 25,
  },
  subtitle: {
    color: "#71727A",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 16,
    fontFamily: "Shabnam",
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    lineHeight: 33,
    color: "#1F2024",
    fontFamily: "ShabnamBold",
  },
  top: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  main: {
    width: "100%",
    flexGrow: 1,
  },
});
