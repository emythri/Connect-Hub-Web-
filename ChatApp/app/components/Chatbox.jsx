import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  TextInput,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import io from "socket.io-client";

const socket = io("http://localhost:5000");
const backgroundImg = require("../assets/bg.png");

export default function Chatbox({ user, goBack }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef();
  const storageKey = `chat_messages_${user.id}`;

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const stored = await AsyncStorage.getItem(storageKey);
        if (stored) setMessages(JSON.parse(stored));
      } catch (error) {
        console.error("Failed to load messages", error);
      }
    };
    loadMessages();
  }, [user]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      if (data.from === user.id) {
        setMessages((prev) => {
          const updated = [...prev, data];
          AsyncStorage.setItem(storageKey, JSON.stringify(updated));
          return updated;
        });
      }
    });

    return () => {
      socket.off("receive_message");
    };
  }, [user]);

  const sendMessage = () => {
    if (message.trim()) {
      const msgData = { text: message, from: user.id };
      socket.emit("send_message", msgData);
      setMessages((prev) => {
        const updated = [...prev, msgData];
        AsyncStorage.setItem(storageKey, JSON.stringify(updated));
        return updated;
      });
      setMessage("");
    }
  };

  return (
    <ImageBackground source={backgroundImg} style={styles.background} resizeMode="cover">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={90}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={goBack}>
              <Text style={styles.back}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>{user.name}</Text>
          </View>

          <ScrollView
            ref={scrollViewRef}
            style={styles.chat}
            contentContainerStyle={styles.chatContent}
            onContentSizeChange={() =>
              scrollViewRef.current?.scrollToEnd({ animated: true })
            }
          >
            {messages.map((msg, index) => (
              <Text key={index} style={styles.message}>
                {msg.text}
              </Text>
            ))}
          </ScrollView>

          <View style={styles.inputArea}>
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Type a message..."
              style={styles.input}
              placeholderTextColor="#888"
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    padding: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  back: {
    color: "#007AFF",
    fontSize: 16,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  chat: {
    flex: 1,
    marginVertical: 10,
  },
  chatContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  message: {
    padding: 10,
    backgroundColor: "#4CAF50",
    color: "#fff",
    borderRadius: 10,
    marginVertical: 5,
    alignSelf: "flex-end",
    maxWidth: "75%",
  },
  inputArea: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 25,
    backgroundColor: "#fff",
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});