import { useEffect, useRef, useState } from "react";
import { getCookie, validCookie } from "../Auth/Cookies.jsx";
import { refreshToken, api } from "../Auth/Auth.tsx";
import Message from "./Message.jsx";
import "../../styles/Message.css";

function MessagesContainer({ chat_id, uuid, lastMessage }) {
	const [messages, setMessages] = useState(null);
	const messagesEndRef = useRef(null);
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};
	useEffect(() => {
		console.log("lastMessage:", messages || "null");
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
	}, [lastMessage, chat_id, messages, uuid]);
	useEffect(scrollToBottom, [messages]);

	return (
		<div className="messages-container">
			{messages
				? messages.map((message, index) => (
						<Message
							key={index}
							content={message.content}
							sender={message.sender.username}
							ref={
								index === messages.length - 1
									? messagesEndRef
									: null
							}
						/>
				  ))
				: null}
		</div>
	);
}

export default MessagesContainer;
