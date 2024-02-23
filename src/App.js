import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import ProfilePage from "./components/ProfilePage";
import Home from "./components/Home";
import ChatsPage from "./components/ChatsPage.jsx";
import AboutPage from "./components/AboutPage.jsx";
import './styles/App.css';

function App() {
	return (
		<div className='page-container page-color page-font'>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/home" element={<Home />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/chats" element={<ChatsPage />} />
					<Route path="/about" element={<AboutPage />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
