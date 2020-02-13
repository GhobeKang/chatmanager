import React from "react";
import { Link } from "react-router-dom";
import INTRO_IMG_HAND from "../img/Hand.svg";
import FEATURES_IMG_MESSAGES from "../img/messagebubbles.svg";
import FEATURES_IMG_PROFILE from "../img/memberprofile.svg";
import FEATURES_IMG_SPAM from "../img/spam.svg";
import "../style/css/Register_chat.min.css";

class RegisterChat extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app_container">
        <div className="main_contents">
          <section className="main_intro">
            <div className="intro_desc">
              <h2>managing Telegram groups made easier</h2>
              <p>
              Creating solutions for Community Managers to have an easy and deep interaction with users while obtaining the right data that can help further grow your community.
              </p>
              <Link to="/signin">Try AQOOM</Link>
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
                  listen <br />& interact
                </h2>
                <p>
                  With an all-in-one interface, you know you can listen and
                  interact with your users effectively. There’s a dedicated
                  space for questions and messages directed for admins, so
                  you’ll never miss an opportunity to reply and interact.
                </p>
              </div>
            </div>
            <div className="features_item">
              <div className="feature_desc">
                <h2>growth and user focused</h2>
                <p>
                  All the information you know you need to know about your
                  community and users are all included. With these data, you can
                  strategize, plan ahead for your future events and promotions.
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
                  protecting <br />
                  your community
                </h2>
                <p>
                We are sure that your community will be protected in any form of spam. With basic to advanced filters, you have full control over your community. These can protect and improve your brand image.
                </p>
              </div>
            </div>
          </section>
          <section className="main_footer">
            <div className="footer_desc">
              <p>
                Start and grow your community with ease! <br /> Manage it like
                never before.
              </p>
            </div>
            <Link to="/signin">Try AQOOM</Link>
          </section>
        </div>
      </div>
    );
  }
}

export default RegisterChat;
