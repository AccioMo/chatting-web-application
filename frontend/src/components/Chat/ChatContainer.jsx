import { useNavigate } from 'react-router';
import UserTag from '../UserTag';

function ChatContainer( {chat, uuid} ) {
	const nav = useNavigate();
  	return (
		<div className='chat-container'>
			<div className='chat-box border'>
				<div className='chat-inner-box'>
					<div className='chat-header'>
					{chat.chatters.map((chatter) => {
							return (
								<UserTag username={chatter.username}/>
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
						<button className='chat-button' onClick={() => nav(`/chat/${chat.id}`)}>Join</button>
					</div>
				</div>
			</div>
		</div>
  	)
}

export default ChatContainer;