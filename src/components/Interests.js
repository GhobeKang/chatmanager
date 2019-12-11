import React from 'react';
import Axios from 'axios';
import Title from './Section_title';
import '../css/Interests.css';

class Interests extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            interests: [],
            interest_member: [],
            serve_interests: [],
            active_popup: false
        }
    }

    componentDidMount() {
        Axios.post('/getInterest', {chat_id: window.localStorage.getItem('chat_id')})
            .then((res) => {
                const dataset = [];
                
                for (var data of res.data) {
                    dataset.push(data);
                }

                this.setState({interests: dataset})
            })
        Axios.post('/getInterestMembers', {chat_id: window.localStorage.getItem('chat_id')})
            .then((res) => {
                const dataset = res.data;

                this.setState({interest_member: dataset.map((data, index) => 
                    <tr className="interest_member" key={index}>
                        <td>
                            {data.first_name + ' ' + data.last_name}
                        </td>
                        <td onClick={() => this.changeContentbox(data.user_id)}>
                            <p>VIEW</p>
                        </td>
                        <td>
                            <i className="icon icon-download"></i>
                        </td>            
                    </tr>
                )})
            })
    }

    changeContentbox(user_id) {
        this.setState({serve_interests: this.state.interests.map((data, index) => {
            const entities = JSON.parse(data.entities);

            if (data.user_id === user_id && data.text) {
                if (entities) {
                    if (entities[0]['type'] === 'bot_command') {
                        return;
                    }
                }
                return (
                    <div className="interest_contents" key={index}>
                        <p>
                            {data.text}
                        </p>
                        <p>
                            {this.convertDateFormat(data.registered_time)}
                        </p>
                    </div>
                )
            }
        }), active_popup: true})

        document.querySelector('body').onclick = (ev) => {
            this.closeContentbox();
        }
    }

    closeContentbox() {
        this.setState({active_popup: false})
        document.querySelector('body').removeEventListener('click', this);
    }

    convertDateFormat(date) {
        const day = new Date(date);
        return day.toDateString() + ' ' + day.toTimeString().split(' ')[0];
    }

    render() {
        return (
            <div className="section_interests">
                <div className="module_path">
                    <p><span>Modules  /  </span>Interests</p>
                </div>
                <Title title={"Focus on user who you are interested in"}></Title>
                <table className="interests_wrap">
                    <thead>
                        <tr>
                            <th>username</th>
                            <th>view</th>
                            <th>export</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.interest_member}
                    </tbody>
                </table>
                <div className={this.state.active_popup ? 'interests_contents active' : 'interests_contents'}>
                    <Title title={"User Conversation Logs"}></Title>
                    {this.state.serve_interests}
                </div>
            </div>
        )
    }
}

export default Interests;