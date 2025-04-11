import React, { useState } from "react";
import ChatScreen from "../components/Chatbox";
import UsersList from "../components/MyChats"; // or UsersList.jsx

export default function HomeScreen() {
  const [selectedUser, setSelectedUser] = useState(null);

  return selectedUser ? (
    <ChatScreen user={selectedUser} goBack={() => setSelectedUser(null)} />
  ) : (
    <UsersList onUserSelect={setSelectedUser} />
  );
}
