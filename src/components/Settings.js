import React from "react";
import Axios from "axios";
import Title from './Section_title';
import "../css/Settings.css";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: []
    };
  }

  componentDidMount() {
    Axios.post("getOptions", {
      chat_id: window.localStorage.getItem("chat_id")
    }).then(res => {
      this.setState({ options: res.data[0] });
    });
  }

  save_options() {
    const dataset = {
      chat_id: window.localStorage.getItem("chat_id"),
      img_filter: document.querySelector("#img_filtering").checked,
      block_bot: document.querySelector("#block_bot").checked,
      order_del: document.querySelector("#order_del").checked
    };
    Axios.post("setOptions", dataset).then(function(res) {
      if (res.status === 200) {
        alert("save all completely");
      } else {
        alert("have a some problem to save data");
      }
    });
  }

  render() {
    return (
      <div className="set_options">
        <div className="module_path">
          <p>
            Settings
          </p>
        </div>
        <Title title={"Settings"}></Title>
        <label className="filter_group" htmlFor="img_filtering">
          Face-filtering
          <input
            type="checkbox"
            className="option_item"
            id="img_filtering"
            defaultChecked={this.state.options.is_img_filter}
          ></input>
          <span className="filter_label"></span>
        </label>
        <label className="filter_group" htmlFor="block_bot">
          Block Bots
          <input
            type="checkbox"
            className="option_item"
            id="block_bot"
            defaultChecked={this.state.options.is_block_bot}
          ></input>
          <span className="filter_label"></span>
        </label>
        <label className="filter_group" htmlFor="order_del">
          Hide Participation Msg
          <input
            type="checkbox"
            className="option_item"
            id="order_del"
            defaultChecked={this.state.options.is_ordering_comeout}
          ></input>
          <span className="filter_label"></span>
        </label>
        <button className="save_btn" onClick={() => this.save_options()}>
          SAVE
        </button>
      </div>
    );
  }
}

export default Settings;
