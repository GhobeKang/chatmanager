import React from 'react';
import Axios from 'axios';
import Title from '../Section_title';
import Chart from 'chart.js';

import ContentContainer from '../Modules/MessageContentContainer';

import '../../style/css/User.min.css';

class User extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            user_profile_data: [],
            message_log: [],
            profile_pic: '',
            active_hours: 0,
            top_active: null,
            message_log_open: false
        }
    }

    openTelegram(username) {
        window.location.href = `https://t.me/${username}`
        return false;
    }

    toggleMessageLogModal() {
        this.setState({
            message_log_open: !this.state.message_log_open
        })
    }

    interestMember(event, user_id) {
        const cur_state = event.currentTarget.classList
        let setValue = 0
        if (cur_state.length === 2) {
            setValue = 0
        } else {
            setValue = 1
        }
        const dataset = {
            user_id: user_id,
            chat_id: window.localStorage.getItem('chat_id'),
            val: setValue
        }
        
        Axios.post('/setInterest', dataset)
        .then(() => {
            window.location.reload();
        })
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
    
    restrictMember(userid) {
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
                    
                }).catch((err) => {
                    alert(err);
                    return false;
                })
        }
    }

    extract_query(key) {
        const query_str = window.location.href.split('?')[1];
        return query_str.split('=')[1];
    }

    cal_active_hours (data) {
        const avg_msg_perDay = Math.floor((this.state.user_profile_data.act_txt_cnt + this.state.user_profile_data.act_media + this.state.user_profile_data.act_photo_cnt) / this.cal_participate_date(this.state.user_profile_data.created_at))
        const standard = Math.floor( avg_msg_perDay / 5 );
        let active_hours = 0;
        let top_active = 0;
        
        for (var i = 0; i < 24; i++) {
            if (data[i] > standard) {
                if (data[top_active] < data[i]) {
                    top_active = i;
                }
                active_hours += 1;
            }
        }

        if (top_active) {
            this.setState({
                active_hours : active_hours,
                top_active : top_active
            })
        }
    }

    cal_participate_date(joined_date) {
        const join = new Date(joined_date);
        const now = new Date(Date.now());
        const diff = now - join;

        return Math.floor(diff / 86400000) > 30 ? 30 : Math.floor(diff / 86400000)
    }

    cal_participate_week(joined_date) {
        const join = new Date(joined_date);
        const now = new Date(Date.now());
        const diff = now - join;

        return Math.floor(diff / 604800000) > 30 ? 30 : Math.floor(diff / 604800000)
    }
    
    makeChartMessage(data) {
        const today = new Date(Date.now());
        let label_arr = [];
        let dataset = [];
        for (var i=11; i >= 0; i--) {
            const target_date = today - (86400000 * i);
            const d = new Date(target_date);
            const result = d.toString("MMMM dd").slice(4, 10)
            let is_matched = false;

            label_arr.push(result);
            if (data) {
                for (var date_cnt of data) {
                    if (result == date_cnt['ym']) {
                        dataset.push(date_cnt['cnt']);
                        is_matched = true;
                    } 
                }
            }

            if (!is_matched) {
                dataset.push(0);
            }
        }

        const message_crt = document.getElementById('total_message_crt');
        new Chart(message_crt, {
            type: 'line',
            data: {
                labels: label_arr,
                datasets: [{
                    data: dataset,
                    borderColor: '#324DF9',
                    borderWidth: 2,
                    lineTension: 0,
                    fill: false
                }]
            },
            options: {
                legend: {
                    display: false
                },
                responsive: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            stepSize: 5,
                            beginAtZero: true
                        }
                    }],
                    gridLines: {
                        lineWidth: 0
                    }
                },
            }
        })
    }
    
    makeChartActiveHour(data) {
        let time_24hr = [];
        let time_active_hour = [];

        for(var i=0; i<24; i++) {
            time_24hr.push(i);
            let is_matched = false;
            if (data) {
                for (var time of data) {
                    if (i == time['hour']) {
                        time_active_hour.push(time['cnt'])
                        is_matched = true
                    }
                }
            }
            
            if (!is_matched) {
                time_active_hour.push(0);
            }
        }

        this.cal_active_hours(time_active_hour);

        const active_crt = document.getElementById('active_hour_crt');
        new Chart(active_crt, {
            type: 'bar',
            data: {
                labels: time_24hr,
                datasets: [{
                    data: time_active_hour,
                    backgroundColor: '#3CB650'
                }]
            },
            options: {
                legend: {
                    display: false
                },
                responsive: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            stepSize: 5,
                            beginAtZero: true
                        }
                    }],
                    gridLines: {
                        lineWidth: 0
                    }
                },
            }
        })
    }

    makeChartType() {
        const ctx = document.getElementById('message_type');
        const chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Text Messages', 'Questions', 'Media (Stickers, Gif, etc)', 'Pictures'],
                datasets: [{
                    data: [this.state.user_profile_data.act_txt_cnt, this.state.user_profile_data.act_questions, this.state.user_profile_data.act_media, this.state.user_profile_data.act_photo_cnt],
                    backgroundColor: [
                        '#255CF9',
                        '#3CB550',
                        '#2199EE',
                        '#644AC4'
                    ]
                }]
            },
            options: {
                legend : {
                    position: "right"
                },
                layout: {
                    padding: {
                        top: 20,
                        bottom:20,
                        left:20,
                        right:20
                    }
                }
            }
        }).resize()
    }

    componentDidMount() {

        Axios.post('/getMember', {
            member_id: this.extract_query(),
            chat_id: window.localStorage.getItem('chat_id')
        })
        .then((res_member) => {
            this.setState({user_profile_data : res_member.data[0]});
            Axios.post(`https://api.telegram.org/bot${this.props.botId}/getUserProfilePhotos`, {
                user_id: this.extract_query()
            })
            .then((res_chatmember) => {
                if (res_chatmember.data.result.total_count !== 0) {
                    Axios.post(`https://api.telegram.org/bot${this.props.botId}/getFile?file_id=`+res_chatmember.data.result.photos[0][0].file_id)
                        .then((res_file) => {
                            this.setState({profile_pic: res_file.data.result})
                            this.makeChartType();
                        })
                }      
            })
        })

        Axios.post('/getMessageByUser', {
            member_id: this.extract_query(),
            chat_id: window.localStorage.getItem('chat_id'),
            date: 30
        })
        .then((res) => {
            this.setState({
                message_log: res.data
            })
        })

        Axios.post('/getMessageCntPerDay', {
            member_id: this.extract_query(),
            chat_id: window.localStorage.getItem('chat_id')
        })
        .then((res) => {
            this.makeChartMessage(res.data)
        })

        Axios.post('/getMessageCntPerHour', {
            member_id: this.extract_query(),
            chat_id: window.localStorage.getItem('chat_id')
        })
        .then((res) => {
            this.makeChartActiveHour(res.data)
        })
    }

    render() {
        const total_msg = this.state.user_profile_data.act_txt_cnt + this.state.user_profile_data.act_photo_cnt + this.state.user_profile_data.act_url_cnt;

        return (
            <div className="user_wrap">
                <Title title={"User Profile"}></Title>
                <div className="profile_state">
                    <div className="user_profile">
                        <div className={this.state.user_profile_data.is_interested ? 'interest_icon interested' : 'interest_icon'} 
                            onClick={(ev) => this.interestMember(ev, this.state.user_profile_data.user_id)}>

                        </div>
                        <div className="profile_pic">
                            <img src={`https://api.telegram.org/file/bot${this.props.botId}/` + this.state.profile_pic.file_path}></img>
                        </div>
                        <div className="profile_contents">
                            <p>
                                {this.state.user_profile_data.first_name} {this.state.user_profile_data.last_name}
                            </p>
                            <p>
                                @{this.state.user_profile_data.username}
                            </p>
                            <p>
                                Active
                            </p>
                            <p>
                                Last Active : {this.state.user_profile_data.updated_at}
                            </p>
                            <p>
                                Messages: {total_msg}
                            </p>
                            <p>
                                Warning Points: {this.state.user_profile_data.warning_pt}
                            </p>
                        </div>
                        <div className="profile_manipulation">
                            <div className="manipulation_item" onClick={() => this.openTelegram(this.state.user_profile_data.username)}>
                                <span className="icon open_telegram_icon"></span>
                            </div>
                            <div className="manipulation_item" onClick={() => this.toggleMessageLogModal()}>
                                <span className="icon message_log_icon"></span>
                            </div>
                            <div className="manipulation_item" onClick={() => this.restrictMember(this.state.user_profile_data.user_id)}>
                                <span className="icon restrict_icon"></span>
                            </div>
                            <div className="manipulation_item">
                                <span className="icon ban_icon"></span>
                            </div>
                            <div className="manipulation_item" onClick={() => this.kickMember(this.state.user_profile_data.user_id)}>
                                <span className="icon kick_icon"></span>
                            </div>
                        </div>
                    </div>
                    <div className="chart_message_type">
                        <p>Type of Messages</p>
                        <canvas id="message_type" width="200" height="200"></canvas>
                    </div>
                    <div className="active_sum">
                        <p>Summary</p>
                        <div className="sum_el">
                            <p>Average messages per day</p>
                            <p>
                                {Math.floor(total_msg / this.cal_participate_date(this.state.user_profile_data.created_at))} messages
                            </p>
                        </div>
                        <div className="sum_el">
                            <p>Average messages per week</p>
                            <p>
                                {Math.floor(total_msg / this.cal_participate_week(this.state.user_profile_data.created_at))} messages
                            </p>
                        </div>
                        <div className="sum_el">
                            <p>Active hours per day</p>
                            <p>
                                {this.state.active_hours} hours
                            </p>
                        </div>
                        <div className="sum_el">
                            <p>Top Active hours</p>
                            {this.state.top_active === null ?
                            <p>
                                No data
                            </p>
                                :
                            <p>
                                Between {this.state.top_active > 10 ? this.state.top_active + ' : 00' : '0' + this.state.top_active + ' : 00'}
                                ~
                                {this.state.top_active + 1 > 10 ? (this.state.top_active + 1) + ' : 00' : '0' + (this.state.top_active + 1) + ' : 00'}
                            </p>
                                }
                        </div>
                        <div className="sum_el">
                            <p>Total Messages</p>
                            <p>
                                {total_msg}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="chart_message">
                    <p>Messages</p>
                    <canvas id="total_message_crt" width="1186" height="200"></canvas>
                </div>
                <div className="chart_activehour">
                    <p>Active Hours</p>
                    <canvas id="active_hour_crt"  width="1186" height="200"></canvas>
                </div>
                <div className={this.state.message_log_open ? "modal message_log_modal open" : "modal message_log_modal"}>
                    <h2 className="message_modal_title">Message Logs</h2>
                    <span className="message_modal_close" onClick={() => this.toggleMessageLogModal()}>&times;</span>
                    <ContentContainer messages={this.state.message_log} botId={this.props.botId} is_allMessages={true}></ContentContainer>
                </div>
            </div>
        )
    }
}

export default User;