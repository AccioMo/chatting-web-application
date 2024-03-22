import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import ProfilePage from "./components/ProfilePage";
import Home from "./components/Home";
import { Navigate } from 'react-router';
import ChatsPage from "./components/ChatsPage.jsx";
import AboutPage from "./components/AboutPage.jsx";
import SignUpPage from "./components/SignUpPage";
import PocketBase from 'pocketbase';
import './styles/App.css';

const ProtectedRoute = ({ children }) => {
	// const pb = new PocketBase('http://127.0.0.1:8090');
	// if (pb.authStore.isValid)
		return children;
	// else
	// 	return <Navigate to='/login' replace />
}

function App() {
	return (
		<div className='page-container page-color page-font'>
			<BrowserRouter>
			<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignUpPage />} />
					<Route path="/" element={<Home />} />
					<Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
					<Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
					<Route path="/chats" element={<ProtectedRoute><ChatsPage /></ProtectedRoute>} />
					<Route path="/about" element={<ProtectedRoute><AboutPage /></ProtectedRoute>} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
