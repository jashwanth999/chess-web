import React, { useEffect, useState } from "react";
import { gridConstants } from "../helpers/imageHelpers";
import "../css/chat.css";

export default function ChatBox({ roomId, socket, username }) {
  const [message, setMessage] = useState("");

  const [allMessages, setAllMessages] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message === "") return;

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
      <div className="messagesDiv" style={messagesDiv}>
        {allMessages.map((data, index) => {
          return (
            <h5 key={index} style={{ margin: 1, color: "#D0D3D4",wordWrap:'break-word' }}>
              {" "}
              {data.username}: {data.message}{" "}
            </h5>
          );
        })}
      </div>

      <form onSubmit={sendMessage} style={messageInputDiv}>
        <input
          style={messageInputStyle}
          placeholder="send message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </div>
  );
}

const messagesDiv = {
  flex: 1,
  borderRadius: 5,
  borderBottomRightRadius: 0,
  borderBottomLeftRadius: 0,
  margin: 2,
  overflowY: "scroll",
  padding: 5,
};

const chatDiv = {
  height: gridConstants.gridSize/1.3,
  width: gridConstants.gridSize,
  borderRadius: 4,
  display: "flex",
  flexDirection: "column",
  marginLeft: 10,
  backgroundColor: "rgb(46, 46, 46)",
};

const messageInputDiv = {
  flex: 0.05,
  display: "flex",
  flexDirection: "row",
  borderBottomLeftRadius: 4,
  borderBottomRightRadius: 4,
};

const messageInputStyle = {
  padding: 5,
  flex: 1,
  borderBottomLeftRadius: 4,
  borderBottomRightRadius: 4,
  outline: "none",
  border: "none",
  backgroundColor: "rgb(46, 46, 46)",
  borderTop:'0.5px solid black',
  color:'white'
};
