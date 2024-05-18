import React from 'react';
import { useNavigate } from 'react-router';
import '../styles/ChatContainer.css';

function ChatContainer( {chat} ) {
	const nav = useNavigate();
	const navToChat = () => {
		nav(`/chat/${chat.id}`);
	}
  	return (
		<div onClick={navToChat} className='chat-container border'>
			<div className='chat-header'>
				{chat.title}
			</div>
			<div className='chat-body'>
				<div className='chat-topic'>
					{chat.topic}
				</div>
				<div className='chat-text'>
					{chat.id}
				</div>
			</div>
			<div className='button-container'>
				<button className='chat-button'>Start Chat</button>
			</div>
		</div>
  	)
}

export default ChatContainer;