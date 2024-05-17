import { React, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import ProfilePage from "./components/ProfilePage";
import Home from "./components/Home";
import { Navigate } from 'react-router';
import ChatPage from "./components/ChatPage.jsx";
import AboutPage from "./components/AboutPage.jsx";
import SignUpPage from "./components/SignUpPage.jsx";
import { getCookie } from "./components/Cookies.jsx";
import { refreshToken, apiClient } from "./components/Auth.jsx";
import './styles/App.css';

const PrivateRoute = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const checkAuthentication = async (retry=1) => {
			try {
				const access_token = getCookie('access_token');
				if (!access_token)
					return (null)
				const response = await apiClient.post('api/token/verify/', { 'token': access_token })
				setIsAuthenticated(response.status === 200);
				return (response.status === 200);
			} catch (e) {
				if (e.response.status === 401 && retry > 0) {
					return (
						refreshToken()
						.then( (e) => { return ( e ? checkAuthentication(retry - 1) : null ) })
						.catch( () => { return (null) } )
					);
				}
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
		<div className='page-container page-color page-font'>
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignUpPage />} />
					<Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
					<Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
					<Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
					<Route path="/chats" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
					<Route path="/about" element={<PrivateRoute><AboutPage /></PrivateRoute>} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
