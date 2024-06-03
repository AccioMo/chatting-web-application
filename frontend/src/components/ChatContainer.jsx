import React from 'react';
import { useNavigate } from 'react-router';
import '../styles/ChatContainer.css';

function ChatContainer( {chat, uuid} ) {
	const nav = useNavigate();
	const navToChat = () => {
		nav(`/chat/${chat.id}`);
	}
  	return (
		<div className='chat-container'>
			<div onClick={navToChat} className='chat-box border'>
				<div className='chat-inner-box'>
					<div className='chat-header'>
					{chat.chatters.map((chatter) => {
							if (chatter.uuid === uuid)
								return null;
							return (
								<div key={chatter.uuid} className='chat-chatter'>
									{chatter.username}
								</div>
							)
						})}
					</div>
					<div className='chat-body'>
						<div className='chat-topic'>
							Chatting about:
						</div>
						<div className='chat-text'>
							{chat.topic}
						</div>
					</div>
					<div className='button-container'>
						<button className='chat-button'>Creep In</button>
					</div>
				</div>
			</div>
		</div>
  	)
}

export default ChatContainer;