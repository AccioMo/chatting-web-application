import { useEffect, useState } from "react";
import { api, refreshToken } from "./Auth/Auth.tsx";
import { getCookie, validCookie } from "./Auth/Cookies.jsx";
import { useNavigate } from "react-router";
import "../styles/SideBar.css";

function SideBar({ my_user }) {
  const nav = useNavigate();
  const [users, setUsers] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    const getMatchingUsers = async (username) => {
      let access_token = getCookie("access_token");
      if (validCookie(access_token) === false) {
        access_token = await refreshToken();
      }
      const headers = {
        Authorization: `Bearer ${access_token}`,
      };
      return api
        .post(
          "/api/get_users",
          { query_by: username === "" ? "all" : "username", query: username },
          { headers: headers }
        )
    };
    getMatchingUsers(value).then((response) => {
		console.log(response.data.users)
		if (response.data.users.length === 0) setUsers([]);
		else
		  setUsers(
			response.data.users
		  );
	  }).catch((e) => console.error("error: ", e));
  }, [value]);
  if (!getCookie("access_token")) return null;
  return (
    <div className="sidebar-container">
      <div className="users-search-bar-container">
        <input
          placeholder="Search users..."
          className="users-search-bar shadow"
          type="search"
          value={value}
		  onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <ul className="sidebar-items">
        {users
          ? users.map((element) => {
              return element?.username !== my_user?.username ? (
                <li key={element.uuid} className="sidebar-element-container">
                  <div
                    className="sidebar-element shadow accent-on-hover"
                    onClick={() => nav(`/users/${element.username}`)}
                  >
                    {element.username}
                  </div>
                </li>
              ) : null;
            })
          : null}
      </ul>
    </div>
  );
}

export default SideBar;
