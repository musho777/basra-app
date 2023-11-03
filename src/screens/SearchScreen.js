import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import NavigationBottom from "../components/NavigationBottom";
import BackIcon from "../icons/BackIcon";
import { useNavigation } from "@react-navigation/native";
import SearchInput from "../components/SearchInput";

export default function SearchScreen(props) {
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.navBtm}>
        <NavigationBottom active="catalog"></NavigationBottom>
      </View>
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <View style={styles.top}>
            <BackIcon style={{ opacity: 0 }}></BackIcon>
            <Text style={styles.title}>البحث في الكتالوج</Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Catalog")}
            >
              <BackIcon></BackIcon>
            </TouchableOpacity>
          </View>
          <View style={styles.search}>
            <SearchInput
              onSubmitEditing={() => navigation.navigate("SearchResult")}
            ></SearchInput>
          </View>
          <Text style={[styles.searchItem, styles.searchItemGray]}>
            كثيرا ما بحثت
          </Text>
          <Text style={styles.searchItem}>من التجاعيد</Text>
          <Text style={styles.searchItem}>مصل الوجه</Text>
          <Text style={styles.searchItem}>رعاية ليلية</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  searchItem: {
    width: "100%",
    textAlign: "right",
    marginBottom: 20,
    fontFamily: "Shabnam",
    fontSize: 18,
    lineHeight: 22,
    color: "#1F2024",
  },
  searchItemGray: {
    color: "rgba(31, 32, 36, 0.5)",
  },
  search: {
    width: "100%",
    marginBottom: 30,
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
    marginBottom: 15,
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
    paddingTop: 20,
    paddingBottom: 106,
    display: "flex",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});
