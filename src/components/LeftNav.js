import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import "../style/css/LeftNav.min.css";

class LeftNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      default_info: [],
      group_list: [],
      current_group: [],
      current_group_members_cnt: 0
    };
  }
  getChatInfos(chat_id, state) {
    if (chat_id) {
      return Axios.post(`https://api.telegram.org/bot${this.props.botId}/getChat`, {
        chat_id: chat_id
      }).then(res => {
        if (res.data.result.photo) {
          Axios.get(
            `https://api.telegram.org/bot${this.props.botId}/getFile?file_id=` +
              res.data.result.photo.small_file_id
          ).then(res_photo => {
            const dataset = {
              id: res.data.result.id,
              photo: res_photo.data.result,
              title: res.data.result.title
            };
            if (state === 'current') {
              this.setState({current_group: dataset});
            } else if (state === 'grouplist') {
              this.state.default_info.push(dataset);
            }
          });
        } else {
          const dataset = {
            id: res.data.result.id,
            photo: "",
            title: res.data.result.title
          };

          if (state === 'current') {
            this.setState({current_group: dataset});
          } else if (state === 'grouplist') {
            this.state.default_info.push(dataset);
          }
        }
      });
    }
  }
  getChatMemCount(chat_id) {
    return Axios.post(`https://api.telegram.org/bot${this.props.botId}/getChatMembersCount`, {
      chat_id: chat_id
    }).then((res) => {
      this.setState({current_group_members_cnt: res.data.result})
    })
  }
  componentWillMount() {
    const chat_list = JSON.parse(window.localStorage.getItem("chat_id_list"));
    const current_chat_id = window.localStorage.getItem("chat_id");

    if (current_chat_id) {
      this.getChatInfos(current_chat_id, 'current');
      this.getChatMemCount(current_chat_id);
    }

    for (var chat_id of chat_list) {
      this.getChatInfos(chat_id, 'grouplist')
        .then(() => {
          this.setState({
            group_list: this.state.default_info.map((item, index) => {
              return (
                <div
                  className="group_list"
                  key={index}
                  data-chatid={item.id}
                  onClick={ev => this.change_group(ev)}
                >
                  <div className="group_img">
                    <img src={item.photo}></img>
                  </div>
                  <div className="group_title">
                    <p>{item.title}</p>
                  </div>
                </div>
              );
            })
          });
        })
        .catch((err) => {
          return false;
        })
    }
  }

  change_group(event) {
    window.localStorage.setItem("chat_id", event.currentTarget.dataset.chatid);
    window.location.reload();
  }

  activeNav(num) {
    const isExist = document.querySelector(".nav_contents > a.active");
    if (isExist) {
      isExist.classList.remove("active");
    }
    document
      .querySelector(`.nav_contents > a:nth-child(${num})`)
      .classList.add("active");
    return false;
  }

  dragoutGrouplist () {
    document.querySelector('.nav_groups').classList.add('active');
    document.querySelector('.dim').style.display = 'block';
    document.querySelector('.dim').addEventListener('click', this.draginGrouplist)
  }

  draginGrouplist () {
    document.querySelector('.nav_groups').classList.remove('active');
    document.querySelector('.dim').style.display = 'none';
  }

  render() {
    return (
      <section className="left_nav">
        <div className="current_group" onClick={() => this.dragoutGrouplist()}>
          <div className="group_img">
            <img src={this.state.current_group.photo}></img>
          </div>
          <div className="group_title">
            <p>{this.state.current_group.title}</p>
            <p>
              {this.state.current_group_members_cnt} members
            </p>
          </div>
          <div class="arrow_down_icon"></div>
        </div>
        <div className="nav_groups">{this.state.group_list}</div>
        <div className="nav_contents">
          <Link to="/members" onClick={ev => this.activeNav(1)}>
            <i className="icon icon-members"></i> Members
          </Link>
          <Link to="/messages" onClick={ev => this.activeNav(2)}>
            <i className="icon icon-messages"></i> Messages
          </Link>
        </div>
      </section>
    );
  }
}

export default LeftNav;
