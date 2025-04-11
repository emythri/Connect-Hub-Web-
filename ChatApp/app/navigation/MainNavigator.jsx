import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { ChatState } from "../Context/ChatProvider";
import Login from "../(tabs)/login";
import ChatPage from "../(tabs)/index";

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  const { user } = ChatState();

  return (
    <Stack.Navigator>
      {!user ? (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="Chat"
          component={ChatPage}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}
