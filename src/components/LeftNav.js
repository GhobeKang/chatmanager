import React from 'react';
import Axios from 'axios';
import '../css/LeftNav.css';
import path from 'path';

class LeftNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      defaultInfo: []
    }
  }
  
  nav_link_to (target) {
    if ( typeof target === 'string' && target !== this.props.statusNav) {
      this.props.setStatus(target);
    }
  }
  
  componentDidMount() {
    Axios.post('http://localhost:4000/api/getDefaultInfo', {chat_id: window.localStorage.getItem('chat_id')})
      .then((res) => {
        this.setState({defaultInfo: res.data})
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
            <p className="header_title">
              {this.state.defaultInfo['title']}
            </p>
            <p className="header_rate">
              the rate of filtered : <span>{this.state.defaultInfo['depence_count'] / this.state.defaultInfo['count_msgs'] * 100}%</span>
            </p>
          </div>
          <div className="nav_contents">
            <a onClick={() => this.nav_link_to('word')}>BlackList (Words)</a>
            <a onClick={() => this.nav_link_to('wlist')}>WhiteList (URL)</a>
            <a onClick={() => this.nav_link_to('faq')}>Register FAQ</a>
            <a onClick={() => this.nav_link_to('start')}>Manage /Start</a>
            <a onClick={() => this.nav_link_to('log')}>Log</a>
          </div>
        </section>
    )
  }
}

export default LeftNav;