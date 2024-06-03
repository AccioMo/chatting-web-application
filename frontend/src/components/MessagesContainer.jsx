import React from "react";
import { useEffect, useContext, useState } from "react";
import { getCookie, validCookie } from "./Cookies";
import { refreshToken, api } from "./Auth.tsx";
import { MessageContext } from "./ChatPage";
import Message from "./Message";
import "../styles/Message.css";

function MessagesContainer({ chat_id, uuid }) {
	const [ messages, setMessages ] = useState(null);
	const { lastJsonMessage } = useContext(MessageContext);
	useEffect(() => {
		const getMessages = async () => {
			let access_token = getCookie("access_token");
			if (!access_token || validCookie(access_token) === false) {
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
		} else if (lastJsonMessage.content) {
			setMessages([...messages, lastJsonMessage]);
		}
	}, [lastJsonMessage]);

	return (
		<div className="messages-container">
			{messages
				? messages.map((message) => (
						<Message
							key={message.id}
							uuid={uuid}
							content={message.content}
							sender={message.sender}
							seen={false}
						/>
					))
				: null}
		</div>
	);
}

export default MessagesContainer;
