import { getCookie, setCookie } from "./Cookies.jsx";
import axios from "axios";

type Json = { [key: string]: any };

class APIClient {
	private baseURL: string;
	private defaultHeaders: any;
	constructor() {
		this.baseURL = "http://localhost:8000/";
		this.defaultHeaders = {
			"Content-Type": "application/json",
			Accept: "application/json",
		};
	}
	async request(method: string, url: string, data?: Json, retry: number = 1) {
		if (url.charAt(0) === "/") url = url.slice(1);
		const request_data = { method: method };
		if (data !== undefined) {
			request_data["headers"] = {
				...data.headers,
				...this.defaultHeaders,
			};
			if (data["body"] !== undefined) {
				request_data["body"] = JSON.stringify(data["body"]);
			}
		}
		const response = await fetch(this.baseURL + url, request_data).then(
			(response) => {
				if (response.status !== 200) throw new Error("Unauthorized");
				return Promise.all([response.status, response.json()]);
			}
		);
		return {
			status: response[0],
			data: response[1],
		};
	}
	add_headers(headers: Json) {
		this.defaultHeaders = { ...this.defaultHeaders, ...headers };
	}
	get(url: string, data?: Json) {
		return this.request("GET", url, data);
	}
	post(url: string, data?: Json) {
		return this.request("POST", url, data);
	}
	put(url: string, data?: Json) {
		return this.request("PUT", url, data);
	}
	delete(url: string, data?: Json) {
		return this.request("DELETE", url, data);
	}
}

const api = axios.create({
	baseURL: "http://localhost:8000/",
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
})

const verifyToken = async (retry: number=1) => {
	const access_token = { token: getCookie('access_token') };
	const response = await api.post('api/token/verify/', access_token)
	.catch( async (e) => {
		if (e.response.status === 401 && retry > 0) {
			await refreshToken();
			return verifyToken(retry-1);
		}
		else {
			console.error('error:', e);
			return e.response;
		}
	});
	return response;
}

const refreshToken = async () => {
	const headers = { Authorization: `Bearer ${getCookie("access_token")}` };
	const payload = { refresh: getCookie("refresh_token") };
	const token = await api.post("/api/token/refresh/", 
		payload,
		{ headers },
	);
	setCookie("access_token", token.data.access, 1);
	setCookie("refresh_token", token.data.refresh, 1);
	return token.data.access;
};

export { refreshToken, verifyToken, api };
