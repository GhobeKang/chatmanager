import React from 'react';
import Axios from 'axios';
import Title from '../Section_title';
import SearchBox from '../Modules/SearchBox';
import TabMenu from '../Modules/TabMenu';

import '../../style/css/UserManager.min.css';
import { Link } from 'react-router-dom';

class UserManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            members: [],
            active_tab: 1
        }
    }

    set_activeTab(num) {
        return this.setState({ active_tab: num });
    }

    searchMember(event) {
        const search_query = event.currentTarget.value;
        
        Axios.post('/searchMember', {
            chat_id: window.localStorage.getItem('chat_id'),
            query: search_query
        })
        .then((res) => {
            if (res.data) {
                this.updateMemberList(res.data);
            }
        })
    }

    updateMemberList(dataset) {
        this.setState({members: dataset.map((data, index) => 
            <tr key={index}>
                <td>
                    <div className="member_name">
                        {data.is_interested ?
                        <div className="interesting_icon"></div> : null}
                        <Link to={{
                            pathname: "/user",
                            search: "?user_id=" + data.id
                        }}>
                            {data.first_name + ' ' + data.last_name}
                        </Link>
                    </div>
                </td>
                <td>
                    {'Active'}
                </td>
                <td>
                    @{data.username}
                </td>
                <td>
                    {data.warning_pt}
                </td>
                <td>
                    {data.act_txt_cnt + data.act_photo_cnt + data.act_url_cnt}
                </td>
                <td>
                    {data.updated_at}
                </td>
            </tr> 
        )})
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

                this.updateMemberList(dataset)

            }).catch(function(err) {
                console.log(err);
            })
    }

    render() {
        return (
            <div className="section_usermanager">
                <Title title={"Members"}></Title>
                <TabMenu opt1={'Members List'} active_tab={() => this.set_activeTab.bind(this)}></TabMenu>
                <div className="memberlist_wrap">
                    <h4>List of Members</h4>
                    <SearchBox target={'member'} searchMember={this.searchMember.bind(this)}></SearchBox>
                    <table className="usermanager_tb">
                    <thead>
                        <tr>
                            <th width="18%">Name</th>
                            <th width="13%">Status</th>
                            <th width="16%">Username</th>
                            <th width="13%">Warn. Points</th>
                            <th width="13%">Messages</th>
                            <th>Last Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.members.length === 0 ? 
                            <tr><td colSpan="3" className="empty_item">No Items</td></tr>
                            : this.state.members}
                    </tbody>
                </table>
                </div>
            </div>
        )
    }
}

export default UserManager;