import React from 'react';
import '../css/LeftNav.css';

function LeftNav (props) {
    function nav_link_to ( target ) {
        if ( typeof target === 'string' && target !== props.statusNav) {
          props.setStatus(target);
        }
      }

    return (
        <section className="left_nav">
          <div className="nav_header">
            <p className="header_title">
              Menus
            </p>
          </div>
          <div className="nav_contents">
            <a onClick={nav_link_to('word')}>Manage Words</a>
          </div>
        </section>
    )
}

export default LeftNav;