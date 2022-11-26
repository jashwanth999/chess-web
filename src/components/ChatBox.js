import React, { useEffect, useState } from "react";

export default function ChatBox({ roomId, socket, username }) {
  const [message, setMessage] = useState("");

  const [allMessages, setAllMessages] = useState([]);

  const sendMessage = () => {
    setAllMessages([...allMessages, { message, roomId, username }]);

    socket.emit("send_message", { message, roomId, username });

    setMessage("");
  };

  useEffect(() => {
    socket.on("recieve_chat_message", (data) => {
      setAllMessages([...allMessages, data]);
    });
  }, [socket, allMessages]);

 

  return (
    <div style={chatDiv}>
      <div style={messagesDiv}>
        {allMessages.map((data, index) => {
          return (
            <h5 key={index} style={{ margin: 1 }}>
              {" "}
              {data.username}: {data.message}{" "}
            </h5>
          );
        })}
      </div>

      <div style={messageInputDiv}>
        <input
          style={messageInputStyle}
          placeholder="send message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button style={sendButton} onClick={sendMessage}>
          {" "}
          send
        </button>
      </div>
    </div>
  );
}

const messagesDiv = {
  flex: 1,
  backgroundColor: "white",
  borderRadius: 5,
  borderBottomRightRadius: 0,
  borderBottomLeftRadius: 0,
  margin: 2,
  overflowY: "scroll",
};

const chatDiv = {
  flex: 0.8,
  height: "90vh",
  borderRadius: 5,
  display: "flex",
  flexDirection: "column",
};

const messageInputDiv = {
  backgroundColor: "white",
  flex: 0.05,
  display: "flex",
  flexDirection: "row",
  borderBottomLeftRadius: 5,
  borderBottomRightRadius: 5,
};

const messageInputStyle = {
  padding: 5,
  flex: 1,
  borderBottomLeftRadius: 5,
  outline: "none",
};

const sendButton = {
  borderBottomRightRadius: 5,
};
