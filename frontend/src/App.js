import { React, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import SideBar from "./components/SideBar.jsx";
import LoginPage from "./components/LoginPage";
import ProfilePage from "./components/ProfilePage";
import Home from "./components/Home";
import ChatPage from "./components/ChatPage";
import AboutPage from "./components/AboutPage.jsx";
import SignUpPage from "./components/SignUpPage.jsx";
import CommonChatsPage from "./components/CommonChatsPage.jsx";
import { Navigate } from 'react-router';
import { getCookie, validCookie } from "./components/Cookies.jsx";
import { refreshToken, verifyToken } from "./components/Auth.tsx";
import './styles/App.css';

const PrivateRoute = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const checkAuthentication = async () => {
			try {
				let access_token = getCookie("access_token");
				if (!access_token) {
					setIsAuthenticated(false);
					return false;
				}
				if (validCookie(access_token) === false) {
					access_token = await refreshToken();
				};
				const response = await verifyToken(access_token);
				setIsAuthenticated(response.status === 200);
				return (response.status === 200);
			} catch (e) {
				console.error('error:', e);
				return false;
			}
		};
		checkAuthentication()
		.then( () => setIsLoading(false) );
	}, []);
	if (isLoading)
		return (null);
	return (isAuthenticated ? children : <Navigate to='/login' />);
}

const App = () => {
	return (
		<div className='large-container page-color page-font'>
			<BrowserRouter>
				<div className='page-container page-color page-font'>
					<SideBar />
					<div className='page-content-container'>
						<NavBar />
						<Routes>
							<Route path="/login" element={<LoginPage />} />
							<Route path="/signup" element={<SignUpPage />} />
							<Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
							<Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
							<Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
							<Route path="/about" element={<PrivateRoute><AboutPage /></PrivateRoute>} />
							<Route path="/chats" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
							<Route path="/chat/:chat_id" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
							<Route path="/users/:username" element={<PrivateRoute><CommonChatsPage /></PrivateRoute>} />
						</Routes>
					</div>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
