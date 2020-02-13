import React from "react";
import "../style/css/Options_modal.min.css";
import Axios from 'axios';

function Options_modal(props) {

  function save_options() {
      const dataset = {
          chat_id: window.localStorage.getItem('chat_id'),
          img_filter: document.querySelector('#img_filtering').checked,
          block_bot: document.querySelector('#block_bot').checked,
          order_del: document.querySelector('#order_del').checked,
      }
      Axios.post('setOptions', dataset)
      .then(function(res) {
        if (res.status === 200) {
            alert('save all completely')
        } else {
            alert('have a some problem to save data')
        }
      })

      props.closeModal();
  }

  if (props.state) {
    return (
      <div className="modal options_modal">
        <span className="close_window" onClick={() => props.closeModal()}>
          x
        </span>
        <div className="set_options">
          <label className="filter_group" htmlFor="img_filtering">
            Face Filtering
            <input
              type="checkbox"
              className="option_item"
              id="img_filtering"
              defaultChecked={props.options.is_img_filter}
            ></input>
            <span className="filter_label"></span>
          </label>
          <label className="filter_group" htmlFor="block_bot">
            Block Bots
            <input
              type="checkbox"
              className="option_item"
              id="block_bot"
              defaultChecked={props.options.is_block_bot}
            ></input>
            <span className="filter_label"></span>
          </label>
          <label className="filter_group" htmlFor="order_del">
            Hide Participation Msg
            <input
              type="checkbox"
              className="option_item"
              id="order_del"
              defaultChecked={props.options.is_ordering_comeout}
            ></input>
            <span className="filter_label"></span>
          </label>
          <button className="save_btn" onClick={() => save_options()}>
            SAVE
          </button>
        </div>
      </div>
    );
  } else {
    return <div className="modal options_modal hidden"></div>;
  }
}

export default Options_modal;
