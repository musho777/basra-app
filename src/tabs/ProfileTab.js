import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen";
import PersonalScreen from "../screens/PersonalScreen";
import OrderScreen from "../screens/OrderScreen";
import OrdersScreen from "../screens/OrdersScreen";
import InfoScreen from "../screens/InfoScreen";

const Stack = createNativeStackNavigator();

export default function ProfileTab() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen}></Stack.Screen>
      <Stack.Screen name="Personal" component={PersonalScreen}></Stack.Screen>
      <Stack.Screen name="Orders" component={OrdersScreen}></Stack.Screen>
      <Stack.Screen name="Order" component={OrderScreen}></Stack.Screen>
      <Stack.Screen name="Info" component={InfoScreen}></Stack.Screen>
    </Stack.Navigator>
  );
}
