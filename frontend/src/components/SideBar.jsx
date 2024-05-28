import React from "react";
import "../styles/SideBar.css";

function SideBar() {
	return <div className="sidebar-container">
		<div className="sidebar-box border">
			<ul className="sidebar-items">
				<li className="sidebar-element">user1</li>
				<li className="sidebar-element">user2</li>
				<li className="sidebar-element">user3</li>
				<li className="sidebar-element">user4</li>
			</ul>
		</div>
	</div>;
}

export default SideBar;
