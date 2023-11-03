import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import NavigationBottom from "../components/NavigationBottom";
import BackIcon from "../icons/BackIcon";
import { useNavigation } from "@react-navigation/native";
import ButtonPrimary from "../components/ButtonPrimary";
import ProductCart from "../components/ProductCart";
import { useState } from "react";
import EmptyOrders from "../icons/EmptyOrders";
import { useCartStore } from "../store/cartStore";

export default function CartScreen(props) {
  const cartStore = useCartStore();
  const navigation = useNavigation();

  function totalCost() {
    let sum = 0;
    Object.values(cartStore.items).forEach((product) => {
      const productPrice =
        product.price - product.price * (product.discount / 100);
      sum += product.count * productPrice;
    });
    return sum;
  }

  return (
    <View>
      <View style={styles.navBtm}>
        <NavigationBottom active="cart"></NavigationBottom>
      </View>
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <View style={styles.top}>
            <BackIcon style={{ opacity: 0 }}></BackIcon>
            <Text style={styles.title} onPress={() => setProducts([])}>
              سلة
            </Text>
            <TouchableOpacity style={{ opacity: 0 }}>
              <BackIcon></BackIcon>
            </TouchableOpacity>
          </View>
          {Object.values(cartStore.items).length > 0 ? (
            <View style={{ width: "100%" }}>
              <View style={styles.products}>
                {Object.values(cartStore.items).map((product, index) => (
                  <ProductCart key={index} product={product}></ProductCart>
                ))}
              </View>
              <View style={styles.btmTextWrap}>
                <Text style={styles.btmText}>{totalCost()} د.ع</Text>
                <Text
                  style={[styles.btmText, { marginLeft: 12, marginRight: 12 }]}
                >
                  ·
                </Text>
                <Text style={styles.btmText}>سعر الطلب</Text>
              </View>
              <View style={styles.btmBtn}>
                <ButtonPrimary
                  onPress={() => navigation.navigate("GeneralInfo")}
                >
                  الدفع
                </ButtonPrimary>
              </View>
            </View>
          ) : (
            <View style={styles.emptyOrdersContainer}>
              <EmptyOrders></EmptyOrders>
              <Text style={styles.emptyOrdersTitle}>
                عربة التسوق فارغة حاليا
              </Text>
              <Text style={styles.emptyOrdersSubtitle}>
                اذهب إلى الدليل وأضف أضف إلى سلة التسوق العناصر ذات الأهمية
              </Text>
              <ButtonPrimary style={styles.emptyOrdersBtn}>
                اذهب إلى الكتالوج
              </ButtonPrimary>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyOrdersBtn: {
    width: "100%",
  },
  emptyOrdersContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  emptyOrdersSubtitle: {
    color: "#71727A",
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "ShabnamLight",
    textAlign: "center",
    maxWidth: 288,
    marginBottom: 50,
  },
  emptyOrdersTitle: {
    fontSize: 24,
    lineHeight: 33,
    fontFamily: "ShabnamBold",
    color: "#1F2024",
    marginTop: 16,
    marginBottom: 12,
  },
  btmBtn: {
    width: "100%",
    marginTop: 18,
  },
  btmText: {
    fontFamily: "Shabnam",
    fontSize: 18,
    lineHeight: 25,
    color: "#1F2024",
  },
  btmTextWrap: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  products: {
    width: "100%",
  },
  top: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
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
    paddingBottom: 120,
    display: "flex",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});
