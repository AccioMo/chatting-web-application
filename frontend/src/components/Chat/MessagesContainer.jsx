import { useEffect, useContext, useState } from "react";
import { getCookie, validCookie } from "../Auth/Cookies.jsx";
import { refreshToken, api } from "../Auth/Auth.tsx";
import Message from "./Message.jsx";
import "../../styles/Message.css";

function MessagesContainer({ chat_id, uuid, lastMessage }) {
	const [ messages, setMessages ] = useState(null);
	// const { lastMessage } = useContext(MessageContext);
	useEffect(() => {
		const getMessages = async () => {
			let access_token = getCookie("access_token");
			if (validCookie(access_token) === false) {
				access_token = await refreshToken();
			}
			const headers = {
				Authorization: `Bearer ${access_token}`,
			};
			const payload = {
				uuid: uuid,
				chat_id: chat_id,
			};
			const response = await api.post("/api/get_messages", payload, {
				headers,
			});
			return response;
		};
		if (messages === null) {
			getMessages()
				.then((e) => {
					setMessages(e.data.messages);
				})
				.catch((e) => {
					console.error(e);
				});
		} else if (lastMessage.content) {
			setMessages([...messages, lastMessage]);
		}
	}, [lastMessage]);

	return (
		<div className="messages-container">
			{messages
				? messages.map((message) => (
						<Message
							key={message.id}
							content={message.content}
							sender={message.sender.username}
						/>
					))
				: null}
		</div>
	);
}

export default MessagesContainer;
