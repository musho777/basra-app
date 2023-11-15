import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { GetPadborkiforBodborkiId } from "../store/action/action";

export default function Category(props) {
  const [products, setProducts] = useState([]);
  const { token } = useSelector((st) => st.static)
  const dispatch = useDispatch()
  const getPadborkiId = useSelector((st) => st.getPadborkiId)
  useEffect(() => {
    dispatch(GetPadborkiforBodborkiId({ podborka_id: props.compilationId }, token))
  }, []);

  useEffect(() => {
    if (getPadborkiId.data?.data?.length) {
      setProducts(getPadborkiId.data?.data)
    }
  }, [getPadborkiId])

  return (
    !!products.length && (
      <View>
        <View style={styles.top}>
          <Text style={styles.topLeft}>اظهار الكل</Text>
          <Text style={styles.topRight}>{props.name}</Text>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          contentContainerStyle={{
            paddingLeft: 15,
            paddingRight: 0,
          }}
        >
          {products.map((product, i) => (
            <View style={styles.product} key={i}>
              <Product product={product}></Product>
            </View>
          ))}
        </ScrollView>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  product: {
    width: 180,
    height: "auto",
    marginRight: 15,
  },
  top: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  topLeft: {
    color: "rgba(113, 114, 122, 0.5)",
    fontFamily: "Shabnam",
    fontSize: 16,
    lineHeight: 22,
  },
  topRight: {
    fontFamily: "ShabnamBold",
    fontSize: 22,
    lineHeight: 30,
    color: "#2F3036",
  },
});
