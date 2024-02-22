import React from 'react'
import '../styles/ChatContainer.css';

function ChatContainer( {chat} ) {
  return (
	<div className='chat-container'>
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