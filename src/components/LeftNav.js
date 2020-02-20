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
  async getChatGroupInfos(chat_id_list) {
    

    const loop = async function(botId) {
      let result_arr = [];

      for (var chat_id of chat_id_list) {
        try {
          const res = await Axios.post(`https://api.telegram.org/bot${botId}/getChat`, {
          chat_id: chat_id
        })
          if (res.data.result.photo) {
            const res_photo = await Axios.get(`https://api.telegram.org/bot${botId}/getFile?file_id=` + res.data.result.photo.small_file_id)
              const dataset = {
                id: res.data.result.id,
                photo: res_photo.data.result.file_path,
                title: res.data.result.title
              };
              
              result_arr.push(dataset)
            
          } else {
            const dataset = {
              id: res.data.result.id,
              photo: '',
              title: res.data.result.title
            };

            result_arr.push(dataset)
          }
        } catch (err) {
          console.log(err);
        }
        
      }
      return result_arr;
    }
  
    
    const result = await loop(this.props.botId)
  
    this.setState({
      group_list: result.map((item, index) => {
        return (
          <div
            className="group_list"
            key={index}
            data-chatid={item.id}
            onClick={ev => this.change_group(ev)}
          >
            <div className="group_img">
              {item.photo ?
            <img src={`https://api.telegram.org/file/bot${this.props.botId}/${item.photo}`}></img>
            :
            null  
            }
              
            </div>
            <div className="group_title">
              <p>{item.title}</p>
            </div>
          </div>
        );
      })
    });
  }

  getChatInfos(chat_id) {
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
              photo: res_photo.data.result.file_path,
              title: res.data.result.title
            };
           
            this.setState({current_group: dataset});
           
          });
        } else {
          const dataset = {
            id: res.data.result.id,
            photo: "",
            title: res.data.result.title
          };

          this.setState({current_group: dataset});          
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
      this.getChatInfos(current_chat_id);
      this.getChatMemCount(current_chat_id);
    }

    this.getChatGroupInfos(chat_list);
  
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
            {
              this.state.current_group.photo
              ?
              <img src={`https://api.telegram.org/file/bot${this.props.botId}/${this.state.current_group.photo}`}></img>
              :
              null
            }
            
          </div>
          <div className="group_title">
            <p>{this.state.current_group.title}</p>
            <p>
              {this.state.current_group_members_cnt} members
            </p>
          </div>
          <div className="arrow_down_icon"></div>
        </div>
        <div className="nav_groups">{this.state.group_list}</div>
        <div className="nav_contents">
          <Link to="/members" onClick={ev => this.activeNav(1)}>
            <i className="icon icon-members">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-friends" class="svg-inline--fa fa-user-friends fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M192 256c61.9 0 112-50.1 112-112S253.9 32 192 32 80 82.1 80 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C51.6 288 0 339.6 0 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zM480 256c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592c26.5 0 48-21.5 48-48 0-61.9-50.1-112-112-112z"></path></svg>  
            </i> Members
          </Link>
          <Link to="/messages" onClick={ev => this.activeNav(2)}>
            <i className="icon icon-messages">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="comments" class="svg-inline--fa fa-comments fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M416 192c0-88.4-93.1-160-208-160S0 103.6 0 192c0 34.3 14.1 65.9 38 92-13.4 30.2-35.5 54.2-35.8 54.5-2.2 2.3-2.8 5.7-1.5 8.7S4.8 352 8 352c36.6 0 66.9-12.3 88.7-25 32.2 15.7 70.3 25 111.3 25 114.9 0 208-71.6 208-160zm122 220c23.9-26 38-57.7 38-92 0-66.9-53.5-124.2-129.3-148.1.9 6.6 1.3 13.3 1.3 20.1 0 105.9-107.7 192-240 192-10.8 0-21.3-.8-31.7-1.9C207.8 439.6 281.8 480 368 480c41 0 79.1-9.2 111.3-25 21.8 12.7 52.1 25 88.7 25 3.2 0 6.1-1.9 7.3-4.8 1.3-2.9.7-6.3-1.5-8.7-.3-.3-22.4-24.2-35.8-54.5z"></path></svg>  
            </i> Messages
          </Link>
        </div>
      </section>
    );
  }
}

export default LeftNav;
