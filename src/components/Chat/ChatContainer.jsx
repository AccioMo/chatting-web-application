import { useNavigate } from 'react-router';
import UserTag from '../UserTag';
import SubmitButton from '../SubmitButton';
import Icon from '../UI/Icons';
import { getCookie, validCookie } from '../Auth/Cookies';
import { refreshToken, api } from '../Auth/Auth.tsx';
import { useState } from 'react';

function ChatContainer({ chat }) {
	const nav = useNavigate();
	const [deleted, setDeleted] = useState(false);
	const hasAI = chat.chatters.some(chatter => chatter.username === "AI");
	const deleteChat = async (chat) => {
		let access_token = getCookie("access_token");
		if (validCookie(access_token) === false) {
			access_token = await refreshToken();
		}
		const headers = {
			Authorization: `Bearer ${access_token}`,
		};
		api.post(`/api/delete_chat`, { id: chat.id }, {
			headers: headers,
		})
		setDeleted(true);
	};
	if (deleted) {
		return null;
	}
	return (
		<div className='chat-container'>
			<div className='chat-box'>
				<div className='chat-inner-box'>
					<div className='chat-header'>
						{chat.chatters.map((chatter, index) => {
							return (
								<UserTag key={index} username={chatter.username} />
							)
						})}
					</div>
					<div className='chat-body'>
						<div className='chat-topic'>
							{chat.topic}
						</div>
					</div>
					<div className="delete-button" onClick={() => deleteChat(chat)}>
						<Icon.Delete />
					</div>
					<div className='chat-footer'>
						<SubmitButton onClick={() => nav(`/${(hasAI ? "chat-ai/" : "chat/") + chat.id}`)} >
							Chat
						</SubmitButton>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ChatContainer;