import theme from "../../theme";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import BackIcon from "../../icons/BackIcon";
import { useNavigation } from "@react-navigation/native";
import InputPrimary from "../../components/InputPrimary";
import { useState } from "react";
import ButtonPrimary from "../../components/ButtonPrimary";
import RadioPrimary from "../../components/RadioPrimary";

export default function LocationInfoScreen(props) {
  const [deliveryMethod, setDeliveryMethod] = useState("courier");
  const navigation = useNavigation();

  return (
    <View>
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <View style={styles.top}>
            <BackIcon style={{ opacity: 0 }}></BackIcon>
            <Text style={styles.title}>يأمر</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackIcon></BackIcon>
            </TouchableOpacity>
          </View>
          <View style={styles.progressLine}>
            <View style={styles.progressLineActive}></View>
          </View>
          <View style={styles.steps}>
            <TouchableOpacity style={styles.step}>
              <Text style={styles.stepText}>قسط</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.step}>
              <Text style={[styles.stepText, styles.stepTextActive]}>
                توصيل
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.step}>
              <Text style={styles.stepText}>متلقي</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.subtitlePrimary}>المنطقة</Text>
          <View style={[styles.input, { marginBottom: 48 }]}>
            <InputPrimary
              placeholder="البصرة"
              backgroundColor="#F2F2F4"
              textAlign="right"
            ></InputPrimary>
          </View>
          <Text style={styles.subtitlePrimary}>طريقة التوصيل</Text>
          <View style={[styles.radio, { marginBottom: 15 }]}>
            <RadioPrimary
              title="ساعي"
              text="التسليم في البصرة – 250 د.ع"
              onPress={() => setDeliveryMethod("courier")}
              active={deliveryMethod == "courier"}
            ></RadioPrimary>
          </View>
          <View style={styles.radio}>
            <RadioPrimary
              title="يلتقط"
              text="الاستلام من متجرنا في البصرة - مجانا"
              onPress={() => setDeliveryMethod("pickup")}
              active={deliveryMethod == "pickup"}
            ></RadioPrimary>
          </View>
          <View style={styles.btn}>
            <ButtonPrimary onPress={() => navigation.navigate("AddressInfo")}>
              إضافي
            </ButtonPrimary>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  radio: {
    width: "100%",
  },
  btn: {
    width: "100%",
    marginTop: 40,
  },
  input: {
    width: "100%",
  },
  subtitlePrimary: {
    fontFamily: theme.fontBold,
    fontSize: 22,
    lineHeight: 30,
    color: theme.colorDark,
    marginBottom: 20,
    textAlign: "center",
  },
  step: {
    width: "33%",
    display: "flex",
    alignItems: "center",
  },
  steps: {
    marginTop: 26,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginBottom: 36,
  },
  stepTextActive: {
    fontFamily: theme.fontBold,
    color: theme.colorDark,
  },
  stepText: {
    fontFamily: theme.fontLight,
    color: "#8F9098",
    fontSize: 16,
    lineHeight: 22,
  },
  progressLine: {
    width: "100%",
    height: 4,
    backgroundColor: "rgba(31, 32, 36, 0.15)",
    borderRadius: 100,
    display: "flex",
    alignItems: "flex-end",
  },
  progressLineActive: {
    backgroundColor: "#E0C18F",
    height: 4,
    borderRadius: 100,
    width: "66%",
  },
  top: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 26,
  },

  scroll: {
    minHeight: "100%",
  },
  title: {
    fontSize: 24,
    lineHeight: 33,
    color: "#1F2024",
    fontFamily: "ShabnamBold",
  },
  navBtm: {
    position: "absolute",
    width: "100%",
    left: 0,
    bottom: 0,
    zIndex: 2,
    paddingHorizontal: 0,
  },
  container: {
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 40,
    display: "flex",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});
