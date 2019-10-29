import React from "react";
import "../css/LeftNav.css";
import Options from './Options_modal';
import Axios from 'axios';

class LeftNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultInfo: [],
      is_open: false,
      options: []
    };
  }

  nav_link_to(target) {
    if (typeof target === "string" && target !== this.props.statusNav) {
      this.props.setStatus(target);
    }
  }

  openOptions() {
    this.setState({'is_open': true});
  }
  closeOptions() {
    this.setState({'is_open': false});
  }

  componentDidMount() {
    Axios.post("getDefaultInfo", {
      chat_id: window.localStorage.getItem("chat_id")
    }).then(res => {
      this.setState({ defaultInfo: res.data });
    });

    Axios.post("getOptions", {
      chat_id: window.localStorage.getItem("chat_id")
    }).then(res => {
      this.setState({ options: res.data[0] })
    })
  }

  render() {
    return (
      <section className="left_nav">
        <div className="nav_header">
          <p className="header_logo">
            <img src={process.env.PUBLIC_URL + "/aqoom_logo.png"}></img>
            <span> AQOOM</span>
          </p>
          <p className="header_title">{this.state.defaultInfo["title"]}</p>
          <p className="header_rate">
            the rate of filtered :{" "}
            <span>
              {Math.round((this.state.defaultInfo["depence_count"] /
                this.state.defaultInfo["count_msgs"]) *
                100)}
              %
            </span>
          </p>
        </div>
        <div className="nav_contents">
          <a onClick={() => this.nav_link_to("word")}>BlackList (Words)</a>
          <a onClick={() => this.nav_link_to("wlist")}>WhiteList (URL)</a>
          <a onClick={() => this.nav_link_to("faq")}>Register FAQ</a>
          <a onClick={() => this.nav_link_to("start")}>Manage /Start</a>
          <a onClick={() => this.nav_link_to("log")}>Log</a>
          <a onClick={() => this.nav_link_to("users")}>Manage Users</a>
        </div>
        <button type="button" className="open_option" onClick={() => this.openOptions()}>Options</button>
        <Options state={this.state.is_open} closeModal={() => this.closeOptions()} options={this.state.options}></Options>
        
      </section>
    );
  }
}

export default LeftNav;
