import { useState, createContext, useEffect } from "react";
import NavBar from "./NavBar";
import MessagesContainer from "./MessagesContainer";
import { getCookie } from "./Cookies";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import { jwtDecode } from "jwt-decode";
import "../styles/Chat.css";

export const MessageContext = createContext();

function ChatPage() {
	const { chat_id } = useParams();
	const [value, setValue] = useState("");
	const access_token = getCookie("access_token");
	const decodedToken = jwtDecode(access_token);
	const uuid = decodedToken.uuid;
	const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
		`ws://localhost:8000/ws/chat/${chat_id}`,
		{ onOpen: () => console.log("ws: connection established") }
	);
	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			const message = event.target.value;
			if (message === "") return ;
			setValue("");
			sendJsonMessage({
				chat_id: chat_id,
				from: uuid,
				content: message,
			});
		}
	};
	return (
		<>
			<div className="chat-box">
				<div className="conversation">
					<MessageContext.Provider value={{ lastJsonMessage }}>
						<MessagesContainer chat_id={chat_id} uuid={uuid} />
					</MessageContext.Provider>
				</div>
				<div className="container-of-container">
					<div className="input-container border">
						<textarea
							className="input-box page-font"
							value={value}
							onChange={(e) => setValue(e.target.value)}
							onKeyDown={handleKeyDown}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default ChatPage;
