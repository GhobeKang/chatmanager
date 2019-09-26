import React from 'react';
import Axios from 'axios';

function RegisterChat (props) {
    function req_validCheck () {
        const suffered_title = document.querySelector('input.strChatName').value;
    
        Axios.post('http://localhost:4000/api/checkValidation', {
          title: suffered_title
        }).then(function(response) {
          if (response.status === 200) {
            if (response.data !== false) {
              window.localStorage.setItem('chat_id', response.data.id)
              window.localStorage.setItem('living', true)
              props.setValid(true)
            } else {
              alert('you should include a chat-bot of @aqoom_bot into your chatting-room and apply for permission to admin')
            }
          }
        })
      }

    return (
        <div className="App">
            <header className="App-header">
            <div className="register_title">
                <p>Register your chatting room</p>
            </div>
            <div className="register_form">
                <input type="text" name="title" className="strChatName" placeholder="plaese write a Chatting room's Title" required></input>
                <button className="submit_btn" onClick={req_validCheck}>submit</button>
            </div>
            </header>
        </div>
    )
}

export default RegisterChat;