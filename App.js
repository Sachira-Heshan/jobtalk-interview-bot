import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import Navigation from "./src/Navigation";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
   return (
      <PaperProvider>
         <NavigationContainer>
            <Navigation />
         </NavigationContainer>
      </PaperProvider>
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
