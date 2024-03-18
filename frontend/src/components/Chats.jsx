import React from 'react'

function Chats() {
  return (
	<div className='chats-container'>
		{chats.map(chat => (
			<ChatContainer key={chat.id} chat={chat} />
			))}
	</div>
  )
}

export default Chats