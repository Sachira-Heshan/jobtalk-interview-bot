import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function Home({ navigation }) {
   return (
      <View style={styles.container}>
         <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Welcome to Job Talk!
         </Text>
         <Button
            mode="contained"
            onPress={() => navigation.navigate("UserInput")}
            style={{ borderRadius: 6, marginTop: 15 }}
         >
            Get Started!
         </Button>
         <StatusBar style="auto" />
      </View>
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
