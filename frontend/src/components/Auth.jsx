import React from 'react'
import axios from 'axios';
import { getCookie, setCookie } from './Cookies.jsx';

const apiClient = axios.create({
	baseURL: 'http://localhost:8000/',
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	},
});

const refreshToken = async () => {
	const headers = { 'Authorization': `Bearer ${getCookie('access_token')}` };
	const payload = { 'refresh': getCookie('refresh_token') };
	const token = await axios.post('/api/token/refresh/', payload, { headers });
	setCookie('access_token', token.data.access, 1);
	setCookie('refresh_token', token.data.refresh, 1);
	return (true);
}

export { refreshToken, apiClient };