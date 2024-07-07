import { useNavigate } from 'react-router';
import '../styles/AIChatPage.css'

function AIWelcomePage() {
	const nav = useNavigate();
	const handleClick = () => {
		const headers = {
			Authorization: `Bearer ${access_token}`,
		};
		api.post("api/chat_with_ai", { bot: "bob" }, { headers: headers })
		.then((e) => {
			console.log('Chat created:', e.data);
			nav(`/chat-with-ai/bob`);
		})
	}
  return (
	<div className="flex-page">
		<div onClick={() => handleClick()}>hello</div>
	</div>
  )
}

export default AIWelcomePage