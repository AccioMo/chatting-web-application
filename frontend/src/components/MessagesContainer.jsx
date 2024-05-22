import React from 'react'
import { useEffect } from 'react';
import { apiClient } from './Auth';
import { refreshToken } from './Auth';

import { getCookie } from './Cookies';

function MessagesContainer( { chat_id } ) {
	const [ messages, setMessages ] = React.useState(null);
	useEffect(() => {
		const getMessages = async () => {
			try {
				console.log("chat_id", chat_id)
				const headers = {
					Authorization: `Bearer ${getCookie("access_token")}`,
				};
				const payload = {
					uuid: getCookie('uuid'),
					chat_id: chat_id
				}
				const messages = await apiClient.post("/api/get_messages", payload, headers);
				return messages.data;
			} catch (error) {
				// if (error.response.status === 401 && retry > 0) {
				// 	return refreshToken().then(() => getMessages(retry - 1));
				// } else {
					console.error("error: ", error);
				// }
			}
		};
		getMessages().then((e) => {
			setMessages(e.messages);
		});
	}, []);
  return (
	<div>
		<div>
			{
				messages ? messages.map((message) => (
					<div key={message.id}>
						<p>{message.content}</p>
					</div>
				)) : null
			}
		</div>
	</div>
  )
}

export default MessagesContainer