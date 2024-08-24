import { getCookie, setCookie } from "./Cookies.jsx";
import { createContext } from "react";
import axios from "axios";

const api = axios.create({
	baseURL: "https://cht-backend-f0cgb5g5ckgub0eh.westeurope-01.azurewebsites.net/",
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

const verifyToken = async (access_token: string, retry: number = 1) => {
	const response = await api
		.post("api/token/verify/", { token: access_token })
		.catch(async (e) => {
			if (e.response.status === 401 && retry > 0) {
				await refreshToken();
				return verifyToken(access_token, retry - 1);
			} else {
				console.error("error:", e);
				return e.response;
			}
		});
	return response;
};

const refreshToken = async () => {
	const headers = { Authorization: `Bearer ${getCookie("access_token")}` };
	const payload = { refresh: getCookie("refresh_token") };
	const token = await api.post("/api/token/refresh/", payload, { headers });
	setCookie("access_token", token.data.access, 1);
	// setCookie("refresh_token", token.data.refresh, 1);
	return token.data.access;
};

const AuthContext = createContext({
	setIsAuthenticated: () => {},
});

export { refreshToken, verifyToken, api, AuthContext };
