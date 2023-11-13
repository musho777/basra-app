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
import { useState } from "react";
import ButtonPrimary from "../../components/ButtonPrimary";
import RadioPrimary from "../../components/RadioPrimary";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { CityModal } from "../../components/CityModal";

export default function LocationInfoScreen(props) {
  const [deliveryMethod, setDeliveryMethod] = useState(1);
  const [deliveryType, setDeliveryType] = useState([])
  const navigation = useNavigation();
  const getDelivery = useSelector((st) => st.getDelivery)
  const [openModal, setOpenModal] = useState(false)
  const [selectedCity, setSelectedCity] = useState({})
  useEffect(() => {
    setDeliveryType(getDelivery.data)
  }, [getDelivery.data])
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
          <TouchableOpacity onPress={() => { setOpenModal(true) }} style={[styles.input, { marginBottom: 48 }]} >
            <Text style={styles.inputText}> {selectedCity.name ? selectedCity.name : 'مدن'}</Text>
          </TouchableOpacity>
          <Text style={styles.subtitlePrimary}>طريقة التوصيل</Text>
          {deliveryType?.map((elm, i) => {
            return <View key={i} style={[styles.radio, { marginBottom: 15 }]}>
              <RadioPrimary
                title={elm.name}
                text="التسليم في البصرة – 250 د.ع"
                onPress={() => setDeliveryMethod(elm.id)}
                active={deliveryMethod == elm.id}
              ></RadioPrimary>
            </View>
          })}
          <View style={styles.btn}>
            <ButtonPrimary onPress={() => navigation.navigate("AddressInfo")}>
              إضافي
            </ButtonPrimary>
          </View>
        </View>
        <CityModal onPress={(e) => setSelectedCity(e)} close={() => setOpenModal(false)} visible={openModal} />
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
    height: 40,
    borderWidth: 1,
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
  input: {
    height: 56,
    borderColor: "rgba(31, 32, 36, 0.15)",
    borderWidth: 1,
    width: "100%",
    borderRadius: 15,
    fontSize: 16,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "ShabnamLight",
    backgroundColor: "#F2F2F4",
    justifyContent: 'center'
  },
  inputText: {
    textAlign: 'right',
  }
});
