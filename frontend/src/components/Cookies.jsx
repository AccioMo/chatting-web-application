import { jwtDecode } from 'jwt-decode'

const setCookie = (name, value, days) => {
	const expirationDate = new Date();
	expirationDate.setDate(expirationDate.getDate() + days);
   
	document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
};

const getCookie = (name) => {
	const cookieName = `${name}=`;
	const cookies = document.cookie.split(';');
	for (let i = 0; i < cookies.length; i++) {
		const currentCookie = cookies[i].trim();
		if (currentCookie.indexOf(cookieName) === 0) {
			return currentCookie.substring(cookieName.length, currentCookie.length);
		}
	}
	return '';
}

const deleteCookie = (name) => {
	document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;SameSite=None;Secure`;
}

const validCookie = (token) => {
	const decodedToken = jwtDecode(token);
	let currentDate = new Date();
	if (decodedToken.exp * 1000 > currentDate.getTime()) { return true }
	else { return false }
}

export { setCookie, getCookie, deleteCookie, validCookie };