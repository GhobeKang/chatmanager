import React from 'react';
import AQ_LOGO from '../img/AQOOM_logo.png';
import AQ_LOGO_W from '../img/AQOOM_whitelogo.svg';
import INTRO_IMG_HAND from '../img/Hand.svg';
import FEATURES_IMG_MESSAGES from '../img/messagebubbles.svg';
import FEATURES_IMG_PROFILE from '../img/memberprofile.svg';
import FEATURES_IMG_SPAM from '../img/spam.svg';
import '../css/Register_chat.css';

class RegisterChat extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isActive : false
    }
  }


  render() {
    return (
      <div className="App">
        <div className="app_container">
          <header className="App-header">
            <div className="aqoom_logo">
              <img src={AQ_LOGO}></img>
            </div>
            <div className="nav_menus">
              <a href="#main_features">
                Features
              </a>
              <a className="signin_btn" href="/signin">
                Sign in
              </a>
            </div>
          </header>
          <div className="main_contents">
            <section className="main_intro">
              <div className="intro_desc">
                <h2>
                managing Telegram groups made easier
                </h2>
                <p>
                Creating solutions for Community Managers to have a easy and deep interaction with users while having the right data that can help further grow your community!
                </p>
                <a href="#">
                  Try AQOOM
                </a>
              </div>
              <div className="intro_img">
                <img src={INTRO_IMG_HAND}></img>
              </div>
            </section>
            <section className="main_features" id="main_features">
              <div className="features_item">
                <div className="feature_img">
                  <img src={FEATURES_IMG_MESSAGES}></img>
                </div>
                <div className="feature_desc">
                  <h2>
                  listen <br/>& interact
                  </h2>
                  <p>
                  With an all-in-one interface, you know you can listen and interact with your users effectively. There’s a dedicated space for questions and messages directed for admins, so you’ll never miss an opportunity to reply and interact.
                  </p>
                </div>
              </div>
              <div className="features_item">
                <div className="feature_desc">
                  <h2>
                  growth and user focused
                  </h2>
                  <p>
                  All the information you know you need to know about your community and users are all included. With these data, you can strategize, plan ahead for your future events and promotions.
                  </p>
                </div>
                <div className="feature_img">
                  <img src={FEATURES_IMG_PROFILE}></img>
                </div>
              </div>
              <div className="features_item">
                <div className="feature_img">
                  <img src={FEATURES_IMG_SPAM}></img>
                </div>
                <div className="feature_desc">
                  <h2>
                  protecting <br/>your community
                  </h2>
                  <p>
                  We are sure that your community will be protected in any form of spam. With basic to advanced filters, you have a full control over your community. These can protect and improve your brand image.
                  </p>
                </div>
              </div>
            </section>
            <section className="main_footer">
              <div className="footer_desc">
                <p>
                  Start and grow your community with ease! <br/> Manage it like never before.
                </p>
              </div>
              <a href="#">
                Try AQOOM
              </a>
            </section>
          </div>
        </div>
        <div className="footer">
            <div className="app_container">
              <div className="footer_left">
                <div className="aqoom_logo">
                  <img src={AQ_LOGO_W}></img>
                </div>
                <div className="aqoom_right">
                  All rights reserved 2020 © AQOOM
                </div>
              </div>
              <div className="footer_right">
                <a href="http://aqoom.info/" target="_blank">
                  ABOUT US
                </a>
                <a href="mailto::contact@aqoom.com">
                  CONTACT US
                </a>
              </div>
            </div>
          </div>
      </div>
    )
  }
}

export default RegisterChat;