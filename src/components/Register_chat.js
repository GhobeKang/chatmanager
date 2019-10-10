import React, {useState} from 'react';
import Axios from 'axios';

function RegisterChat (props) {
    const [isActive, setIsActive] = useState(true)

    function req_validCheck () {
        const suffered_title = document.querySelector('input.strChatName').value;
        
        if (isActive) {
          Axios.post('http://localhost:4000/api/checkValidationRoom', {
          title: suffered_title
            }, {withCredentials: true}).then(function(response) {
              if (response.status === 200) {
                if (response.data !== false) {
                  window.localStorage.setItem('chat_id', response.data.id)
                  props.setValid(true)
                } else {
                  setIsActive(false)
                  alert('your Room is not activated properly. Please chack your activation code again. if you don\'t have an activation code, ask to AQOOM service manager.')
                }
              }
            })  
        } else {
          const activation_code = document.querySelector('input.activationCode').value;

          Axios.post('http://localhost:4000/api/checkValidation', {
            title: suffered_title,
            ac_code: activation_code
          }, {withCredentials: true}).then(function(response) {
            if (response.status === 200) {
              if (response.data !== false) {
                window.localStorage.setItem('chat_id', response.data.id)
                props.setValid(true)
              } else {
                alert('it\'s not valid input. check again if chat Room\'s name or activation code is valid.')
              }
            }
          })  
        }
        
      }

    return (
        <div className="App">
            <header className="App-header">
            <div className="register_title">
                <p>Register your chatting room</p>
            </div>
            <div className="register_form">
                {!isActive ? <input type="text" name="activation_code" className="activationCode" placeholder="Activation Code" required></input> : ''}
                <input type="text" name="title" className="strChatName" placeholder="plaese write a Chatting room's Title" required></input>
                <button className="submit_btn" onClick={() => req_validCheck()}>submit</button>
            </div>
            </header>
        </div>
    )
}

export default RegisterChat;