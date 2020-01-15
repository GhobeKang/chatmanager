import React from 'react';
import Axios from 'axios';
import TelegramLoginButton from 'react-telegram-login';

class RegisterChat extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isActive : false
    }
  }

  componentDidMount() {
    if (window.location.search !== '') {
      const qstring = window.location.search.slice(1).split('&');
      if (qstring.length !== 0) {
        const room_id = qstring[0].split('=')[1];
        const activation_code = qstring[1].split('=')[1];
        
        this.checkValidation(room_id, activation_code);

      }
    }
  }

  req_validCheck () {
    const suffered_title = document.querySelector('input.strChatName').value;
    
    if (this.isActive) {
      
      this.checkValidationRoom(suffered_title);

    } else {
      const activation_code = document.querySelector('input.activationCode').value;

      this.checkValidation(suffered_title, activation_code);
       
    }
  }

  checkValidation(t) {
    Axios.post('checkValidation', {
        id: t
      }, {withCredentials: true}).then((response) => {
        if (response.status === 200) {
          if (response.data !== false) {
            window.localStorage.setItem('chat_id', response.data.id)
            const expire_time = this.getUTCExpiredTime();
            document.cookie = "living=true; expires=" + expire_time;
            this.props.setValid(true)
          } else {
            alert('it\'s not valid input. check again if chat Room\'s name or activation code is valid.')
          }
        }
      })  
  }

  getUTCExpiredTime() {
    var now = new Date();
    var time = now.getTime();
    var expireTime = time + 2*360000;
    now.setTime(expireTime);

    return now.toUTCString();
  }
  
  onTelegramAuth(user) {
    this.checkValidation(user.id);
  }

  render() {
    return (
      <div className="App">
            <header className="App-header">
            <div className="register_title">
                <p>Register your chatting room</p>
            </div>
            <div className="register_form">
                {!this.state.isActive ? <input type="text" name="activation_code" className="activationCode" placeholder="Activation Code" required></input> : ''}
                <input type="text" name="title" className="strChatName" placeholder="plaese write a Chatting room's Title" required></input>
                <button className="submit_btn" onClick={() => this.req_validCheck()}>submit</button>
            </div>
            <TelegramLoginButton dataOnauth={(user) => this.onTelegramAuth(user)} botName="aqoom_test_bot" />
            </header>
        </div>
    )
  }
}

export default RegisterChat;