import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import NavigationBottom from "../components/NavigationBottom";
import BackIcon from "../icons/BackIcon";
import SearchIconCategory from "../icons/SearchIconCategory";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { ClearOrderStatus, GetProductsByCategory } from "../store/action/action";
import ChatScreen from "../components/Chat/ChatScreen";
import ChatIcon from "../icons/ChatIcon";


export default function CategoryScreen(props) {
  const navigation = useNavigation();

  const [products, setProducts] = useState([]);

  const dispatch = useDispatch()

  const categoryId = props.route.params.categoryId;
  const categoryName = props.route.params.categoryName;
  const search = props.route.params?.search

  const { token } = useSelector((st) => st.static)
  const getPorduct = useSelector((st) => st.getPorductByCategoy)
  const [page, setPage] = useState(0)

  const [chatVisible, setChatVisible] = useState(false);



  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isEndOfList =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    if (isEndOfList) {
      loadMoreData();
    }
  };


  const loadMoreData = () => {
    if (getPorduct?.data?.next_page_url) {
      setPage(page + 1)
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setPage(1)
      dispatch(ClearOrderStatus())
      setProducts([])
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (page > 0) {
      dispatch(GetProductsByCategory({ category_id: categoryId, search: search }, token, page))
    }

  }, [page, search])


  useEffect(() => {
    if (getPorduct.data.data) {
      setProducts(getPorduct.data.data)
    }
  }, [getPorduct])

  if (getPorduct.loading) {
    return <View style={styles.loading}>
      <ActivityIndicator color={'black'} />
    </View >
  }
  return (
    <View>
      {<TouchableOpacity
        style={styles.chatIcon}
        onPress={() => {
          setChatVisible(true);
        }}
      >
        <ChatIcon></ChatIcon>
      </TouchableOpacity>}
      {chatVisible && (
        <ChatScreen
          onClose={() => {
            setChatVisible(false);
          }}
        ></ChatScreen>
      )}
      <View style={styles.navBtm}>
        <NavigationBottom active="catalog"></NavigationBottom>
      </View>
      <ScrollView style={styles.scroll}

        scrollEventThrottle={16}

        onScroll={handleScroll}>
        <View style={styles.container}>
          <View style={styles.top}>
            <TouchableOpacity onPress={() => navigation.navigate("Search", {
              categoryId,
              categoryName,
              searchValue: search
            })}>
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
            {products?.map((product, index) => {
              return <View
                style={[
                  styles.product,
                  { marginRight: index % 2 == 1 ? 0 : 10 },
                ]}
                key={index}
              >
                <Product product={product}></Product>
              </View>
            })}
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
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  chatIcon: {
    position: "absolute",
    width: 85,
    height: 85,
    bottom: 100,
    zIndex: 100,
    left: 15,
  },
});
