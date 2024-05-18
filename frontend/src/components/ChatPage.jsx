import React from "react";
import NavBar from "./NavBar";
import { apiClient, refreshToken } from "./Auth";
import { getCookie } from "./Cookies";
import { useParams } from "react-router-dom";
import "../styles/Chat.css";

function ChatPage() {
	const { chat_id } = useParams();
	console.log(chat_id);
	const sendMessage = async (e) => {
		const uuid = sessionStorage.getItem("uuid");
		if (!uuid) {
			const access_token = getCookie("access_token");
			if (access_token)
			uuid = apiClient
				.get("/api/auth", access_token)
				.then(() => {
					sessionStorage.setItem("uuid", uuid);
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
            sendMessage(event.target.value);
        }
    };
	return (
		<>
			<NavBar />
			<div className="chat-box">
				<div className="container-of-container">
					<div className="text-container border">
						<textarea
							className="text-box page-font"
							onKeyDown={handleKeyDown}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default ChatPage;
