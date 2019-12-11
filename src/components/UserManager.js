import React from 'react';
import Axios from 'axios';
import Title from './Section_title';
import '../css/UserManager.css';

class UserManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            members: []
        }
    }

    kickMember(userid) {
        const result = window.confirm('Are you sure to kick this user?')
        if (result) {
            const dataset = {
                chat_id: window.localStorage.getItem('chat_id'),
                user_id: userid
            }
    
            Axios.post(`https://api.telegram.org/bot${this.props.botId}/kickChatMember`, dataset)
                .then((res) => {
                    setTimeout(() => {
                        Axios.post('deleteUser', dataset);
                        window.location.reload();
                    }, 2000);
                })
        }
    }
    
    restrictMember(event, userid) {
        const result = window.confirm('Are you sure to ban this user?')
        if (result) {
            const dataset = {
                chat_id: window.localStorage.getItem('chat_id'),
                user_id: userid,
                permissions: {
                    can_send_messages: false,
                    can_send_media_messages : false,
                    can_send_polls: false,
                    can_send_other_messages: false,
                    can_pin_messages: false,
                    can_change_info: false
                },
                until_date: 300000
            }

            Axios.post(`https://api.telegram.org/bot${this.props.botId}/restrictChatMember`, dataset)
                .then((res) => {
                    event.currentTarget.style = 'color:red'
                }).catch((err) => {
                    alert(err);
                    return false;
                })
        }
    }

    interestMember(user_id) {
        const dataset = {
            user_id: user_id,
            chat_id: window.localStorage.getItem('chat_id')
        }
        
        Axios.post('/setInterest', dataset)
            .then(() => {
                alert("Interesting list was updated, You can check it in 'forked users' of the menus");
            })
    }

    componentDidMount() {
        Axios.post('getMemberStatus', {chat_id: window.localStorage.getItem('chat_id')})
            .then((res) => {
                let dataset = [];

                for (var data of res.data) {
                    if (!data.is_bot) {
                        dataset.push(data);
                    }
                }

                this.setState({members: dataset.map((data, index) => 
                    <tr key={index}>
                        <td>
                            {data.username}
                        </td>
                        <td>
                            {data.is_admin}
                        </td>
                        <td>
                            {data.act_txt_cnt + data.act_photo_cnt + data.act_url_cnt}
                        </td>
                        <td>
                            <span className="icon kick_icon" onClick={() => this.kickMember(data.id)}></span>
                        </td>
                        <td>
                            <span className="icon interest_icon" onClick={() => this.interestMember(data.id)}></span>
                        </td>
                    </tr> 
                )})
            }).catch(function(err) {
                console.log(err);
            })
    }

    render() {
        return (
            <div className="section_usermanager">
                <div className="module_path">
                    <p><span>Modules  /  </span>Users</p>
                </div>
                <Title title={"Manage your customers"}></Title>
                <table className="usermanager_tb">
                    <thead>
                        <tr>
                            <th>username</th>
                            <th width="10%">is_admin</th>
                            <th width="10%">scores</th>
                            <th width="10%">kick</th>
                            <th width="10%">interested</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.members.length === 0 ? 
                            <tr><td colSpan="3" className="empty_item">No Items</td></tr>
                            : this.state.members}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default UserManager;