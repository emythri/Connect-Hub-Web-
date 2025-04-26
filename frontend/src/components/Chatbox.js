import { Box } from "@chakra-ui/layout";
import "./styles.css";
import SingleChat from "./SingleChat";
import { ChatState } from "../Context/ChatProvider";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      {/* key added here for re-mounting SingleChat on fetchAgain change */}
      <SingleChat key={selectedChat?._id || "no-chat"} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chatbox;


// import { Box } from "@chakra-ui/layout";
// import "./styles.css";
// import SingleChat from "./SingleChat";
// import { ChatState } from "../Context/ChatProvider";

// const Chatbox = ({ fetchAgain, setFetchAgain }) => {
//   const { selectedChat } = ChatState();

//   return (
//     <Box
//       d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
//       alignItems="center"
//       flexDir="column"
//       p={3}
//       bg="white"
//       w={{ base: "100%", md: "68%" }}
//       borderRadius="lg"
//       borderWidth="1px"
//     >
//       <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
//     </Box>
//   );
// };

// export default Chatbox;
