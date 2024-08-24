import MessagesContainer from "./MessagesContainer";
import useWebSocket from "react-use-websocket";
import ChatInput from "./ChatInput";
import { getCookie } from "../Auth/Cookies";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../../styles/Chat.css";

function ChatPage() {
	const { chat_id } = useParams();
	const access_token = getCookie("access_token");
	const decodedToken = jwtDecode(access_token);
	const uuid = decodedToken.uuid;
	const { sendJsonMessage, lastJsonMessage } = useWebSocket(
		`ws://localhost:8000/ws/chat/${chat_id}`,
		{ onOpen: () => console.log("ws: connection established") }
	);
	const handleSendMessage = (message) => {
		sendJsonMessage({
			chat_id: chat_id,
			from: uuid,
			content: message,
		});
	};
	return (
		<>
			<div className="conversation-box">
				<div className="conversation">
					<MessagesContainer
						uuid={uuid}
						chat_id={chat_id}
						lastMessage={lastJsonMessage}
					/>
				</div>
				<ChatInput onSend={handleSendMessage} />
			</div>
		</>
	);
}

export default ChatPage;
