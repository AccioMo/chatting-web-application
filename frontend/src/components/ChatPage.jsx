import { useState, createContext } from "react";
import NavBar from "./NavBar";
import MessagesContainer from "./MessagesContainer";
import { api, refreshToken } from "./Auth.tsx";
import { getCookie, setCookie } from "./Cookies";
import { useParams } from "react-router-dom";
import { ws, send } from "./Socket.jsx";
import "../styles/Chat.css";

export const MessageContext = createContext();

function ChatPage() {
	const { chat_id } = useParams();
	const [messages, setMessages] = useState(null);
	const [value, setValue] = useState("");
	ws.onmessage = (e) => {
		console.log("message: ", e.data);
		setMessages([...messages, JSON.parse(e.data)]);
	};
	const sendMessage = async (e) => {
		const uuid = getCookie("uuid");
		if (tokenExipred(getCookie("access_token"))) { refreshToken() };
		if (!uuid) {
			const headers = {
				Authorization: `Bearer ${getCookie("access_token")}`
			};
			uuid = await api.get("/api/auth/", { headers: headers });
			setCookie("uuid", uuid, 30 * 24 * 60);
			console.log("uuid:", uuid);
		}
		const data = {
			chat_id: chat_id,
			from: uuid,
			content: e,
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
						<MessagesContainer chat_id={chat_id} />
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
