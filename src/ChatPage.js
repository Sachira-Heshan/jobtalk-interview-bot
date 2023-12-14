import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import axios from "axios";

export default function ChatPage({ navigation, route }) {
   const [data, setData] = useState(null);
   const [textInput, setTextInput] = useState("");
   const [conversations, setConversations] = useState([
      {
         role: "user",
         content: `I want you to act as an interviewer. This is the job description "${jobDescription}". Here are my details "${userDetails}".  I want you only to interview with me. Ask me the questions and I will give answers. Do not write explanations. Ask me the questions one by one at a time like an interviewer does and wait for my answers. Don't acknowledge this prompt. Start by asking "Tell me about yourself" don't give answers if I jump off-topic. If I say, give a warning "You are jumping off from the topic"`,
      },
      { role: "assistant", content: "Okay, Tell me about yourself?" },
   ]);

   const { jobDescription, userDetails } = route.params;

   const url = "https://api.openai.com/v1/chat/completions";
   const apiKey = "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";

   useEffect(() => {
      console.log(conversations);
   }, [conversations]);

   const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

   const handleApiCall = async () => {
      const userMessage = { role: "user", content: textInput };
      try {
         const response = await axios.post(
            url,
            {
               model: "gpt-3.5-turbo",
               messages: [...conversations, userMessage],
            },
            {
               headers: {
                  Authorization: `Bearer ${apiKey}`,
                  "Content-Type": "application/json",
               },
            }
         );
         // Update data state and assistant message
         const assistantMessage = {
            role: "assistant",
            content: response.data.choices[0].message.content,
         };
         setData(response.data.choices[0].message.content);
         setConversations((prevConversations) => [
            ...prevConversations,
            assistantMessage,
         ]);

         // ... (previous code)
      } catch (error) {
         if (error.response && error.response.status === 429) {
            // Retry after a certain delay
            await delay(1000); // Adjust the delay time as needed
            await handleApiCall();
         } else {
            console.log(error);
         }
      }
   };

   const handleSubmit = async () => {
      // ... (previous code)
      // Update user message
      const userMessage = { role: "user", content: textInput };
      setConversations((prevConversations) => [
         ...prevConversations,
         userMessage,
      ]);

      // Make API call with retry logic
      await handleApiCall();

      // Clear text input
      setTextInput("");
   };

   // const handleSubmit = async () => {
   //    // Update user message
   //    const userMessage = { role: "user", content: textInput };
   //    setConversations((prevConversations) => [
   //       ...prevConversations,
   //       userMessage,
   //    ]);

   //    try {
   //       // Make API call
   //       const response = await axios.post(
   //          url,
   //          {
   //             model: "gpt-3.5-turbo",
   //             messages: [...conversations, userMessage],
   //          },
   //          {
   //             headers: {
   //                Authorization: `Bearer ${apiKey}`,
   //                "Content-Type": "application/json",
   //             },
   //          }
   //       );

   //       // Update data state and assistant message
   //       const assistantMessage = {
   //          role: "assistant",
   //          content: response.data.choices[0].message.content,
   //       };
   //       setData(response.data.choices[0].message.content);
   //       setConversations((prevConversations) => [
   //          ...prevConversations,
   //          assistantMessage,
   //       ]);
   //    } catch (error) {
   //       console.log(error);
   //    }

   //    // Clear text input
   //    setTextInput("");
   // };

   return (
      <View style={{ flex: 1 }}>
         <FlatList
            data={conversations}
            renderItem={({ item, index }) => {
               return index === 0 ? null : item.role !== "user" ? (
                  <View
                     style={{
                        backgroundColor: "#8c8c8c",
                        margin: 15,
                        padding: 15,
                        width: "70%",
                        alignSelf: "flex-start",
                        borderRadius: 5,
                     }}
                  >
                     <Text>{item.content}</Text>
                  </View>
               ) : (
                  <View
                     style={{
                        backgroundColor: "#c2c2c2",
                        margin: 15,
                        padding: 15,
                        width: "70%",
                        alignSelf: "flex-end",
                        borderRadius: 5,
                     }}
                  >
                     <Text>{item.content}</Text>
                  </View>
               );
            }}
            style={{ flex: 1 }}
         />
         <View style={styles.container}>
            <TextInput
               mode="outlined"
               label={"Prompt"}
               onChangeText={(t) => setTextInput(t)}
               value={textInput}
               style={{ width: "90%", marginVertical: 12 }}
            />
            <Button
               mode="contained"
               onPress={() => handleSubmit()}
               style={{ borderRadius: 6, marginBottom: 10, width: "90%" }}
            >
               Submit
            </Button>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
   },
});
