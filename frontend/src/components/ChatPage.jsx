import React from 'react'
import NavBar from './NavBar';
import '../styles/Chat.css';
import { apiClient } from './Auth';

function ChatPage() {
  const sendMessage = async (e) => {
    const data = {
      'from': localStorage.getItem('username'),
      'meassage': e.target.value
    }
    const response = await apiClient.post('api/chat/', data)
    console.log(response)
  }
  return (
    <>
      <NavBar />
      <div className='chat-box'>
        <div className='container-of-container'>
          <div className='text-container border'>
            <textarea className='text-box page-font' /> {/* onClick={sendMessage} /> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatPage;