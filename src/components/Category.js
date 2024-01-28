import { ScrollView, View, Text, StyleSheet } from "react-native";
import Product from "./Product";

export default function Category(props) {

  return (
    !!props.product?.length && (
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
          {props.product?.map((product, i) => {
            return <View style={styles.product} key={i}>
              <Product product={product}></Product>
            </View>
          })}
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
