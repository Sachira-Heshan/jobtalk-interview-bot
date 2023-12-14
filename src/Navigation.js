import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import UserInput from "./UserInput";
import ChatPage from "./ChatPage";

const AppStack = createStackNavigator();

export default function Navigation() {
   return (
      <AppStack.Navigator initialRouteName="Home">
         <AppStack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
         />
         <AppStack.Screen name="UserInput" component={UserInput} />
         <AppStack.Screen name="ChatPage" component={ChatPage} />
      </AppStack.Navigator>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
   },
});
