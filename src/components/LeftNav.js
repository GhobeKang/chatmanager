import React from "react";
import "../css/LeftNav.css";

class LeftNav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="left_nav">
        <div className="nav_contents">
          <a href="/dashboard"><i className="icon icon-dashboard"></i> Dashboard</a>
          <a href="/modules"><i className="icon icon-modules"></i> Modules</a>
          <a href="/settings"><i className="icon icon-setting"></i> Settings</a>
        </div>
      </section>
    );
  }
}

export default LeftNav;
