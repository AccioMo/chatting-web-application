import { useState } from 'react'
import { useNavigate } from 'react-router';
import NavBar from '../NavBar'
import '../../styles/Profile.css'

const ProfilePage = () => {
	// const UID = process.env.REACT_APP_GOOGLE_ID;
	
	return (
		<>
			<NavBar />
			<div className='sidebar'>
				<ul className='sidebar-list'>
					<li className='sidebar-item'>
						<img className='profile-picture border' />
					</li>
					<li className='sidebar-item'>Full Name</li>
					<li className='sidebar-item'>Username</li>
					<li className='sidebar-item'>Email</li>
				</ul>
			</div>
		</>
	)
}

export default ProfilePage;