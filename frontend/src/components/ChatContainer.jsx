import React from 'react';
import { useNavigate } from 'react-router';
import '../styles/ChatContainer.css';

function ChatContainer( {chat} ) {
	const nav = useNavigate();
	const navToChat = () => {
		nav('/chats/');
	}
  	return (
		<div onClick={navToChat} className='chat-container'>
			<div className='chat-header'>
				{chat.name}
			</div>
			<div className='chat-body'>
				<div className='chat-topic'>
					{chat.topic}
				</div>
				<div className='chat-text'>
					{chat.desc}
				</div>
			</div>
			<div className='button-container'>
				<button className='chat-button'>Start Chat</button>
			</div>
		</div>
  	)
}

export default ChatContainer;