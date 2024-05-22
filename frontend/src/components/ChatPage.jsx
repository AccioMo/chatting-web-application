import React from "react";
import NavBar from "./NavBar";
import MessagesContainer from "./MessagesContainer";
import { apiClient, refreshToken } from "./Auth";
import { getCookie, setCookie } from "./Cookies";
import { useParams } from "react-router-dom";
import "../styles/Chat.css";

function ChatPage() {
	const { chat_id } = useParams();
	const [value, setValue] = React.useState("");
	const sendMessage = async (e) => {
		const uuid = getCookie("uuid");
		if (!uuid) {
			const access_token = getCookie("access_token");
			if (access_token)
			uuid = apiClient
				.get("/api/auth", access_token)
				.then(() => {
					setCookie("uuid", uuid, 30);
				})
				.catch((e) => {
					console.log(e);
				});
		}
		const data = {
			chat_id: chat_id,
			from: uuid,
			content: e,
		};
		const response = apiClient
			.post('api/add_message', data)
			.then(() => {
				return e;
			})
			.catch(() => {
				console.log(e);
			});
	};
	const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
			event.preventDefault();
			const message = event.target.value;
			event.target.value = "";
            sendMessage(message);
        }
    };
	return (
		<>
			<NavBar />
			<div className="chat-box">
				<div className="messages-container">
					<MessagesContainer chat_id={chat_id} />
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
