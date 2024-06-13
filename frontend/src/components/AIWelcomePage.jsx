import { useNavigate } from 'react-router';
import '../styles/AIChatPage.css'

function AIWelcomePage() {
	const nav = useNavigate();
  return (
	<div className="flex-page">
		<div onClick={() => nav("/chat-with-ai/bob")}>hello</div>
	</div>
  )
}

export default AIWelcomePage