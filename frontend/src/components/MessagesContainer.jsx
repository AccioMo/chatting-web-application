import React, { useContext } from "react";
import { useEffect } from "react";
import { getCookie } from "./Cookies";
import { refreshToken, api } from "./Auth.tsx";
import { MessageContext } from "./ChatPage";

function MessagesContainer({ chat_id }) {
	const { messages, setMessages } = React.useContext(MessageContext);
	useEffect(() => {
		const getMessages = async (retry = 1) => {
			try {
				const headers = {
					Authorization: `Bearer ${getCookie("access_token")}`,
				};
				const payload = {
					uuid: getCookie("uuid"),
					chat_id: chat_id,
				};
				const response = await api.post("/api/get_messages", payload, {
					headers,
				});
				return response;
			} catch (error) {
				if (error.response.status === 401 && retry > 0) {
					return refreshToken().then(() => getMessages(retry - 1));
				} else {
					console.error("error: ", error);
				}
			}
		};
		if (messages === null) {
			getMessages().then((e) => {
				setMessages(e.data.messages);
			});
		}
	}, [messages]);

	return (
		<div>
			<div>
				{messages
					? messages.map((message) => (
							<div key={message.id}>
								<p>{message.content}</p>
							</div>
					  ))
					: null}
			</div>
		</div>
	);
}

export default MessagesContainer;
