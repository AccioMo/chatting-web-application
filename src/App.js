import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import SideBar from "./components/SideBar.jsx";
import LoginPage from "./components/Auth/LoginPage.jsx";
import ProfilePage from "./components/Profile/ProfilePage.jsx";
import Home from "./components/Home";
import ChatPage from "./components/Chat/ChatPage.jsx";
import AboutPage from "./components/AboutPage.jsx";
import SignUpPage from "./components/Auth/SignUpPage.jsx";
import CommonChatsPage from "./components/Chat/CommonChatsPage.jsx";
import AIChatPage from "./components/AIChatPage.jsx";
import AIWelcomePage from "./components/AIWelcomePage.jsx";
import { Navigate } from "react-router";
import { getCookie, validCookie } from "./components/Auth/Cookies.jsx";
import {
    api,
    refreshToken,
    verifyToken,
    AuthContext,
} from "./components/Auth/Auth.tsx";
import "./styles/App.css";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        const checkAuthentication = async () => {
            let access_token = getCookie("access_token");
            if (!access_token || access_token === "") {
                setIsAuthenticated(false);
                return false;
            }
            if (validCookie(access_token) === false) {
                access_token = await refreshToken();
            }
            const response = await verifyToken(access_token);
            setIsAuthenticated(response.status === 200);
            if (response.status === 200) {
                let curr_user = getCookie("user");
                curr_user = JSON.parse(curr_user);
                if (curr_user) setCurrentUser(curr_user);
                else {
                    const headers = { Authorization: `Bearer ${access_token}` };
                    const user = await api.get("/api/auth", { headers });
                    setCurrentUser(user.data);
                }
            }
            return response.status === 200;
        };
        checkAuthentication()
            .then(() => setIsLoading(false))
            .catch((e) => {
                console.error("error:", e);
                setIsLoading(false);
            });
    }, [isAuthenticated]);
    if (isLoading) {
        return <div>Loading...</div>;
    } else if (!isAuthenticated) {
        return (
            <div className="page-container page-font">
                <BrowserRouter>
                    <AuthContext.Provider
                        value={{ isAuthenticated, setIsAuthenticated }}
                    >
                        <Routes>
                            <Route path="/*" element={<Navigate to="/" />} />
                            <Route
                                path="/"
                                element={
                                    <div className="page-content-container">
                                        <NavBar />
                                        <Home authenticated={false} />
                                    </div>
                                }
                            />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/join" element={<SignUpPage />} />
                        </Routes>
                    </AuthContext.Provider>
                </BrowserRouter>
            </div>
        );
    }
    return (
        <div className="page-container page-font">
            <BrowserRouter>
                <AuthContext.Provider value={{ setIsAuthenticated }}>
                    <SideBar my_user={currentUser} />
                    <div className="page-content-container">
                        <NavBar />
                        <Routes>
                            <Route
                                path="/*"
                                element={<Navigate to="/chat-with-human" />}
                            />
                            <Route
                                path="/chat-with-human"
                                element={<Home authenticated={true} />}
                            />
                            <Route
                                path="/chat-ai"
                                element={<AIWelcomePage />}
                            />
                            <Route
                                path="/chat-ai/:bot_username/:chat_id"
                                element={<AIChatPage />}
                            />
                            <Route path="/profile" element={<ProfilePage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route
                                path="/chat/:chat_id"
                                element={<ChatPage />}
                            />
                            <Route
                                path="/users/:username"
                                element={<CommonChatsPage />}
                            />
                        </Routes>
                    </div>
                </AuthContext.Provider>
            </BrowserRouter>
        </div>
    );
};

export default App;
