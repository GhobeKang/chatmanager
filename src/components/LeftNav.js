import React from "react";
import {Link} from 'react-router-dom';
import "../css/LeftNav.css";

class LeftNav extends React.Component {
  constructor(props) {
    super(props);
  }
  activeNav(num) {
    const isExist = document.querySelector('.nav_contents > a.active');
    if (isExist) {
      isExist.classList.remove('active');
    }
    document.querySelector(`.nav_contents > a:nth-child(${num})`).classList.add('active');
    return false;
  }
  render() {
    return (
      <section className="left_nav">
        <div className="nav_contents">
          <Link to="/dashboard" onClick={(ev) => this.activeNav(1)}><i className="icon icon-dashboard"></i> Dashboard</Link>
          <Link to="/modules" onClick={(ev) => this.activeNav(2)}><i className="icon icon-modules"></i> Modules</Link>
          <Link to="/settings" onClick={(ev) => this.activeNav(3)}><i className="icon icon-setting"></i> Settings</Link>
        </div>
      </section>
    );
  }
}

export default LeftNav;
