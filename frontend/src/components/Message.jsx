import React from 'react'
import '../styles/Chat.css'

function Message({ uuid, content, sender, seen}) {
	const isUser = (sender) => {
		if (sender === uuid) {
			return true;
		} else {
			return false;
		}
	}
  return (
	<div className={`${isUser(sender) ? 'right' : 'left'} message-outer-box`} >
		<div className={`border ${isUser(sender) ? 'bg-light-accent' : 'bg-white'} message-inner-box`} >
			<div className="message-content">
				{content}
			</div>
		</div>
	</div>
  )
}

export default Message;