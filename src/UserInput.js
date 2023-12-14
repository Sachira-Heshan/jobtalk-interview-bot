import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function UserInput({ navigation }) {
   const [jobDescription, setJobDescription] = useState("");
   const [userDetails, setUserDetails] = useState("");

   return (
      <ScrollView>
         <View style={styles.container}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
               Enter the details below
            </Text>
            <TextInput
               mode="outlined"
               label={"Job description"}
               onChangeText={(t) => setJobDescription(t)}
               value={jobDescription}
               style={{ width: "90%" }}
               multiline
               numberOfLines={6}
            />
            <TextInput
               mode="outlined"
               label={"User details"}
               onChangeText={(t) => setUserDetails(t)}
               value={userDetails}
               style={{ width: "90%", marginTop: 12 }}
               multiline
               numberOfLines={6}
            />
            <Button
               mode="contained"
               onPress={() =>
                  navigation.navigate("ChatPage", {
                     jobDescription,
                     userDetails,
                  })
               }
               style={{ borderRadius: 6, marginTop: 15, width: "90%" }}
               labelStyle={{ fontSize: 16 }}
            >
               Get Started!
            </Button>
            <StatusBar style="auto" />
         </View>
      </ScrollView>
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
