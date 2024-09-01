import { useContext, useEffect, useState } from "react";
import { setCookie } from "./Cookies.jsx";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { api } from "./Auth.tsx";
import { AuthContext } from "./Auth.tsx";
import "../../styles/SignupPage.css";

function SignUpForm() {
  const nav = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);
  const [csrf_token, setToken] = useState("");
  const [joinError, setJoinError] = useState(false);
  useEffect(() => {
    api
      .get("/api/csrf/")
      .then((csrfToken) => {
        setToken(csrfToken.data);
      })
      .catch((error) => {
        setJoinError(true);
        console.error("CSRF error:", error);
      });
  }, []);
  const { register, handleSubmit } = useForm();
  const registerUser = async (data) => {
    try {
      const userData = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email || null,
        username: data.username,
        password: data.password,
      };
      api.defaults.headers.common["X-CSRFToken"] = csrf_token;
      const record = await api.post("/api/register/", userData);
      if (record.data.success === false)
        return console.error("join error:", record.data.message);
      const jwt_token = await api.post(
        "/api/token/",
        { username: data.username, password: data.password },
        { "Content-Type": "application/json" }
      );
      setCookie("refresh_token", jwt_token.data.refresh, 30);
      setCookie("access_token", jwt_token.data.access, 1);
      setCookie("user", JSON.stringify(record.data.user), 30);
      setIsAuthenticated(true);
      nav("/home");
      return record.data;
    } catch (error) {
      setJoinError(true);
      console.error("join error:", error);
    }
  };
  return (
    <div
      className="login-container"
    //   style={{
    //     borderColor: joinError
    //       ? "var(--red-color)"
    //       : "var(--light-accent-color)",
    //   }}
    >
      <form onSubmit={handleSubmit(registerUser)}>
        <div className="join-form">
          <div className="input-field">
            <label className="login-label" htmlFor="first_name">
              Got a First Name?
            </label>
            <input
              required
              placeholder="First Name"
              className="login-input"
              type="first_name"
              id="first_name"
              {...register("first_name")}
            />
          </div>
          <div className="input-field">
            <label className="login-label" htmlFor="last_name">
              Last Name?
            </label>
            <input
              required
              placeholder="Last Name"
              className="login-input"
              type="last_name"
              id="last_name"
              {...register("last_name")}
            />
          </div>
          <div className="input-field">
            <label className="login-label" htmlFor="username">
              What should we call you?
            </label>
            <input
              required
              placeholder="Username"
              className="login-input"
              type="username"
              id="username"
              {...register("username")}
            />
          </div>
          <div className="input-field">
            <label className="login-label" htmlFor="password">
              Shhhh...
            </label>
            <input
              required
              placeholder="Password"
              className="login-input"
              type="password"
              id="password"
              {...register("password")}
            />
          </div>
        </div>
        <div className="email-field">
          <div className="input-field">
            <label className="login-label" htmlFor="email">
              Where can we reach you? (optional)
            </label>
            <input
              placeholder="Email"
              className="login-input email-input"
              type="email"
              id="email"
              {...register("email")}
            />
          </div>
        </div>
        <input type="hidden" name="csrfmiddlewaretoken" value={csrf_token} />
        <div
          className="corner-button"
          style={{
            backgroundColor: joinError
              ? "var(--red-color)"
              : "var(--light-accent-color)",
          }}
        >
          <button className="login-button" type="submit">
            Join
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
