import { useState, createContext } from "react";
import NavBar from "./NavBar";
import MessagesContainer from "./MessagesContainer";
import { api, refreshToken } from "./Auth.tsx";
import { getCookie, setCookie, validCookie } from "./Cookies";
import { useParams } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { ws } from "./Socket.jsx";
import "../styles/Chat.css";

export const MessageContext = createContext();

function ChatPage() {
	const { chat_id } = useParams();
	const [messages, setMessages] = useState(null);
	const [value, setValue] = useState("");
	const access_token = getCookie("access_token");
	const decodedToken = jwtDecode(access_token);
	const uuid = decodedToken.uuid;
	ws.onmessage = (e) => {
		console.log("message: ", e.data);
		setMessages([...messages, JSON.parse(e.data)]);
	};
	const sendMessage = async (message) => {
		const data = {
			chat_id: chat_id,
			from: uuid,
			content: message,
		};
		ws.send(JSON.stringify(data));
	};
	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			const message = event.target.value;
			setValue("");
			sendMessage(message);
		}
	};
	return (
		<>
			<NavBar />
			<div className="chat-box">
				<div className="messages-container">
					<MessageContext.Provider value={{ messages, setMessages }}>
						<MessagesContainer chat_id={chat_id} uuid={uuid} />
					</MessageContext.Provider>
				</div>
				<div className="container-of-container">
					<div className="text-container border">
						<textarea
							className="text-box page-font"
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
