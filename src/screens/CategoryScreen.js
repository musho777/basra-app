import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import NavigationBottom from "../components/NavigationBottom";
import BackIcon from "../icons/BackIcon";
import SearchIconCategory from "../icons/SearchIconCategory";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import Product from "../components/Product";
import { fetchProductsSelection, baseUrl } from "../api";

export default function CategoryScreen(props) {
  const navigation = useNavigation();
  console.log(props, 'pro ')

  const [products, setProducts] = useState([]);

  const categoryId = props.route.params.categoryId;
  const categoryName = props.route.params.categoryName;

  useEffect(() => {
    async function fetchData() {
      const data = await fetchProductsSelection("category", categoryId);
      setProducts(data);
    }
    fetchData();
  }, []);

  return (
    <View>
      <View style={styles.navBtm}>
        <NavigationBottom active="catalog"></NavigationBottom>
      </View>
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <View style={styles.top}>
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
              <SearchIconCategory></SearchIconCategory>
            </TouchableOpacity>
            <View>
              <Text style={styles.categoryTitle}>{categoryName}</Text>
              <Text style={styles.categorySubtitle}>
                المنتجات التي تم العثور عليها: {products.length}
              </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackIcon></BackIcon>
            </TouchableOpacity>
          </View>
          <View style={styles.products}>
            {products.map((product, index) => (
              <View
                style={[
                  styles.product,
                  { marginRight: index % 2 == 1 ? 0 : 10 },
                ]}
                key={index}
              >
                <Product product={product}></Product>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  products: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  product: {
    maxWidth: 160,
    marginBottom: 10,
  },
  categorySubtitle: {
    color: "rgba(31, 32, 36, 0.5)",
    fontSize: 15,
    lineHeight: 19,
    fontFamily: "Shabnam",
  },
  categoryTitle: {
    fontSize: 22,
    color: "#1F2024",
    fontFamily: "ShabnamBold",
    textAlign: "center",
  },
  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    marginBottom: 25,
  },
  scroll: {
    minHeight: "100%",
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
    paddingTop: 15,
    paddingBottom: 106,
    display: "flex",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});
